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
            <h1 className=" text-3xl lg:text-5xl font-bold underline title-font mb-2 text-[#e7aa40] Crimson lg:ml-2 ml-8 mt-12">
              Our Other Services
              <i className="bx bxs-book-content ms-3 d-flex align-middle"></i>
            </h1>
          </div>
          <p className="lg:w-1/2 w-full leading-relaxed text-gray-500 Crimson font-medium  lg:ml-0 ml-6 dark:text-white mt-12">
            Alongside our legal services, we provide a comprehensive experience.
            Our student-friendly environment offers access to an extensive
            collection of law books, including IPCs and CRPCs, catering to both
            students and legal enthusiasts.
            <br />
            Additionally, stay informed about recent legal developments through
            blogs written by our experienced professionals. These insightful
            pieces analyze changes in legislation and landmark court rulings,
            offering practical insights for all. We aim to empower our clients
            with the knowledge they need to navigate the legal landscape
            confidently.
          </p>
        </div>
        <section className="text-gray-600 body-font">
          <ServiceBox />
        </section>
      </div>
    </section>
  );
}
