import React, { useState, useEffect } from 'react';
import apiService from '../../utility/apiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner, faTrash, faPlus, faEdit, faBook, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { Dialog, Button, Input, Textarea } from '@material-tailwind/react';

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState('blogs');
  const [blogs, setBlogs] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [blogPagination, setBlogPagination] = useState({ page: 1, limit: 10, total: 0, pages: 1 });
  const [bookPagination, setBookPagination] = useState({ page: 1, limit: 10, total: 0, pages: 1 });
  const [filters, setFilters] = useState({ search: '', lawyerId: '' });
  const [showBookDialog, setShowBookDialog] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookForm, setBookForm] = useState({ title: '', author: '', description: '', imageUrl: '', pdfUrl: '' });

  useEffect(() => {
    if (activeTab === 'blogs') {
      fetchBlogs();
    } else {
      fetchBooks();
    }
  }, [activeTab, blogPagination.page, bookPagination.page, filters]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: blogPagination.page.toString(),
        limit: blogPagination.limit.toString(),
        ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v))
      });

      const response = await apiService.get(`/admin/blogs?${params.toString()}`);
      if (response.data.status) {
        setBlogs(response.data.blogs);
        setBlogPagination(prev => ({
          ...prev,
          ...response.data.pagination
        }));
      }
    } catch (error) {
      console.error('Content Management: Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: bookPagination.page.toString(),
        limit: bookPagination.limit.toString(),
        ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v))
      });

      const response = await apiService.get(`/admin/books?${params.toString()}`);
      if (response.data.status) {
        setBooks(response.data.books);
        setBookPagination(prev => ({
          ...prev,
          ...response.data.pagination
        }));
      }
    } catch (error) {
      console.error('Content Management: Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    try {
      await apiService.delete(`/admin/blogs/${blogId}`);
      fetchBlogs();
    } catch (error) {
      console.error('Content Management: Error deleting blog:', error);
    }
  };

  const handleDeleteBook = async (bookId) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;

    try {
      await apiService.delete(`/admin/books/${bookId}`);
      fetchBooks();
    } catch (error) {
      console.error('Content Management: Error deleting book:', error);
    }
  };

  const handleBookSubmit = async () => {
    try {
      if (selectedBook) {
        await apiService.put(`/admin/books/${selectedBook._id}`, bookForm);
      } else {
        await apiService.post('/admin/books', bookForm);
      }
      setShowBookDialog(false);
      setSelectedBook(null);
      setBookForm({ title: '', author: '', description: '', imageUrl: '', pdfUrl: '' });
      fetchBooks();
    } catch (error) {
      console.error('Content Management: Error saving book:', error);
    }
  };

  const openBookDialog = (book = null) => {
    if (book) {
      setSelectedBook(book);
      setBookForm({
        title: book.title || '',
        author: book.author || '',
        description: book.description || '',
        imageUrl: book.image || '',
        pdfUrl: book.link || ''
      });
    } else {
      setSelectedBook(null);
      setBookForm({ title: '', author: '', description: '', imageUrl: '', pdfUrl: '' });
    }
    setShowBookDialog(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gmeshBlue dark:text-white">Content Management</h2>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('blogs')}
            className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
              activeTab === 'blogs'
                ? 'text-gmeshMain border-b-2 border-gmeshMain'
                : 'text-gray-600 dark:text-gray-400 hover:text-gmeshMain'
            }`}
          >
            <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
            Blogs
          </button>
          <button
            onClick={() => setActiveTab('books')}
            className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
              activeTab === 'books'
                ? 'text-gmeshMain border-b-2 border-gmeshMain'
                : 'text-gray-600 dark:text-gray-400 hover:text-gmeshMain'
            }`}
          >
            <FontAwesomeIcon icon={faBook} className="mr-2" />
            Books
          </button>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gmeshMain focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            {activeTab === 'books' && (
              <button
                onClick={() => openBookDialog()}
                className="px-4 py-2 bg-gmeshMain text-white rounded-lg hover:bg-gmeshMain/80 flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faPlus} />
                Add Book
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <FontAwesomeIcon icon={faSpinner} className="animate-spin text-2xl text-gmeshMain" />
            </div>
          ) : activeTab === 'blogs' ? (
            blogs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">No blogs found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {blogs.map((blog) => (
                  <div key={blog._id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gmeshBlue dark:text-white mb-2">{blog.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">{blog.content}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <span>By: {blog.lawyerId?.FirstName} {blog.lawyerId?.LastName}</span>
                          <span>•</span>
                          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteBlog(blog._id)}
                        className="ml-4 text-red-600 hover:text-red-800"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                ))}
                {blogPagination.pages > 1 && (
                  <div className="flex justify-center gap-2 mt-6">
                    <button
                      onClick={() => setBlogPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                      disabled={blogPagination.page === 1}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setBlogPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                      disabled={blogPagination.page === blogPagination.pages}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            )
          ) : books.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No books found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {books.map((book) => (
                <div key={book._id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gmeshBlue dark:text-white mb-2">{book.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">By: {book.author}</p>
                      {book.description && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{book.description}</p>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => openBookDialog(book)}
                        className="text-gmeshMain hover:text-gmeshBlue"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => handleDeleteBook(book._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {bookPagination.pages > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  <button
                    onClick={() => setBookPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                    disabled={bookPagination.page === 1}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setBookPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                    disabled={bookPagination.page === bookPagination.pages}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Book Dialog */}
      <Dialog open={showBookDialog} handler={setShowBookDialog} className="bg-white dark:bg-gray-800">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gmeshBlue dark:text-white mb-4">
            {selectedBook ? 'Edit Book' : 'Add New Book'}
          </h3>
          <div className="space-y-4">
            <Input
              label="Title"
              value={bookForm.title}
              onChange={(e) => setBookForm(prev => ({ ...prev, title: e.target.value }))}
              className="dark:text-white"
            />
            <Input
              label="Author"
              value={bookForm.author}
              onChange={(e) => setBookForm(prev => ({ ...prev, author: e.target.value }))}
              className="dark:text-white"
            />
            <Textarea
              label="Description"
              value={bookForm.description}
              onChange={(e) => setBookForm(prev => ({ ...prev, description: e.target.value }))}
              className="dark:text-white"
            />
            <Input
              label="Image URL"
              value={bookForm.imageUrl}
              onChange={(e) => setBookForm(prev => ({ ...prev, imageUrl: e.target.value }))}
              className="dark:text-white"
            />
            <Input
              label="PDF URL"
              value={bookForm.pdfUrl}
              onChange={(e) => setBookForm(prev => ({ ...prev, pdfUrl: e.target.value }))}
              className="dark:text-white"
            />
          </div>
          <div className="flex gap-2 justify-end mt-6">
            <Button
              variant="text"
              onClick={() => setShowBookDialog(false)}
              className="text-gray-700 dark:text-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleBookSubmit}
              className="bg-gmeshMain hover:bg-gmeshMain/80"
            >
              {selectedBook ? 'Update' : 'Create'}
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ContentManagement;

