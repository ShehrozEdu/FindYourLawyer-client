import React from "react";
import { Link } from "react-router-dom";

export default function LawyerListBox({ list }) {
  const idOfLawyer = JSON.parse(localStorage.getItem("auth_token1"))._id;
console.log(list._id)
  // Conditionally render the lawyer based on ID
  if (list._id !== idOfLawyer) {
    return null; // Hide the lawyer if IDs don't match
  }

  return (
    <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
      <div className="rounded-lg h-64 overflow-hidden">
        {/* Assuming your lawyer object has an image property */}
        <img
          alt="content"
          className="object-cover object-center h-full w-50"
          src={list.image ? `/img${list.image}` : "/placeholder-image.jpg"}
        />
      </div>
      {/* Assuming your lawyer object has a name property */}
      <Link to="/bookyourlawyer" className="cursor-pointer">
        <h2 className="text-xl font-medium title-font text-gray-900 mt-5 cursor-pointer">
          {list.FirstName} {list.LastName}
        </h2>
      </Link>
      {/* Assuming your lawyer object has a state property */}
      <p className="text-base leading-relaxed mt-2">{list.state}</p>
      {/* Assuming your lawyer object has a practice property */}
      <p className="text-stone-500 inline-flex items-center mt-3">
        {list.Expertise}
      </p>
    </div>
  );
}
