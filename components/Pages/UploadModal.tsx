"use client";
import { BaseURL } from "@/utils/constant";
import { UploadButton } from "@/utils/uploadthing";
import {
    Card,
    Input,
    Button,
    Typography,
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

    console.log(time);
    console.log(title);
    console.log(pdfUrl);

    const handlePublishNotice = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            title: title,
            description: description,
            time: time,
            file: pdfUrl,
        };
        try {
            await axios.post(`${BaseURL}/api/noticepdf`, data).then((res) => {
                console.log(res);
                Swal.fire({
                    title: "Notice Published",
                    text: "Notice has been published successfully",
                    icon: "success",
                    confirmButtonText: "Ok",
                });
                window.location.reload();
            });
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Error",
                text: "There was an error publishing the notice",
                icon: "error",
                confirmButtonText: "Ok",
            });
        }
    };

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
                Upload Notice
            </Button>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg mx-auto sm:w-96">
                <div className="mb-1 flex flex-col gap-6">
                    <Typography placeholder=""
                        onPointerEnterCapture={() => { }}
                        onPointerLeaveCapture={() => { }}
                        variant="h6" color="blue-gray" className="-mb-3">
                        Notice Title
                    </Typography>
                    <Input
                        placeholder=""
                        onPointerEnterCapture={() => { }}
                        onPointerLeaveCapture={() => { }}
                        label="Notice Title"
                        required
                        crossOrigin=""
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    />
                    <Typography placeholder=""
                        onPointerEnterCapture={() => { }}
                        onPointerLeaveCapture={() => { }} variant="h6" color="blue-gray" className="-mb-3">
                        Notice Description (Optional)
                    </Typography>
                    <Input
                        placeholder=""
                        onPointerEnterCapture={() => { }}
                        onPointerLeaveCapture={() => { }}
                        crossOrigin={""}
                        label="Notice Description"
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                    />
                    <div className="flex gap-10">
                        <h1 className="mt-2">Upload PDF:</h1>
                        <UploadButton
                            endpoint="pdfUploader"
                            onClientUploadComplete={(res) => {
                                console.log("Files: ", res[0].url);
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
                    className="mt-6" fullWidth onClick={handlePublishNotice}>
                    Publish Notice
                </Button>
            </form>
        </Card>
    );
}
