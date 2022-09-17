import axios from "axios";
import React, { useEffect, useState } from "react";
import TopLawyersBox from "./TopLawyersBox";

export default function TopLawyers() {
  let [TopLawyers, setTopLawyer] = useState([]);

  let getTopLawyersData = async () => {
    try {
      let URL = "https://find-your-lawyer.herokuapp.com/api/topLawyers";
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
              <h1 className=" text-3xl lg:text-5xl font-bold underline title-font mb-2 text-amber-600 Crimson ">
                Our Top Lawyers
                <i class="bx bxs-to-top d-flex align-middle"></i>
              </h1>
            </div>
            <p className="lg:w-1/2 w-full text-slate-700 leading-relaxed dark:text-white Crimson">
              In India, the legal profession is not only known for attractive
              packages but it is known for legal reformations for the people of
              India. Whether making amendments for fast-track court trials for
              special cases, fighting for the rights of minority communities,
              or, crucial discussions in the passing of bills and acts, the
              contributions cannot be overlooked
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
