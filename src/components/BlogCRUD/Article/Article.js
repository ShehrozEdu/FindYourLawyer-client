import React from "react";
import { useParams } from "react-router";
import articleContent from "./Article-content";

//components
import ArticleReuse from "./ArticleReuse";
import Error from "../../Error";

export default function Article() {
  const { name } = useParams();
  const article = articleContent.find((article) => article.name === name);
  if (!article) return <Error />;
  const otherArticles = articleContent.filter(
    (article) => article.name !== name
  );
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
            <h2 className="text-gray-900 font-medium title-font tracking-wider lg:text-3xl text-xl">
              {article.title}
            </h2>

            <span className="inline-block h-1 w-20 rounded bg-indigo-500 mt-8 mb-6"></span>
            <div className="leading-relaxed text-lg">
              {article.content.map((para, key) => (
                <p key={key}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
      <h1 className="text-3xl text-center mb-10"> Other Articles</h1>
      <div className="flex flex-wrap">
        <ArticleReuse articles={otherArticles} />
      </div>
    </>
  );
}
