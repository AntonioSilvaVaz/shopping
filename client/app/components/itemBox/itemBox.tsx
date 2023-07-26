"use client";
import Image from "next/image";
import { MouseEvent, useState } from "react";
import { ItemProps } from "@/app/types";
import { useRouter } from "next/navigation";
import { BsCartPlusFill } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { addToCart, addToWishlist } from "@/app/utils/ItemUtils";
import "./itemBox.css";

export default function ItemBox({
  title,
  item_id,
  creator_id,
  price,
  sellerPicture,
  productPicture,
}: ItemProps) {
  const router = useRouter();
  const [clicked, setClicked] = useState<boolean>(false)
  const [amount, setAmount] = useState<number>(1);

  function goToProduct(e: MouseEvent<HTMLDivElement>) {
    router.push(`/product/${item_id}`);
  }

  function goToSeller(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    router.push(`/user/${creator_id}`);
  }

  return (
    <div className="item-box">
      <div className="pointer" onClick={goToProduct}>
        <div className="item-picture">
          <Image
            alt="product picture"
            className="picture"
            fill={true}
            src={productPicture}
          />
        </div>
        <div className="profile-picture pointer" onClick={goToSeller}>
          <Image
            alt="seller picture"
            className="picture"
            fill={true}
            src={sellerPicture}
          />
        </div>
      </div>
      <div className="item-title">
        <div>
          <h6>{title}</h6>
        </div>
        <div className="item-add">
          <div>
            <h6>{price}€</h6>
          </div>

          <div>
            <button
              className="add pointer"
              onClick={() => addToWishlist(item_id, amount, setClicked)}
            >
              {clicked ? <AiFillHeart /> : <AiOutlineHeart />}
            </button>
            <button
              className="add pointer"
              onClick={() => addToCart(item_id, amount)}
            >
              <BsCartPlusFill />
            </button>
            <input
              type="number"
              value={amount}
              min={1}
              max={9}
              onChange={(e) => setAmount(Number(e.target.value))}
              name="amount"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
