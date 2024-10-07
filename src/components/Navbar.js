"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "@/contexts/ThemeContext";
import { useUser } from "@/contexts/UserContext";
import Link from "next/link";
import { PiSunDimFill, PiMoonFill } from "react-icons/pi";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, updateUser } = useUser();
  const router = useRouter();

  const handleSignOut = () => {
    updateUser(null);
    router.push('/login');
  }

  return (
    <div className='py-4 px-8 flex gap-4 z-50 items-center'>
      <div className=''>
        <Link href='/'><h2 className='text-2xl font-bold'>Manage<span className='text-green-400'>Mint.</span></h2></Link>
      </div>
      <div className='ml-auto'>
        <button className='p-2 bg-slate-200 rounded-full' onClick={ toggleTheme }>
          { 
            theme === 'light' ? <PiSunDimFill fontSize='1.5rem' /> : <PiMoonFill color='#1E293B' fontSize='1.5rem' />
          }
        </button>
      </div>
      <div className=''>
        {
          user ? 
          (<button onClick={ handleSignOut } className='px-4 py-2 flex bg-green-400/30 rounded-full'><p className='font-medium'>Signout</p></button>)
          :
          (<Link href='/login' className='px-4 py-2 flex bg-green-400/30 rounded-full'><p className='font-medium'>Login</p></Link>)
        }
      </div>
    </div>
  );
}
