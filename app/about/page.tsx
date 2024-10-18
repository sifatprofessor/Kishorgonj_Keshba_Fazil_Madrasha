'use client';
import TransitionEffects from '@/components/TransitionEffects';
import React from 'react';

const AboutMadrasha: React.FC = () => {
    return (
        <>
            <TransitionEffects />
            <div className='min-h-[50vh]'>
                <h1 className="text-4xl text-center mt-10  font-serif underline mb-2">About Madrasha</h1>
                <div className="flex justify-center items-center h-full">
                    <h1 className="text-2xl font-serif">It&apos;s an educational institute situated at Kishorganj Sadar upazila under Nilphamari district.</h1>
                </div>
            </div>
        </>
    );
};

export default AboutMadrasha;
