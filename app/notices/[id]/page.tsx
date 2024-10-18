"use client"
import axios from 'axios';
import React, { useEffect } from 'react'
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import { BaseURL } from '@/utils/constant';

interface PDFViewProps {
    params: {
        id: string;
    }
}

const PDFView = (props: PDFViewProps) => {
    const { id } = props.params;
    interface NoticeData {
        file: string;
        title: string;
    }
    const [data, setData] = React.useState<NoticeData | null>(null);

    useEffect(() => {
        axios.get(`${BaseURL}/api/noticepdf/${id}`)
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }
        , [id]);
    const docs = data ? [{
        uri: data?.file,
        fileName: data?.title,

    }] : [];
    return (
        <div className='min-h-[70vh] mt-2'>
            <button
                onClick={() => window.history.back()}
                className='btn  mb-4 border-2 text-xl border-transparent relative overflow-hidden transition duration-300 ease-in-out'>
                <span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </span>
                Go Back

                <style jsx>{`
        button:hover {
            border-color: transparent;
            animation: rgb-border-animation .5s infinite;
        }

        @keyframes rgb-border-animation {
            0% { border-color: red; }
            33% { border-color: green; }
            66% { border-color: blue; }
            100% { border-color: red; }
        }
    `}</style>
            </button>

            {
                <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
            }
        </div>
    )
}

export default PDFView;
