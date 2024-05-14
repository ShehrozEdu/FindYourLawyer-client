import axios from "axios";
import React, { useEffect, useState } from "react";
import TopLawyersBox from "./TopLawyersBox";

export default function TopLawyers() {
  let [TopLawyers, setTopLawyer] = useState([]);

  let getTopLawyersData = async () => {
    try {
      let URL = "http://localhost:5000/api/topLawyers";
      let response = await axios.get(URL);
      let { status, TopLawyers } = response.data;
      if (status) {
        setTopLawyer([...TopLawyers]);
      } else {
        alert("Not able to fetch lawyers");
      }
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    getTopLawyersData();
  }, []);
  return (
    <>
      <section className="text-gray-600 body-font dark:bg-gray-800 ">
        <div className="container px-4 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className=" text-3xl lg:text-5xl font-bold underline title-font mb-2 text-[#e7aa40] Crimson ">
                Our Top Lawyers
                <i className="bx bxs-to-top d-flex align-middle"></i>
              </h1>
            </div>
            <p className="lg:w-1/2 w-full text-slate-700 leading-relaxed dark:text-white Crimson">
              In India, being a lawyer isn't just about impressive paychecks;
              it's about being a catalyst for positive change in the lives of
              the people. Whether pushing for speedy trials in special cases,
              standing up for the rights of minority communities, or actively
              participating in the discussions that shape our laws, the impact
              of legal professionals goes beyond the courtroom. Their efforts
              are like threads weaving through the fabric of our society,
              working towards a fairer and more just India.
            </p>
          </div>
          <div className="flex flex-wrap -m-4 ">
            {TopLawyers.map((lawyers) => {
              return <TopLawyersBox lawyers={lawyers} key={lawyers._id} />;
            })}
          </div>
        </div>
      </section>
      <section></section>
    </>
  );
}
