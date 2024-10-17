import { BaseURL } from "@/utils/constant";
import { UploadButton } from "@/utils/uploadthing";
import axios from "axios";
import Image from "next/image";
import { useState, FC, ChangeEvent } from "react";
import { FaChair, FaMessage } from "react-icons/fa6";
import Swal from "sweetalert2";

interface Data {
    _id: string;
    name: string;
    message: string;
    designation: string;
    image: string;
    role: string;
}

interface UseUpdateDataProps {
    data: Data;
}

export const UseUpdateData: FC<UseUpdateDataProps> = ({ data }) => {
    const [openModal, setOpenModal] = useState(false);
    const [imageURL, setImageURL] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [designation, setDesignation] = useState("");

    const handleUploadInformation = async () => {
        const UpdateData = {
            name: name ? name : data?.name,
            message: message ? message : data?.message,
            designation: designation ? designation : data?.designation,
            image: imageURL ? imageURL : data?.image,
            role: data?.role,
        };


        try {
            const response = await axios.patch(`${BaseURL}/api/principleAndFounder/${data?._id}`, UpdateData);
            Swal.fire({
                title: "Information Updated",
                text: response.data.message,
                icon: "success",
                confirmButtonText: "Ok",
            }).then(() => {
                window.location.reload();
            });
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    return (
        <div className="mx-auto flex w-72 items-center justify-center">
            <button
                onClick={() => setOpenModal(true)}
                className="rounded-md bg-gray-700 py-2 px-5 text-white"
            >
                Update Details
            </button>
            <div
                onClick={() => setOpenModal(false)}
                className={`fixed z-[100] flex items-center justify-center ${openModal ? "opacity-1 visible" : "invisible opacity-0"} inset-0 h-full w-full bg-black/20 backdrop-blur-sm duration-100`}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={`absolute w-full rounded-lg bg-white dark:bg-gray-900 drop-shadow-2xl sm:w-[500px] ${openModal ? "opacity-1 translate-y-0 duration-300" : "-translate-y-20 opacity-0 duration-150"}`}
                >
                    <form className="px-5 pb-5 pt-3 lg:pb-10 lg:pt-5 lg:px-10">
                        <svg
                            onClick={() => setOpenModal(false)}
                            className="mx-auto mr-0 w-10 cursor-pointer fill-black dark:fill-white"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g strokeWidth="0"></g>
                            <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"></path>
                            </g>
                        </svg>
                        <h1 className="pb-8 text-4xl backdrop-blur-sm">{data?.name}</h1>
                        <div className="space-y-5">
                            <label htmlFor="email_navigate_ui_modal" className="block">
                                Update Name
                            </label>
                            <div className="relative">
                                <input
                                    id="email_navigate_ui_modal"
                                    type="text"
                                    defaultValue={data?.name}
                                    placeholder={data?.name}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                                    className="block w-full rounded-lg p-3 pl-10 outline-none drop-shadow-lg bg-white dark:bg-gray-700 dark:text-white"
                                />
                                <span className="absolute left-2 top-1/4">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        className="inline-block w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g strokeWidth="0"></g>
                                        <g
                                            id="SVGRepo_tracerCarrier"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        ></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M2 10C2 6.22876 2 4.34315 3.17157 3.17157C4.34315 2 6.22876 2 10 2H14C17.7712 2 19.6569 2 20.8284 3.17157C22 4.34315 22 6.22876 22 10V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V10ZM7.73867 16.4465C8.96118 15.5085 10.4591 15 12 15C13.5409 15 15.0388 15.5085 16.2613 16.4465C17.4838 17.3846 18.3627 18.6998 18.7615 20.1883C18.9044 20.7217 18.5878 21.2701 18.0544 21.413C17.5209 21.556 16.9726 21.2394 16.8296 20.7059C16.5448 19.6427 15.917 18.7033 15.0438 18.0332C14.1706 17.3632 13.1007 17 12 17C10.8993 17 9.82942 17.3632 8.95619 18.0332C8.08297 18.7033 7.45525 19.6427 7.17037 20.7059C7.02743 21.2394 6.47909 21.556 5.94563 21.413C5.41216 21.2701 5.09558 20.7217 5.23852 20.1883C5.63734 18.6998 6.51616 17.3846 7.73867 16.4465ZM10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9ZM12 5C9.79086 5 8 6.79086 8 9C8 11.2091 9.79086 13 12 13C14.2091 13 16 11.2091 16 9C16 6.79086 14.2091 5 12 5Z"
                                                className="fill-black dark:fill-white"
                                            ></path>
                                            <rect
                                                x="2.5"
                                                y="2.5"
                                                width="19"
                                                height="19"
                                                rx="3.5"
                                                className="stroke-black dark:stroke-white"
                                            ></rect>
                                        </g>
                                    </svg>
                                </span>
                            </div>
                            <label htmlFor="message_navigate_ui_modal" className="block">
                                Update Message
                            </label>
                            <div className="relative">
                                <input
                                    id="message_navigate_ui_modal"
                                    type="text"
                                    placeholder={data?.message}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
                                    defaultValue={data?.message}
                                    className="block w-full rounded-lg p-3 pl-10 outline-none drop-shadow-lg bg-white dark:bg-gray-700 dark:text-white"
                                />
                                <span className="absolute left-2 top-1/4">
                                    <FaMessage className="text-xl" />
                                </span>
                            </div>
                            <label htmlFor="designation_navigate_ui_modal" className="block">
                                Update Designation
                            </label>
                            <div className="relative">
                                <input
                                    id="designation_navigate_ui_modal"
                                    type="text"
                                    placeholder={data?.designation}
                                    defaultValue={data?.designation}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setDesignation(e.target.value)}
                                    className="block w-full rounded-lg p-3 pl-10 outline-none drop-shadow-lg bg-white dark:bg-gray-700 dark:text-white"
                                />
                                <span className="absolute left-2 top-1/4">
                                    <FaChair className="text-xl" />
                                </span>
                            </div>
                            <label htmlFor="image_navigate_ui_modal" className="block">
                                Update Image
                            </label>

                            <div className="flex items-center justify-start gap-20">
                                <Image
                                    width={200}
                                    height={200}
                                    src={imageURL ? imageURL : data?.image} className="w-15 h-20 rounded-xl" alt={""} />
                                <UploadButton
                                    endpoint="imageUploader"
                                    onClientUploadComplete={(res) => {
                                        setImageURL(res[0].url);
                                    }}
                                    onUploadError={(error) => {
                                        // Do something with the error.
                                        alert(`ERROR! ${error.message}`);
                                    }}
                                />
                            </div>
                        </div>
                        {/* button type will be submit for handling form submission*/}
                        <button
                            type="button"
                            onClick={handleUploadInformation}
                            className="relative py-2.5 px-5 rounded-lg mt-6 bg-white drop-shadow-lg hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
