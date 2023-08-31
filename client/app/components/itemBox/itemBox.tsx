"use client";
import Image from "next/image";
import { MouseEvent, useState } from "react";
import { ItemProps } from "@/app/types";
import { useRouter } from "next/navigation";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { addToWishlist } from "@/app/utils/ItemUtils";
import "./itemBox.css";

export default function ItemBox({
  title,
  item_id,
  creator_id,
  price,
  sellerPicture,
  productPicture,
  showProfilePicture
}: ItemProps) {
  const router = useRouter();
  const [clicked, setClicked] = useState<boolean>(false)

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
        {
          showProfilePicture &&
          <div className="profile-picture pointer" onClick={goToSeller}>
            <Image
              alt="seller picture"
              className="picture"
              fill={true}
              src={sellerPicture}
            />
          </div>
        }

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
              onClick={() => addToWishlist(item_id, 1, setClicked)}
            >
              {clicked ? <AiFillHeart /> : <AiOutlineHeart />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
