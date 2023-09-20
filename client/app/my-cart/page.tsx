'use client';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '../redux/store';
import { getItemInfo, getUserCart } from '../utils/Items';
import './Cart.css';
import { useDispatch } from 'react-redux';
import { updateCart } from '../redux/cart-reducer';
import { useEffect } from 'react';
import { ItemCreated } from '../types';
import ItemBox from '../components/itemBox/itemBox';

export default function Cart() {

  const {cart, cartUpdated} = useAppSelector((state) => state.cart.value);
  const router = useRouter();
  const dispatch = useDispatch();

  async function getCartItems() {

    const data = await getUserCart();

    if (data === 404) {
      router.push('/404');
    } else if (data === 500) {
      router.push('/500');
    } else {

      const cartWithInfo: ItemCreated[] = [];
      for (let index = 0; index < data.list.length; index++) {
        const item = data.list[index];
        const itemInfo = await getItemInfo(item.item_id);

        if (itemInfo !== 404 && itemInfo !== 500) {
          cartWithInfo.push(itemInfo);
        };
      }

      dispatch(updateCart({cart: cartWithInfo, cartUpdated: true}));
    }
  };

  useEffect(() => {
    if(!cartUpdated){
      getCartItems();
    }
  }, []);

  return (
    <section id='cart'>
      {cart.length > 0 ?
        <h5 className='products-sold'>Items in your cart</h5> :
        <h5 className='products-sold'>You don't have any items in your cart</h5>
      }

      <div className='products-container'>
        {
          cart.map((item, index) => {
            return (
              <ItemBox
                key={index}
                price={item.product_price}
                productPicture={`http://localhost:3001/images/item_pictures/${item.product_pictures[0]}`}
                sellerPicture={`http://localhost:3001/images/profile_pictures/${item.user_created}.jpg`}
                creator_id={item.user_created}
                title={item.product_name}
                item_id={item.item_id}
                showProfilePicture={false}
              />)
          })
        }

      </div>
    </section>
  )


};