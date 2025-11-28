import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../../utility/apiService';
import { useAuth } from '../../contexts/AuthContext';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import LoadingSkeleton from '../utils/LoadingSkelton';

const DocumentManager = ({ caseId: propCaseId }) => {
  const { caseId: paramCaseId } = useParams();
  const caseId = propCaseId || paramCaseId;
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadForm, setUploadForm] = useState({
    category: 'other',
    description: '',
    tags: ''
  });
  const { user } = useAuth();

  useEffect(() => {
    if (user?._id) {
      fetchDocuments();
    }
  }, [user, caseId]);

  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      const url = caseId 
        ? `/documents?caseId=${caseId}`
        : '/documents';
      const response = await apiService.get(url);
      if (response.data.status) {
        setDocuments(response.data.documents || []);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('caseId', caseId || '');
      formData.append('category', uploadForm.category);
      formData.append('description', uploadForm.description);
      formData.append('tags', uploadForm.tags);

      const response = await apiService.post('/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.status) {
        toast.success('Document uploaded successfully');
        setIsUploadDialogOpen(false);
        setSelectedFile(null);
        setUploadForm({
          category: 'other',
          description: '',
          tags: ''
        });
        fetchDocuments();
      }
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  };

  const handleDownload = async (documentId, originalName) => {
    try {
      const response = await apiService.get(`/documents/${documentId}/download`, {
        responseType: 'blob'
      });
      
      // Create blob and download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', originalName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading document:', error);
      toast.error('Failed to download document');
    }
  };

  const handleDelete = async (documentId) => {
    if (!window.confirm('Are you sure you want to delete this document?')) {
      return;
    }

    try {
      const response = await apiService.delete(`/documents/${documentId}`);
      if (response.data.status) {
        toast.success('Document deleted successfully');
        fetchDocuments();
      }
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getCategoryColor = (category) => {
    const colors = {
      contract: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      evidence: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      correspondence: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      court_document: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      invoice: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      other: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    };
    return colors[category] || colors.other;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 dark:bg-gray-800 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold dark:text-white">
          {caseId ? 'Case Documents' : 'My Documents'}
        </h1>
        <button
          onClick={() => setIsUploadDialogOpen(true)}
          className="px-4 py-2 bg-gmeshMain text-white rounded-md hover:bg-opacity-90"
        >
          + Upload Document
        </button>
      </div>

      {documents.length === 0 ? (
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">No documents found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc) => (
            <div
              key={doc._id}
              className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 truncate">
                    {doc.originalName}
                  </h3>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(doc.category)}`}>
                    {doc.category}
                  </span>
                </div>
              </div>
              
              {doc.description && (
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
                  {doc.description}
                </p>
              )}

              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                <span>{formatFileSize(doc.fileSize)}</span>
                <span>{format(new Date(doc.createdAt), 'MMM dd, yyyy')}</span>
              </div>

              {doc.tags && doc.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {doc.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => handleDownload(doc._id, doc.originalName)}
                  className="flex-1 px-3 py-2 bg-gmeshMain text-white text-sm rounded-md hover:bg-opacity-90"
                >
                  Download
                </button>
                {doc.uploadedBy?._id === user?._id && (
                  <button
                    onClick={() => handleDelete(doc._id)}
                    className="px-3 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Dialog */}
      <Dialog open={isUploadDialogOpen} handler={setIsUploadDialogOpen} size="lg" className="dark:bg-gray-700">
        <DialogHeader className="dark:text-white">Upload Document</DialogHeader>
        <DialogBody>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select File *
              </label>
              <input
                type="file"
                onChange={handleFileSelect}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gmeshMain dark:bg-gray-600 dark:text-white"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
              />
              {selectedFile && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={uploadForm.category}
                onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gmeshMain dark:bg-gray-600 dark:text-white"
              >
                <option value="contract">Contract</option>
                <option value="evidence">Evidence</option>
                <option value="correspondence">Correspondence</option>
                <option value="court_document">Court Document</option>
                <option value="invoice">Invoice</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={uploadForm.description}
                onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gmeshMain dark:bg-gray-600 dark:text-white"
                placeholder="Document description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={uploadForm.tags}
                onChange={(e) => setUploadForm({ ...uploadForm, tags: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gmeshMain dark:bg-gray-600 dark:text-white"
                placeholder="tag1, tag2, tag3"
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => {
              setIsUploadDialogOpen(false);
              setSelectedFile(null);
              setUploadForm({ category: 'other', description: '', tags: '' });
            }}
            className="mr-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!selectedFile}
            className="bg-gmeshMain hover:bg-opacity-90"
          >
            Upload
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default DocumentManager;

