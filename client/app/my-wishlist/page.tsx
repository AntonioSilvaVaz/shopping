'use client';
import { ItemCreated, ListType } from '../types';
import { getItemInfo, getUserWishlist } from '../utils/Items';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../redux/store';
import { useRouter } from 'next/navigation';
import styles from './wishlist.module.css';
import ItemBox from '../components/itemBox/itemBox';

export default function Wishlist() {

  const { wishlist, updated } = useAppSelector(state => state.wishlist.value);
  console.log(wishlist, updated);

  return (
    <section id={styles.wishlist}>
      {wishlist.map((item, index) => {
        return (
          <ItemBox
            title={item.product_name}
            item_id={item.item_id}
            productPicture={item.product_pictures[0]}
            price={item.product_price}
            key={index}
          />
        )
      })}
    </section>
  )
};