import React from "react";

export default function IPC() {
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <img
            className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
            alt="hero"
            src="/img/IPC.jpg"
          />
          <div className="text-center lg:w-2/3 w-full">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Download the IPC and CRPC to know more about LAW and Order
            </h1>

            <div className="flex justify-center">
              <a
                className="inline-flex text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded text-lg"
                href="/IPCs.pdf"
                download
              >
                Download IPC
              </a>
              <a
                className="ml-4 inline-flex text-gray-700 bg-gray-400 border-0 py-2 px-6 focus:outline-none hover:bg-gray-500 rounded text-lg"
                href="/CRPCs.pdf"
                download
              >
                Download CRPC
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
