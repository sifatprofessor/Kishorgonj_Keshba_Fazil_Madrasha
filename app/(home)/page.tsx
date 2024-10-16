/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
/* eslint-disable @next/next/no-img-element */
import Banner from "@/components/Pages/Banner";
import MapSection from "@/components/Pages/MapSection";

import Running_Banner from "@/components/Pages/Marquee";
import { BaseURL } from "@/utils/constant";
import axios from "axios";
import { useEffect, useState } from "react";
import Modal1 from "@/components/Hooks/useModal";
import UseLoader from "@/components/Loader/useLoader";
import TransitionEffects from "@/components/TransitionEffects";

interface UserDataType {
    designation: string;
    name: string;
    image: string;
    message: string;
    role: string;
    // Add other properties as needed
}

const Home: React.FC = () => {
    const [data, setData] = useState<UserDataType[]>([]);

    const [loadingIndicator, startLoading, stopLoading] = UseLoader();
    const [UserData, setUserData] = useState<UserDataType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            startLoading(); // Show loading indicator
            try {
                const response = await axios.get(`${BaseURL}/api/principleAndFounder`);
                setUserData(response.data);
            } catch (err) {
                console.error(err);
            } finally {
                stopLoading(); // Hide loading indicator
            }
        };

        fetchData(); // Only called once due to empty dependency array
    }, [startLoading, stopLoading]);

    useEffect(() => {
        const FetchData = async () => {
            try {
                const response = await axios.get(`${BaseURL}/api`);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        FetchData();
    }, []);
    return (
        <>
            <TransitionEffects />
            <main className="">
                <Running_Banner />
                <Banner />
                <MapSection />
                <div className="flex flex-col md:flex-row items-center justify-evenly lg:w-1/2 mt-4 md:mt-10 gap-4 md:gap-2">
                    {UserData.length > 0
                        ? UserData.map((item, index) => (
                            <div key={index}>
                                <div className="relative w-full mx-auto mb-2">
                                    <p className="text-green-600 font-bold text-xl">
                                        <span className="inline-block pb-2 ">
                                            {item?.designation.slice(
                                                0,
                                                item?.designation.indexOf(" ")
                                            )}
                                        </span>
                                    </p>
                                    <div className="absolute bottom-0 left-0 w-full h-1 border-b-2 border-green-600 rounded-b-full"></div>
                                </div>
                                <Modal1 data={item} />
                            </div>
                        ))
                        : loadingIndicator}
                </div>
            </main>
        </>
    );
};

export default Home;
