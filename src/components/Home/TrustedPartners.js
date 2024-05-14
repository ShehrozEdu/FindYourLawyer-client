import React from "react";

export default function TrustedPartners() {
  return (
    <>
      <section className="text-slate-800 body-font dark:bg-gray-800">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="text-3xl lg:text-5xl font-bold underline  title-font mb-4 text-[#e7aa40] Crimson">
              <i className="bx bxs-face d-flex align-middle me-3"></i> Our
              Partners
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base dark:text-white">
              We've forged partnerships with leading companies worldwide to
              ensure optimal results for your needs, and{" "}
              <strong>we're honored to have earned their trust.</strong> Our
              commitment to excellence is reflected in these collaborations,
              allowing us to provide top-notch solutions tailored to your
              requirements. Trust in our expertise and the strength of our
              partnerships for effective resolution of your issues.
            </p>
          </div>
          <div className="flex flex-wrap ">
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
              <div className="h-full flex items-center justify-center">
                <img
                  alt="team"
                  className="w-full object-contain object-center mb-4 rounded-lg shadow-md"
                  src="img/testimonials/FreeCompany.png"
                />
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
              <div className="h-full flex items-center justify-center">
                <img
                  alt="team"
                  className="w-full object-contain object-center mb-4 rounded-lg shadow-md"
                  src="img/testimonials/FreeCompany1.png"
                />
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
              <div className="h-full flex items-center justify-center">
                <img
                  alt="team"
                  className="w-full object-contain object-center mb-4 rounded-lg shadow-md"
                  src="img/testimonials/FreeCompany2.png"
                />
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
              <div className="h-full flex items-center justify-center">
                <img
                  alt="team"
                  className="w-full object-contain object-center mb-4 rounded-lg shadow-md"
                  src="img/testimonials/FreeCompany3.png"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
