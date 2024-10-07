"use client";

import getUrl from "@/app/api_url";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductPage() {
    const [ product, setProduct ] = useState();
    const { id } = useParams();

    useEffect(() => {
        const getProduct = async () => {
            try {
                const url = getUrl(`api/product/${id}/`);
                const res = await fetch(url);
                const data = await res.json();
                setProduct(data);
                console.log(data);
            } catch (error) {   
                console.error(error.message);
            }
        }
        
        getProduct();

    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6">
			{
			product && (
				<div className="flex flex-col md:flex-row items-start gap-8">
					<div className="w-full md:w-1/2">
						<img src={product.image} alt={product.name} className="w-5/6 h-auto rounded-lg border-2 border-slate-200" />
					</div>
					<div className="w-full md:w-1/2">
						<h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">{product.name}</h1>
						<p className="text-gray-500 dark:text-slate-400 mb-4">{product.category}</p>
						<p className="text-gray-700 dark:text-slate-200 mb-6">{product.description}</p>
						<div className="flex items-center mb-6">
							<span className="text-2xl font-semibold text-green-600 dark:text-green-400">${product.price}</span>
						</div>
						<div className="mb-4">
							<span className={`px-3 py-1 rounded-full text-sm font-medium ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
								{product.stock > 0 ? `In Stock (${product.stock} left)` : 'Out of Stock'}
							</span>
						</div>
					</div>
				</div>
			)
			}
        </div>
    )
}