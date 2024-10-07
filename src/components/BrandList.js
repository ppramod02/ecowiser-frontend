import { FaPencil, FaPlus } from "react-icons/fa6"
import { FaTrashAlt } from "react-icons/fa";
import Link from "next/link";
import { useEffect } from "react";

export default function BrandList({ brands, setBrands }) {

    const handleDelete = async ( id ) => {
        try {
            const url = `http://127.0.0.1:8000/api/brand/${id}/`;
            setBrands(brands.filter(brand => brand.id !== id));
            const res = await fetch(url, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await res.json();
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <div className='brand-list w-full flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
                <h4 className='text-md font-medium'>Your Brands</h4>
                <button className=''>
                    <Link href='/home/brand/create' className='px-2 py-1 flex items-center gap-2 font-medium bg-green-400 text-white dark:text-black rounded-md'>
                        <FaPlus />
                        Create
                    </Link>
                </button>
            </div>
            {
                brands.map((brand, idx) => {
                    return (
                        <div className='brand flex gap-4 items-center' key={ idx }>
                            <img src={ brand.logo } className='w-[30px] h-[30px] md:w-[40px] md:h-[40px] border-2 border-green-200 rounded-full' alt='brand logo'  />
                            <h2 className='md:text-lg text-sm font-medium'>{ brand.name }</h2>
                            <button className='ml-auto text-blue-400 p-2'>
                                <Link href={`/home/brand/edit/${ brand.id }`} className='flex gap-2 items-center'>
                                    <FaPencil />
                                    <p className='hidden md:block'>Edit</p>
                                </Link>
                            </button>
                            <button className='text-red-400 p-2' onClick={ () => handleDelete(brand.id) }>
                                <Link href='/home/dashboard' className='flex gap-2 items-center'>
                                    <FaTrashAlt />
                                    <p className='hidden md:block'>Delete</p>
                                </Link>
                            </button>
                        </div>
                    )
                })
            }
        </div>
    )
}