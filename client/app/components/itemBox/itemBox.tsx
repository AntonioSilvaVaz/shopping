"use client";
import Image from "next/image";
import { MouseEvent } from "react";
import { ItemProps } from "@/app/types";
import {useRouter} from "next/navigation"
import "./itemBox.css";

export default function ItemBox({ title, item_id, creator_id }: ItemProps) {

  const router = useRouter();

  function goToProduct(e: MouseEvent<HTMLDivElement>) {
    router.push(`/product/${item_id}`)
    console.log("going to the product page");
  }

  function goToSeller(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    router.push(`/user/${creator_id}`);
    console.log("going to the seller page");
  }

  return (
    <div className="item-box pointer" onClick={goToProduct}>
      <div className="item-picture">
        <Image
          alt="seller picture"
          className="picture"
          fill={true}
          src={"/login_images/15.jpg"}
        />
      </div>
      <div className="profile-picture pointer" onClick={goToSeller}>
        <Image
          alt="seller picture"
          className="picture"
          fill={true}
          src={"/login_images/6.jpg"}
        />
      </div>
      <div className="item-title">
        <h5>{title}</h5>
      </div>
    </div>
  );
}
