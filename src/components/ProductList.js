import { FaPencil, FaPlus } from "react-icons/fa6"
import { FaTrashAlt } from "react-icons/fa";
import Link from "next/link";

export default function ProductList({ products, setProducts }) {

    const handleDelete = async ( id ) => {
        try {
            const url = `http://127.0.0.1:8000/api/product/${id}/`;
            setProducts(products.filter(product => product.id !== id));
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
        <div className='product-list mt-4 w-full flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
                <h4 className='text-md font-medium'>Your Products</h4>
                <button className=''>
                    <Link href='/home/product/create' className='px-2 py-1 flex items-center gap-2 font-medium bg-green-400 text-white dark:text-black rounded-md'>
                        <FaPlus />
                        Create
                    </Link>
                </button>
            </div>
            {
                products.map((product, idx) => {
                    return (
                        <div className='product flex gap-4 items-center' key={ idx }>
                            <img src={ product.image } className='w-[30px] h-[30px] md:w-[50px] md:h-[50px] border-2 border-slate-200 rounded-md' alt='product logo'  />
                            <h2 className='text-lg text-sm font-medium'>{ product.name }</h2>
                            <button className='ml-auto text-blue-400 p-2'>
                                <Link href={`/home/product/edit/${product.id}`} className='flex gap-2 items-center'>
                                    <FaPencil />
                                    <p className='hidden md:block'>Edit</p>
                                </Link>
                            </button>
                            <button className='text-red-400 p-2' onClick={ () => handleDelete(product.id) }>
                                <Link href='/home/dashboard/' className='flex gap-2 items-center'>
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