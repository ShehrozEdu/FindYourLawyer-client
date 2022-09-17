import React from "react";

export default function TrustedPartners() {
  return (
    <>
      <section className="text-slate-800 body-font dark:bg-gray-800">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="text-3xl lg:text-5xl font-bold underline  title-font mb-4 text-amber-600 Crimson">
              <i class="bx bxs-face d-flex align-middle me-3"></i> Our Partners
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base dark:text-white">
              We have partnered with Top companies around the globe to give you
              the best results for your issues and{" "}
              <strong>we are proud to have their trust in us.</strong>
            </p>
          </div>
          <div className="flex flex-wrap -m-4 dark:bg-gray-600 ">
            <div
              className="p-4 lg:w-1/4 md:w-1/2 .
            02`"
            >
              <div className="h-full flex flex-col items-center text-center">
                <img
                  alt="team"
                  className="flex-shrink-0 rounded-lg w-50 h-56 object-cover object-center mb-4 mt-1 "
                  src="img/tata.png"
                />
              </div>
            </div>
            <div className="p-14 lg:w-1/4 md:w-1/2">
              <div className="h-full flex flex-col items-center text-center">
                <img
                  alt="team"
                  className="flex-shrink-0 rounded-lg w-40 h-30 object-cover object-center mb-4 mt-1 lg:ml-0 ml-8"
                  src="img/amazon.png"
                />
              </div>
            </div>
            <div className="lg:p-16 lg:w-1/4 md:w-1/2 p-28">
              <div className="h-full flex flex-col items-center text-center">
                <img
                  alt="team"
                  className="flex-shrink-0 rounded-lg w-50 h-40 object-cover object-center  mb-4 mt-1 lg:ml-0 ml-2"
                  src="img/tesla.png"
                />
              </div>
            </div>
            <div className="lg:p-24 p-28 lg:w-1/4 md:w-1/2 ">
              <div className=" flex flex-col items-center text-center">
                <img
                  alt="team"
                  className="flex-shrink-0 rounded-lgw-full h-34 object-cover object-center mb-4 ml-2 mt-0 mr-3 icici"
                  src="img/icici.png"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
