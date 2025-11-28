import React from "react";

export default function BgImg() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Full Screen Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/img/img1.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start">

        {/* Main Floating Module */}
        <div className="w-full md:w-2/3 lg:w-1/2 bg-white/10 backdrop-blur-md border border-white/20 p-8 md:p-12 rounded-3xl shadow-2xl mb-8 transform transition-all hover:scale-[1.01]">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 Crimson leading-tight drop-shadow-lg">
            Receive top-notch <span className="text-[#e7aa40]">consultation</span>
          </h1>
          <p className="text-xl text-gray-100 mb-8 font-light tracking-wide">
            Address your concerns at an affordable rate with our expert legal team.
          </p>
          <button className="bg-[#e7aa40] hover:bg-[#d69930] text-white font-bold py-4 px-8 rounded-full transition-colors duration-300 text-lg shadow-lg">
            Find a Lawyer
          </button>
        </div>

        {/* Floating Info Cards Container */}
        <div className="flex flex-col md:flex-row gap-6 w-full md:w-auto">
          {/* Cost Card */}
          <div className="bg-black/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex items-center gap-4 shadow-xl hover:bg-black/70 transition-colors cursor-default">
            <div className="w-12 h-12 bg-[#e7aa40] rounded-full flex items-center justify-center text-2xl text-white">
              $
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Minimal Cost</h3>
              <p className="text-gray-300 text-sm">Premium service, affordable rates.</p>
            </div>
          </div>

          {/* Solutions Card */}
          <div className="bg-white/90 backdrop-blur-md border border-white/50 p-6 rounded-2xl flex items-center gap-4 shadow-xl hover:bg-white transition-colors cursor-default">
            <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-2xl">
              ⚖️
            </div>
            <div>
              <h3 className="text-gray-900 font-bold text-lg">Optimal Solutions</h3>
              <p className="text-gray-600 text-sm">Tailored legal strategies.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
