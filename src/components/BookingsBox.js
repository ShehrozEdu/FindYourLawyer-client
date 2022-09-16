import React from "react";
import { useNavigate } from "react-router-dom";
// import Pagination from "./Pagination/Pagination";

export default function BookingsBox({ book }) {
  const navigate = useNavigate();
  const getPracticeOverview = (id) => {
    navigate("/lawyerListOverview/" + id);
  };

  return (
    <>
      <div className="lg:w-1/3 sm:w-1/2 p-4 r shadow  ">
        <div
          className="flex relative cursor-pointer justify-center"
          onClick={() => getPracticeOverview(book._id)}
        >
          <img
            alt="gallery"
            className="absolute inset-0 w-full h-full object-cover object-center"
            src={book.image}
          />

          <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
            <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">
              {book.subtitle}
            </h2>
            <h1 className="title-font text-lg font-medium text-gray-900  mb-3">
              {book.title}
            </h1>
            <p className="leading-relaxed">{book.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}
