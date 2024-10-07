"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import BrandList from "@/components/BrandList";
import { useUser } from "@/contexts/UserContext";
import ProductList from "@/components/ProductList";
import getUrl from '@/app/api_url';

export default function Dashboard() {
	const [ products, setProducts ] = useState([]);
	const [ brands, setBrands ] = useState([]);
    const [ message, setMessage ] = useState('');
    const [ isLoading, setIsLoading ] = useState(true);
    const { user } = useUser();

	useEffect(() => {
		async function getProducts() {
			const url = getUrl(`api/data/${ user.id }/`);
			try {
				const res = await fetch(url);
				const data = await res.json();
				// console.log(data);
				setProducts(data.products);
				setBrands(data.brands);
                setIsLoading(false);
			} catch (error) {
				console.error(error.message);
			}
		}

		if(user) getProducts();
	}, [user]);
	return (
		<div className='w-full'>
			<h2 className='text-lg font-semibold'>Dashboard</h2>
			<div className='h-full w-full py-8 flex justify-center md:justify-start flex-wrap gap-4 mt-8'>
                { isLoading && user && <Loader /> }
                { !isLoading && brands && <BrandList brands={ brands } setBrands={ setBrands } /> }
                { !isLoading && products && <ProductList products={ products } setProducts={ setProducts } /> }
                {
                    !user && <p className='w-full m-auto text-center text-slate-400'>Login to create and manage brands</p>
                }
			</div>
		</div>
	)
}