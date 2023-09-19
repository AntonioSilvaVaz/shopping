"use client";
import './User.css';
import ItemBox from '@/app/components/itemBox/itemBox';
import { getAnUserItems, getAnUserInfo } from '@/app/utils/User';
import { useState, useEffect } from 'react';
import Link from "next/link";
import { useParams } from 'next/navigation';
import { ItemCreated, UserInfo } from '@/app/types';
import { useRouter } from 'next/navigation';

export default function UserProfile() {
  const { user_id }: any = useParams();
  const router = useRouter();

  const [userProducts, setUserProducts]: [ItemCreated[], any] = useState([]);
  const [userInfo, setUserInfo]: [UserInfo, any] = useState({ name: '', email: '', user_id: '', profile_picture: '' });

  async function getUserProducts() {
    const info = await getAnUserItems(user_id);

    if (info === 500) {
      router.push('/server-down');
    } else if (info === 404) {
      router.push('/404');
    } else {
      setUserProducts(info);
    }
  };

  async function getUserInfo() {
    const info = await getAnUserInfo(user_id);

    if (info === 500) {
      router.push('/server-down');
    } else if (info === 404) {
      router.push('/404');
    } else {
      setUserInfo(info);
    }
  };

  useEffect(() => {
    getUserInfo();
    getUserProducts();
  }, []);

  return (
    <section id="user">
      <div className="seller-picture">
        <Link href={`/user/${user_id}`}>
          <img src={`http://localhost:3001/images/profile_pictures/${userInfo.profile_picture}`} />
        </Link>
      </div>
      <h5 className='name'>{userInfo.name}</h5>
      {userProducts.length > 0 ?
        <h5 className='products-sold'>Products sold by this user</h5> :
        <h5 className='products-sold'>This user doesn't sell any products</h5>
      }
      <div className='products-container'>

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