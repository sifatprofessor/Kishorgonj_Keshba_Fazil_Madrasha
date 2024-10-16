"use client";
import React, { useState, useEffect, Fragment } from "react";
import './menu.css';
import {
    Navbar,
    Collapse,
    Typography,
    Button,
    IconButton,
    List,
    ListItem,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import {
    ChevronDownIcon,
    Bars3Icon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { FaHouseMedical, FaImage, FaPerson } from "react-icons/fa6";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Logout from "../Logout/Logout";

interface Link {
    name: string;
    link: string;
}

interface NavListMenuProps {
    data: {
        buttonName: string;
        Links: Link[];
    };
}

function NavListMenu({ data }: NavListMenuProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const buttons = data;

    return (
        <Fragment>
            <Menu
                open={isMenuOpen}
                handler={setIsMenuOpen}
                placement="bottom"
                allowHover={true}
            >
                <MenuHandler>
                    <Typography as="div" variant="small" className="font-bold" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                        <ListItem
                            className="flex items-center gap-2 py-2 pr-4 font-bold text-black Navbar"
                            selected={isMenuOpen || isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen((cur) => !cur)}
                            placeholder=""
                            onPointerEnterCapture={() => { }}
                            onPointerLeaveCapture={() => { }}
                        >
                            {buttons?.buttonName}
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`hidden h-3 w-3 transition-transform lg:block ${isMenuOpen ? "rotate-180" : ""
                                    }`}
                            />
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`block h-3 w-3 transition-transform lg:hidden ${isMobileMenuOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </ListItem>
                    </Typography>
                </MenuHandler>
                <MenuList
                    className="hidden rounded-xl lg:block Navbar text-black"
                    placeholder=""
                    onPointerEnterCapture={() => { }}
                    onPointerLeaveCapture={() => { }}
                >
                    {buttons.Links.map((link, index) => (
                        <Typography className="font-bold" key={index} as="a" href={link?.link} placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                            {link.name}
                        </Typography>
                    ))}
                </MenuList>
            </Menu>
            <div className="block lg:hidden">
                <Collapse open={isMobileMenuOpen}>
                    {buttons.Links.map((link, index) => (
                        <Typography
                            key={index}
                            as="a"
                            href={link.link}
                            variant="small"
                            color="black"
                            className="font-bold"
                            placeholder=""
                            onPointerEnterCapture={() => { }}
                            onPointerLeaveCapture={() => { }}
                        >
                            <ListItem
                                className="flex items-center gap-2 py-2 pr-4"
                                placeholder=""
                                onPointerEnterCapture={() => { }}
                                onPointerLeaveCapture={() => { }}
                            >
                                {link.name}
                            </ListItem>
                        </Typography>
                    ))}
                </Collapse>
            </div>
        </Fragment>
    );
}

function NavList() {
    const session = useSession();
    console.log(session);
    return (
        <List
            className="mb-6 mt-4 p-0 lg:mb-0 lg:mt-0 lg:flex-row lg:p-1 Navbar"
            placeholder=""
            onPointerEnterCapture={() => { }}
            onPointerLeaveCapture={() => { }}
        >
            <Typography
                as="a"
                href="/"
                variant="small"
                color="blue-gray"
                className="font-bold "
                placeholder=""
                onPointerEnterCapture={() => { }}
                onPointerLeaveCapture={() => { }}
            >
                <ListItem
                    placeholder=""
                    onPointerEnterCapture={() => { }}
                    onPointerLeaveCapture={() => { }}
                    className="flex items-center gap-2 py-2 pr-4">
                    Home <FaHouseMedical />
                </ListItem>
            </Typography>
            <NavListMenu
                data={{
                    buttonName: "Administration & Other's Info",
                    Links: [
                        { name: "Principle's Message", link: "principleMessage" },
                        { name: "Founder's Message", link: "founderMessage" },
                    ],
                }}
            />
            <NavListMenu
                data={{
                    buttonName: "Academic",
                    Links: [
                        { name: "Academic Calender", link: "academicCalender" },
                        { name: "Academic Result", link: "academicResult" },
                        { name: "Academic Syllabus", link: "academicSyllabus" },
                    ],
                }}
            />
            <Link href="/notices">
                <button>
                    <ListItem placeholder=""
                        onPointerEnterCapture={() => { }}
                        onPointerLeaveCapture={() => { }}
                        className="flex items-center gap-2 py-2 pr-4 font-bold text-sm text-black">
                        Notice
                    </ListItem>
                </button>
            </Link>
            <NavListMenu
                data={{
                    buttonName: "Routine",
                    Links: [
                        { name: "Class Routine", link: "classRoutine" },
                        { name: "Exam Routine", link: "examRoutine" },
                        { name: "Teacher's Schedule", link: "teacherRoutine" },
                    ],
                }}
            />
            <Typography
                as="a"
                href="gallery"
                variant="small"
                color="blue-gray"
                className="font-bold"
                placeholder=""
                onPointerEnterCapture={() => { }}
                onPointerLeaveCapture={() => { }}
            >
                <ListItem
                    placeholder=""
                    onPointerEnterCapture={() => { }}
                    onPointerLeaveCapture={() => { }}
                    className="flex items-center gap-2 py-2 pr-4">
                    Gallery <FaImage />
                </ListItem>
            </Typography>
            <Typography
                as="a"
                href="about"
                variant="small"
                color="blue-gray"
                className="font-bold"
                placeholder=""
                onPointerEnterCapture={() => { }}
                onPointerLeaveCapture={() => { }}
            >
                <ListItem placeholder=""
                    onPointerEnterCapture={() => { }}
                    onPointerLeaveCapture={() => { }}
                    className="flex items-center gap-2 py-2 pr-4">
                    About Us
                </ListItem>
            </Typography>
            <Typography
                as="a"
                href="contact"
                variant="small"
                color="blue-gray"
                className="font-bold"
                placeholder=""
                onPointerEnterCapture={() => { }}
                onPointerLeaveCapture={() => { }}
            >
                <ListItem placeholder=""
                    onPointerEnterCapture={() => { }}
                    onPointerLeaveCapture={() => { }}
                    className="flex items-center gap-2 py-2 pr-4">
                    Contact<FaPerson />
                </ListItem>
            </Typography>
            {session.data ? (
                <div>
                    <Logout />
                </div>
            ) : (
                <Typography
                    as="a"
                    href="login"
                    variant="small"
                    color="blue-gray"
                    className="font-bold"
                    placeholder=""
                    onPointerEnterCapture={() => { }}
                    onPointerLeaveCapture={() => { }}
                >
                    <ListItem placeholder=""
                        onPointerEnterCapture={() => { }}
                        onPointerLeaveCapture={() => { }}
                        className="flex items-center gap-2 py-2 pr-4">
                        Login
                    </ListItem>
                </Typography>
            )}
            {session.data ? (
                <Typography
                    as="a"
                    href="dashboard"
                    variant="small"
                    color="blue-gray"
                    className="font-bold"
                    placeholder=""
                    onPointerEnterCapture={() => { }}
                    onPointerLeaveCapture={() => { }}
                >
                    <ListItem placeholder=""
                        onPointerEnterCapture={() => { }}
                        onPointerLeaveCapture={() => { }}
                        className="flex items-center gap-2 py-2 pr-4">
                        Dashboard
                    </ListItem>
                </Typography>
            ) : null}
        </List>
    );
}

export function MenuBar() {
    const [openNav, setOpenNav] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 960) {
                setOpenNav(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <Navbar
            className="max-w-full py-2 Navbar"
            placeholder=""
            onPointerEnterCapture={() => { }}
            onPointerLeaveCapture={() => { }}
        >
            <div className="flex items-center justify-between text-blue-gray-900">
                <div className="hidden lg:block">
                    <NavList />
                </div>
                <IconButton
                    variant="text"
                    className="lg:hidden"
                    onClick={() => setOpenNav(!openNav)}
                    placeholder=""
                    onPointerEnterCapture={() => { }}
                    onPointerLeaveCapture={() => { }}
                >
                    {openNav ? (
                        <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                    ) : (
                        <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                    )}
                </IconButton>
            </div>
            <Collapse open={openNav}>
                <NavList />
                <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
                    <Button placeholder=""
                        onPointerEnterCapture={() => { }}
                        onPointerLeaveCapture={() => { }}
                        variant="outlined" size="sm" fullWidth>
                        <Link href="/login">Login</Link>
                    </Button>
                </div>
            </Collapse>
        </Navbar>
    );
}
