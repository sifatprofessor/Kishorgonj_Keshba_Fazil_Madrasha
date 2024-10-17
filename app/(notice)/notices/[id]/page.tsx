"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";

interface PDFViewProps {
    params: {
        id: string;
    }
}



const PDFView = (props: PDFViewProps) => {
    const router = useRouter();
    const { id } = props.params;
    interface NoticeData {
        file: string;
    }

    const [data, setData] = React.useState<NoticeData | null>(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/noticepdf/${id}`)
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }
        , [id]);
    const docs = data ? [{
        uri: data.file,
        fileName: 'Notice'

    }] : []; // Remote file
    return (
        <div>
            <button
                onClick={() => router.back()}
                className='btn btn-ghost'><span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg></span> Go Back</button>
            {data && (
                <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
            )}
        </div>
    )
}

export default PDFView;
