import React, { useState } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';
import apiService from '../../utility/apiService';
import { toast } from 'react-toastify';

const ReviewForm = ({ isOpen, onClose, lawyerId, caseId, onSuccess }) => {
  const [formData, setFormData] = useState({
    rating: 5,
    title: '',
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.comment.trim()) {
      toast.error('Please provide a comment');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await apiService.post('/reviews', {
        lawyerId,
        caseId,
        rating: formData.rating,
        title: formData.title,
        comment: formData.comment
      });

      if (response.data.status) {
        toast.success('Review submitted successfully');
        setFormData({ rating: 5, title: '', comment: '' });
        onClose();
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} handler={onClose} size="lg" className="dark:bg-gray-700">
      <DialogHeader className="dark:text-white">Write a Review</DialogHeader>
      <DialogBody>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Rating *
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className="text-3xl focus:outline-none"
                >
                  {star <= formData.rating ? '⭐' : '☆'}
                </button>
              ))}
              <span className="ml-2 text-gray-600 dark:text-gray-400">
                {formData.rating} out of 5
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title (Optional)
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gmeshMain dark:bg-gray-600 dark:text-white"
              placeholder="Review title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Comment *
            </label>
            <textarea
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              rows="5"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gmeshMain dark:bg-gray-600 dark:text-white"
              placeholder="Share your experience..."
            />
          </div>
        </form>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={onClose}
          className="mr-1"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || !formData.comment.trim()}
          className="bg-gmeshMain hover:bg-opacity-90"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ReviewForm;

