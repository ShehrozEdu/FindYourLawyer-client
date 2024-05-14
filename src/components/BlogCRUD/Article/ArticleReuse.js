import React from "react";
import { Link } from "react-router-dom";

function ArticleReuse({ articles }) {
  const randomLawImage = (article) => {
    const seed = `${article._id}_${article.title}`; // Combine article ID and creation date
    return `https://source.unsplash.com/400x300/?law,&${seed}`;
  };

  return (
    <>
      {articles.map((article, index) => (
        <div key={index} className="xl:w-1/3 md:w-1/2 p-4 ">
          <div className="bg-gray-100 p-6 rounded-lg h-full shadow-md dark:bg-gray-500">
            <Link to={`/blog/${article._id}`}>
              <img
                className="h-40 rounded w-full object-cover object-center mb-6"
                src={randomLawImage(article)}
                alt="Law"
              />

              <h2 className="text-lg text-gray-900 dark:text-white font-bold title-font mb-4">
                {article.title}
              </h2>
            </Link>
            <div className="h-20 overflow-hidden">
              <p className="leading-relaxed dark:text-white">
                {article.content.substring(0, 100)}
                {article.content.length > 100 ? "..." : ""}
              </p>
            </div>
            <p className="leading-relaxed text-base mt-2 dark:text-white">
              By: <strong> {article?.lawyerId?.FirstName || "Author"}</strong>
            </p>
          </div>
        </div>
      ))}
    </>
  );
}

export default ArticleReuse;
