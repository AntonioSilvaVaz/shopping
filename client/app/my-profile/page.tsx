"use client";
import styles from './profile.module.css';
import { useAppSelector } from '../redux/store';
import { AiOutlinePlus } from 'react-icons/ai';
import { useState, FormEvent } from 'react';
import CreateItem from '../components/createItem/CreateItem';
import Link from "next/link";
import ItemBoxUser from '../components/itemUserBox/itemBoxUser';
import { ItemCreated} from '../types';

export default function UserProfile() {

  const { name, profile_picture, user_id } = useAppSelector((state) => state.user.value);
  const { products } = useAppSelector((state) => state.products.value);

  const [showMenu, setShowMenu] = useState(false);
  const [createMenu, setCreateMenu] = useState(true);
  const [infoEdit, setInfoEdit]: [ItemCreated, any] = useState({
    item_id: '',
    product_description: '',
    product_name: '',
    product_pictures: [],
    product_price: 0,
    product_region: '',
    user_created: '',
  })

  function showEditItem(item: ItemCreated) {

    const allPicturesValues: string[] = item.product_pictures.map(value => `http://localhost:3001/images/item_pictures/${value}`);

    setInfoEdit(() => {
      return ({
        ...item,
        product_pictures: allPicturesValues,
      })
    });

    setShowMenu(true);
    setCreateMenu(false);
  };

  function showCreateMenu() {
    setInfoEdit(() => {
      return ({
        product_description: '',
        product_name: '',
        product_pictures: [],
        product_price: 0,
        product_region: '',
        item_id: '',
        user_created: '',
      })
    });

    setShowMenu(true);
    setCreateMenu(true);
  };

  return (
    <section id={styles.user} className='custom-section'>

      {showMenu &&
        <CreateItem
          createMenu={createMenu}
          itemInfo={infoEdit}
          functionCloseMenu={() => setShowMenu(false)}
        />
      }

      <div className={styles.leftBar}>
        <div className={styles.seller_picture}>
          <Link href={`/user/${user_id}`}>
            <img src={`http://localhost:3001/images/profile_pictures/${profile_picture}`} />
          </Link>
        </div>

        <h5 className={styles.name}>{name}</h5>

      </div>


      <div className={styles.products_container}>

      <div className={`${styles.create_item} pointer`} onClick={showCreateMenu}>
          <h4>Create a new product (click here)</h4>
        </div>

        {
          products.map((item, index) => {
            return (
              <ItemBoxUser
                showEditItem={() => showEditItem(item)}
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