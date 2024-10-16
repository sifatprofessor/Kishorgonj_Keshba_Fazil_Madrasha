"use client";
import UseLoader from "@/components/Loader/useLoader";
import { BaseURL } from "@/utils/constant";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { UploadRunningNotice } from "@/components/Pages/UploadRunningNotice";
 
const TABLE_HEAD = ["Date", "Description", "action"];
 
 

const EventUpload = () => {
  const [loadingIndicator, startLoading, stopLoading] = UseLoader();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      startLoading(); // Show loading indicator
      try {
        const response = await axios.get(`${BaseURL}/api/notice`);
        setData(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        stopLoading(); // Hide loading indicator
      }
    };

    fetchData(); // Only called once due to empty dependency array
  }, [startLoading, stopLoading]);

  console.log(data);

  const handleDeleteNotice = async (id) => {
    try {
      await axios.delete(`${BaseURL}/api/notice/${id}`);
      setData(data.filter((notice) => notice._id !== id));
    } catch (err) {
      console.error(err);
    }
  }


  return (
    <div>
      <UploadRunningNotice/>
      {data.length > 0 ? (
        <Card className="h-full w-full overflow-scroll mt-10">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((notice, index) => (
                <tr key={index} className="even:bg-blue-gray-50/50">
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {notice?.date}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {notice?.description}
                    </Typography>
                  </td>
                  {/* <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {date}
                    </Typography>
                  </td> */}
                  <td className="p-4">
                    <Button
                     onClick={() => handleDeleteNotice(notice._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      ) : (
        <p>{loadingIndicator}</p>
      )}
    </div>
  );
};

export default EventUpload;
