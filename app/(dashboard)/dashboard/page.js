"use client";
import UseLoader from "@/components/Loader/useLoader";
import DashboardGraph from "@/components/Pages/DashboardGraph";
import { BaseURL } from "@/utils/constant";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loadingIndicator, startLoading, stopLoading] = UseLoader();
  const [noticeData, setNoticeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      startLoading(); // Show loading indicator
      try {
        const response = await axios.get(`${BaseURL}/api/noticepdf`);
        setData(response.data);
        const noticeResponse = await axios.get(`${BaseURL}/api/notice`);
        setNoticeData(noticeResponse.data);
      } catch (err) {
        console.error(err);
      } finally {
        stopLoading(); // Hide loading indicator
      }
    };

    fetchData(); // Only called once due to empty dependency array
  }, [startLoading, stopLoading]);


  const chartData = [data.length, noticeData.length, data.length, data.length];

  return (
    <div>
      {loadingIndicator}
      {data.length > 0 ? <div className="w-3/4 lg:w-1/2 mx-auto mt-10"><DashboardGraph  data={chartData}/><p className="text-center mt-4 text-2xl ">Madrasha Database Information</p></div> : <p></p>}

      
    </div>
  );
};

export default Dashboard;
