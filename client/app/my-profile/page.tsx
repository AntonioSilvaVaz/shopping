"use client";
import './profile.css';
import ItemBox from '@/app/components/itemBox/itemBox';
import Link from "next/link";
import { useAppSelector } from '../redux/store';

export default function UserProfile() {

  const { name, profile_picture, user_id } = useAppSelector((state) => state.user.value);
  const { products } = useAppSelector((state) => state.products.value);

  return (
    <section id="user">
      <div className="seller-picture">
        <Link href={`/user/${user_id}`}>
          <img src={`http://localhost:3001/images/profile_pictures/${profile_picture}`} />
        </Link>
      </div>
      <h5 className='name'>{name}</h5>

      {products.length > 0 ?
        <h5 className='products-sold'>Products you sell</h5> :
        <h5 className='products-sold'>You don't sell any products. Yet</h5>
      }
      <div className='products-container'>

        {
          products.map((item, index) => {
            return (
              <ItemBox
                key={index}
                price={item.product_price}
                productPicture={`http://localhost:3001/images/item_pictures/${item.product_pictures[0]}`}
                sellerPicture={`http://localhost:3001/images/profile_pictures/${profile_picture}`}
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