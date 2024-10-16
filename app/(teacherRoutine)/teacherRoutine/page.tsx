'use client';
import TransitionEffects from '@/components/TransitionEffects';
import React, { FC } from 'react';

const TeacherRoutine: FC = () => {
    return (
        <>
            <TransitionEffects />
            <div className='min-h-[50vh]'>
                <h1 className="text-4xl text-center mt-10">Teacher Routine</h1>
                <div className="flex justify-center items-center h-full">
                    // TODO: Add data
                    <h1 className="text-2xl">No Data Found</h1>
                </div>
            </div>
        </>
    );
};

export default TeacherRoutine;
