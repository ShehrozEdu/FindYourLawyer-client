import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsBox from "./NewsBox";

export default function NewsFeed() {
  let [news, setNews] = useState([]);

  let getNewsData = async () => {
    try {
      let URL = "https://find-your-lawyer.herokuapp.com/api/news";
      let response = await axios.get(URL);
      let { status, News } = response.data;
      if (status) {
        setNews([...News]);
      } else {
        alert("Not able to fetch News");
      }
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    getNewsData();
  }, []);
  return (
    <>
      <section className="text-gray-600 body-font color2 ">
        <div class="container px-5 py-17 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="text-3xl lg:text-5xl font-bold title-font mb-4  text-slate-600 underline  Crimson">
              <i class="bx bx-news d-flex align-middle mr-3 "></i>Latest News
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base ">
              Grab the top trending Legal News
            </p>
          </div>
          <div className="flex flex-wrap -mx-4 -my-8 py-10 mb-10">
            {news.map((newsItem) => {
              return <NewsBox newsItem={newsItem} key={newsItem._id} />;
            })}
          </div>
        </div>
      </section>
    </>
  );
}
