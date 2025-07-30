"use client";
import React, { useEffect, useState } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import axios from "axios";
import { BaseURL } from "@/utils/constant";
import "@/components/Navbar/menu.css";
import { UploadSection } from "@/components/Pages/UploadModal";
import Link from "next/link";
import { FaDeleteLeft, FaFilePdf } from "react-icons/fa6";
import Swal from "sweetalert2";
import UseLoader from "@/components/Loader/useLoader";

interface Notice {
    _id: string;
    title: string;
    file: string;
    time: string;
    category: string; // দাখিল, আলিম, ফাজিল, কামিল
}

const Page: React.FC = () => {
    const [data, setData] = useState<Notice[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(10);
    const [loadingIndicator, startLoading, stopLoading] = UseLoader();
    const [selectedCategory, setSelectedCategory] = useState<string>("সকল");

    const categories = process.env.NEXT_PUBLIC_NOTICE_CATEGORIES?.split(",") || ["সকল"];

    const TABLE_HEAD = ["S/N", "Title", "File", "Time", "Category", "Action"];

    useEffect(() => {
        const fetchData = async () => {
            startLoading();
            try {
                const response = await axios.get(`${BaseURL}/api/noticepdf`);
                setData(response.data);
            } catch (err) {
                console.error(err);
            } finally {
                stopLoading();
            }
        };

        fetchData();
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

    // Filter by selected category
    const filteredData =
        selectedCategory === "সকল"
            ? data
            : data.filter((notice) => notice.category === selectedCategory);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <>
            <UploadSection />

            <h1 className="text-3xl font-bold underline mb-4">All Notice</h1>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-4 justify-center mb-6">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => {
                            setSelectedCategory(category);
                            setCurrentPage(1);
                        }}
                        className={`border rounded-md px-6 py-3 font-semibold text-lg ${selectedCategory === category
                            ? "bg-teal-700 text-white"
                            : "border-teal-700 text-teal-700"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {loadingIndicator}

            {filteredData.length > 0 ? (
                <Card className="w-full overflow-scroll Navbar" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
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
                                            className="font-normal leading-none opacity-70" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map(({ title, file, time, _id, category }, index) => (
                                <tr key={_id} className="even:bg-blue-gray-50/50">
                                    <td className="p-4">{indexOfFirstItem + index + 1}</td>
                                    <td className="p-4">{title}</td>
                                    <td className="p-4">
                                        <Link href={file} target="_blank">
                                            <FaFilePdf className="text-red-400 text-3xl" />
                                        </Link>
                                    </td>
                                    <td className="p-4">{time}</td>
                                    <td className="p-4">{category}</td>
                                    <td className="p-4 flex gap-4">
                                        <Button onClick={() => handleDeleteNotice(_id)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                            <FaDeleteLeft className="text-red-400" />
                                        </Button>
                                        <Typography as="a" href="#" className="font-medium" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                            Edit
                                        </Typography>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            ) : (
                <p className="text-center text-xl text-gray-500">No notices available.</p>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <Button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`mx-1 ${currentPage === index + 1
                            ? "Navbar text-black font-bold text-xl"
                            : ""}`} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                    >
                        {index + 1}
                    </Button>
                ))}
            </div>
        </>
    );
};

export default Page;
