"use client";
import { UseUpdateData } from "@/components/Hooks/useUpdateData";
import UseLoader from "@/components/Loader/useLoader";
import { BaseURL } from "@/utils/constant";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface PrincipleData {
    _id: string;
    role: string;
    name: string;
    designation: string;
    image: string;
    message: string;
}

const Principle: React.FC = () => {
    const [loadingIndicator, startLoading, stopLoading] = UseLoader();
    const [data, setData] = useState<PrincipleData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            startLoading(); // Show loading indicator
            try {
                const response = await axios.get<PrincipleData[]>(`${BaseURL}/api/principleAndFounder`);
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

    return (
        <>
            {data.length > 0 ? (
                <section className="grid gap-4 mx-auto grid-cols-1 lg:grid-cols-2 w-full items-center justify-center">
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className={`border-2 border-green-500 rounded-xl p-2 Navbar`}
                        >
                            <h1 className="mb-2 text-xl sm:text-2xl font-semibold">
                                {item?.name}{" "}
                                <span className="text-xs">{item?.designation}</span>
                            </h1>
                            <div className="max-w-full mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-lg Modal">
                                <div className="mb-4 sm:mb-6">
                                    <div>
                                        <Image
                                            width={200}
                                            height={200}
                                            src={item?.image}
                                            alt="Principal"
                                            className="w-24 sm:w-32 md:w-48 h-auto object-cover rounded-md float-left mr-2 sm:mr-4 mb-4"
                                        />
                                        <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed font-sans text-justify">
                                            {item?.message}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 mt-2">
                                <UseUpdateData data={item} />
                            </div>
                        </div>
                    ))}
                </section>
            ) : (
                loadingIndicator
            )}
        </>
    );
};

export default Principle;
