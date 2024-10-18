'use client';
import TransitionEffects from '@/components/TransitionEffects';
import axios from 'axios';
import React, { useEffect } from 'react';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";

const ClassRoutine: React.FC = () => {
    const [pdfUrl, setPdfUrl] = React.useState<string>("");
    useEffect(() => {
        axios.get('/api/routine/exam').then((res) => {
            console.log(res.data[0].file);
            setPdfUrl(res.data[0].file);
        }
        ).catch((err) => {
            console.log(err);
        }
        )
    }, []);

    const docs = [
        {
            uri: pdfUrl,
            fileName: 'Exam Routine',

        },
    ];

    return (

        <>
            <TransitionEffects />
            <div className='min-h-[50vh]'>
                <h1 className="text-4xl text-center mt-10">Exam Routine</h1>
                <div className="flex justify-center items-center h-full">
                    <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
                </div>
            </div>
        </>
    );
};

export default ClassRoutine;
