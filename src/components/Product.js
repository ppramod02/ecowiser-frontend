import Link from "next/link";

export default function Product({ product }) {
    return (
        <div className='product w-5/12 md:w-fit p-3 flex flex-col justify-center gap-2 border border-black dark:border-slate-500 rounded-lg'>
            <div className='flex gap-4 items-center'>
                <img src={ product.image } className='rounded-md md:w-[200px] md:h-[200px]' alt='product image' />
            </div>
            <div>
                <h4 className='md:text-lg font-medium'>{ product.name }</h4>
                <p>${ product.price }</p>
            </div>
            <div className='mt-auto'>
                <button className='px-4 py-1 w-full bg-green-400 dark:bg-green-500 hover:bg-green-600 flex gap-2 justify-center rounded-md'>
                    <Link href={`/home/product/${product.id}`}>
                        <p className='text-white font-medium'>Explore</p>
                    </Link>
                </button>
            </div>
        </div>
    )
}