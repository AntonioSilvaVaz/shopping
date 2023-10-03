"use client";
import styles from './profile.module.css';
import ItemBox from '@/app/components/itemBox/itemBox';
import Link from "next/link";
import { useAppSelector } from '../redux/store';
import { AiOutlinePlus } from 'react-icons/ai';

export default function UserProfile() {

  const { name, profile_picture, user_id } = useAppSelector((state) => state.user.value);
  const { products } = useAppSelector((state) => state.products.value);

  return (
    <section id={styles.user}>
      <div className={styles.seller_picture}>
        <Link href={`/user/${user_id}`}>
          <img src={`http://localhost:3001/images/profile_pictures/${profile_picture}`} />
        </Link>
      </div>

      <h5 className={styles.name}>{name}</h5>

      {
        products.length > 0 ?
          <h5 className={styles.products_sold}>Products you sell</h5> :
          <h5 className={styles.products_sold}>You don't sell any products. Yet</h5>
      }

      <div className={styles.products_container}>

        <div className={`${styles.create_item} pointer`}>
          <div className={styles.plus}>
            <AiOutlinePlus />
          </div>
          <h4>Add product</h4>
        </div>

        {
          products.map((item, index) => {
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
}