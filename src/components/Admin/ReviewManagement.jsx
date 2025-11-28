import React, { useState, useEffect } from 'react';
import apiService from '../../utility/apiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner, faEye, faEyeSlash, faCheck, faTrash, faStar } from '@fortawesome/free-solid-svg-icons';
import { Dialog, Button } from '@material-tailwind/react';

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 1 });
  const [filters, setFilters] = useState({
    isVisible: '',
    isVerified: '',
    lawyerId: '',
    minRating: ''
  });
  const [selectedReview, setSelectedReview] = useState(null);
  const [showActionDialog, setShowActionDialog] = useState(false);
  const [actionType, setActionType] = useState('');

  useEffect(() => {
    fetchReviews();
  }, [pagination.page, filters]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v))
      });

      const response = await apiService.get(`/admin/reviews?${params.toString()}`);
      if (response.data.status) {
        setReviews(response.data.reviews);
        setPagination(prev => ({
          ...prev,
          ...response.data.pagination
        }));
      }
    } catch (error) {
      console.error('Review Management: Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, page }));
  };

  const handleReviewAction = async () => {
    try {
      if (actionType === 'toggleVisibility') {
        await apiService.put(`/admin/reviews/${selectedReview._id}`, {
          isVisible: !selectedReview.isVisible
        });
      } else if (actionType === 'verify') {
        await apiService.put(`/admin/reviews/${selectedReview._id}`, {
          isVerified: true
        });
      } else if (actionType === 'delete') {
        await apiService.delete(`/admin/reviews/${selectedReview._id}`);
      }
      setShowActionDialog(false);
      setSelectedReview(null);
      setActionType('');
      fetchReviews();
    } catch (error) {
      console.error('Review Management: Error performing action:', error);
    }
  };

  const openActionDialog = (review, action) => {
    setSelectedReview(review);
    setActionType(action);
    setShowActionDialog(true);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <FontAwesomeIcon
        key={i}
        icon={faStar}
        className={i < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gmeshBlue dark:text-white">Review Management</h2>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={filters.isVisible}
            onChange={(e) => handleFilterChange('isVisible', e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gmeshMain focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="">All Visibility</option>
            <option value="true">Visible</option>
            <option value="false">Hidden</option>
          </select>
          <select
            value={filters.isVerified}
            onChange={(e) => handleFilterChange('isVerified', e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gmeshMain focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="">All Verification</option>
            <option value="true">Verified</option>
            <option value="false">Pending</option>
          </select>
          <input
            type="text"
            placeholder="Lawyer ID"
            value={filters.lawyerId}
            onChange={(e) => handleFilterChange('lawyerId', e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gmeshMain focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
          <input
            type="number"
            placeholder="Min Rating"
            min="1"
            max="5"
            value={filters.minRating}
            onChange={(e) => handleFilterChange('minRating', e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gmeshMain focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <FontAwesomeIcon icon={faSpinner} className="animate-spin text-2xl text-gmeshMain" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No reviews found</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Lawyer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Client</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Rating</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Comment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {reviews.map((review) => (
                    <tr key={review._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {review.lawyer?.FirstName} {review.lawyer?.LastName}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{review.lawyer?.Expertise}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {review.client?.FirstName} {review.client?.LastName}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          {renderStars(review.rating)}
                          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{review.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white max-w-xs truncate">
                          {review.comment}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          {review.isVisible ? (
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 w-fit">
                              Visible
                            </span>
                          ) : (
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 w-fit">
                              Hidden
                            </span>
                          )}
                          {review.isVerified ? (
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 w-fit">
                              Verified
                            </span>
                          ) : (
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 w-fit">
                              Pending
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openActionDialog(review, 'toggleVisibility')}
                            className={`text-sm ${review.isVisible ? 'text-yellow-600' : 'text-green-600'} hover:opacity-80`}
                            title={review.isVisible ? 'Hide' : 'Show'}
                          >
                            <FontAwesomeIcon icon={review.isVisible ? faEyeSlash : faEye} />
                          </button>
                          {!review.isVerified && (
                            <button
                              onClick={() => openActionDialog(review, 'verify')}
                              className="text-sm text-blue-600 hover:opacity-80"
                              title="Verify"
                            >
                              <FontAwesomeIcon icon={faCheck} />
                            </button>
                          )}
                          <button
                            onClick={() => openActionDialog(review, 'delete')}
                            className="text-sm text-red-600 hover:opacity-80"
                            title="Delete"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex items-center justify-between">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} reviews
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.pages}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Action Dialog */}
      <Dialog open={showActionDialog} handler={setShowActionDialog} className="bg-white dark:bg-gray-800">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gmeshBlue dark:text-white mb-4">
            {actionType === 'toggleVisibility' && (selectedReview?.isVisible ? 'Hide' : 'Show')} Review
            {actionType === 'verify' && 'Verify Review'}
            {actionType === 'delete' && 'Delete Review'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {actionType === 'delete' 
              ? 'Are you sure you want to delete this review? This action cannot be undone.'
              : actionType === 'toggleVisibility'
              ? `Are you sure you want to ${selectedReview?.isVisible ? 'hide' : 'show'} this review?`
              : 'Are you sure you want to verify this review?'}
          </p>
          <div className="flex gap-2 justify-end">
            <Button
              variant="text"
              onClick={() => setShowActionDialog(false)}
              className="text-gray-700 dark:text-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleReviewAction}
              className={`${
                actionType === 'delete' 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-gmeshMain hover:bg-gmeshMain/80'
              }`}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ReviewManagement;

