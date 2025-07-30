"use client";
import { BaseURL } from "@/utils/constant";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Typography } from "@material-tailwind/react";
import { FaEye, FaFilePdf } from "react-icons/fa6";
import UseLoader from "@/components/Loader/useLoader";
import TransitionEffects from "@/components/TransitionEffects";

interface Notice {
    title: string;
    file: string;
    time: string;
    category: string; // দাখিল, আলিম, ফাজিল, কামিল
    _id: string;
}

const Notice: React.FC = () => {
    const [notices, setNotices] = useState<Notice[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(10);
    const [loadingIndicator, startLoading, stopLoading] = UseLoader();
    const [selectedCategory, setSelectedCategory] = useState<string>("সকল");

    const categories = process.env.NEXT_PUBLIC_NOTICE_CATEGORIES?.split(",") || ["সকল"];


    useEffect(() => {
        const fetchData = async () => {
            startLoading();
            try {
                const response = await axios.get(`${BaseURL}/api/noticepdf`);
                setNotices(response.data);
            } catch (err) {
                console.error(err);
            } finally {
                stopLoading();
            }
        };

        fetchData();
    }, [startLoading, stopLoading]);

    const TABLE_HEAD = ["S/N", "Title", "File", "Time", "Action"];

    // Filter based on selected category
    const filteredNotices =
        selectedCategory === "সকল"
            ? notices
            : notices.filter((notice) => notice.category === selectedCategory);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredNotices.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredNotices.length / itemsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <>
            <TransitionEffects />
            <div className="min-h-[50vh]">
                <h1 className="text-3xl font-bold underline mb-4 mt-4 lg:mt-12">
                    All Notice
                </h1>

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

                {filteredNotices.length > 0 ? (
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
                                                className="font-normal leading-none opacity-70" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                                            >
                                                {head}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map(({ title, file, time, _id }, index) => (
                                    <tr key={_id} className="even:bg-blue-gray-50/50">
                                        <td className="p-4">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                                            >
                                                {indexOfFirstItem + index + 1}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                                            >
                                                {title}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                <a
                                                    href={file}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2"
                                                >
                                                    <FaFilePdf className="text-red-400 text-3xl" />
                                                </a>
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                                            >
                                                {time}
                                            </Typography>
                                        </td>
                                        <td className="p-4 flex gap-4">
                                            <a href={`/notices/${_id}`} className="flex items-center gap-2">
                                                <Button placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                    <FaEye />
                                                </Button>
                                            </a>
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
                            className={`mx-1 ${currentPage === index + 1
                                ? "Navbar text-black font-bold text-xl" : ""}`} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                        >
                            {index + 1}
                        </Button>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Notice;
