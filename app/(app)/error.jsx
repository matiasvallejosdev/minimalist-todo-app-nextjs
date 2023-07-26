'use client';
import React from 'react';

export default function Error ({ error, reset }) {
    return (
        <div className="bg-red-500 text-white p-4">
            <h2 className="text-2xl mb-4">Something went wrong!</h2>
            <p className="mb-4">{error}</p>
            <button
                className="bg-white text-red-500 py-2 px-4 rounded shadow"
                onClick={() => reset()}
            >
                Try again
            </button>
        </div>
    );
};

