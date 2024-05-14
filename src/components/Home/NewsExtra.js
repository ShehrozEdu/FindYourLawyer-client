import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import axios from "axios";

export default function NewsExtra() {
  const [newsData, setNewsData] = useState([]);
  const [lawNewsData, setLawNewsData] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/top-headlines?country=in&apiKey=652fa10187a3419f9fb3404bd40b2046"
        );
        if (response.data.articles) {
          setNewsData(response.data.articles.slice(0, 6));
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const fetchLawNews = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/top-headlines?q=law&country=us&apiKey=652fa10187a3419f9fb3404bd40b2046"
        );
        if (response.data.articles) {
          setLawNewsData(response.data.articles.slice(0, 4));
        }
      } catch (error) {
        console.error("Error fetching law news:", error);
      }
    };

    fetchLawNews();
  }, []);

  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
      });
    }
  }, [controls, inView]);
  return (
    <>
      <section className="px-5 dark:bg-gray-800 dark:text-gray-100 py-6 w-full">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="text-3xl lg:text-5xl font-bold title-font mb-4 text-[#e7aa40] underline Crimson dark:text-amber-800">
            <i className="bx bx-news d-flex align-middle mr-3"></i>Latest News
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Grab the top trending
            <span className="text-[#e7aa40]"> Legal News</span>
          </p>
        </div>
        <div className="container-fluid mx-16 ">
          <div className="flex justify-between gap-36">
            <div className="flex flex-col">
              <div className="mb-8 space-x-5 border-b-2 border-opacity-10 dark:border-violet-400">
                <motion.button
                  ref={ref}
                  initial={{ opacity: 0, y: -20 }}
                  animate={controls}
                  transition={{ ease: "easeIn", duration: 0.5 }}
                  type="button"
                  className="pb-5 text-xs font-bold uppercase border-b-2 text-amber-500 dark:border-violet-400"
                >
                  Exclusive
                </motion.button>
              </div>
              {newsData.map((article, index) => (
                <motion.div
                  ref={ref}
                  initial={{ opacity: 0, y: -20 }}
                  animate={controls}
                  transition={{
                    ease: "easeIn",
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  className="flex flex-col space-y-2"
                  key={index}
                >
                  <div className="flex flex-col space-y-2 mb-5" key={index}>
                    <a
                      rel="noopener noreferrer"
                      href={article.url}
                      className="font-serif hover:underline"
                      target="_blank"
                    >
                      {article.title}
                    </a>
                    <p className="text-xs dark:text-gray-400">
                      {new Date(article.publishedAt).toLocaleString()} by
                      <a
                        rel="noopener noreferrer"
                        href="#"
                        className="hover:underline dark:text-violet-400"
                      >
                        &nbsp; {article.author}
                      </a>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="relative flex col-span-12 bg-center newsBack bg-no-repeat bg-cover dark:bg-gray-500 xl:col-span-6 lg:col-span-5 md:col-span-9 min-h-full w-full">
              <span className="absolute px-1 pb-2 text-xs font-bold uppercase border-b-2 left-20 top-14 dark:border-violet-400 dark:text-gray-100">
                Law, Legal
              </span>
              <a className="flex flex-col items-center justify-end p-14 text-center sm:p-8 group dark:via-transparent flex-grow-1 bg-gradient-to-b dark:from-gray-900 dark:to-gray-900">
                <span className="flex items-center mb-12 space-x-2 dark:text-violet-400">
                  <span className="relative flex-shrink-0 w-2 h-2 rounded-full dark:bg-violet-400">
                    <span className="absolute flex-shrink-0 w-3 h-3 rounded-full -left-1 -top-1 animate-ping dark:bg-violet-400"></span>
                  </span>
                </span>
                <a
                  rel="noopener noreferrer"
                  href="https://www.livelaw.in/top-stories/supreme-court-dowry-death-section-304b-ipc-dowry-prohibition-act-rigorous-imprisonment-206901"
                  target="_blank"
                  className="font-serif mx-4 lg:text-sm font-semibold group-hover:underline dark:text-gray-100 cursor-pointer text-black hover:bg-purple-100"
                >
                  Legislative Intent Of Incorporating IPC Section 304-B Was To
                  Curb The Menace Of Dowry Death With A Firm Hand: Supreme Court
                </a>
              </a>
            </div>
            <div className="hidden py-2 xl:col-span-3 lg:col-span-4 md:hidden lg:block">
              <div className="mb-8 space-x-5 border-b-2 border-opacity-10 dark:border-violet-400">
                <motion.button
                  ref={ref}
                  initial={{ opacity: 0, y: -20 }}
                  animate={controls}
                  transition={{ ease: "easeIn", duration: 0.5 }}
                  type="button"
                  className="pb-5 text-xs font-bold uppercase border-b-2 text-amber-500 dark:border-violet-400"
                >
                  Law News
                </motion.button>
              </div>
              <div className="flex flex-col divide-y divide-gray-700">
                {lawNewsData.map((article, index) => (
                  <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: -20 }}
                    animate={controls}
                    transition={{
                      ease: "easeIn",
                      duration: 0.5,
                      delay: index * 0.1,
                    }}
                    className="flex px-1 py-4"
                    key={index}
                  >
                    <div className="flex px-1 py-4" key={index}>
                      <img
                        alt=""
                        className="flex-shrink-0 w-20 h-20 mr-4 dark:bg-gray-500 "
                        src={article.urlToImage || "/default-image.jpg"}
                      />
                      <div className="flex flex-col flex-grow">
                        <a
                          rel="noopener noreferrer"
                          href={article.url}
                          target="_blank"
                          className="font-serif hover:underline"
                        >
                          {article.title}
                        </a>
                        <p className="mt-auto text-xs dark:text-gray-400">
                          {new Date(article.publishedAt).toLocaleString()} ago
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
