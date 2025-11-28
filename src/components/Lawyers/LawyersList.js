import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../Auth/AxiosInstance";
import LawyersListBox from "./LawyerListBox";

export default function LawyersList() {
  const [lawyersList, setLawyersList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    limit: 9,
    hasNextPage: false,
    hasPrevPage: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const lawyersPerPage = 9;

  const getLawyerData = useCallback(async (page = 1, search = "") => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: lawyersPerPage.toString()
      });
      
      if (search.trim()) {
        params.append('search', search.trim());
      }

      const response = await axiosInstance.get(`/lawyersListExpertise?${params.toString()}`);
      console.log("LawyersList: Response data:", response.data);
      
      const { status, lawyers, pagination: paginationData } = response.data;
      if (status) {
        setLawyersList(Array.isArray(lawyers) ? lawyers : []);
        if (paginationData) {
          setPagination(paginationData);
        }
      } else {
        setLawyersList([]);
        console.warn("LawyersList: API returned status false");
      }
    } catch (error) {
      console.error("LawyersList: Error fetching lawyers data:", error);
      setLawyersList([]);
      alert("Error fetching lawyers data: " + (error.message || error));
    } finally {
      setIsLoading(false);
    }
  }, [lawyersPerPage]);

  // Debounce search and fetch data
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getLawyerData(currentPage, searchQuery);
    }, searchQuery ? 500 : 0); // Only debounce if there's a search query

    return () => clearTimeout(timeoutId);
  }, [currentPage, searchQuery, getLawyerData]);

  // Reset to page 1 when search changes
  useEffect(() => {
    if (searchQuery && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [searchQuery]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPagination = () => {
    if (pagination.totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, pagination.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(pagination.totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="flex justify-center items-center gap-2 mt-8 mb-4">
        <button
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={!pagination.hasPrevPage || isLoading}
          className={`px-4 py-2 rounded-md ${
            !pagination.hasPrevPage || isLoading
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-[#2bcdc0] text-white hover:bg-opacity-90'
          } transition-colors`}
        >
          Previous
        </button>

        {startPage > 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              disabled={isLoading}
              className="px-3 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors disabled:opacity-50"
            >
              1
            </button>
            {startPage > 2 && <span className="px-2 text-gray-500">...</span>}
          </>
        )}

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={isLoading}
            className={`px-4 py-2 rounded-md transition-colors disabled:opacity-50 ${
              pagination.currentPage === page
                ? 'bg-[#010d45] text-white font-semibold'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {page}
          </button>
        ))}

        {endPage < pagination.totalPages && (
          <>
            {endPage < pagination.totalPages - 1 && <span className="px-2 text-gray-500">...</span>}
            <button
              onClick={() => handlePageChange(pagination.totalPages)}
              disabled={isLoading}
              className="px-3 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors disabled:opacity-50"
            >
              {pagination.totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={!pagination.hasNextPage || isLoading}
          className={`px-4 py-2 rounded-md ${
            !pagination.hasNextPage || isLoading
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-[#2bcdc0] text-white hover:bg-opacity-90'
          } transition-colors`}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="max-w-md mx-auto my-7">
          <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-slate-200 overflow-hidden">
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              className="peer h-full w-full outline-none text-sm bg-slate-200 text-gray-700 pr-2"
              type="text"
              id="search"
              placeholder="Search by name, expertise, or state"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
              }}
            />
          </div>
        </div>

        {/* Results count */}
        <div className="text-center mb-6">
          <p className="text-gray-600">
            {isLoading ? (
              "Loading..."
            ) : (
              <>
                Showing {lawyersList.length > 0 ? (pagination.currentPage - 1) * pagination.limit + 1 : 0} - {Math.min(pagination.currentPage * pagination.limit, pagination.totalCount)} of {pagination.totalCount} lawyers
              </>
            )}
          </p>
        </div>

        {/* Lawyers Grid */}
        {isLoading ? (
          <div className="w-full text-center py-12">
            <p className="text-gray-500 text-lg">Loading lawyers...</p>
          </div>
        ) : (
          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
            {lawyersList.length > 0 ? (
              lawyersList.map((lawyer) => (
                <LawyersListBox key={lawyer._id} list={lawyer} />
              ))
            ) : (
              <div className="w-full text-center py-12">
                <p className="text-gray-500 text-lg">No lawyers found matching your search.</p>
              </div>
            )}
          </div>
        )}

        {/* Pagination Controls */}
        {renderPagination()}
      </div>
    </section>
  );
}
