"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import Link from "next/link";
import { FaUserAstronaut } from "react-icons/fa6";


export default function HomeLayout({ children }) {
	const { user } = useUser();
  const path = useSelectedLayoutSegment();

	return (
		<div className='h-full w-full p-6 md:p-20 flex flex-col md:flex-row gap-6'>
      <div className='min-h-full w-full md:w-[20%] bg-white dark:bg-slate-700 p-2 md:p-4 flex flex-col gap-10 rounded-xl'>
        <div className='px-4 hidden md:flex'><h2 className='text-xl font-semibold dark:text-white'>Menu</h2></div>
        <ul className='flex md:flex-col gap-2 text-lg flex-wrap justify-evenly'>
          <li className={`font-medium text-sm md:text-md py-2 px-2 md:px-4 rounded-md text-slate-600 hover:text-slate-800 dark:text-white ${ path === 'dashboard' ? 'bg-green-200 dark:bg-green-500' : ''}`}>
            <Link href='/home/dashboard'>Dashboard</Link>
          </li>
          <li className={`font-medium text-sm md:text-md py-2 px-2 md:px-4 rounded-md text-slate-600 hover:text-slate-800 dark:text-white ${ path === 'brands' ? 'bg-green-200 dark:bg-green-500' : ''}`}>
            <Link href='/home/brands'>Brands</Link>
          </li>
          <li className={`font-medium text-sm md:text-md py-2 px-2 md:px-4 rounded-md text-slate-600 hover:text-slate-800 dark:text-white ${ path === 'products' ? 'bg-green-200 dark:bg-green-500' : ''}`}>
            <Link href='/home/products'>Products</Link>
          </li>
          <li className={`font-medium text-sm md:text-md py-2 px-2 md:px-4 rounded-md text-slate-600 hover:text-slate-800 dark:text-white ${ path === 'search' ? 'bg-green-200 dark:bg-green-500' : ''}`}>
            <Link href='/home/search'>Search</Link>
          </li>
        </ul>
      </div>
      <div className='w-full min-h-full flex flex-col-reverse md:flex-col gap-6'>
        <div className='px-6 py-4 bg-white dark:bg-slate-700 flex items-center gap-2 rounded-xl'>
          <FaUserAstronaut className='box-content ml-auto bg-slate-100 p-3 rounded-full dark:bg-slate-800' />
          <h2 className='text-md font-medium dark:text-white'>
            { user ? `${ user.username }` : 'Welcome!' }
          </h2>
        </div>
        <div className='w-full md:h-[60vh] overflow-y-scroll bg-white dark:bg-slate-700 px-8 py-6 rounded-xl'>
					{ children }
				</div>
      </div>
    </div>
	)
}