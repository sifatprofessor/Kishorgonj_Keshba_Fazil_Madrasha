'use client';
import TransitionEffects from '@/components/TransitionEffects';
import React from 'react';

const ContactPage: React.FC = () => {
    return (
        <>
            <TransitionEffects />
            <div className='min-h-[50vh]'>
                <h1 className="text-4xl text-center mt-10">Contact Us</h1>
                <div className="flex justify-center items-center h-full flex-col mt-8 font-serif">
                    <h1 className="text-2xl">Mobile: +880194-803612</h1>
                    <h1 className="text-2xl">Email: kiskfm125024@gmail.com  </h1>
                    <h1 className="text-2xl">ডাকঘর ও উপজেলা: কিশোরগঞ্জ, জেলা: নীলফামারী</h1>
                </div>
            </div>
        </>
    );
};

export default ContactPage;
