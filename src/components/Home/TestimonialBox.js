import React from "react";

export default function TestimonialBox({ test }) {
  return (
    <>
      <div className="lg:w-1/3 lg:mb-0 mb-6 p-4 bg-gray-100 dark:bg-gray-700  ">
        <div className="h-full text-center">
          <img
            alt="testimonial"
            className="w-16 h-20 mb-8  object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
            src={test.image}
          />
          <p className="leading-relaxed text-stone-600 dark:text-white">
            {test.description}
          </p>

          <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4 "></span>
          <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm dark:text-white">
            {test.name}
          </h2>
          <p className="text-gray-900 dark:text-white">{test.position}</p>
        </div>
      </div>
    </>
  );
}
