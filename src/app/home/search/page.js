"use client";

import Product from "@/components/Product";
import Loader from "@/components/Loader";
import { useState } from "react";
import getUrl from '@/app/api_url';
import Brand from "@/components/Brand";

export default function Search() {
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [searchBy, setSearchBy] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null); // Add state for error handling

    const handleSearch = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setBrands([]);
        setProducts([]);
        setError(null); // Reset error before new request

        try {
            const url = getUrl(`api/${searchBy}/search/?field=name&value=${name}`);
            const res = await fetch(url);
            
            if (!res.ok) {
                throw new Error('Failed to fetch data'); // Handle HTTP errors
            }

            const data = await res.json();

            if (searchBy === 'brands') {
                setBrands(data);
            } else {
                setProducts(data);
            }
        } catch (error) {
            console.error(error.message);
            setError("An error occurred while fetching data."); // Display user-friendly error
        } finally {
            setIsLoading(false); // Ensure loader stops after API call completes
        }
    };

    return (
        <div className='w-full'>
            <h2 className='text-lg font-semibold'>Search</h2>
            <form className='flex items-start flex-wrap md:items-end gap-4 mt-4 mb-8' onSubmit={handleSearch}>
                {/* Input field for search term */}
                <div className='flex flex-col'>
                    <input
                        className='px-4 py-2 border rounded-md bg-transparent'
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </div>

                {/* Dropdown to select whether to search brands or products */}
                <div className='flex flex-col'>
                    <select
                        className='px-4 py-2 border rounded-md bg-transparent'
                        name="search_by"
                        onChange={e => setSearchBy(e.target.value)}
                        required
                    >
                        <option className='dark:bg-slate-600' value="">Search By</option>
                        <option className='dark:bg-slate-600' value="brands">Brands</option>
                        <option className='dark:bg-slate-600' value="products">Products</option>
                    </select>
                </div>

                {/* Submit button */}
                <button className='md:mt-4 px-4 py-2 flex w-fit bg-green-400 dark:bg-green-600 hover:bg-green-600 flex gap-2 items-center rounded-md' type="submit">
                    <p className='text-white font-medium'>Search</p>
                </button>
            </form>

            {/* Loader for API call */}
            {isLoading && <Loader />}

            {/* Display products or brands */}
            { products.length !== 0 && (
                <div className='h-full py-8 flex justify-evenly md:justify-center md:justify-start flex-wrap gap-4 mt-8'>
                    { products.map((product, idx) => <Product product={ product } key={ idx } />) }
                </div>
            )}
            {brands.length !== 0 && brands.map((brand, idx) => <Brand brand={brand} key={idx} />)}

            {/* Display message if there's no result */}
            { !isLoading && brands.length === 0 && products.length === 0 && (
                <p className='mt-10 text-center text-slate-400'>Nothing to show</p>
            )}

            {/* Display error message if API fails */}
            {error && (
                <p className='mt-10 text-center text-red-400'>{error}</p>
            )}
        </div>
    );
}
