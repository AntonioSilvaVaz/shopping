"use client";
import styles from './profile.module.css';
import { useAppSelector } from '../redux/store';
import { AiOutlinePlus } from 'react-icons/ai';
import { useState, FormEvent } from 'react';
import CreateItem from '../components/createItem/CreateItem';
import Link from "next/link";
import ItemBoxUser from '../components/itemUserBox/itemBoxUser';
import { ItemCreated, ItemType } from '../types';
import { createProduct } from '../utils/Items';
import { useRouter } from 'next/navigation';
import { addProduct } from '../redux/products-reducer';
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import Notification from '../components/notification/notification';

export default function UserProfile() {

  const router = useRouter();
  const dispatch = useDispatch();

  const { name, profile_picture, user_id } = useAppSelector((state) => state.user.value);
  const { products } = useAppSelector((state) => state.products.value);
  const [showMenu, setShowMenu] = useState(false);
  const [infoEdit, setShowInfoEdit]: [ItemCreated, any] = useState({
    product_description: '',
    product_name: '',
    product_pictures: [],
    product_price: 0,
    product_region: '',
    item_id: '',
    user_created: user_id,
  });
  const [createMenu, setCreateMenu] = useState(true);

  function showEditItem(item: ItemCreated) {
    setShowInfoEdit(item);
    setShowMenu(true);
    setCreateMenu(false);
    functionSubmitForm = editProductFunction;
  };

  async function showCreateMenu() {
    setShowInfoEdit({
      product_description: '',
      product_name: '',
      product_pictures: [],
      product_price: 0,
      product_region: '',
    });

    setShowMenu(true);
    setCreateMenu(true);
    functionSubmitForm = createProductFunction;
  };

  async function createProductFunction(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await createProduct(formData);
    if (res.ok) {
      const data: any = await res.json();
      data.product_pictures = JSON.parse(data.product_pictures);
      router.push(`/product/${data.item_id}`);
      dispatch(addProduct({ newProduct: data }));
    } else if (res.status === 403) {
      router.push('/login');
    } else if (res.status === 500) {
      router.push('/500')
    } else if (res.status === 400) {
      toast('Missing information');
    }
  };

  async function editProductFunction(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    formData.append('item_id', infoEdit.item_id)
    const res = await createProduct(formData);

    if (res.ok) {
      const data: any = await res.json();
      data.product_pictures = JSON.parse(data.product_pictures);
      router.push(`/product/${data.item_id}`);
    } else if (res.status === 403) {
      router.push('/login');
    } else if (res.status === 500) {
      router.push('/500')
    } else if (res.status === 400) {
      toast('Missing information');
    } else if (res.status === 404) {
      toast("Item doesn't exist");
    }
  };

  let functionSubmitForm = (e: FormEvent<HTMLFormElement>) => { };

  return (
    <section id={styles.user}>

      {showMenu &&
        <CreateItem
          createMenu={createMenu}
          itemInfo={infoEdit}
          functionSubmitForm={functionSubmitForm}
          functionCloseMenu={() => setShowMenu(false)}
        />
      }
      <Notification />

      <div className={styles.leftBar}>
        <div className={styles.seller_picture}>
          <Link href={`/user/${user_id}`}>
            <img src={`http://localhost:3001/images/profile_pictures/${profile_picture}`} />
          </Link>
        </div>

        <h5 className={styles.name}>{name}</h5>

        <div className={`${styles.create_item} pointer`} onClick={showCreateMenu}>
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