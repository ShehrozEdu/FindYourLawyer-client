import React from "react";

export default function NewsExtra() {
  return (
    <>
      <section className="px-5  dark:bg-gray-800 dark:text-gray-100 py-6 ">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="text-3xl lg:text-5xl font-bold title-font mb-4  text-amber-600 underline  Crimson dark:text-amber-800">
            <i class="bx bx-news d-flex align-middle mr-3 "></i>Latest News
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base ">
            Grab the top trending{" "}
            <span className="text-amber-600"> Legal News</span>
          </p>
        </div>
        <div className="container grid grid-cols-12 mx-auto gap-y-6 md:gap-10">
          <div className="flex flex-col justify-between col-span-12 py-2 space-y-8 md:space-y-16 md:col-span-3">
            <div className="flex flex-col space-y-8 md:space-y-12">
              <div className="flex flex-col space-y-2">
                <h3 className="flex items-center space-x-2 dark:text-gray-400">
                  <span className="flex-shrink-0 w-2 h-2 uppercase rounded-full dark:bg-violet-400"></span>
                  <span className="text-xs font-bold tracking-wider uppercase text-amber-400">
                    Exclusive
                  </span>
                </h3>
                <a
                  rel="noopener noreferrer"
                  href="https://www.sentinelassam.com/national-news/nitish-kumar-allies-question-liquor-ban-rjd-targets-bjp-for-weakening-jdu-605251"
                  className="font-serif hover:underline"
                >
                  Nitish Kumar allies question liquor ban, RJD targets BJP for
                  weakening JD(U)
                </a>
                <p className="text-xs dark:text-gray-400">
                  47 minutes ago by
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    className="hover:underline dark:text-violet-400"
                  >
                    &nbsp; Rahul Sharma
                  </a>
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="flex items-center space-x-2 dark:text-gray-400">
                  <span className="flex-shrink-0 w-2 h-2 uppercase rounded-full dark:bg-violet-400"></span>
                  <span className="text-xs font-bold tracking-wider uppercase text-amber-400">
                    Exclusive
                  </span>
                </h3>
                <a
                  rel="noopener noreferrer"
                  href="https://www.thehindu.com/news/international/cardinal-ranjith-says-perpetrators-of-2019-easter-sunday-attacks-still-engaged-in-politics-employed-with-sri-lanka-police-forces/article65710056.ece"
                  target="_blank"
                  className="font-serif hover:underline"
                >
                  Perpetrators of 2019 Easter Sunday attacks still engaged in
                  politics, employed with Sri Lanka&#039;s police force
                </a>
                <p className="text-xs dark:text-gray-400">
                  2 hours ago by
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    className="hover:underline dark:text-violet-400"
                  >
                    &nbsp; Leroy Jenkins
                  </a>
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="flex items-center space-x-2 dark:text-gray-400">
                  <span className="flex-shrink-0 w-2 h-2 uppercase rounded-full dark:bg-violet-400"></span>
                  <span className="text-xs font-bold tracking-wider uppercase text-amber-400">
                    Exclusive
                  </span>
                </h3>
                <a
                  rel="noopener noreferrer"
                  href="https://www.sentinelassam.com/national-news/trinamool-workers-worried-after-mamata-dumped-partha-says-bjp-605255"
                  target="_blank"
                  className="font-serif hover:underline"
                >
                  'Trinamool workers worried after Mamata dumped Partha' Says
                  BJP
                </a>
                <p className="text-xs dark:text-gray-400">
                  4 hours ago by
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    className="hover:underline dark:text-violet-400"
                  >
                    &nbsp; Sriraman Balla
                  </a>
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="flex items-center space-x-2 dark:text-gray-400">
                  <span className="flex-shrink-0 w-2 h-2 uppercase rounded-full dark:bg-violet-400"></span>
                  <span className="text-xs font-bold tracking-wider uppercase text-amber-400">
                    Exclusive
                  </span>
                </h3>
                <a
                  rel="noopener noreferrer"
                  href="https://www.sentinelassam.com/national-news/trinamool-workers-worried-after-mamata-dumped-partha-says-bjp-605255"
                  target="_blank"
                  className="font-serif hover:underline"
                >
                  People not following the right discourse can undo the justice
                  done to safeguard interests of marginalised groups: Justice DY
                  Chandrachud
                </a>
                <p className="text-xs dark:text-gray-400">
                  4 hours ago by
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    className="hover:underline dark:text-violet-400"
                  >
                    &nbsp; Sriraman Balla
                  </a>
                </p>
              </div>
            </div>
            <div className="flex flex-col w-full space-y-2">
              <div className="flex w-full h-1 bg-opacity-10 dark:bg-violet-400">
                <div className="w-1/2 h-full dark:bg-violet-400"></div>
              </div>
              <a
                rel="noopener noreferrer"
                href="https://www.feedspot.com/infiniterss.php?_src=feed_title&followfeedid=5130745&q=site:https%3A%2F%2Fwww.legalbites.in%2Ffeed%2F"
                target="_blank"
                className="flex items-center justify-between w-full"
              >
                <span className="text-xs font-bold tracking-wider uppercase text-amber-400">
                  See more exclusives
                </span>
                <svg
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 strokeCurrent dark:text-violet-400"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          </div>
          <div className="relative flex col-span-12 bg-center newsBack bg-no-repeat bg-cover dark:bg-gray-500 xl:col-span-6 lg:col-span-5 md:col-span-9 min-h-96">
            <span className="absolute px-1 pb-2 text-xs font-bold uppercase border-b-2 left-20 top-14 dark:border-violet-400 dark:text-gray-100">
              Law, Legal
            </span>
            <a className="flex flex-col items-center justify-end p-14 text-center sm:p-8 group dark:via-transparent flex-grow-1 bg-gradient-to-b dark:from-gray-900 dark:to-gray-900">
              <span className="flex items-center mb-12 space-x-2 dark:text-violet-400">
                <span className="relative flex-shrink-0 w-2 h-2 rounded-full dark:bg-violet-400">
                  <span className="absolute flex-shrink-0 w-3 h-3 rounded-full -left-1 -top-1 animate-ping dark:bg-violet-400"></span>
                </span>
               
              </span>
              <h1
                rel="noopener noreferrer"
                href="https://www.livelaw.in/top-stories/supreme-court-dowry-death-section-304b-ipc-dowry-prohibition-act-rigorous-imprisonment-206901"
                target="_blank"
                className="font-serif mx-4 lg:text-sm font-semibold group-hover:underline dark:text-gray-100 cursor-pointer"
              >
                Legislative Intent Of Incorporating IPC Section 304-B Was To
                Curb The Menace Of Dowry Death With A Firm Hand: Supreme Court
              </h1>
            </a>
          </div>
          <div className="hidden py-2 xl:col-span-3 lg:col-span-4 md:hidden lg:block">
            <div className="mb-8 space-x-5 border-b-2 border-opacity-10 dark:border-violet-400">
              <button
                type="button"
                className="pb-5 text-xs font-bold uppercase border-b-2 text-amber-500  dark:border-violet-400"
              >
                Latest
              </button>
            </div>
            <div className="flex flex-col divide-y divide-gray-700">
              <div className="flex px-1 py-4">
                <img
                  alt=""
                  className="flex-shrink-0 w-20 h-20 mr-4 dark:bg-gray-500 "
                  src="/img/bhim.jpg"
                />
                <div className="flex flex-col flex-grow">
                  <a
                    rel="noopener noreferrer"
                    href="https://www.indialegallive.com/top-news-of-the-day/news/bhima-koregaon-case-nia-court-varavara-rao/"
                    target="_blank"
                    className="font-serif hover:underline"
                  >
                    Bhima Koregaon case: NIA court lays twelve bail conditions
                    for Varavara Rao
                  </a>
                  <p className="mt-auto text-xs dark:text-gray-400">
                    5 minutes ago
                  </p>
                </div>
              </div>
              <div className="flex px-1 py-4">
                <img
                  alt=""
                  className="flex-shrink-0 object-cover w-20 h-20 mr-4 dark:bg-gray-500"
                  src="/img/court.jpg"
                />
                <div className="flex flex-col flex-grow">
                  <a
                    rel="noopener noreferrer"
                    href="https://www.indialegallive.com/constitutional-law-news/courts-news/lawyers-extortion-prayagraj-cbi-inquiry/"
                    target="_blank"
                    className="font-serif hover:underline"
                  >
                    Allahabad HC directs CBI inquiry into extortion of lawyers
                    in Prayagraj
                  </a>
                  <p className="mt-auto text-xs dark:text-gray-400">
                    14 minutes ago
                  </p>
                </div>
              </div>
              <div className="flex px-1 py-4">
                <img
                  alt=""
                  className="flex-shrink-0 object-cover w-20 h-20 mr-4 dark:bg-gray-500"
                  src="/img/arvind.jpg"
                />
                <div className="flex flex-col flex-grow">
                  <a
                    rel="noopener noreferrer"
                    href="https://www.indialegallive.com/constitutional-law-news/courts-news/delhi-rouse-avenue-court-arvind-kejriwal-manish-sisodia-defamation/"
                    target="_blank"
                    className="font-serif hover:underline"
                  >
                    Delhi court acquits Chief Minister Arvind Kejriwal, his
                    deputy Manish Sisodia in 2013 defamation case
                  </a>
                  <p className="mt-auto text-xs dark:text-gray-400">
                    22 minutes ago
                  </p>
                </div>
              </div>
              <div className="flex px-1 py-4">
                <img
                  alt=""
                  className="flex-shrink-0 object-cover w-20 h-20 mr-4 dark:bg-gray-500"
                  src="/img/award.jpg"
                />
                <div className="flex flex-col flex-grow">
                  <a
                    rel="noopener noreferrer"
                    href="https://www.indialegallive.com/top-story/intitutions-young-minds-vision-cji-ramana/"
                    target="_blank"
                    className="font-serif hover:underline"
                  >
                    Institutions should blend our historical baggage with a
                    futuristic vision to equip young minds to transform society:
                    CJI NV Ramana
                  </a>
                  <p className="mt-auto text-xs dark:text-gray-400">
                    37 minutes ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
