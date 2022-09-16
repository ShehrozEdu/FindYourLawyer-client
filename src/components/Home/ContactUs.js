import React, { useState } from "react";

import ContactUsForm from "./ContactUsForm";

export default function ContactUs() {
  return (
    <>
      <div className="flex flex-col text-center w-full mb-10 " id="contact ">
        <h1 className="text-3xl lg:text-5xl font-medium title-font mb-4 text-amber-600 mt-8 underline  Crimson">
          <i class="bx bxs-contact d-flex align-middle me-3 text-emerald-800 "></i>{" "}
          Contact US
        </h1>
      </div>

      <section className="text-gray-600 body-font relative">
        <div className="absolute inset-0 bg-gray-300">
          <iframe
            width="100%"
            height="730"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Jammu+()&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            className="iframe"
          ></iframe>
        </div>
        <ContactUsForm />
      </section>
    </>
  );
}
