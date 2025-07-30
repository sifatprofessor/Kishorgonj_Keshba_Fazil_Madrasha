"use client";
import { BaseURL } from "@/utils/constant";
import { UploadButton } from "@/utils/uploadthing";
import {
    Card,
    Input,
    Button,
    Typography,
    Select,
    Option,
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
    const [category, setCategory] = useState<string>("");

    const time = new Date().toLocaleDateString();

    const handlePublishNotice = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!category) {
            Swal.fire({
                title: "Missing Category",
                text: "Please select a category before publishing.",
                icon: "warning",
                confirmButtonText: "Ok",
            });
            return;
        }

        const data = {
            title: title,
            description: description,
            time: time,
            file: pdfUrl,
            category: category,
        };

        try {
            await axios.post(`${BaseURL}/api/noticepdf`, data);
            Swal.fire({
                title: "Notice Published",
                text: "Notice has been published successfully",
                icon: "success",
                confirmButtonText: "Ok",
            });
            window.location.reload();
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: "Error",
                text: "There was an error publishing the notice",
                icon: "error",
                confirmButtonText: "Ok",
            });
        }
    };

    return (
        <Card color="transparent" shadow={false} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <Button className="text-center mt-8 mb-2 w-80 max-w-screen-lg mx-auto sm:w-96" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                Upload Notice
            </Button>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg mx-auto sm:w-96">
                <div className="mb-1 flex flex-col gap-6">
                    {/* Title */}
                    <Typography variant="h6" color="blue-gray" className="-mb-3" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        Notice Title
                    </Typography>
                    <Input
                        label="Notice Title"
                        required
                        onChange={(e) => setTitle(e.target.value)} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />

                    {/* Description */}
                    <Typography variant="h6" color="blue-gray" className="-mb-3" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        Notice Description (Optional)
                    </Typography>
                    <Input
                        label="Notice Description"
                        onChange={(e) => setDescription(e.target.value)} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />

                    {/* Category */}
                    <Typography variant="h6" color="blue-gray" className="-mb-3" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        Notice Category
                    </Typography>
                    <Select
                        label="Select Category"
                        value={category}
                        onChange={(val) => setCategory(val || "")} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                    >
                        <Option value="দাখিল">দাখিল</Option>
                        <Option value="আলিম">আলিম</Option>
                        <Option value="ফাজিল">ফাজিল</Option>
                        <Option value="কামিল">কামিল</Option>
                    </Select>

                    {/* PDF Upload */}
                    <div className="flex gap-10 items-center mt-4">
                        <h1 className="mt-2">Upload PDF:</h1>
                        <UploadButton
                            endpoint="pdfUploader"
                            onClientUploadComplete={(res) => setPdfUrl(res[0].url)}
                            onUploadError={(error) => alert(`ERROR! ${error.message}`)}
                        />
                    </div>

                    {/* Uploaded file preview */}
                    <Typography color="gray" className="font-normal" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        Please make sure the PDF is less than 3MB
                    </Typography>
                    {pdfUrl && (
                        <Typography color="green" className="font-normal" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            PDF Uploaded:{" "}
                            <Link href={pdfUrl}>
                                <FaFilePdf className="text-6xl inline" />
                            </Link>
                        </Typography>
                    )}
                </div>

                {/* Publish Button */}
                <Button className="mt-6" fullWidth onClick={handlePublishNotice} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    Publish Notice
                </Button>
            </form>
        </Card>
    );
}
