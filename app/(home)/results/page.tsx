'use client';
import React from 'react'

const Results = () => {
    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <iframe
                src="http://www.educationboardresults.gov.bd/"
                style={{ width: '100%', height: '100%', border: 'none' }}
                title="Education Board Results"
                onError={(e) => {
                    e.currentTarget.src = "https://kkfm.vercel.app/";
                }}
            ></iframe>
        </div>
    )
}

export default Results;
