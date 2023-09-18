"use client";
import './User.css';
import ItemBox from '@/app/components/itemBox/itemBox';
import { getAnUserItems } from '@/app/utils/User';
import { useState, useEffect } from 'react';
import Link from "next/link";
import { useParams } from 'next/navigation';
import { ItemCreated } from '@/app/types';
import { useRouter } from 'next/navigation';
export default function UserProfile() {
  const { user_id }: any = useParams();
  const router = useRouter();

  const [userProducts, setUserProducts]: [ItemCreated[], any] = useState([]);

  async function getAllInformation() {
    const info = await getAnUserItems(user_id);

    if (info === 500) {
      router.push('/server-down');
    } else if (info === 404) {
      router.push('/404');
    } else {
      setUserProducts(info);
    }
  };

  useEffect(() => {
    getAllInformation();
  }, []);

  return (
    <section id="user">
      <div className="seller-picture">
        <Link href={`/user/${user_id}`}>
          <img src="/login_images/16.jpg" />
        </Link>
      </div>
      <h5 className='name'>My profile :__</h5>
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
                productPicture={`http://localhost:3001/images/profile_pictures/${item.product_pictures[0]}`}
                sellerPicture={`http://localhost:3001/images/profile_pictures/default_picture`}
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