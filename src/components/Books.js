import React, { useEffect, useState } from "react";
import BooksBox from "./BooksBox";
import axios from "axios";

export default function Books() {
  let [boooks, setBoooks] = useState([]);

  let BooksData = async () => {
    let URL = "https://find-your-lawyer.herokuapp.com/api/books";
    let response = await axios.get(URL);
    let { status, books } = response.data;

    try {
      if (status) {
        setBoooks([...books]);
      } else {
        alert("Not able to load books");
      }
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    BooksData();
  }, []);
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Free Pdf Law books and more
            </h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
              gentrify, subway tile poke farm-to-table.
            </p>
          </div>
          <div className="flex flex-wrap -m-4">
            {boooks.map((books) => {
              return <BooksBox books={books} key={books._id} />;
            })}
          </div>
        </div>
      </section>
    </>
  );
}
