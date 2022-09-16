import React from "react";
import { Link } from "react-router-dom";
// import ArticleContent from "../components/Article-content";

function ArticleReuse({ articles }) {
  return (
    <>
      {articles.map((article, index) => (
        <div key={index} className="xl:w-1/3 md:w-1/2 p-4">
          <div className="bg-gray-100 p-6 rounded-lg">
            <Link to={`/article/${article.name}`}>
              <img
                className="h-40 rounded w-full object-cover object-center mb-6"
                src={article.thumbnail}
                alt="blog"
              />

              <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                {article.title}
              </h2>
            </Link>
            <p className="leading-relaxed text-base">
              {article.content[0].substring(0, 110)}....
            </p>
            <p className="leading-relaxed text-base mt-2">
              By: {article.author}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}

export default ArticleReuse;
