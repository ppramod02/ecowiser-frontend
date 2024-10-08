"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import BrandList from "@/components/BrandList";
import Link from "next/link";
import { useUser } from "@/contexts/UserContext";
import { FaPlus } from "react-icons/fa6";
import ProductList from "@/components/ProductList";
import getUrl from '@/app/api_url';

export default function Dashboard() {
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useUser();

    useEffect(() => {
        async function getProducts() {
            const url = getUrl(`api/data/${user.id}/`);
            try {
                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await res.json();
                setProducts(data.products || []);
                setBrands(data.brands || []);
            } catch (error) {
                console.error(error.message);
                setError('Failed to load data');
            } finally {
                setIsLoading(false);
            }
        }

        if (user) getProducts();
    }, [user]);

    return (
        <div className='w-full'>
            <h2 className='text-lg font-semibold'>Dashboard</h2>
            <div className='h-full w-full py-8 flex justify-center md:justify-start flex-wrap gap-4 mt-8'>
                {/* Loading state */}
                {isLoading && user && <Loader />}

                {/* Error state */}
                {!isLoading && error && <p className='w-full text-center text-red-400'>{error}</p>}

                {/* No user */}
                {!user && <p className='w-full text-center text-slate-400'>Login to create and manage brands</p>}

                {/* Brands and Products */}
                {!isLoading && !error && user && (
                    <>	
						<div className='w-full flex items-center justify-between'>
							<h4 className='text-md font-medium'>Your Brands</h4>
							<button className=''>
								<Link href='/home/brand/create' className='px-2 py-1 flex items-center gap-2 font-medium bg-green-400 text-white dark:text-black rounded-md'>
									<FaPlus />
									Create
								</Link>
							</button>
						</div>
                        {brands.length > 0 ? (
                            <BrandList brands={brands} setBrands={setBrands} />
                        ) : (
                            <p className='w-full text-center text-slate-400'>No brands found</p>
                        )}

						<div className='mt-8 w-full flex items-center justify-between'>
							<h4 className='text-md font-medium'>Your Products</h4>
							<button className=''>
								<Link href='/home/product/create' className='px-2 py-1 flex items-center gap-2 font-medium bg-green-400 text-white dark:text-black rounded-md'>
									<FaPlus />
									Create
								</Link>
							</button>
						</div>                        
                        {products.length > 0 ? (
                            <ProductList products={products} setProducts={setProducts} />
                        ) : (
                            <p className='w-full text-center text-slate-400'>No products found</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
