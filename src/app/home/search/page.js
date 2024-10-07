"use client";

import Product from "@/components/Product";
import { Formik } from "formik";
import Loader from "@/components/Loader";
import { useEffect, useState } from "react";
import getUrl from '@/app/api_url';
import ProductList from "@/components/ProductList";
import Brand from "@/components/Brand";

export default function Search() {
	const [ products, setProducts ] = useState();
	const [ brands, setBrands ] = useState();
    const [ searchBy, setSearchBy ] = useState('');
    const [ name, setName ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setBrands(null);
        setProducts(null);
        console.log(searchBy, name);
        try {
            const url = getUrl(`api/${searchBy}/search/?field=name&value=${name}`);
            const res = await fetch(url);
            const data = await res.json();

            if(searchBy === 'brands') setBrands(data);
            else setProducts(data);

            setIsLoading(false);
        } catch (error) {
            console.error(error.message);
        }
    }

	useEffect(() => {

	}, []);


	return (
		<div className='w-full'>
			<h2 className='text-lg font-semibold'>Search</h2>
            <form className='flex items-end gap-4 mt-4 mb-8' onSubmit={ handleSearch }>
                <div className='flex flex-col'>
                    <label htmlFor='name' className='mt-1 text-sm'>Name</label>
                    <input
                        className='px-4 py-2 border rounded-md bg-transparent'
                        type="text"
                        name="name"
                        id="name"
                        onChange={ e => setName(e.target.value) }
                        required={true}/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="brands" className='mt-1 text-sm'>Search By</label>
                    <select 
                        className='px-4 py-2 border rounded-md bg-transparent'
                        name="search_by" 
                        id="search_by" 
                        onChange={ e => setSearchBy(e.target.value) }
                        required={true}>
                        <option className='dark:bg-slate-600' value="">Select an option</option>
                        <option className='dark:bg-slate-600' value="brands">Brands</option>
                        <option className='dark:bg-slate-600' value="products">Products</option>
                    </select>
                </div>
                <button className='mt-4 px-4 py-2 flex w-fit bg-green-400 dark:bg-green-600 hover:bg-green-600 flex gap-2 items-center rounded-md' type="submit">
                    <p className='text-white font-medium'>Search</p>
                </button>
            </form>

            { isLoading && <Loader /> }

            { products && products.map((product, idx) => <Product product={ product } key={ idx } />) }
            { brands && brands.map((brand, idx) => <Brand brand={ brand } key={ idx } /> ) }
            { !isLoading && !brands && !products && ( <p className='mt-10 text-center text-slate-400'>Nothing to show</p> )}
		</div>
	)
}