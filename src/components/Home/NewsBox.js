import React from "react";

export default function NewsBox({ newsItem }) {
  return (
    <>
      <div className="py-8 px-4 lg:w-1/3 ">
        <div className="h-full flex items-start  ">
          <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
            <span className="text-gray-500 pb-2 mb-2 border-b-2 border-gray-200">
              Aug
            </span>
            <span className="font-medium text-lg text-gray-800 title-font leading-none">
              12
            </span>
          </div>
          <div className="flex-grow pl-6">
            <h2 className="tracking-widest text-xs title-font font-medium text-indigo-500 mb-1">
              {newsItem.title}
            </h2>
            <h1 className="title-font text-xl font-medium text-gray-900 mb-3">
              {newsItem.description}
            </h1>
            <a
              className="leading-relaxed mb-5"
              href={newsItem.link}
              target="_blank"
            >
              {newsItem.link.slice(0, 43)}
            </a>
            <a className="inline-flex items-center">
              <span className="flex-grow flex flex-col pl-3">
                <span className="title-font font-medium text-gray-900 ">
                  - <strong> {newsItem.author} </strong>
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
