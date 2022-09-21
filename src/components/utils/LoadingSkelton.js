import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const LoadingSkeleton = () => {
  return (
    <>
      <div className="lg:w-1/3 sm:w-1/2 p-4 r shadow  ">
        <div className="flex relative cursor-pointer justify-center ">
          <div className="mr-5">
            <Skeleton width={150} height={140} />
          </div>

          <div>
            <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">
              <Skeleton width={180} />
            </h2>
            <h1 className="title-font text-lg font-medium text-gray-900  mb-3">
              <Skeleton width={120} />
            </h1>
            <p className="leading-relaxed">
              <Skeleton width={120} />
            </p>
          </div>
        </div>
      </div>
      <div className="lg:w-1/3 sm:w-1/2 p-4 r shadow  ">
        <div className="flex relative cursor-pointer justify-center ">
          <div className="mr-5">
            <Skeleton width={150} height={140} />
          </div>

          <div>
            <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">
              <Skeleton width={180} />
            </h2>
            <h1 className="title-font text-lg font-medium text-gray-900  mb-3">
              <Skeleton width={120} />
            </h1>
            <p className="leading-relaxed">
              <Skeleton width={120} />
            </p>
          </div>
        </div>
      </div>
      <div className="lg:w-1/3 sm:w-1/2 p-4 r shadow  ">
        <div className="flex relative cursor-pointer justify-center ">
          <div className="mr-5">
            <Skeleton width={150} height={140} />
          </div>

          <div>
            <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">
              <Skeleton width={180} />
            </h2>
            <h1 className="title-font text-lg font-medium text-gray-900  mb-3">
              <Skeleton width={120} />
            </h1>
            <p className="leading-relaxed">
              <Skeleton width={120} />
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingSkeleton;
