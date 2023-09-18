"use client";

import './TopBar.css';
import Link from 'next/link';
import { useAppSelector } from '@/app/redux/store';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { useRouter } from 'next/navigation';

export default function TopBar() {

  const { isAuth, profile_picture, user_id } = useAppSelector((state) => state.user.value);
  const router = useRouter();

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
          isAuth ?
            <>
              <button className='pointer'>
                <AiOutlineHeart fontSize={20} />
              </button>
              |
              <button className='pointer'>
                <AiOutlineShoppingCart fontSize={20} />
              </button>
              |
              <div className='profile-picture pointer' onClick={() => router.push(`/user/${user_id}`)}>
                <img src={`http://localhost:3001/images/profile_pictures/${profile_picture}`} alt="You" />
              </div>
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