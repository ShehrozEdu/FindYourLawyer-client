import React from "react";

export default function BooksBox(props) {
  let { books } = props;
  return (
    <>
      <div class="p-4 lg:w-1/2">
        <div class="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
          <img
            alt="team"
            class="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
            src={books.image}
          />
          <div class="flex-grow sm:pl-8">
            <h2 class="title-font font-medium text-lg text-gray-900">
              {books.title}
            </h2>
            <h3 class="text-gray-500 mb-3">{books.author}</h3>
            <p class="mb-4">{books.title}</p>
            <span class="inline-flex">
              <a
                class="text-indigo-500 cursor-pointer"
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
