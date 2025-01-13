"use client";
import { BaseURL } from "@/utils/constant";
import { Carousel } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import UseLoader from "../Loader/useLoader";
import Image from "next/image";

interface Image {
    imageUrl: string;
    title: string;
}

export function CarouselDefault() {
    const [images, setImages] = useState<Image[]>([]);
    const [loadingIndicator, startLoading, stopLoading] = UseLoader();


    useEffect(() => {
        const fetchData = async () => {
            startLoading(); // Show loading indicator
            try {
                const response = await axios.get<Image[]>(`${BaseURL}/api/images`);
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
            {images.length > 0 ? (
                <Carousel
                    loop={true}
                    autoplay={true}
                    className="rounded-xl w-fit  max-h-[450px] mb-4 overflow-hidden" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                >
                    {images.map((image, index) => (

                        <Image
                            key={index}
                            src={image?.imageUrl}
                            alt={image?.title}
                            width={1000}
                            height={1}
                            loading="eager"
                            blurDataURL={image?.imageUrl}
                            style={{ objectFit: "cover" }}
                            className="h-full w-full"
                        />
                    ))}
                </Carousel>
            ) : (
                loadingIndicator
            )}
        </>
    );
}
