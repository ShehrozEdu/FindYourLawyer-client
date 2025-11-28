import React, { useState } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';
import apiService from '../../../utility/apiService';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

const CaseCard = ({ caseItem, onUpdate }) => {
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [statusNotes, setStatusNotes] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

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

  const handleStatusUpdate = async () => {
    if (!newStatus) {
      toast.error('Please select a status');
      return;
    }

    try {
      setIsUpdating(true);
      const response = await apiService.put(`/cases/${caseItem._id}/status`, {
        status: newStatus,
        notes: statusNotes
      });
      if (response.data.status) {
        toast.success('Case status updated successfully');
        setIsStatusDialogOpen(false);
        setNewStatus('');
        setStatusNotes('');
        if (onUpdate) onUpdate();
      }
    } catch (error) {
      console.error('Error updating case status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleQuickAction = async (action) => {
    try {
      setIsUpdating(true);
      const status = action === 'accept' ? 'accepted' : action === 'reject' ? 'cancelled' : caseItem.status;
      const response = await apiService.put(`/cases/${caseItem._id}/status`, {
        status: status,
        notes: action === 'accept' ? 'Case accepted' : action === 'reject' ? 'Case rejected' : ''
      });
      if (response.data.status) {
        toast.success(`Case ${action === 'accept' ? 'accepted' : action === 'reject' ? 'rejected' : 'updated'} successfully`);
        if (onUpdate) onUpdate();
      }
    } catch (error) {
      console.error('Error updating case:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <div className="p-5 bg-white dark:bg-gray-800">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {caseItem.clientName || 'Unknown Client'}
              </h3>
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(caseItem.status)}`}>
                {formatStatus(caseItem.status)}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
              {caseItem.description || 'No description'}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              {caseItem.consultationDate && (
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{format(new Date(caseItem.consultationDate), 'MMM dd, yyyy HH:mm')}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-gmeshMain font-semibold">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>₹{caseItem.income?.toLocaleString('en-IN') || '0'}</span>
              </div>
              {caseItem.createdAt && (
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs">
                  <span>Created: {format(new Date(caseItem.createdAt), 'MMM dd, yyyy')}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 shrink-0">
            {caseItem.status === 'pending' && (
              <>
                <Button
                  size="sm"
                  onClick={() => handleQuickAction('accept')}
                  disabled={isUpdating}
                  className="bg-green-500 hover:bg-green-600 text-white text-xs px-4 py-2 rounded-lg transition-all"
                >
                  Accept
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleQuickAction('reject')}
                  disabled={isUpdating}
                  className="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-2 rounded-lg transition-all"
                >
                  Reject
                </Button>
              </>
            )}
            <Button
              size="sm"
              onClick={() => setIsStatusDialogOpen(true)}
              disabled={isUpdating}
              className="bg-gmeshMain hover:bg-opacity-90 text-white text-xs px-4 py-2 rounded-lg transition-all"
            >
              Update Status
            </Button>
          </div>
        </div>
      </div>

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
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-gmeshMain dark:bg-gray-600 dark:text-white transition-all"
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
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-gmeshMain dark:bg-gray-600 dark:text-white transition-all"
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
            disabled={!newStatus || isUpdating}
            className="bg-gmeshMain hover:bg-opacity-90"
          >
            {isUpdating ? 'Updating...' : 'Update Status'}
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default CaseCard;

