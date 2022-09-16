import React from "react";
import BgImg from "./BgImg";
import TrustedPartners from "./TrustedPartners";
import Services from "./Services";
import Testimonials from "./Testimonials";
import ContactUs from "./ContactUs";
import Footer from "./Footer";
import TopLawyers from "./TopLawyers";
import NewsExtra from "./NewsExtra";

function HomeScreen() {
  return (
    <>
      <BgImg />
      <TopLawyers />
      <NewsExtra />
      <Services />
      <TrustedPartners />
      <Testimonials />
      <ContactUs />
      <Footer />
    </>
  );
}
export default HomeScreen;
