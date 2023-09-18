'use client';
import { useState, useEffect } from 'react';
import ItemBox from "./components/itemBox/itemBox";
import "./home.css";
import { ItemCreated } from './types';
import { getAllItems } from './utils/Items';
import { useRouter } from 'next/navigation';

export default function Home() {

  const [items, setItems]: [ItemCreated[], any] = useState([]);
  const router = useRouter();

  async function getAllInformation() {
    const data = await getAllItems();
    if (data === 500) {
      router.push('/500');
    } else {
      setItems(data);
    }
  };

  useEffect(() => {
    getAllInformation();
  }, [])

  return (
    <section id="home">
      <div style={{ opacity: 1, backgroundColor: "red" }}></div>
      <div className="items">
        {
          items.map((item, index) => {
            return (
              <ItemBox
                key={index}
                price={item.product_price}
                productPicture={`http://localhost:3001/images/profile_pictures/${item.product_pictures[0]}`}
                sellerPicture={`http://localhost:3001/images/profile_pictures/${item.user_created}`}
                creator_id={item.user_created}
                title={item.product_name}
                item_id={item.item_id}
                showProfilePicture={true}
              />)
          })
        }
      </div>
    </section>
  );
}
