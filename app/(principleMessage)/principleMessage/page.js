/* eslint-disable @next/next/no-img-element */
"use client";
import UseLoader from "@/components/Loader/useLoader";
import TransitionEffects from "@/components/TransitionEffects";
import { BaseURL } from "@/utils/constant";
import axios from "axios";
import React, { useEffect, useState } from "react";

const PrincipleMessage = () => {
  const [loadingIndicator, startLoading, stopLoading] = UseLoader();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      startLoading(); // Show loading indicator
      try {
        const response = await axios.get(`${BaseURL}/api/principleAndFounder`);
        setData(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        stopLoading(); // Hide loading indicator
      }
    };

    fetchData(); // Only called once due to empty dependency array
  }, [startLoading, stopLoading]);
  return (
    <>
      <TransitionEffects />
      <div className="min-h-[50vh] px-4 sm:px-6 md:px-8">
        {data.length > 0 ? (
          <div
            className={`border-2 border-green-500 rounded-xl p-2 Navbar mt-10 `}
          >
            <h1 className="mb-2 text-xl sm:text-2xl font-semibold">
              {data[0]?.name} <span className="text-xs ml-2">{data[0]?.designation}</span>
            </h1>
            <div className="max-w-full mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-lg Modal">
              <div className="mb-4 sm:mb-6">
                <div>
                  <img
                    src={data[0]?.image}
                    alt="Principal"
                    className="w-24 sm:w-32 md:w-48 h-auto object-cover rounded-md float-left mr-2 sm:mr-4 mb-4"
                  />
                  <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed font-sans text-justify">
                    {data[0]?.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          loadingIndicator
        )}
      </div>
    </>
  );
};

export default PrincipleMessage;
