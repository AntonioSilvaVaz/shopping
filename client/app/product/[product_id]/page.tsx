"use client";
import "./Product.css";
import { useParams, useRouter } from "next/navigation";
import { BsCartPlus, BsFillSuitHeartFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { ItemType } from "@/app/types";
import { addToCart, addToWishlist, getItemInfo } from "@/app/utils/Items";

export default function Product() {

  const { product_id }: any = useParams();
  const router = useRouter();

  const [itemInfo, setItemInfo]: [ItemType, any] = useState({
    product_description: '', product_name: '', product_pictures: '', product_price: 0, product_region: ''
  });

  async function getAllInfo() {
    const res = await getItemInfo(product_id);
    if (res.status === 404) {
      router.push('/404')
    } else if (res.status === 500) {
      router.push('/500')
    } else {
      const data = await res.json();
      setItemInfo(data)
    }
  };

  useEffect(() => {
    getAllInfo();
  }, []);


  return (
    <section id="product">

      <h2 className="title">
        {itemInfo.product_name}
      </h2>

      <div className="image product-images-container">
        <img className="product-images" src={`http://localhost:3001/images/item_pictures/${itemInfo.product_pictures[0]}`} alt="" />
      </div>

      <div className="location location-image-container">
        <img className="product-images" src={`http://localhost:3001/images/item_pictures/${itemInfo.product_pictures[1]}`} alt="" />
      </div>

      <div className="description">
        <p>
          {itemInfo.product_description}
        </p>
      </div>

      <div className="street">
        <p>
          {itemInfo.product_region}
        </p>
      </div>

      <div className="price">
        <h5>{itemInfo.product_price}€</h5>
      </div>

      <div className="add">
        <button className="pointer" onClick={() => addToWishlist(product_id, 1)}>
          <BsFillSuitHeartFill fontSize={18} />
        </button>
        <button className="pointer" onClick={() => addToCart(product_id, 1)} >
          <BsCartPlus fontSize={18} />
        </button>
      </div>


    </section>
  )
}