"use client";
import ItemBox from '@/app/components/itemBox/itemBox';
import { getAnUserItems, getAnUserInfo } from '@/app/utils/User';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ItemCreated, UserInfo } from '@/app/types';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import styles from './user.module.css';

export default function UserProfile() {

  const { user_id }: any = useParams();
  const router = useRouter();

  const [userProducts, setUserProducts]: [ItemCreated[], any] = useState([]);
  const [userInfo, setUserInfo]: [UserInfo, any] = useState({ name: '', email: '', user_id: '', profile_picture: '' });

  async function getUserProducts() {
    const res = await getAnUserItems(user_id);

    if (res.status === 500) {
      router.push('/500');
    } else if (res.status === 404) {
      router.push('/404');
    } else {
      const data = await res.json();
      setUserProducts(data);
    }
  };

  async function getUserInfo() {
    const res = await getAnUserInfo(user_id);

    if (res.status === 500) {
      router.push('/500');
    } else if (res.status === 404) {
      router.push('/404');
    } else {
      const data = await res.json();
      setUserInfo(data);
    }
  };

  useEffect(() => {
    getUserInfo();
    getUserProducts();
  }, [])


  return (
    <section id={styles.user}>
      <div className={styles.seller_info}>
        <div className={styles.seller_picture}>
          <Link href={`/user/${user_id}`}>
            <img src={`http://localhost:3001/images/profile_pictures/${userInfo.profile_picture}`} />
          </Link>
        </div>
        <div className={styles.name}>
          <h5>{userInfo.name}</h5>
        </div>
      </div>
      {userProducts.length > 0 ?
        <h5 className={styles.products_sold}>Products sold by this user</h5> :
        <h5 className={styles.products_sold}>This user doesn't sell any products</h5>
      }
      <div className={styles.products_container}>
        {
          userProducts.map((item, index) => {
            return (
              <ItemBox
                key={index}
                price={item.product_price}
                productPicture={`http://localhost:3001/images/item_pictures/${item.product_pictures[0]}`}
                sellerPicture={`http://localhost:3001/images/profile_pictures/${userInfo.profile_picture}`}
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
}