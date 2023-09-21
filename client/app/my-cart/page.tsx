'use client';
import { useAppSelector } from '../redux/store';
import './Cart.css';
import ItemBox from '../components/itemBox/itemBox';

export default function Cart() {

  const { cart, cartUpdated } = useAppSelector((state) => state.cart.value);

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