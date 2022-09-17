import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import LawyersListBox from "./LawyerListBox";

export default function LawyersList() {
  let [lawyersList, setLawyersList] = useState([]);
  let [sortLawyers, setSortLawyers] = useState([]);
  const params = useParams();
  let getLawyerData = async () => {
    let URL = "https://find-your-lawyer.herokuapp.com/api/lawyersList/?lid=" + params.id;

    try {
      let response = await axios.get(URL);
      let { status, LawyersList } = response.data;
      // console.log(response.data);
      if (status) {
        setLawyersList([...LawyersList]);
      } else {
        alert("Sorry,can't find any menu for this");
      }
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    getLawyerData();
  }, []);
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          {/* <!-- SearchComponent --> */}
          <div className="max-w-md mx-auto my-7 ">
            <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-slate-200 overflow-hidden">
              <div className="grid place-items-center h-full w-12 text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <input
                className="peer h-full w-full outline-none text-sm bg-slate-200 text-gray-700 pr-2"
                type="text"
                id="search"
                placeholder="Search by city"
                onChange={(event) => {
                  setSortLawyers(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
            {lawyersList
              .filter((list) => {
                if (sortLawyers === "") {
                  return list;
                } else if (
                  list.state
                    .toLowerCase()
                    .includes(sortLawyers.toString().toLowerCase())
                ) {
                  return list;
                }
              })
              .map((list) => {
                return <LawyersListBox list={list} key={list._id} />;
              })}
          </div>
        </div>
      </section>
    </>
  );
}
