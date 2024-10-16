"use client";
import UseLoader from "@/components/Loader/useLoader";
import { BaseURL } from "@/utils/constant";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { UploadRunningNotice } from "@/components/Pages/UploadRunningNotice";

const TABLE_HEAD = ["Date", "Description", "action"];

interface Notice {
    _id: string;
    date: string;
    description: string;
}

const EventUpload: React.FC = () => {
    const [loadingIndicator, startLoading, stopLoading] = UseLoader();
    const [data, setData] = useState<Notice[]>([]);

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


    const handleDeleteNotice = async (id: string) => {
        try {
            await axios.delete(`${BaseURL}/api/notice/${id}`);
            setData(data.filter((notice) => notice._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <UploadRunningNotice />
            {data.length > 0 ? (
                <Card className="h-full w-full overflow-scroll mt-10" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
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
                            {data.map((notice, index) => (
                                <tr key={index} className="even:bg-blue-gray-50/50">
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                            placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}
                                        >
                                            {notice?.date}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                            placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}
                                        >
                                            {notice?.description}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Button placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} onClick={() => handleDeleteNotice(notice._id)}>
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
