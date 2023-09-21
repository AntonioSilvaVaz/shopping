'use client';
import './TopBar.css';
import Link from 'next/link';
import { useAppSelector } from '@/app/redux/store';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { getAnUserInfo, getAnUserItems, logOutUser, validateUser } from '@/app/utils/User';
import { logOut, login } from '@/app/redux/user-reducer';
import { useEffect } from 'react';
import { emptyProducts, updateProducts } from '@/app/redux/products-reducer';
import { emptyWishlist } from '@/app/redux/wishlist-reducer';
import { emptyCart, updateCart } from '@/app/redux/cart-reducer';
import { getItemInfo, getUserCart } from '@/app/utils/Items';
import { ItemCreated, ListType, UserRegisteredType } from '@/app/types';

export default function TopBar() {

  const { isAuth, profile_picture, user_id } = useAppSelector((state) => state.user.value);
  const {cartUpdated} = useAppSelector((state) => state.cart.value);
  const {productsLoaded} = useAppSelector((state) => state.products.value);

  const router = useRouter();
  const dispatch = useDispatch();

  async function checkIfUserIsValid() {

    const res = await validateUser();

    console.log('CHECKING IF USER IS VALID');

    if (res.ok) {
      const { user_id } = await res.json();
      const userLoginRes = await getAnUserInfo(user_id);

      if (userLoginRes.status === 404) {
        router.push('/register');
      } else if (userLoginRes.status === 500) {
        router.push('/500');
      } else {
        const userInfo: UserRegisteredType = await userLoginRes.json();
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

    if (res.status === 403) {
      router.push('/403');
    } else if (res.status === 404) {
      router.push('/404');
    } else if (res.status === 500) {
      router.push('/500');
    } else {
      router.push('/login');
    }
  };

  async function getCartItems() {

    const res = await getUserCart();

    if (res.status === 404) {
      router.push('/404');
    } else if (res.status === 500) {
      router.push('/500');
    } else {

      const data: ListType = await res.json();
      const cartWithInfo: ItemCreated[] = [];

      for (let index = 0; index < data.list.length; index++) {
        const item = data.list[index];
        const itemInfoRes = await getItemInfo(item.item_id);

        if (itemInfoRes.status !== 404 && itemInfoRes.status !== 500) {
          const info = await itemInfoRes.json();
          cartWithInfo.push(info);
        };
      }

      dispatch(updateCart({ cart: cartWithInfo, cartUpdated: true }));
    }
  };

  async function getProducts(user_id: string) {
    const res = await getAnUserItems(user_id);
    if (res.status === 404) {
      router.push('/404');
    } else if (res.status === 500) {
      router.push('/500');
    } else {
      const data = await res.json();
      dispatch(updateProducts({ products: data, productsLoaded: true }));
    }
  };

  useEffect(() => {

    if (!isAuth) {
      checkIfUserIsValid();
    }

    if(isAuth && !cartUpdated){
      getCartItems();
    }

    if(isAuth && !productsLoaded){
      getProducts(user_id);
    }

  }, [isAuth]);


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
              <Link className='pointer' href={'/my-cart'}>
                <AiOutlineHeart fontSize={20} />
              </Link>
              |
              <Link className='pointer' href={'/my-cart'}>
                <AiOutlineShoppingCart fontSize={20} />
              </Link>
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