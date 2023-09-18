"use client";

import './TopBar.css';
import Link from 'next/link';
import { useAppSelector } from '@/app/redux/store';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';

export default function TopBar() {

  const isUserAuthenticated = useAppSelector((state) => state.user.value.isAuth);


  return (
    <nav>
      <div>
        <h3>
          <Link href={'/'}>
            Shopping
          </Link>
        </h3>
      </div>
      <div className='links'>
        {
          isUserAuthenticated ?
            <>
              <button className='hover'>
                <AiOutlineHeart fontSize={25} />
              </button>
              |
              <button className='hover'>
                <AiOutlineShoppingCart fontSize={25} />
              </button>
            </>
            :
            <>
              <h5><Link href={'/login'}>Login</Link></h5>
              |
              <h5><Link href={'/register'}>Register</Link></h5>
            </>
        }
      </div>
    </nav>
  )
}