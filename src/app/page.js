import Link from "next/link";
import { HiMiniRocketLaunch } from "react-icons/hi2";

export default function Home() {
  return (
    <div className='p-8 flex flex-col items-center'>
     <div className='hero z-10 min-h-[80vh] flex flex-col gap-10 justify-center items-end'>
        <div className='flex flex-col items-center'>
          <h1 className='text-4xl font-bold'>Manage your <span className='text-green-400'>brands.</span></h1>
          <h1 className='text-4xl font-bold'>Anytime. Anywhere.</h1>
        </div>
        <Link href='/register' className='px-4 py-2 flex bg-green-400 dark:bg-green-600 hover:bg-green-600 flex gap-2 items-center rounded-full transition'>
          <button className='font-semibold text-white '>Get Started</button>
          <HiMiniRocketLaunch color='white' />
        </Link>
      </div>
    </div>
  );
}
