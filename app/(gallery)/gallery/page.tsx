import GalleryPhoto from "@/components/Pages/GalleryPhoto";
import React, { FC } from "react";

const Gallery: FC = () => {
    return (
        <>
            <div className="min-h-[50vh] px-4">
                <GalleryPhoto />
            </div>
        </>
    );
};

export default Gallery;
