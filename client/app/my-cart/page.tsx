'use client';
import './Cart.css';
import { useAppSelector } from '../redux/store';
import ItemBox from '../components/itemBox/itemBox';

export default function Cart() {

  const { cartWithInfo } = useAppSelector((state) => state.cart.value);

  return (
    <section id='cart' className='custom-section'>
      {cartWithInfo.length > 0 ?
        <h5 className='products-sold'>Items in your cart</h5> :
        <h5 className='products-sold'>You don't have any items in your cart</h5>
      }

      <div className='products-container'>
        {
          cartWithInfo.map((item, index) => {
            return (
              <ItemBox
                key={index}
                price={item.product_price}
                productPicture={`http://localhost:3001/images/item_pictures/${item.product_pictures[0]}`}
                title={item.product_name}
                item_id={item.item_id}
              />)
          })
        }

      </div>
    </section>
  )


};