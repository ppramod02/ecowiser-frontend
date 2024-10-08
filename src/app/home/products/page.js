"use client";

import Product from "@/components/Product";
import Loader from "@/components/Loader";
import { useEffect, useState } from "react";
import getUrl from '@/app/api_url';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getProducts() {
            const url = getUrl('api/products/');
            try {
                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error(error.message);
                setError(error.message); // Capture error
            } finally {
                setIsLoading(false); // Always stop loader
            }
        }

        getProducts();
    }, []);

    return (
        <div className='w-full'>
            <h2 className='text-lg font-semibold'>Products</h2>
            <div className='h-full py-8 flex justify-evenly md:justify-center md:justify-start flex-wrap gap-4 mt-8'>
                {/* Loader for API call */}
                {isLoading && <Loader />}

                {/* Display products or error */}
                {!isLoading && products.length > 0 && products.map((product, idx) => (
                    <Product product={product} key={idx} />
                ))}

                {/* Show message if no products found */}
                {!isLoading && products.length === 0 && !error && (
                    <p className='mt-10 text-center text-slate-400'>No products available</p>
                )}

                {/* Error message */}
                {!isLoading && error && (
                    <p className='mt-10 text-center text-red-400'>{error}</p>
                )}
            </div>
        </div>
    );
}
