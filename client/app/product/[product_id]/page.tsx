"use client";
import styles from "./page.module.css";
import { useParams, useRouter } from "next/navigation";
import { BsCartPlus } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { ItemType, ListType, UserRegisterType, UserRegisteredType } from "@/app/types";
import { addToCart, addToWishlist, getItemInfo } from "@/app/utils/Items";
import { getAnUserInfo } from "@/app/utils/User";
import { updateWishlist } from "@/app/redux/wishlist-reducer";
import { updateCart } from "@/app/redux/cart-reducer";

export default function Product() {

  const { product_id }: any = useParams();
  const router = useRouter();

  const [itemInfo, setItemInfo]: [ItemType, any] = useState({
    product_description: '',
    product_name: '',
    product_pictures: [],
    product_price: 0,
    product_region: '',
    user_created: '',
  });

  const [userInfo, setUserInfo]: [UserRegisteredType, any] = useState({
    email: '',
    name: '',
    password: '',
    profile_picture: '',
    user_id: '',
  });

  async function getAllInfo() {
    const res = await getItemInfo(product_id);
    if (res.status === 404) {
      router.push('/404')
    } else if (res.status === 500) {
      router.push('/500')
    } else {
      const data: ItemType = await res.json();
      setItemInfo(data);
      getUserPostedInfo(data.user_created);
    }
  };

  async function getUserPostedInfo(userId: string) {
    const res = await getAnUserInfo(userId);
    if (res.status === 404) {
      router.push('/404')
    } else if (res.status === 500) {
      router.push('/500')
    } else {
      const data: UserRegisterType = await res.json();
      setUserInfo(data);
    }
  };

  async function addWishlist() {
    const res = await addToWishlist(product_id, 1);
    if (res.status === 404) {
      router.push('/404');
    } else if (res.status === 403) {
      router.push('/login');
    } else if (res.status === 500) {
      router.push('/500');
    } else {
      const data: ListType = await res.json();
      updateWishlist(data.list);
    }
  };

  async function addCart() {
    const res = await addToCart(product_id, 1);
    if (res.status === 404) {
      router.push('/404');
    } else if (res.status === 403) {
      router.push('/login');
    } else if (res.status === 500) {
      router.push('/500');
    } else {
      const data: ListType = await res.json();
      updateCart({ cart: data.list, cartUpdated: true });
    }
  };

  function goToUser() {
    router.push(`/user/${userInfo.user_id}`);
  };

  useEffect(() => {
    getAllInfo();
  }, []);


  return (
    <section id={styles.product}>
      <h2>{itemInfo.product_name}</h2>
      <div className={styles.images_container}>
        <div className={styles.main_image_container}>
          <img src={`http://localhost:3001/images/item_pictures/${itemInfo.product_pictures[0]}`} alt="Product Picture" />
        </div>
        <div className={styles.map_container}>
          <img src='/map.jpg' alt="Map Picture" />
        </div>
      </div>
      <div className={styles.text_container}>
        <div className={styles.button_container}>
          <h3>{itemInfo.product_price}€</h3>
          <div>
            <BsCartPlus className="pointer" onClick={addCart} />
            <AiOutlineHeart className="pointer" onClick={addWishlist} />
          </div>
        </div>
        <p>{itemInfo.product_description}</p>
      </div>
      <div className={styles.user_posted}>
        <h4>{userInfo.name}</h4>
        <div onClick={goToUser} className={`${styles.image_posted_container} pointer`}>
          <img src={`http://localhost:3001/images/profile_pictures/${userInfo.profile_picture}`} alt="User posted" />
        </div>
      </div>
    </section>
  )
}