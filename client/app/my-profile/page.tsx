"use client";
import styles from './profile.module.css';
import { useAppSelector } from '../redux/store';
import { AiOutlinePlus } from 'react-icons/ai';
import { useState } from 'react';
import CreateItem from '../components/createItem/CreateItem';
import Link from "next/link";
import ItemBoxUser from '../components/itemUserBox/itemBoxUser';

export default function UserProfile() {

  const { name, profile_picture, user_id } = useAppSelector((state) => state.user.value);
  const { products } = useAppSelector((state) => state.products.value);
  const [showCreateItem, setShowCreateItem] = useState(false);

  function showItem() {
    setShowCreateItem(true)
  }

  return (
    <section id={styles.user}>

      <div className={styles.leftBar}>
        {showCreateItem && <CreateItem setShowCreateItem={setShowCreateItem} />}
        <div className={styles.seller_picture}>
          <Link href={`/user/${user_id}`}>
            <img src={`http://localhost:3001/images/profile_pictures/${profile_picture}`} />
          </Link>
        </div>

        <h5 className={styles.name}>{name}</h5>

        <div className={`${styles.create_item} pointer`} onClick={showItem}>
          <div className={styles.plus}>
            <AiOutlinePlus />
          </div>
          <h4>Add product</h4>
        </div>

      </div>


      <div className={styles.products_container}>
        {
          products.map((item, index) => {
            return (
              <ItemBoxUser
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