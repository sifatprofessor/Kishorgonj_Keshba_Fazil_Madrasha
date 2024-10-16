import React from 'react';
import { CarouselDefault } from './Carousel';
import ScrollNotice from './NoticeScroll';

const Banner: React.FC = () => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            <div className='lg:col-span-2'>
                <CarouselDefault />
            </div>
            <ScrollNotice />
        </div>
    );
};

export default Banner;
