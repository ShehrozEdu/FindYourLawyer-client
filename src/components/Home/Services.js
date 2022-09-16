import React from "react";
import ServiceBox from "./Servicebox";
export default function Services() {
  return (
    <section
      className="text-gray-600 body-font color2 dark:bg-gray-800"
      id="services"
    >
      <div className="container px-5 py-17 mx-auto">
        <div className="flex flex-wrap w-full mb-20">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className=" text-3xl lg:text-5xl font-bold underline title-font mb-2 text-amber-600 Crimson lg:ml-2 ml-8 mt-12">
              Our Other Services
              <i class="bx bxs-book-content ms-3 d-flex align-middle"></i>
            </h1>
          </div>
          <p className="lg:w-1/2 w-full leading-relaxed text-gray-500 Crimson font-medium  lg:ml-0 ml-6 dark:text-white mt-12">
            Along with our lawyers booking, we offer student friendly
            environment where one can get books related to law, IPCs & CRPCs and
            Read Blogs by our working professionals
          </p>
        </div>
        <section className="text-gray-600 body-font">
          <ServiceBox />
        </section>
      </div>
    </section>
  );
}
