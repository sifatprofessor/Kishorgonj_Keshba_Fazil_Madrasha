"use client";
import React, { useEffect, useState } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import axios from "axios";
import { BaseURL } from "@/utils/constant";
import "@/components/Navbar/menu.css";
import UploadModal, { UploadSection } from "@/components/Pages/UploadModal";
import Link from "next/link";
import { FaDeleteLeft, FaFilePdf } from "react-icons/fa6";
import Swal from "sweetalert2";
import UseLoader from "@/components/Loader/useLoader";

const Page = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Adjust the number of items per page as needed
  const [loadingIndicator, startLoading, stopLoading] = UseLoader();


  const TABLE_HEAD = ["S/N", "Title", "File", "Time", "Action"];

  useEffect(() => {
    const fetchData = async () => {
      startLoading(); // Show loading indicator
      try {
        const response = await axios.get(`${BaseURL}/api/noticepdf`);
        setData(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        stopLoading(); // Hide loading indicator
      }
    };

    fetchData(); // Only called once due to empty dependency array
  }, [startLoading, stopLoading]);


  const handleDeleteNotice = async (id) => {
    console.log(id)
    try {
      await axios.delete(`${BaseURL}/api/noticepdf/${id}`)
      .then((res) => {
        setData(data.filter((item) => item._id !== id));
        if(res.status === 200){
          Swal.fire({
            title: "Notice Deleted",
            text: "Notice has been deleted successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      })
    } catch (error) {
      console.log(error);
    }
  };

  // Calculate the index of the first and last items on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Number of pages required
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <>
     
      <UploadSection />

      <h1 className="text-3xl font-bold underline mb-4">All Notice</h1>
      {loadingIndicator}
      {
        data.length > 0 ? <Card className="w-full overflow-scroll Navbar">
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
              {currentItems.map(({ title, file, time,_id }, index) => (
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
                    <Button onClick={()=>{
                      handleDeleteNotice(_id)
                    }}>
                      <FaDeleteLeft className="text-red-400" />
                    </Button>
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                    >
                      Edit
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card> : <p className="text-center text-2xl"></p>
      }

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
    </>
  );
};

export default Page;
