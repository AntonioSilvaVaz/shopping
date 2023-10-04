'use client';
import { useState, useEffect } from 'react';
import ItemBox from "./components/itemBox/itemBox";
import "./home.css";
import { ItemCreated } from './types';
import { getAllItems } from './utils/Items';
import { redirect } from 'next/navigation';

export default function Home() {

  const [items, setItems]: [ItemCreated[], any] = useState([]);

  async function getAllInformation() {
    const res = await getAllItems();

    if (res.status === 500) {
      redirect('/500');
    } else {
      const data = await res.json();
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
                price={Number(item.product_price)}
                productPicture={`http://localhost:3001/images/item_pictures/${item.product_pictures[0]}`}
                title={item.product_name}
                item_id={item.item_id}
              />)
          })
        }
      </div>
    </section>
  );
}
