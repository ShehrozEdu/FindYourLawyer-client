import React from 'react';
import { format } from 'date-fns';

const ReviewDisplay = ({ reviews, stats }) => {
  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className="text-lg">
            {star <= rating ? '⭐' : '☆'}
          </span>
        ))}
      </div>
    );
  };

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">No reviews yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      {stats && (
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-4xl font-bold text-gmeshMain">
                {stats.averageRating.toFixed(1)}
              </div>
              <div className="flex items-center mt-2">
                {renderStars(Math.round(stats.averageRating))}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Based on {stats.totalReviews} {stats.totalReviews === 1 ? 'review' : 'reviews'}
              </p>
            </div>
            {stats.distribution && (
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="text-sm w-8">{rating}⭐</span>
                    <div className="w-32 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-gmeshMain h-2 rounded-full"
                        style={{
                          width: `${stats.totalReviews > 0 ? (stats.distribution[rating] / stats.totalReviews) * 100 : 0}%`
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 w-8">
                      {stats.distribution[rating] || 0}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gmeshMain bg-opacity-20 flex items-center justify-center">
                    <span className="text-gmeshMain font-semibold">
                      {review.client?.FirstName?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {review.client?.FirstName} {review.client?.LastName}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {format(new Date(review.createdAt), 'MMMM dd, yyyy')}
                    </p>
                  </div>
                </div>
                {review.title && (
                  <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                    {review.title}
                  </h5>
                )}
                <div className="mb-2">
                  {renderStars(review.rating)}
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {review.comment}
                </p>
                {review.isVerified && (
                  <span className="inline-block mt-2 px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded">
                    ✓ Verified Purchase
                  </span>
                )}
              </div>
            </div>

            {/* Lawyer Response */}
            {review.lawyerResponse?.response && (
              <div className="mt-4 pl-4 border-l-4 border-gmeshMain bg-gray-50 dark:bg-gray-600 rounded p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-900 dark:text-white">Lawyer Response</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {format(new Date(review.lawyerResponse.respondedAt), 'MMM dd, yyyy')}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {review.lawyerResponse.response}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewDisplay;

