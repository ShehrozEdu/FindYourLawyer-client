import React from "react";

export default function TopLawyersBox({ lawyers }) {
  return (
    <>
      <div className="xl:w-1/4 md:w-1/2 p-4 ">
        <div className="bg-gray-100 p-6 rounded-lg dark:bg-gray-400 d-flex flex-col">
          <img
            className="h-40 rounded lg:w-full object-cover object-center mb-6 w-75"
            src={lawyers.image}
            alt="content"
          />

          <h2 className="text-lg text-amber-900 font-extrabold Crimson title-font mb-4 ">
            {lawyers.name}
          </h2>
          <p className="leading-relaxed text-base">{lawyers.description}</p>
        </div>
      </div>
    </>
  );
}
