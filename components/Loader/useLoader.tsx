'use client';
import React, { useState, useCallback } from 'react';
import Loading from './Loading';

type UseLoaderReturnType = [
    React.ReactNode,
    () => void,
    () => void
];

export default function UseLoader(): UseLoaderReturnType {
    const [loading, setLoading] = useState<boolean>(false);

    const startLoading = useCallback(() => setLoading(true), []);
    const stopLoading = useCallback(() => setLoading(false), []);

    return [
        loading ? <Loading key="loading" /> : null,
        startLoading,
        stopLoading,
    ];
}
