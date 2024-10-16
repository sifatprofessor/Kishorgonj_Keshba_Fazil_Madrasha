"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

interface PDFViewProps {
    params: {
        id: string;
    }
}



const PDFView = (props: PDFViewProps) => {
    const router = useRouter();
    const { id } = props.params;
    const [data, setData] = React.useState<any>(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/noticepdf/${id}`)
            .then(res => {
                setData(res.data);
                console.log("first", res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }
        , [id]);
    console.log(id);
    console.log(data);
    return (
        <div>
            <button
                onClick={() => router.back()}
                className='btn btn-ghost'><span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg></span> Go Back</button>
            {data && (
                <iframe
                    src={data?.file}
                    className='w-full lg:w-[90%] h-[700px]'
                    style={{ border: 'none' }}
                />
            )}
        </div>
    )
}

export default PDFView;
