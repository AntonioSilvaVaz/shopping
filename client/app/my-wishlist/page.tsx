'use client';
import { useAppSelector } from '../redux/store';
import styles from './wishlist.module.css';
import ItemBox from '../components/itemBox/itemBox';

export default function Wishlist() {

  const { wishlistInfo } = useAppSelector(state => state.wishlist.value);

  return (
    <section id={styles.wishlist} className='custom-section'>
      <h2>Welcome to your wishlist:</h2>
      <div className={styles.item_container}>
        {wishlistInfo.map((item, index) => {
          return (
            <ItemBox
              title={item.product_name}
              item_id={item.item_id}
              productPicture={`http://localhost:3001/images/item_pictures/${item.product_pictures[0]}`}
              price={Number(item.product_price)}
              key={index}
            />
          )
        })}
      </div>
    </section>
  )
};