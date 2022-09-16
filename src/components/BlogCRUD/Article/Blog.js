import React from "react";
import ArticleContent from "./Article-content";

import ArticleReuse from "./ArticleReuse";

export default function Blog() {
  return (
    <>
      <div class="flex">
        <main class="flex-1">
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-wrap w-full mb-20">
                <div className="lg:w-1/2 w-full mb-6 lg:mb-0 ">
                  <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                    Welcome to the blogs!
                  </h1>
                  <div className="h-1 w-72  bg-indigo-500 rounded"></div>
                </div>
                <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
                  Explore the best blogs written by our working professionals in
                  their expertise! <br />
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Veritatis aperiam error deleniti temporibus autem corporis
                  placeat ea perferendis, iusto asperiores perspiciatis quod
                  voluptatem at, quasi libero nemo, est fuga harum?
                </p>
              </div>
              <div className="flex flex-wrap -m-4">
                <ArticleReuse articles={ArticleContent} />
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
