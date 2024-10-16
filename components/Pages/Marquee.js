"use client";
import { BaseURL } from "@/utils/constant";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import '../Navbar/menu.css'

const Running_Banner = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    axios.get(`${BaseURL}/api/notice`).then((res) => {
      setNotices(res.data);
    });
  }, []);

  return (
    <div className="mb-4 pt-4" data-testid="homeBanner3">
      <div className="flex items-center justify-center">
        <div className="px-4 py-2 font-black Navbar rounded-lg mr-2 text-nowrap">জরুরি নোটিশ</div>

        <Marquee gradient={false} speed={50} pauseOnHover>
          {notices.map((notice, index) => (
            <p key={index} className="text-[#333] font-semibold text-sm mr-10 py-2 relative pl-12 flex items-center justify-center">
              <span className="w-8 h-8 ">
                <Image width={100} height={100} src="https://utfs.io/f/e448fa3b-ca07-4d1f-acfc-ab97c76febc3-9zemm8.gif" alt="notice"  />
              </span>
              {notice?.description}{" "}
              <span className="text-red-400">({notice?.date})</span>
            </p>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default Running_Banner;
