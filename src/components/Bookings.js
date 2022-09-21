import React, { useEffect, useState } from "react";
import axios from "axios";
import BookingsBox from "./BookingsBox";
import LoadingSkeleton from "./utils/LoadingSkelton";

export default function Bookings() {
  let [booking, setBooking] = useState([]);
  let [sort, setSort] = useState("");
  let [isLoading, setIsLoading] = useState(true);

  let BookingsData = async () => {
    let URL = "https://find-your-lawyer.herokuapp.com/api/practices";
    let response = await axios.get(URL);
    let { status, Practice } = response.data;
    // console.log(response.data);

    try {
      if (status) {
        setBooking([...Practice]);
        setIsLoading(false);
      } else {
        alert("Please Enter Valid Choice");
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    BookingsData();
  }, []);
  return (
    <>
      <section className="text-gray-600 body-font dark:bg-gray-800">
        <div className="container px-5 py-10 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-4xl text-3xl font-bold title-font mb-4 text-amber-600 underline Crimson">
              Book according to the need!
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base dark:text-white">
              We Promise you the best and at cheaper price!
            </p>
          </div>
          {/* <!-- SearchComponent --> */}
          <div className="max-w-md mx-auto my-7 ">
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
                className="peer h-full w-full outline-none border-0 text-sm bg-slate-200 text-gray-700 pr-2"
                type="text"
                id="search"
                placeholder="Search by practice"
                // ref={PracticeRef}
                onChange={(event) => {
                  setSort(event.target.value);
                }}
              />
            </div>
          </div>

          {/* //Mapping */}
          {isLoading ? (
            <div className="flex flex-wrap -m-4">
              <LoadingSkeleton />
            </div>
          ) : (
            <div className="flex flex-wrap -m-4">
              {booking
                .filter((book) => {
                  if (sort === "") {
                    return book;
                  } else if (
                    book.title.toLowerCase().includes(sort.toLowerCase())
                  ) {
                    return book;
                  }
                })
                .map((book) => {
                  return (
                    <BookingsBox
                      book={book}
                      key={book._id}
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                      // lawyersList={lawyersList}
                    />
                  );
                })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
