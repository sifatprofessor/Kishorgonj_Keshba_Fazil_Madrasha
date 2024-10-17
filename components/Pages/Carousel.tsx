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
                    className="rounded-xl h-[450px] w-fit mb-4 object-cover overflow-hidden" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                >
                    {images.map((image, index) => (
                        <div key={index} className="h-full w-full object-cover">
                            <Image
                                src={image?.imageUrl}
                                alt={image?.title}
                                width={1000}
                                height={1}
                                loading="eager"
                                placeholder="blur"
                                blurDataURL={image?.imageUrl}
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                    ))}
                </Carousel>
            ) : (
                loadingIndicator
            )}
        </>
    );
}
