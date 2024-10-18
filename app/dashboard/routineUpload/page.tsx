"use client";
import React, { useEffect, useState } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import axios from "axios";
import { BaseURL } from "@/utils/constant";
import "@/components/Navbar/menu.css";
import Link from "next/link";
import { FaDeleteLeft, FaFilePdf } from "react-icons/fa6";
import Swal from "sweetalert2";
import UseLoader from "@/components/Loader/useLoader";
import { UploadSection } from "./UploadSection";

interface Notice {
    _id: string;
    title: string;
    file: string;
    time: string;
}

const Page: React.FC = () => {
    const [data, setData] = useState<Notice[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(10); // Adjust the number of items per page as needed
    const [loadingIndicator, startLoading, stopLoading] = UseLoader();

    const TABLE_HEAD = ["S/N", "Title", "File", "Time", "Action"];

    useEffect(() => {
        const fetchData = async () => {
            startLoading(); // Show loading indicator
            try {
                const response = await axios.get(`${BaseURL}/api/routine`);
                setData(response.data);
            } catch (err) {
                console.error(err);
            } finally {
                stopLoading(); // Hide loading indicator
            }
        };

        fetchData(); // Only called once due to empty dependency array
    }, [startLoading, stopLoading]);

    const handleDeleteNotice = async (id: string) => {
        try {
            const res = await axios.delete(`${BaseURL}/api/noticepdf/${id}`);
            setData(data.filter((item) => item._id !== id));
            if (res.status === 200) {
                Swal.fire({
                    title: "Notice Deleted",
                    text: "Notice has been deleted successfully",
                    icon: "success",
                    confirmButtonText: "Ok",
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Calculate the index of the first and last items on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // Number of pages required
    const totalPages = Math.ceil(data.length / itemsPerPage);

    return (
        <>
            <UploadSection />

            <h1 className="text-3xl font-bold underline mb-4">All Routine</h1>
            {loadingIndicator}
            {data.length > 0 ? (
                <Card placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} className="w-full overflow-scroll Navbar">
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
                                            placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}
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
                                            placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}
                                        >
                                            {indexOfFirstItem + index + 1}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                            placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}
                                        >
                                            {title}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                            placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}
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
                                            placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}
                                        >
                                            {time}
                                        </Typography>
                                    </td>
                                    <td className="p-4 flex gap-4">
                                        <Button
                                            placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}
                                            onClick={() => {
                                                handleDeleteNotice(_id);
                                            }}
                                        >
                                            <FaDeleteLeft className="text-red-400" />
                                        </Button>
                                        <Typography
                                            as="a"
                                            href="#"
                                            variant="small"
                                            color="blue-gray"
                                            className="font-medium"
                                            placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}
                                        >
                                            Edit
                                        </Typography>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            ) : (
                <p className="text-center text-2xl"></p>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <Button
                        placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`mx-1 ${currentPage === index + 1 ? "Navbar text-black font-bold text-xl" : ""
                            }`}
                    >
                        {index + 1}
                    </Button>
                ))}
            </div>
        </>
    );
};

export default Page;
