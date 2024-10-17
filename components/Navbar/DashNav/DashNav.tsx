"use client";
import {
    FaArrowLeft,
    FaArrowRight,
    FaArrowRightFromBracket,
    FaBars,
    FaCalendar,
    FaLink,
    FaPlus,
    FaSquarePollVertical,
    FaHouse,
    FaPhotoFilm,
} from "react-icons/fa6";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, FC } from "react";
import { signOut } from "next-auth/react";
import DashNavButton from "../DashNavButton/DashNavButton";
import '../menu.css';

const DashNav: FC = () => {
    const [isClicked, setIsClicked] = useState<boolean>(false);

    const pathname = usePathname();

    return (
        <div data-testid="parent" className={isClicked ? "lg:w-16" : "lg:w-72"}>
            <div
                className={`hidden lg:flex fixed justify-between Navbar min-h-screen flex-col transition-all duration-300 ${isClicked ? "w-20" : "w-72"
                    }`}
            >
                <div
                    className={`p-5 space-y-5 flex ${isClicked && "justify-center items-center"
                        } flex-col relative`}
                >
                    {isClicked ? (
                        <DashNavButton
                            onClick={() => setIsClicked(false)}
                            className="btn btn-sm absolute right-6 top-2"
                            data-testid="dash-nav-button-left"
                        >
                            <FaArrowRight data-testid="fa-arrow-right-icon" />
                        </DashNavButton>
                    ) : (
                        <DashNavButton
                            onClick={() => setIsClicked(true)}
                            className="btn btn-sm absolute right-2 top-2"
                            data-testid="dash-nav-button-right"
                        >
                            <FaArrowLeft />
                        </DashNavButton>
                    )}

                    {isClicked ? (
                        <Link href={"/"}></Link>
                    ) : (
                        <Link href={"/"}>
                            <div className="flex items-center">
                                <p className="text-center text-3xl">
                                    <span
                                        className="text-3xl font-black"
                                        style={{
                                            color: "white",
                                            WebkitTextFillColor: "black",
                                            WebkitTextStroke: "1.5px black",
                                            fontSize: "28px",
                                            fontWeight: "bolder",
                                        }}
                                    >
                                        Admin Panel
                                    </span>
                                </p>
                            </div>
                        </Link>
                    )}

                    <Link
                        href={"/dashboard"}
                        className="flex justify-center items-center"
                    >
                        <DashNavButton
                            onClick={() => { }}
                            className={`flex justify-start items-center text-lg font-semibold gap-3 duration-500 btn glass b w-full  ${isClicked && "btn glass"
                                } ${pathname === "/dashboard" && "bg-transparent text-black"}`}
                        >
                            <FaSquarePollVertical />
                            {isClicked ? "" : "Dashboard"}
                        </DashNavButton>
                    </Link>
                    <Link
                        href={"/dashboard/noticeUpload"}
                        className="flex justify-center items-center"
                    >
                        <DashNavButton
                            onClick={() => { }}
                            className={`flex justify-start items-center0 text-lg font-semibold gap-3 duration-500 btn glass  w-full  ${isClicked && "btn glass"
                                } ${pathname === "/dashboard/noticeUpload" && "bg-transparent text-black"}`}
                        >
                            <FaPlus />
                            {isClicked ? "" : "Upload Notice"}
                        </DashNavButton>
                    </Link>

                    <Link
                        href={"/dashboard/eventsUpload"}
                        className="flex justify-center items-center"
                    >
                        <DashNavButton
                            onClick={() => { }}
                            className={`flex justify-start items-center  text-lg font-semibold gap-3 duration-500 btn glass  w-full  ${isClicked && "btn glass"
                                } ${pathname === "dashboard/eventsUpload" && "bg-transparent text-black"}`}
                        >
                            <FaLink /> {isClicked ? "" : "Events"}
                        </DashNavButton>
                    </Link>

                    <Link
                        href={"/dashboard/gallery"}
                        className="flex justify-center items-center"
                    >
                        <DashNavButton
                            onClick={() => { }}
                            className={`flex justify-start items-center  text-lg font-semibold gap-3 duration-500 btn glass w-full  ${isClicked && "btn glass"
                                } ${pathname === "/dashboard/gallery" && "bg-transparent text-black"
                                }`}
                        >
                            <FaPhotoFilm /> {isClicked ? "" : "Gallery"}
                        </DashNavButton>
                    </Link>
                    <Link
                        href={"/dashboard/routineUpload"}
                        className="flex justify-center items-center"
                    >
                        <DashNavButton
                            onClick={() => { }}
                            className={`flex justify-start items-center  text-lg font-semibold gap-3 duration-500 btn glass w-full  ${isClicked && "btn glass"
                                } ${pathname === "/dashboard/routineUpload" && "bg-transparent text-black"
                                }`}
                        >
                            <FaPhotoFilm /> {isClicked ? "" : "Routine Upload"}
                        </DashNavButton>
                    </Link>
                    <Link
                        href={"/dashboard/principle"}
                        className="flex justify-center items-center"
                    >
                        <DashNavButton
                            onClick={() => { }}
                            className={`flex justify-start items-center  text-lg font-semibold gap-3 duration-500 btn glass w-full  ${isClicked && "btn glass"
                                } ${pathname === "/dashboard/principle" && "bg-transparent text-black"
                                }`}
                        >
                            <FaPhotoFilm /> {isClicked ? "" : "Principal's Message"}
                        </DashNavButton>
                    </Link>
                </div>

                <div className="p-3">
                    <Link href={"/"}>
                        <DashNavButton
                            onClick={() => { }}
                            className="w-full flex justify-start items-center text-lg font-semibold gap-3 duration-500 btn glass">
                            {isClicked ? (
                                <FaHouse />
                            ) : (
                                <>
                                    <FaHouse /> Go to Home
                                </>
                            )}
                        </DashNavButton>
                    </Link>
                    <DashNavButton
                        onClick={() => signOut()}
                        className="w-full mt-2 flex justify-start items-center text-lg font-semibold gap-3 duration-500 btn glass"
                    >
                        {isClicked ? (
                            <FaArrowRightFromBracket />
                        ) : (
                            <>
                                <FaArrowRightFromBracket /> Logout
                            </>
                        )}
                    </DashNavButton>
                </div>
            </div>

            {/* mobile and tablet device dashboard nav */}
            <div className="drawer flex lg:hidden">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content absolute top-1 left-2">
                    {/* Page content here */}
                    <label
                        htmlFor="my-drawer"
                        className="btn glass bg-orange-200 text-white drawer-button"
                    >
                        <FaBars />
                    </label>
                </div>
                <div className="drawer-side z-40">
                    <label
                        htmlFor="my-drawer"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>
                    <ul className="menu p-4 space-y-2 w-72 min-h-full bg-base-200 text-base-content">
                        <hr />
                        <Link href={"/dashboard"}>
                            <DashNavButton
                                onClick={() => { }}
                                className={`btn glass Navbar  text-lg w-full flex justify-start items-center ${pathname === "/dashboard" && "bg-purple-500"
                                    }`}
                            >
                                <FaPlus />
                                Dashboard
                            </DashNavButton>
                        </Link>

                        <hr />
                        <Link href={"/dashboard/noticeUpload"}>
                            <DashNavButton
                                onClick={() => { }}
                                className={`flex justify-start items-center Navbar text-lg font-semibold gap-3 duration-500 btn glass  w-full
                                    } ${pathname === "/dashboard/noticeUpload" && "Navbar"}`}
                            >
                                <FaLink /> Notice Upload
                            </DashNavButton>
                        </Link>

                        <hr />
                        <Link href={"/dashboard/eventsUpload"}>
                            <DashNavButton
                                onClick={() => { }}
                                className={`flex justify-start items-center Navbar text-lg font-semibold gap-3 duration-500 btn glass  w-full ${pathname === "/dashboard/eventsUpload" && "Navbar"
                                    }`}
                            >
                                <FaCalendar />Events
                            </DashNavButton>
                        </Link>
                        <hr />
                        <Link href={"/dashboard/gallery"}>
                            <DashNavButton
                                onClick={() => { }}
                                className={`flex justify-start items-center Navbar text-lg font-semibold gap-3 duration-500 btn glass  w-full ${pathname === "/dashboard/gallery" && "Navbar"
                                    }`}
                            >
                                <FaPhotoFilm />Gallery
                            </DashNavButton>
                        </Link>
                        <hr />
                        <Link href={"/dashboard/principle"}>
                            <DashNavButton
                                onClick={() => { }}
                                className={`flex justify-start items-center Navbar text-lg font-semibold gap-3 duration-500 btn glass  w-full ${pathname === "/dashboard/principle" && "Navbar"
                                    }`}
                            >
                                <FaPhotoFilm />Principal&apos;s Message
                            </DashNavButton>
                        </Link>
                        <hr />
                        <Link href={"/"}>
                            <DashNavButton
                                onClick={() => { }}
                                className={`flex justify-start items-center Navbar text-lg font-semibold gap-3 duration-500 btn glass  w-full ${pathname === "/" && "Navbar"
                                    }`}
                            >
                                <FaCalendar /> Home
                            </DashNavButton>
                        </Link>

                        <hr />

                        <DashNavButton
                            onClick={() => signOut()}
                            className="flex justify-start items-center text-lg font-semibold gap-3 duration-500 btn glass Navbar"
                        >
                            {isClicked ? (
                                <FaArrowRightFromBracket />
                            ) : (
                                <FaArrowRightFromBracket />
                            )}
                            {"Log Out"}
                        </DashNavButton>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashNav;
