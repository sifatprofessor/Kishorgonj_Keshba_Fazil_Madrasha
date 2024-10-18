"use client";
import { BaseURL } from "@/utils/constant";
import { UploadButton } from "@/utils/uploadthing";
import {
    Card,
    Input,
    Button,
    Typography,
    Select,
    Option
} from "@material-tailwind/react";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { FaFilePdf } from "react-icons/fa6";
import Swal from "sweetalert2";

export function UploadSection() {
    const [pdfUrl, setPdfUrl] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const time = new Date().toLocaleDateString();

    console.log(title)


    const handlePublishRoutine = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            title: title,
            description: description,
            time: time,
            file: pdfUrl,
        };
        try {
            await axios.patch(`${BaseURL}/api/routine/${title}`, data).then(() => {
                Swal.fire({
                    title: "Routine Published",
                    text: "Routine has been published successfully",
                    icon: "success",
                    confirmButtonText: "Ok",
                });
                window.location.reload();
            });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "There was an error publishing the routine",
                icon: "error",
                confirmButtonText: "Ok",
            });
        }
    };
    const handleSelectChange = (value: string | undefined) => {
        // Use the provided value directly instead of e.target.value
        if (value) {
            setTitle(value);
        }
    }

    return (
        <Card
            color="transparent"
            shadow={false}
            placeholder=""
            onPointerEnterCapture={() => { }}
            onPointerLeaveCapture={() => { }}>
            <Button placeholder=""
                onPointerEnterCapture={() => { }}
                onPointerLeaveCapture={() => { }}
                className="text-center mt-8 mb-2 w-80 max-w-screen-lg mx-auto sm:w-96">
                Upload Routine
            </Button>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg mx-auto sm:w-96">
                <div className="mb-1 flex flex-col gap-6">
                    <Typography placeholder=""
                        onPointerEnterCapture={() => { }}
                        onPointerLeaveCapture={() => { }}
                        variant="h6" color="blue-gray" className="-mb-3">
                        Routine Title
                    </Typography>
                    <Select label="Select Routine"
                        animate={{
                            mount: { y: 0 },
                            unmount: { y: 25 },
                        }} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                        onChange={(value) => handleSelectChange(value)} // Passing the value directly
                    >
                        <Option value="class">Class Routine</Option>
                        <Option value="exam">Exam Routine</Option>
                        <Option value="teacher">Teacher&apos;s Routine</Option>
                    </Select>


                    <Typography placeholder=""
                        onPointerEnterCapture={() => { }}
                        onPointerLeaveCapture={() => { }} variant="h6" color="blue-gray" className="-mb-3">
                        Routine Description (Optional)
                    </Typography>
                    <Input
                        placeholder=""
                        onPointerEnterCapture={() => { }}
                        onPointerLeaveCapture={() => { }}
                        crossOrigin={""}
                        label="Routine Description"
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                    />
                    <div className="flex gap-10">
                        <h1 className="mt-2">Upload PDF:</h1>
                        <UploadButton
                            endpoint="pdfUploader"
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
                        <Typography placeholder=""
                            onPointerEnterCapture={() => { }}
                            onPointerLeaveCapture={() => { }}
                            color="gray" className="font-normal">
                            Please make sure the PDF is less than 3MB
                        </Typography>
                        {pdfUrl ? (
                            <Typography
                                placeholder=""
                                onPointerEnterCapture={() => { }}
                                onPointerLeaveCapture={() => { }}
                                color="green" className="font-normal">
                                PDF Uploaded:{" "}
                                <Link href={pdfUrl}>
                                    <FaFilePdf className="text-6xl" />
                                </Link>
                            </Typography>
                        ) : null}
                    </p>
                </div>
                <Button placeholder=""
                    onPointerEnterCapture={() => { }}
                    onPointerLeaveCapture={() => { }}
                    className="mt-6" fullWidth onClick={handlePublishRoutine}>
                    Publish Routine
                </Button>
            </form>
        </Card>
    );
}
