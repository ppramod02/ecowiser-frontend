"use client";

import Product from "@/components/Product";
import Loader from "@/components/Loader";
import { useEffect, useState } from "react";
import getUrl from '@/app/api_url';

export default function Products() {
	const [ products, setProducts ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);

	useEffect(() => {
		async function getProducts() {
			const url = getUrl('api/products/');
			try {
				const res = await fetch(url);
				const data = await res.json();
				console.log(data);
				setProducts(data);
                setIsLoading(false);
			} catch (error) {
				console.error(error.message);
			}
		}

		getProducts();
	}, []);
	return (
		<div className='w-full'>
			<h2 className='text-lg font-semibold'>Products</h2>
			<div className='h-full py-8 flex justify-center md:justify-start flex-wrap gap-4 mt-8'>
                {
					isLoading && <Loader />
				}
				{
					products && products.map((product, idx) => <Product product={product} key={idx} />)
				}
			</div>
		</div>
	)
}