"use client";
import { BaseURL } from "@/utils/constant";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "@/components/Navbar/menu.css";
import { FaFilePdf } from "react-icons/fa6";
import Link from "next/link";
import UseLoader from "../Loader/useLoader";

interface Notice {
    title: string;
    file: string;
    _id: string;
    category: string;
}

// ⬇️ Read categories from .env and default to ["সকল"] if not found
const categories = process.env.NEXT_PUBLIC_NOTICE_CATEGORIES?.split(",") || ["সকল"];

interface NoticeSliderProps {
    notices: Notice[];
}

const NoticeSlider: React.FC<NoticeSliderProps> = ({ notices }) => {
    const [index, setIndex] = useState<number>(0);
    const duplicatedNotices = [...notices, ...notices];

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) =>
                prevIndex === duplicatedNotices.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);
        return () => clearInterval(interval);
    }, [duplicatedNotices.length]);

    return (
        <div className="overflow-hidden relative">
            <div
                className="transition-transform ease-in-out duration-1000"
                style={{
                    transform: `translateY(-${(index * 100) / duplicatedNotices.length}%)`,
                }}
            >
                {notices.map((notice, idx) => (
                    <div key={idx} className="h-auto flex items-start justify-start bg-transparent">
                        <div className="flex items-center justify-between w-full Navbar mt-2 py-1 rounded-lg">
                            <p className="text-lg w-full px-2 py-1 rounded-l-lg">
                                <span className="font-serif">{idx + 1}:</span> {notice?.title}
                            </p>
                            <Link href={notice?.file} target="_blank">
                                <button className="px-2 text-lg rounded-r-lg">
                                    <FaFilePdf className="text-3xl" />
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ScrollNotice: React.FC = () => {
    const [notices, setNotices] = useState<Notice[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]); // ⬅️ default to first (সকল)
    const [loadingIndicator, startLoading, stopLoading] = UseLoader();

    useEffect(() => {
        const fetchData = async () => {
            startLoading();
            try {
                const response = await axios.get(`${BaseURL}/api/noticepdf`);
                setNotices(response.data.reverse());
            } catch (err) {
                console.error(err);
            } finally {
                stopLoading();
            }
        };
        fetchData();
    }, [startLoading, stopLoading]);

    const filteredNotices =
        selectedCategory === "সকল"
            ? notices
            : notices.filter((n) => n.category === selectedCategory);

    return (
        <main className="p-4 h-[500px]">
            <div className="flex items-center justify-between gap-4 mb-2">
                <button className="text-2xl">Notice Board</button>
                <Link href="/notices">
                    <button className="bg-black hover:bg-blue-gray-200 text-white hover:text-black font-bold py-2 px-4 rounded">
                        View All
                    </button>
                </Link>
            </div>

            {/* Category Filter Buttons */}
            <div className="flex flex-wrap gap-2 mb-2">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`py-1 px-3 rounded-full border ${selectedCategory === cat
                            ? "bg-black text-white"
                            : "bg-white text-black"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <hr className="border-2 border-black mb-2" />

            {notices.length > 0 ? <NoticeSlider notices={filteredNotices} /> : loadingIndicator}
        </main>
    );
};

export default ScrollNotice;
