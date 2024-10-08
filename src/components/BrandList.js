import { FaPencil, FaPlus } from "react-icons/fa6"
import { FaTrashAlt } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import toast from "react-hot-toast";

export default function BrandList({ brands, setBrands }) {
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ brandId, setBrandId ] = useState(-1);

    const handleDelete = async ( id ) => {
        try {
            const url = `http://127.0.0.1:8000/api/brand/${id}/`;
            setBrands(brands.filter(brand => brand.id !== id));
            const res = await fetch(url, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });
            if(res.ok) {
                toast.success('Brand deleted successfully');
            }

        } catch (error) {
            console.error(error.message);
        }
        setModalOpen(false);
        setBrandId(-1);
    }

    return (
        <div className='brand-list w-full flex flex-col gap-4'>
            <Modal 
            isOpen={ modalOpen } 
            setIsOpen={ setModalOpen } 
            modalText='Are you sure you want to delete?'
            buttonText='Delete'
            action={ handleDelete } />
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
                            <button className='text-red-400 p-2' onClick={ () => { 
                                setModalOpen(true); 
                                setBrandId(brand.id); 
                            } }>
                                <Link href='/home/dashboard' className='flex gap-2 items-center'>
                                    <FaTrashAlt />
                                    <p className='hidden md:block'>Delete</p>
                                </Link>
                            </button>
                            {
                                brandId === brand.id && (
                                    <Modal 
                                    isOpen={ modalOpen } 
                                    setIsOpen={ setModalOpen } 
                                    modalText='Are you sure you want to delete?'
                                    buttonText='Delete'
                                    action={ () => handleDelete(brand.id) } />
                                )
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}