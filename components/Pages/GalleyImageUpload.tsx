"use client";
import { BaseURL } from "@/utils/constant";
import { UploadButton } from "@/utils/uploadthing";
import {
    Card,
    Input,
    Button,
    Typography,
    PopoverContent,
    Popover,
    PopoverHandler,
} from "@material-tailwind/react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, FormEvent } from "react";
import { DayPicker } from "react-day-picker";
import Swal from "sweetalert2";

export function GalleryImageUpload() {
    const [pdfUrl, setPdfUrl] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [time, setTime] = useState<string>("");

    const timeStr = date ? date.toLocaleDateString() : "Select a Date";
    useEffect(() => {
        setTime(timeStr);
    }, [timeStr]);


    const handlePublishNotice = async (e: FormEvent) => {
        e.preventDefault();
        const data = {
            title: title,
            img: pdfUrl,
            date: time,
        };
        try {
            await axios.post(`${BaseURL}/api/gallery`, data).then(() => {
                Swal.fire({
                    title: "Notice Published",
                    text: "Image been published successfully",
                    icon: "success",
                    confirmButtonText: "Ok",
                });
                window.location.reload();
            });
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Error",
                text: "There was an error publishing the Image",
                icon: "error",
                confirmButtonText: "Ok",
            });
        }
    };

    return (
        <Card
            color="transparent"
            shadow={false}
            onPointerEnterCapture={() => { }}
            onPointerLeaveCapture={() => { }}
            placeholder=""
        >
            <Button onPointerEnterCapture={() => { }}
                onPointerLeaveCapture={() => { }}
                placeholder=""
                className="text-center mt-8 mb-2 w-80 max-w-screen-lg mx-auto sm:w-96">
                Upload Image
            </Button>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg mx-auto sm:w-96">
                <div className="mb-1 flex flex-col gap-6">
                    <Typography onPointerEnterCapture={() => { }}
                        onPointerLeaveCapture={() => { }}
                        placeholder=""
                        variant="h6" color="blue-gray" className="-mb-3">
                        Photo Title
                    </Typography>
                    <Input
                        onPointerEnterCapture={() => { }}
                        onPointerLeaveCapture={() => { }}
                        placeholder="Enter the title of the photo"
                        onChange={(e) => setTitle(e.target.value)}
                        crossOrigin=""
                    />

                    <Typography onPointerEnterCapture={() => { }}
                        onPointerLeaveCapture={() => { }}
                        placeholder=""
                        variant="h6" color="blue-gray" className="-mb-3">
                        Upload Time
                    </Typography>
                    <div className="">
                        <Popover placement="bottom">
                            <PopoverHandler>
                                <Input onPointerEnterCapture={() => { }}
                                    onPointerLeaveCapture={() => { }}
                                    placeholder=""
                                    label="Select a Date"
                                    onChange={() => null}
                                    value={time}
                                    crossOrigin="" />
                            </PopoverHandler>
                            <PopoverContent
                                placeholder=""
                                onPointerEnterCapture={() => { }}
                                onPointerLeaveCapture={() => { }}
                            >
                                <DayPicker
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    showOutsideDays
                                    className="border-0"
                                    classNames={{
                                        caption: "flex justify-center py-2 mb-4 relative items-center",
                                        caption_label: "text-sm font-medium text-gray-900",
                                        nav: "flex items-center",
                                        nav_button: "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                                        nav_button_previous: "absolute left-1.5",
                                        nav_button_next: "absolute right-1.5",
                                        table: "w-full border-collapse",
                                        head_row: "flex font-medium text-gray-900",
                                        head_cell: "m-0.5 w-9 font-normal text-sm",
                                        row: "flex w-full mt-2",
                                        cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                                        day: "h-9 w-9 p-0 font-normal",
                                        day_range_end: "day-range-end",
                                        day_selected: "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                                        day_today: "rounded-md bg-gray-200 text-gray-900",
                                        day_outside: "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                                        day_disabled: "text-gray-500 opacity-50",
                                        day_hidden: "invisible",
                                    }}
                                // Removed invalid fromMonth property
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="flex gap-10">
                        <h1 className="mt-2">Upload Image:</h1>
                        <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                                setPdfUrl(res[0].url);
                            }}
                            onUploadError={(error) => {
                                // Do something with the error.
                                alert(`ERROR! ${error.message}`);
                            }}
                        />
                    </div>
                    <p>
                        <Typography
                            onPointerEnterCapture={() => { }}
                            onPointerLeaveCapture={() => { }}
                            placeholder=""
                            color="gray" className="font-normal">
                            Please make sure the Image is less than 5MB
                        </Typography>
                        {pdfUrl ? (
                            <Typography
                                onPointerEnterCapture={() => { }}
                                onPointerLeaveCapture={() => { }}
                                placeholder="" color="green" className="font-normal">
                                Image Uploaded:{" "}
                                <Link href={pdfUrl}>
                                    <Image
                                        width={200}
                                        height={200}
                                        src={pdfUrl} alt="image" />
                                </Link>
                            </Typography>
                        ) : null}
                    </p>
                </div>
                <Button
                    onPointerEnterCapture={() => { }}
                    onPointerLeaveCapture={() => { }}
                    placeholder=""
                    className="mt-6" fullWidth onClick={handlePublishNotice}>
                    Publish Image
                </Button>
            </form>
        </Card>
    );
}
