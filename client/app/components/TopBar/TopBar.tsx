"use client";

import './TopBar.css';
import Link from 'next/link';
import { useAppSelector } from '@/app/redux/store';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { getAnUserInfo, validateUser } from '@/app/utils/User';
import { login } from '@/app/redux/user-reducer';
import { useEffect } from 'react';

export default function TopBar() {

  const { isAuth, profile_picture } = useAppSelector((state) => state.user.value);

  const router = useRouter();
  const dispatch = useDispatch();

  async function checkIfUserIsValid() {

    const res = await validateUser();

    if (res.ok) {
      const { user_id } = await res.json();
      const userInfo = await getAnUserInfo(user_id);

      if (userInfo === 404) {
        router.push('/login');
      } else if (userInfo === 500) {
        router.push('/500');
      } else {
        dispatch(login({ ...userInfo }));
      }

    } else if (res.status === 403) {
      router.push('/login');
    } else if (res.status === 500) {
      router.push('/500');
    }
  }

  useEffect(() => {
    checkIfUserIsValid();
  }, []);

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
              <button className='pointer' onClick={() => router.push('/my-wishlist')}>
                <AiOutlineHeart fontSize={20} />
              </button>
              |
              <button className='pointer' onClick={() => router.push('/my-cart')}>
                <AiOutlineShoppingCart fontSize={20} />
              </button>
              |
              <div className='profile-picture pointer' onClick={() => router.push(`/my-profile`)}>
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