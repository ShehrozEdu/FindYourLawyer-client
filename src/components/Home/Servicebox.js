import React from "react";
import { Link } from "react-router-dom";
export default function ServiceBox() {
  return (
    <>
      <div className="container rounded-lg shadow-md flex px-5 py-10 md:flex-row flex-col items-center bg-slate-200 dark:bg-gray-700">
        <div className="lg:max-w-lg lg:w-full md:w-1/3 w-5/4 lg:mr-16 mr-4">
          <img
            className="object-cover object-center rounded mb-2"
            alt="hero"
            src="/img/IndianLaw.jpg"
          />
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-5 md:mb-2 items-center text-center">
          <Link to="/services/ipc&crpcs">
            <h1 className="title-font sm:text-3xl text-4xl mb-4 font-bold text-amber-600 hover:text-amber-900 cursor-pointer ">
              IPC and CRPC
            </h1>
          </Link>
          <p className="mb-8 text-stone-600 text-xl leading-relaxed Crimson dark:text-white">
            Stay informed about the latest legal updates on our platform. Access
            downloadable materials on IPC and CRPC, essential for understanding
            the Indian legal system. Explore diverse law-related topics and read
            blogs by experienced professionals. Whether you're a student or a
            legal practitioner, our platform offers valuable resources to
            enhance your understanding and stay updated with the dynamic world
            of law.
          </p>
        </div>
      </div>

      <div className="container rounded-lg shadow-md flex px-5 py-10 md:flex-row flex-col items-center mt-3 bg-slate-200 dark:bg-gray-700">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-8 md:mb-2 items-center text-center">
          <Link to="/blogs">
            <h1 className="title-font sm:text-3xl text-4xl mb-4 font-bold  cursor-pointer text-amber-600 hover:text-amber-900">
              BLOGS
            </h1>
          </Link>
          <p className="mb-8 text-stone-600 text-xl leading-relaxed Crimson dark:text-white">
            Explore insightful blogs authored by our dedicated working
            professionals, providing in-depth analysis and commentary on recent
            legal updates. Stay informed about the latest developments in the
            legal field through their expertise and experience, available
            exclusively on our platform.
          </p>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/3 w-5/4 lg:mr-16 mr-4">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src="/img/Blog.jpg"
          />
        </div>
      </div>

      <div className="container rounded-lg shadow-md flex px-4 py-8 md:flex-row flex-col items-center mt-3 bg-slate-200 dark:bg-gray-700">
        <div className="lg:max-w-lg lg:w-full md:w-1/3 w-5/4 lg:mr-16 mr-4">
          <img
            className="object-cover object-center rounded mb-2"
            alt="hero"
            src="/img/Books.jpg"
          />
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-8 md:mb-2 items-center text-center">
          <Link to="/books">
            <h1 className="title-font sm:text-3xl text-4xl mb-4 font-bold text-amber-600 hover:text-amber-900 cursor-pointer uppercase">
            Legal Library
            </h1>
          </Link>
          <p className="mb-8 text-stone-600 text-xl leading-relaxed Crimson dark:text-white">
          Access valuable knowledge for free and keep yourself updated with the latest happenings in the legal realm! Stay informed about recent developments and trends through our platform, ensuring you're equipped with the most current information in the legal field.
          </p>
        </div>
      </div>
      {/* <div className="lg:w-1/3 sm:w-1/2 p-4 ">
        <Link to="#">
          <div className="flex relative">
            <img
              alt="Services"
              className="absolute inset-0 w-full h-full object-cover object-center"
              src={service.image}
            />
            <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-slate-300  opacity-0 hover:opacity-100">
              <h2 className="tracking-widest text-sm title-font font-medium text-stone-800 mb-1 underline decoration-pink-600">
                {service.title}
              </h2>
              <h1 className="title-font text-lg font-medium text-gray-500 mb-3">
                {service.subtitle}
              </h1>
              <p className="leading-relaxed">{service.description}</p>
            </div>
          </div> 
        </Link>
      </div> */}
    </>
  );
}
