"use client";

import './TopBar.css';
import Link from 'next/link';
import { useAppSelector } from '@/app/redux/store';

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
      {
        isUserAuthenticated ?
          <div className='links'>
            <h5>Cart</h5>
            |
            <h5>Wishlist</h5>
          </div>
          :
          <div className='links'>
            <h5><Link href={'/login'}>Login</Link></h5>
            |
            <h5><Link href={'/register'}>Register</Link></h5>
          </div>
      }
    </nav>
  )
}