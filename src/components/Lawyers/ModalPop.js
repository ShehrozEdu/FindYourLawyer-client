import React from "react";

export default function Modal({ practice, lawyer }) {
  //   return (
  //     <>
  //       <button
  //         className=" text-black bg-pink-300 hover:bg-pink-500  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none flex mx-auto mt-3 ease-linear transition-all duration-150"
  //         type="button"
  //         onClick={() => setShowModal(true)}
  //       >
  //         Book your Lawyer
  //       </button>
  //       {showModal ? (
  //         <>
  //           <div className="justify-center practices-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
  //             <div className="relative w-auto my-6 mx-auto max-w-3xl">
  //               {/*content*/}
  //               <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
  //                 {/*header*/}
  //                 <div className="flex practices-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
  //                   <h3 className="text-3xl font-semibold">{practice.title}</h3>
  //                   <button
  //                     className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
  //                     onClick={() => setShowModal(false)}
  //                   >
  //                     <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
  //                       ×
  //                     </span>
  //                   </button>
  //                 </div>
  //                 {/*MODAL body*/}
  //                 <div className="relative p-6 flex-auto">
  //                   <section class="text-gray-600 body-font">
  //                     {lawyer.map((adv) => {
  //                       <div
  //                         class="container mx-auto flex px-5  md:flex-row flex-col items-center"
  //                         key={adv._id}
  //                       >
  //                         <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
  //                           <h1 class="title-font sm:text-2xl text-xl mb-4 font-medium text-gray-900">
  //                             {adv.name}
  //                           </h1>
  //                           <p class="mb-8 leading-relaxed">{adv.email}</p>
  //                           <p class="mb-8 leading-relaxed">{adv.state}</p>
  //                           <div class="flex justify-center">
  //                             <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
  //                               Button
  //                             </button>
  //                             <button class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
  //                               Button
  //                             </button>
  //                           </div>
  //                         </div>
  //                         <div class="lg:max-w-lg lg:w-32 md:w-32 w-32">
  //                           <img
  //                             class="object-cover object-center rounded"
  //                             alt="hero"
  //                             src={"img/" + adv.image}
  //                           />
  //                         </div>
  //                       </div>;
  //                     })}
  //                   </section>
  //                 </div>
  //                 {/*footer*/}
  //                 <div className="flex practices-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
  //                   <button
  //                     className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
  //                     type="button"
  //                     onClick={() => setShowModal(false)}
  //                   >
  //                     Close
  //                   </button>
  //                   <button
  //                     className="bg-emerald-500 text-black hover:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
  //                     type="button"
  //                     onClick={() => setShowModal(false)}
  //                   >
  //                     Save Changes
  //                   </button>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //           <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
  //         </>
  //       ) : null}
  //     </>
  //   );
}
