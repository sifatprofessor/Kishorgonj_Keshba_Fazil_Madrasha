"use client";
import { BaseURL } from "@/utils/constant";
/* eslint-disable @next/next/no-img-element */
import { Carousel } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import UseLoader from "../Loader/useLoader";

export function CarouselDefault() {
  const [images, setImages] = useState([]);
  const [loadingIndicator, startLoading, stopLoading] = UseLoader();

  useEffect(() => {
    const fetchData = async () => {
      startLoading(); // Show loading indicator
      try {
        const response = await axios.get(`${BaseURL}/api/images`);
        setImages(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        stopLoading(); // Hide loading indicator
      }
    };

    fetchData(); // Only called once due to empty dependency array
  }, [startLoading, stopLoading]);

  return (
    <>
     {
      images.length > 0 ?  <Carousel
      loop={true}
      autoplay={0.5}
      className="rounded-xl h-[450px] w-fit mb-4"
    >
      {images.map((image, index) => (
        <img
          key={index}
          src={image?.imageUrl}
          alt={image?.title}
          className="h-full w-full object-cover"
        />
      ))}
    </Carousel> : loadingIndicator
     }
    </>
  );
}
