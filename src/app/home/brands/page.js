"use client";

import Brand from "@/components/Brand";
import Loader from "@/components/Loader";
import { useEffect, useState } from "react";
import getUrl from '@/app/api_url';

export default function Brands() {
    const [brands, setBrands] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getBrands() {
            const url = getUrl('api/brands/');
            try {
                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error('Failed to fetch brands');
                }
                const data = await res.json();
                setBrands(data);
            } catch (error) {
                console.error(error.message);
                setError(error.message); // Capture error
            } finally {
                setIsLoading(false); // Ensure the loading stops
            }
        }

        getBrands();
    }, []);

    return (
        <div className='w-full'>
            <h2 className='text-lg font-semibold'>Brands</h2>
            <div className='h-full py-8 flex flex-col justify-center gap-6 mt-8'>
                {/* Display loader while fetching */}
                {isLoading && <Loader />}

                {/* Display brands when loaded */}
                {!isLoading && brands.length > 0 && brands.map((brand, idx) => (
                    <Brand brand={brand} key={idx} />
                ))}

                {/* Display message if no brands are found */}
                {!isLoading && brands.length === 0 && !error && (
                    <p className='mt-10 text-center text-slate-400'>No brands available</p>
                )}

                {/* Display error message if there's an issue fetching brands */}
                {!isLoading && error && (
                    <p className='mt-10 text-center text-red-400'>{error}</p>
                )}
            </div>
        </div>
    );
}
