'use client';
import React, { useEffect, useState } from "react";
import Logo from "/public/Logo.png";
import Image from "next/image";
import "./Nav.css";
import Link from "next/link";


const Navbar = () => {

const [containerStyle, setContainerStyle] = useState({
  backgroundImage: "url('https://utfs.io/f/9f9783bc-d539-4192-a843-6f733d23a9ac-1zr6n.png')",
  backgroundColor: "#FEF9C7",
  backgroundSize: '2%',
  backgroundPosition: "bottom",
  backgroundRepeat: "repeat-x",
  transition: "background-size 0.5s ease, background-color 0.5s ease",
});

  useEffect(() => {
    const updateBackgroundSize = () => {
      const screenWidth = window.innerWidth;
  
      let backgroundSize = '2%';
  
      if (screenWidth <= 600) {
        backgroundSize = '5%';
      } else if (screenWidth <= 1024) {
        backgroundSize = '4%';
      }
  
      setContainerStyle(prevStyle => ({
        ...prevStyle,
        backgroundSize: backgroundSize,
      }));
    };
  
    updateBackgroundSize();
    window.addEventListener('resize', updateBackgroundSize);
  
    return () => {
      window.removeEventListener('resize', updateBackgroundSize);
    };
  }, []);
  
  const year = new Date().getFullYear();
  return (
    <div
      className="container-fluid bgImage px-2 lg:px-20 flex flex-wrap items-center justify-center md:justify-between p-4 transition-all duration-500 ease-in-out"
      style={containerStyle}
    >
      <div className="flex-shrink-0 flex justify-center w-full md:w-auto mb-4 md:mb-0">
        <Image
          width="auto"
          height="auto"
          src={Logo}
          alt="Logo"
          priority
          className="w-[150px] h-auto transition-all duration-500 ease-in-out"
        />
      </div>
      <div className="flex-grow text-center w-full md:w-auto mb-4 md:mb-0 transition-all duration-500 ease-in-out">
        <h1 className="text-sm font-bold transition-all duration-500 ease-in-out">
          بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
        </h1>
        <h1 className="text-lg md:text-2xl font-black font-arabic transition-all duration-500 ease-in-out">
          كِيشُورْجَانْج كِيشْبَا فَاضِل مَدْرَسَة
        </h1>
        <h1 className="text-lg md:text-2xl mt-1 font-bold font-bangla transition-all duration-500 ease-in-out">
          কিশোরগঞ্জ কেশবা ফাজিল মাদরাসা
        </h1>
        <h1 className="text-xl md:text-2xl font-black transition-all duration-500 ease-in-out">
          Kishorgonj Keshba Fazil Madrasah
        </h1>
        <p className="font-bangla transition-all duration-500 ease-in-out">
          ডাকঘর ও উপজেলা: কিশোরগঞ্জ, জেলা: নীলফামারী
        </p>
        <p className="font-bangla transition-all duration-500 ease-in-out">
          স্থাপিতঃ ১৯৭৩ ইং
        </p>
        <p className="font-bangla transition-all duration-500 ease-in-out">
          ইআইআইএন নংঃ ১২৫০২৪, মাদরাসা কোডঃ ১৪৯০১
        </p>
      </div>
      <div className="flex-shrink-0 flex justify-center w-full md:w-full lg:w-auto text-center md:text-right font-nano transition-all duration-500 ease-in-out">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3 mx-auto justify-center items-center">
          <Link href="/">
          <button className="Btn-Container md:mt-4">
            <span className="text">Online Admission</span>
            <span className="icon-Container">
              <svg
                width="16"
                height="19"
                viewBox="0 0 16 19"
                fill="nones"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="1.61321" cy="1.61321" r="1.5" fill="black"></circle>
                <circle cx="5.73583" cy="1.61321" r="1.5" fill="black"></circle>
                <circle cx="5.73583" cy="5.5566" r="1.5" fill="black"></circle>
                <circle cx="9.85851" cy="5.5566" r="1.5" fill="black"></circle>
                <circle cx="9.85851" cy="9.5" r="1.5" fill="black"></circle>
                <circle cx="13.9811" cy="9.5" r="1.5" fill="black"></circle>
                <circle cx="5.73583" cy="13.4434" r="1.5" fill="black"></circle>
                <circle cx="9.85851" cy="13.4434" r="1.5" fill="black"></circle>
                <circle cx="1.61321" cy="17.3868" r="1.5" fill="black"></circle>
                <circle cx="5.73583" cy="17.3868" r="1.5" fill="black"></circle>
              </svg>
            </span>
          </button>
          </Link>
          <Link href="https://xiclassadmission.gov.bd/">
          <button className="Btn-Container md:mt-4 lg:mt-0">
            <span className="text">
              Xi Class Admission {year}-{year + 1}{" "}
            </span>
            <span className="icon-Container">
              <svg
                width="16"
                height="19"
                viewBox="0 0 16 19"
                fill="nones"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="1.61321" cy="1.61321" r="1.5" fill="black"></circle>
                <circle cx="5.73583" cy="1.61321" r="1.5" fill="black"></circle>
                <circle cx="5.73583" cy="5.5566" r="1.5" fill="black"></circle>
                <circle cx="9.85851" cy="5.5566" r="1.5" fill="black"></circle>
                <circle cx="9.85851" cy="9.5" r="1.5" fill="black"></circle>
                <circle cx="13.9811" cy="9.5" r="1.5" fill="black"></circle>
                <circle cx="5.73583" cy="13.4434" r="1.5" fill="black"></circle>
                <circle cx="9.85851" cy="13.4434" r="1.5" fill="black"></circle>
                <circle cx="1.61321" cy="17.3868" r="1.5" fill="black"></circle>
                <circle cx="5.73583" cy="17.3868" r="1.5" fill="black"></circle>
              </svg>
            </span>
          </button>
          </Link>
          <h1 className="text-black font-bangla ">Contact US: 01794803612</h1>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
