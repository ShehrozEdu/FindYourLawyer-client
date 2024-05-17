import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import axiosInstance from "../Auth/AxiosInstance";

// import ModalPop from "./ModalPop";

export default function PracticeOverview() {
  let [practice, setPractice] = useState([]);
  let [lawyer, setLawyer] = useState([]);
  let [showModal, setShowModal] = useState(false);
  // let [showDescModal, setShowDescModal] = useState(false);
  // let [descriptionText, setDescriptionText] = useState({});
  const params = useParams();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [caseDescription, setCaseDescription] = useState("");
  const [selectedLawyerId, setSelectedLawyerId] = useState(null);
  const [toggleSubmissionOfCase, setToggleSubmissionOfCase] = useState(false);
  const navigate = useNavigate();
  // Update selectedLawyerId when clicking on "Book" button
  const handleBookClick = (lawyerId) => {
    setSelectedLawyerId(lawyerId);
    // console.log(lawyerId)
  };
  //RAZORPAY
  const clientName = JSON.parse(localStorage.getItem("auth_token1"))?.FirstName;

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("auth_token1") !== null;

  let loadScript = async () => {
    const scriptElement = document.createElement("script");
    scriptElement.src = "https://checkout.razorpay.com/v1/checkout.js";
    scriptElement.onload = () => {
      return true;
    };
    scriptElement.onerror = () => {
      return false;
    };
    document.body.appendChild(scriptElement);
  };
  let makePayment = async (amount, name) => {
    let isLoaded = await loadScript();
    if (isLoaded === false) {
      alert("Unable load payment sdk");
      return false;
    }

    const clientEmail = JSON.parse(localStorage.getItem("auth_token1")).Email;
    let sendData = {
      amount: amount,
      email: clientEmail,
    };

    let { data } = await axiosInstance.post("/payment", sendData);
    let { order } = data;
    // console.log("data sent: ", sendData);

    var options = {
      key: "rzp_test_Gaer6wsOr2pz3k",
      amount: order.amount,
      currency: "INR",
      name: "FindYourLawyer",
      description: "Cheap and the best!",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Balanced_scale_of_Justice.svg/2560px-Balanced_scale_of_Justice.svg.png",
      order_id: order.id,
      handler: async function (response) {
        let sendData = {
          payment_id: response.razorpay_payment_id,
          order_id: response.razorpay_order_id,
          signature: response.razorpay_signature,
        };

        let { data } = await axiosInstance.post("/callback", sendData);
        if (data.status === true) {
          Swal.fire({
            icon: "success",
            title: "Payment Successful",
          }).then(() => {
            setDialogOpen(true);
          });
        } else {
          alert("Payment fails, try again.");
        }
      },
      prefill: {
        name: name,
        email: clientEmail,
        contact: "9876543215",
      },
    };
    // console.log("order", order);
    // console.log("order.amount", order.amount);
    var paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  //--------------------------
  //RP ENDS
  //--------------------------

  let getPracticeID = async () => {
    try {
      let response = await axiosInstance.get("/getpracticebyid/" + params.id);

      let { status, Practice } = response.data;

      // console.log(result);
      if (status === true) {
        setPractice({ ...Practice });
      } else {
        setPractice([]);
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };
  useEffect(() => {
    getPracticeID();
  }, []);
  let getLawyerData = async (expertise) => {
    try {
      let response = await axiosInstance.get(
        `/lawyersListExpertise?expertise=${expertise}`
      );
      let { status, lawyers } = response.data;
      if (status) {
        setLawyer(lawyers);
        // console.log(lawyers)
      } else {
        alert("Sorry, can't find any lawyers.");
      }
    } catch (error) {
      console.log("Error fetching lawyers data: " + error);
    }
  };

  useEffect(() => {
    getLawyerData();
    // console.log(getLawyerData);
  }, []);
  useEffect(() => {
    if (practice && practice.title) {
      getLawyerData(practice.title);
    }
  }, [practice]);

  // console.log(parsedClientId._id);

  //HandleSubmit:

  const handleSubmit = async () => {
    try {
      // Check if the user is logged in
      if (!isLoggedIn) {
        Swal.fire({
          text: "You need to be logged in to submit a case request.",
        });
        return;
      }

      // Get client ID from local storage
      const clientData = localStorage.getItem("auth_token1");
      const clientId = clientData ? JSON.parse(clientData)._id : null;

      // Validate that a lawyer is selected
      if (!selectedLawyerId) {
        Swal.fire({
          text: "No lawyer selected",
        });
        return;
      }

      // Validate that the case description is provided
      if (!caseDescription) {
        Swal.fire({
          text: "Case description cannot be empty",
        });
        return;
      }

      // Log all variables to debug
      // console.log("Client ID:", clientId);
      // console.log("Selected Lawyer ID:", selectedLawyerId);
      // console.log("Case Description:", caseDescription);
      // console.log("Client Name:", clientName);

      // Create a payload object
      const payload = {
        client: clientId,
        lawyerId: selectedLawyerId,
        description: caseDescription,
        clientName: clientName,
      };

      // Make the API call to submit the case request
      const response = await axiosInstance.post(
        "/case-requests/create",
        payload
      );

      // Handle successful submission
      console.log("Case request submitted successfully");
      Swal.fire("Case request submitted successfully");
      setCaseDescription("");
      setDialogOpen(false);
      if (response.status === 201) {
        navigate("/");
      }
    } catch (error) {
      // Handle errors during the submission process
      console.error("Error submitting case request:", error);
      Swal.fire({
        text: "An error occurred while submitting the case request.",
      });
    }
  };

  const idOfLawyer = JSON.parse(localStorage?.getItem("auth_token1"))?._id;
  return (
    <>
      <section className="text-gray-600 body-font  dark:bg-gray-800">
        <div className="container px-5 py-5 mx-auto flex flex-col">
          <div className="lg:w-4/6 mx-auto">
            <div className="rounded-lg h-100 overflow-hidden">
              <img
                alt="content"
                className="object-cover object-center heightOverview w-full"
                src={practice.image}
              />
            </div>
            <div className="flex flex-col sm:flex-row mt-10">
              <div className="sm:w-4/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <h2 className="text-2xl font-extrabold text-gradient bg-gradient-to-r from-amber-600 to-red-500 bg-clip-text text-transparent mb-3 dark:text-white">
                  {practice.title}
                </h2>
                <p className="leading-relaxed text-lg mb-4 dark:text-white text-gradient bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  {practice.description}
                </p>

                <div className="flex justify-center">
                  {/* Ensure the parent container is centered */}
                  {/* // Example of conditional rendering for the "Book" button */}
                  {isLoggedIn ? (
                    // Content for authenticated user
                    <div className="flex justify-center">
                      <button
                        className="gradient-button text-black font-semibold text-sm uppercase px-8 py-3 rounded-md shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out mx-auto"
                        type="button"
                        onClick={() => setShowModal(true)}
                      >
                        Book a Lawyer Now
                      </button>
                    </div>
                  ) : (
                    // Content for unauthenticated user
                    <Button
                      className="text-red-500"
                      onClick={() => navigate("/signup")}
                    >
                      Please log in to book a lawyer.
                    </Button>
                  )}
                </div>

                {/* --------------------------------------------------------------------------------- */}
                {/* <MODAL STARTS> */}
                {/* --------------------------------------------------------------------------------- */}
                {showModal ? (
                  <>
                    <div className="justify-center practices-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-slate-300 dark:bg-gray-600">
                      <div className="relative w-auto my-6 mx-auto max-w-3xl ">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none dark:bg-gray-700">
                          {/* -------------------- */}
                          {/*header*/}
                          {/* ------------------------------------- */}
                          <div className="flex practices-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold dark:text-white">
                              {practice.title}
                            </h3>
                          </div>
                          {/*MODAL body*/}
                          {lawyer.length > 0 ? (
                            lawyer.filter(
                              (lawyer) => lawyer?._id !== idOfLawyer
                            ).length > 0 ? (
                              lawyer
                                .filter((lawyer) => lawyer?._id !== idOfLawyer)
                                .map((lawyer, index) => {
                                  return (
                                    <div
                                      className="relative p-6 flex-auto"
                                      key={index}
                                    >
                                      <section className="text-gray-600 body-font">
                                        <div className="container mx-auto flex px-5 md:flex-row flex-col items-center">
                                          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                                            <h3 className="font-semibold text-xl sm:text-2xl mb-2 text-gray-900 dark:text-white">
                                              {lawyer.FirstName}{" "}
                                              {lawyer.LastName}
                                            </h3>
                                            <span className="leading-relaxed mb-2 text-gray-900 dark:text-white">
                                              <b>Location: </b> {lawyer.State},
                                              India
                                            </span>
                                            <p className="leading-relaxed mb-2 text-gray-900 dark:text-white">
                                              <b>Email: </b> {lawyer.Email}
                                            </p>
                                           
                                            <span className="leading-relaxed mb-2 text-gray-900 dark:text-white">
                                              <b>Consultation Fee: </b>{" "}
                                              {lawyer.FeePerCase} INR
                                            </span>
                                            <div className="flex justify-center">
                                              <button
                                                className="inline-flex py-2 px-6 text-lg text-white bg-amber-500 hover:bg-amber-600 border-0 rounded focus:outline-none"
                                                onClick={() => {
                                                  handleBookClick(lawyer._id);
                                                  makePayment(
                                                    lawyer.FeePerCase,
                                                    clientName
                                                  );
                                                }}
                                              >
                                                Book
                                              </button>
                                            </div>
                                          </div>
                                          <div className="lg:max-w-lg lg:w-44 md:w-44 w-44 ml-6">
                                            <img
                                              className="object-cover object-center rounded"
                                              alt="hero"
                                              src="/img/avatar/1.jpg"
                                            />
                                          </div>
                                        </div>
                                      </section>
                                    </div>
                                  );
                                })
                            ) : (
                              <div className="p-12">
                                No Lawyers found in this section
                              </div>
                            )
                          ) : (
                            <div className="p-12">
                              No Lawyers found in this section
                            </div>
                          )}

                          {/*footer*/}
                          <div className="flex practices-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => setShowModal(false)}
                            >
                              Close
                            </button>
                          </div>
                          <Dialog
                            open={dialogOpen}
                            className="dark:bg-gray-500"
                            size="sm"
                            onClose={() => setDialogOpen(false)}
                          >
                            <DialogHeader className="text-lg dark:text-white">
                              Give a description
                            </DialogHeader>
                            <DialogBody>
                              <div className="dark:bg-gray-500 dark:text-white p-5">
                                <h2 className="text-md font-semibold mb-4">
                                  Submit Case
                                </h2>
                                <textarea
                                  rows="4"
                                  cols="50"
                                  className="dark:bg-gray-300 dark:text-black"
                                  value={caseDescription}
                                  onChange={(e) =>
                                    setCaseDescription(e.target.value)
                                  }
                                  placeholder="Enter case description"
                                ></textarea>
                              </div>
                            </DialogBody>
                            <DialogFooter>
                              <Button
                                variant="text"
                                color="red"
                                onClick={() => setDialogOpen(false)}
                              >
                                Cancel
                              </Button>
                              <Button
                                // variant="gradient"
                                // color="green"
                                className="text-blue-200 bg-[#2d31aca7] hover:bg-[#2d31acdd]"
                                onClick={() => handleSubmit()}
                              >
                                Confirm
                              </Button>
                            </DialogFooter>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
