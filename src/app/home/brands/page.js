"use client";


import Brand from "@/components/Brand";
import Loader from "@/components/Loader";
import { useEffect, useState } from "react";
import getUrl from '@/app/api_url';

export default function Brands() {
	const [ brands, setBrands ] = useState([]);
	const [ isLoading, setIsLoading ] = useState(true);

	useEffect(() => {
		async function getBrands() {
			const url = getUrl('api/brands/');
			try {
				const res = await fetch(url);
				const data = await res.json();
				setBrands(data);
				setIsLoading(false);
			} catch (error) {
				console.error(error.message);
			}
		}

		getBrands();
	}, []);
	return (
		<div className='w-full'>
			<h2 className='text-lg font-semibold'>Brands</h2>
			<div className='h-full py-8 flex flex-col justify-center gap-6 mt-8'>
				{
					isLoading && <Loader />
				}
				{
					brands && brands.map((brand, idx) => <Brand brand={brand} key={idx} />)
				}
			</div>
		</div>
	)
}