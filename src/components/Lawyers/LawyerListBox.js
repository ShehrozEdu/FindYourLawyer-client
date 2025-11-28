import React from "react";
import { Link } from "react-router-dom";

export default function LawyerListBox({ list }) {
  return (
    <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
      <div className="rounded-lg h-64 overflow-hidden">
        <img
          alt={`${list.FirstName} ${list.LastName}`}
          className="object-cover object-center h-full w-full"
          src={list.image ? `/img${list.image}` : "/img/avt/1.jpg"}
          onError={(e) => {
            e.target.src = "/img/avt/1.jpg";
          }}
        />
      </div>
      <Link to="/bookyourlawyer" className="cursor-pointer">
        <h2 className="text-xl font-medium title-font text-gray-900 mt-5 cursor-pointer">
          {list.FirstName} {list.LastName}
        </h2>
      </Link>
      <p className="text-base leading-relaxed mt-2">{list.State || list.state}</p>
      <p className="text-stone-500 inline-flex items-center mt-3">
        {list.Expertise}
      </p>
    </div>
  );
}
