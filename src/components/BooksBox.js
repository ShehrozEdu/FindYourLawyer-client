import React from "react";

export default function BooksBox(props) {
  let { books } = props;
  return (
    <>
      <div className="p-4 lg:w-1/2 sm: w-1/2">
        <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
          <img
            alt={`book-${books.title}`}
            className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-3"
            src={books.image}
          />
          <div className="flex-grow sm:pl-8">
            <h2 className="title-font font-medium text-sm  text-gray-900 ">
              {books.title}
            </h2>
            <h5 className="text-gray-500 mb-1 text-sm">{books.author}</h5>

            <span className="inline-flex">
              <a
                className="text-indigo-500 cursor-pointer text-sm"
                href={books.link}
                download
              >
                Click here to download
              </a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
