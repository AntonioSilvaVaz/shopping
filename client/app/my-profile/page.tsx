"use client";
import './profile.css';
import ItemBox from '@/app/components/itemBox/itemBox';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useAppSelector } from '../redux/store';
import { useEffect } from 'react';
import { getAnUserItems } from '../utils/User';
import { useDispatch } from 'react-redux';
import { updateProducts } from '../redux/products-reducer';

export default function UserProfile() {

  const router = useRouter();
  const dispatch = useDispatch();

  const { name, profile_picture, user_id } = useAppSelector((state) => state.user.value);
  const { products, productsLoaded } = useAppSelector((state) => state.products.value);

  async function getProducts() {
    const data: any = await getAnUserItems(user_id);
    if(data === 404){
      router.push('/404');
    } else if(data === 500){
      router.push('/500');
    } else{
      dispatch(updateProducts({products: data, productsLoaded: true}));
    }
  };

  useEffect(() => {
    if(productsLoaded === false){
      getProducts();
    }
  }, [])

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