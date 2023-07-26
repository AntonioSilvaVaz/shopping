"use client";
import Image from "next/image";
import { MouseEvent } from "react";
import { ItemProps } from "@/app/types";
import "./itemBox.css";

export default function ItemBox({ title, item_id }: ItemProps) {
  function goToProduct(e: MouseEvent<HTMLDivElement>) {
    console.log("going to the product page");
  }

  function goToSeller(e: MouseEvent<HTMLDivElement>) {
    // STOPS FROM ALSO CLICKING IN THE GO TO PRODUCT
    e.stopPropagation();

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
