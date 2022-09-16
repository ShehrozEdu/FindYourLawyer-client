import React from "react";
import { Link } from "react-router-dom";

export default function LawyerListBox({ list }) {
  // let NavigateLink = () => {
  //   let navigate = useNavigate();
  //   navigate("/bookyourlawyer");
  // };
  return (
    <>
      {" "}
      <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
        <div className="rounded-lg h-64 overflow-hidden">
          <img
            alt="content"
            className="object-cover object-center h-full w-50"
            src={"/img" + list.image}
          />
        </div>
        <Link to="/bookyourlawyer" className="cursor-pointer">
          <h2
            className="text-xl font-medium title-font text-gray-900 mt-5 cursor-pointer"
            // onClick={NavigateLink}
          >
            {list.name}
          </h2>
        </Link>
        <p className="text-base leading-relaxed mt-2">{list.state}</p>
        <a className="text-stone-500 inline-flex items-center mt-3">
          {list.practice}
          {/* <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg> */}
        </a>
      </div>
    </>
  );
}
