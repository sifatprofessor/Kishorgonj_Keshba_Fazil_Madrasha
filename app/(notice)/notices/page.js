"use client";
import { BaseURL } from "@/utils/constant";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { FaDeleteLeft, FaEye, FaFilePdf } from "react-icons/fa6";
import UseLoader from "@/components/Loader/useLoader";
import TransitionEffects from "@/components/TransitionEffects";

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Adjust the number of items per page as needed
  const [loadingIndicator, startLoading, stopLoading] = UseLoader();

  useEffect(() => {
    const fetchData = async () => {
      startLoading(); // Show loading indicator
      try {
        const response = await axios.get(`${BaseURL}/api/noticepdf`);
        setNotices(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        stopLoading(); // Hide loading indicator
      }
    };

    fetchData(); // Only called once due to empty dependency array
  }, [startLoading, stopLoading]);

  const TABLE_HEAD = ["S/N", "Title", "File", "Time", "Action"];

  console.log(notices);

  // Calculate the index of the first and last items on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = notices.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Number of pages required
  const totalPages = Math.ceil(notices.length / itemsPerPage);

  return (
    <>
        <TransitionEffects />
      <div className="min-h-[50vh]">
        <h1 className="text-3xl font-bold underline mb-4 mt-4 lg:mt-12">
          All Notice
        </h1>
        {notices.length > 0 ? (
          <Card className="w-full overflow-scroll Navbar">
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
                {currentItems.map(({ title, file, time, _id }, index) => (
                  <tr key={index} className="even:bg-blue-gray-50/50">
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {indexOfFirstItem + index + 1}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {title}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        <Link href={file}>
                          <FaFilePdf className="text-red-400 text-3xl" />
                        </Link>
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {time}
                      </Typography>
                    </td>
                    <td className="p-4 flex gap-4">
                      <Link
                        href={file}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button>
                          <FaEye />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        ) : (
          loadingIndicator
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`mx-1 ${currentPage === index + 1 ? "Navbar text-black font-bold text-xl" : ""}`}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Notice;
