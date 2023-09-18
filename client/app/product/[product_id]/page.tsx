"use client";
import "./Product.css";
import { useParams, useRouter } from "next/navigation";
import { BsCartPlus, BsFillSuitHeartFill } from 'react-icons/bs';

export default function Product() {

  const { product_id } = useParams();

  return (
    <section id="product">

      <h2 className="title">
        This would be the item title
      </h2>

      <div className="image product-images-container">
        <img className="product-images" src="/login_images/3.jpg" alt="" />
      </div>

      <div className="location location-image-container">
        <img className="product-images" src="/login_images/3.jpg" alt="" />
      </div>

      <div className="description">
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
      </div>

      <div className="street">
        <p>
          What street is it?
        </p>
      </div>

      <div className="price">
        <h5>35€</h5>
      </div>

      <div className="add">
        <button className="pointer">
          <BsFillSuitHeartFill fontSize={18} />
        </button>
        <button className="pointer">
          <BsCartPlus fontSize={18} />
        </button>
      </div>


    </section>
  )
}