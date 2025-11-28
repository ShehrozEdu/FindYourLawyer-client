import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../../utility/apiService';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSkeleton from '../utils/LoadingSkelton';
import { format } from 'date-fns';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';
import DocumentManager from '../Documents/DocumentManager';
import ReviewForm from '../Reviews/ReviewForm';
import ReviewDisplay from '../Reviews/ReviewDisplay';

const CaseDetails = () => {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [caseData, setCaseData] = useState(null);
  const [statusHistory, setStatusHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [statusNotes, setStatusNotes] = useState('');
  const [activeTab, setActiveTab] = useState('details'); // 'details', 'documents', or 'reviews'
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewStats, setReviewStats] = useState(null);

  useEffect(() => {
    if (caseId) {
      fetchCaseDetails();
      fetchStatusHistory();
    }
  }, [caseId]);

  useEffect(() => {
    if (caseData?.lawyer?._id) {
      fetchReviews(caseData.lawyer._id);
    }
  }, [caseData?.lawyer?._id]);

  const fetchReviews = async (lawyerId) => {
    if (!lawyerId) return;
    try {
      const response = await apiService.get(`/reviews/lawyer/${lawyerId}`);
      if (response.data.status) {
        setReviews(response.data.reviews || []);
        setReviewStats(response.data.stats);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const fetchCaseDetails = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.get(`/cases`);
      if (response.data.status) {
        const foundCase = response.data.cases.find(c => c._id === caseId);
        if (foundCase) {
          setCaseData(foundCase);
        }
      }
    } catch (error) {
      console.error('Error fetching case details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStatusHistory = async () => {
    try {
      const response = await apiService.get(`/cases/${caseId}/status-history`);
      if (response.data.status) {
        setStatusHistory(response.data.statusHistory || []);
      }
    } catch (error) {
      console.error('Error fetching status history:', error);
    }
  };

  const handleStatusUpdate = async () => {
    try {
      const response = await apiService.put(`/cases/${caseId}/status`, {
        status: newStatus,
        notes: statusNotes
      });
      if (response.data.status) {
        setIsStatusDialogOpen(false);
        setNewStatus('');
        setStatusNotes('');
        fetchCaseDetails();
        fetchStatusHistory();
      }
    } catch (error) {
      console.error('Error updating case status:', error);
    }
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      accepted: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      in_progress: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  };

  const formatStatus = (status) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <LoadingSkeleton />
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">Case not found</p>
          <button
            onClick={() => navigate('/client-dashboard')}
            className="mt-4 px-4 py-2 bg-gmeshMain text-white rounded-md hover:bg-opacity-90"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const canUpdateStatus = user?.isLawyer && caseData.lawyer?._id === user._id;

  return (
    <div className="container mx-auto py-8 px-4 dark:bg-gray-800 min-h-screen">
      <div className="mb-6">
        <button
          onClick={() => navigate('/client-dashboard')}
          className="text-gmeshMain hover:text-gmeshBlue dark:text-gmeshMain mb-4"
        >
          ← Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold dark:text-white">Case Details</h1>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-600">
        <div className="flex">
          <button
            onClick={() => setActiveTab('details')}
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === 'details'
                ? 'border-b-2 border-gmeshMain text-gmeshMain dark:text-gmeshMain'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Case Details
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === 'documents'
                ? 'border-b-2 border-gmeshMain text-gmeshMain dark:text-gmeshMain'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Documents
          </button>
          {caseData?.lawyer && (
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === 'reviews'
                  ? 'border-b-2 border-gmeshMain text-gmeshMain dark:text-gmeshMain'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Reviews
            </button>
          )}
        </div>
      </div>

      {activeTab === 'details' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Case Information */}
          <div className="lg:col-span-2 space-y-6">
          {/* Case Overview Card */}
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-semibold dark:text-white mb-2">Case Information</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Case ID: {caseData._id.slice(-12)}</p>
              </div>
              <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusBadgeColor(caseData.status)}`}>
                {formatStatus(caseData.status)}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Description</h3>
                <p className="text-gray-900 dark:text-white">{caseData.description || 'No description provided'}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Consultation Date</h3>
                  <p className="text-gray-900 dark:text-white">
                    {caseData.consultationDate 
                      ? format(new Date(caseData.consultationDate), 'MMMM dd, yyyy HH:mm')
                      : 'Not scheduled'}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Amount</h3>
                  <p className="text-gray-900 dark:text-white font-semibold">
                    ₹{caseData.income?.toLocaleString('en-IN') || '0'}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Created</h3>
                <p className="text-gray-900 dark:text-white">
                  {caseData.createdAt 
                    ? format(new Date(caseData.createdAt), 'MMMM dd, yyyy')
                    : 'N/A'}
                </p>
              </div>
            </div>

            {canUpdateStatus && (
              <div className="mt-6">
                <Button
                  onClick={() => setIsStatusDialogOpen(true)}
                  className="bg-gmeshMain hover:bg-opacity-90"
                >
                  Update Status
                </Button>
              </div>
            )}
          </div>

          {/* Status Timeline */}
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold dark:text-white mb-4">Status Timeline</h2>
            {statusHistory.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">No status history available</p>
            ) : (
              <div className="space-y-4">
                {statusHistory.map((history, index) => (
                  <div key={history._id} className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className={`w-3 h-3 rounded-full ${getStatusBadgeColor(history.status).split(' ')[0]} mt-1`}></div>
                      {index < statusHistory.length - 1 && (
                        <div className="w-0.5 h-12 bg-gray-300 dark:bg-gray-600 ml-1.5"></div>
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(history.status)}`}>
                          {formatStatus(history.status)}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {format(new Date(history.timestamp), 'MMM dd, yyyy HH:mm')}
                        </span>
                      </div>
                      {history.updatedBy && (
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          Updated by: {history.updatedBy.FirstName} {history.updatedBy.LastName}
                        </p>
                      )}
                      {history.notes && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{history.notes}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Lawyer Information Card */}
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold dark:text-white mb-4">Lawyer Information</h2>
            {caseData.lawyer ? (
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Name</h3>
                  <p className="text-gray-900 dark:text-white font-semibold">
                    {caseData.lawyer.FirstName} {caseData.lawyer.LastName}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email</h3>
                  <p className="text-gray-900 dark:text-white">{caseData.lawyer.Email}</p>
                </div>
                {caseData.lawyer.Expertise && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Expertise</h3>
                    <p className="text-gray-900 dark:text-white">{caseData.lawyer.Expertise}</p>
                  </div>
                )}
                {caseData.lawyer.State && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Location</h3>
                    <p className="text-gray-900 dark:text-white">{caseData.lawyer.State}</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">Lawyer information not available</p>
            )}
          </div>

          {/* Payment Information Card */}
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold dark:text-white mb-4">Payment Information</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Consultation Fee</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  ₹{caseData.income?.toLocaleString('en-IN') || '0'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Status</span>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(caseData.status)}`}>
                  {formatStatus(caseData.status)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      ) : activeTab === 'documents' ? (
        <DocumentManager caseId={caseId} />
      ) : (
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold dark:text-white">Lawyer Reviews</h2>
            {caseData?.status === 'completed' && 
             caseData?.client?._id === user?._id && (
              <button
                onClick={() => setIsReviewDialogOpen(true)}
                className="px-4 py-2 bg-gmeshMain text-white rounded-md hover:bg-opacity-90"
              >
                Write a Review
              </button>
            )}
          </div>
          <ReviewDisplay reviews={reviews} stats={reviewStats} />
        </div>
      )}

      {/* Review Form Dialog */}
      {caseData?.lawyer && (
        <ReviewForm
          isOpen={isReviewDialogOpen}
          onClose={() => setIsReviewDialogOpen(false)}
          lawyerId={caseData.lawyer._id}
          caseId={caseId}
          onSuccess={() => {
            fetchReviews();
            fetchCaseDetails();
          }}
        />
      )}

      {/* Status Update Dialog */}
      <Dialog open={isStatusDialogOpen} handler={setIsStatusDialogOpen} className="dark:bg-gray-700">
        <DialogHeader className="dark:text-white">Update Case Status</DialogHeader>
        <DialogBody>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                New Status
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gmeshMain dark:bg-gray-600 dark:text-white"
              >
                <option value="">Select status</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Notes (Optional)
              </label>
              <textarea
                value={statusNotes}
                onChange={(e) => setStatusNotes(e.target.value)}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gmeshMain dark:bg-gray-600 dark:text-white"
                placeholder="Add any notes about this status change..."
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => {
              setIsStatusDialogOpen(false);
              setNewStatus('');
              setStatusNotes('');
            }}
            className="mr-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleStatusUpdate}
            disabled={!newStatus}
            className="bg-gmeshMain hover:bg-opacity-90"
          >
            Update Status
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default CaseDetails;

