'use client';
import './TopBar.css';
import Link from 'next/link';
import { useAppSelector } from '@/app/redux/store';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { getAnUserInfo, logOutUser, validateUser } from '@/app/utils/User';
import { logOut, login } from '@/app/redux/user-reducer';
import { useEffect } from 'react';
import { emptyProducts } from '@/app/redux/products-reducer';
import { emptyWishlist } from '@/app/redux/wishlist-reducer';
import { emptyCart } from '@/app/redux/cart-reducer';

export default function TopBar() {

  const { isAuth, profile_picture } = useAppSelector((state) => state.user.value);

  const router = useRouter();
  const dispatch = useDispatch();

  async function checkIfUserIsValid() {

    const res = await validateUser();

    if (res.ok) {
      const { user_id } = await res.json();
      const userLoginRes = await getAnUserInfo(user_id);

      if (userLoginRes.status === 404) {
        router.push('/register');
      } else if (userLoginRes.status === 500) {
        router.push('/500');
      } else {
        const userInfo = await userLoginRes.json();
        dispatch(login({ ...userInfo }));
      }

    } else if (res.status === 403) {
      router.push('/login');
    } else if (res.status === 500) {
      router.push('/500');
    }
  };

  async function logUserOut() {
    const res = await logOutUser();
    dispatch(emptyProducts());
    dispatch(emptyCart());
    dispatch(emptyWishlist());
    dispatch(logOut());

    if(res.status === 403){
      router.push('/403');
    } else if(res.status === 404){
      router.push('/404');
    } else if(res.status === 500){
      router.push('/500');
    } else {
      router.push('/login');
    }
  };

  useEffect(() => {
    if (!isAuth) {
      checkIfUserIsValid();
    }
  }, []);


  return (
    <nav>
      <div className='nav-container'>
        <h3>
          <Link href={'/'}>
            Shopping
          </Link>
        </h3>
      </div>
      <div className='links nav-container'>
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
              <div className='menu'>

                <div className='user-picture'>
                  <img src={`http://localhost:3001/images/profile_pictures/${profile_picture}`} alt="You" />
                </div>

                <div className='dropdown'>
                  <Link className='item' href={'/my-profile'}>
                    <h6>My Profile</h6>
                  </Link>
                  <button onClick={logUserOut} className='pointer item'>
                    <h6>Logout</h6>
                  </button>
                </div>

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