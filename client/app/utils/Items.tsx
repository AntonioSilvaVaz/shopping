import { UUID } from "crypto";
import { SetStateAction, Dispatch } from "react";
import { ItemCreated } from "../types";

export async function addToCart(item_id: UUID, amount: number) {
  // ADD TO THE USER CART
}

export async function addToWishlist(item_id: UUID, amount: number, setClicked: Dispatch<SetStateAction<boolean>>) {
  setClicked((clicked: boolean) => {
    console.log(clicked);

    return !clicked;
  })
  // ADD TO USER WISHLIST
}

export async function getAllItems() {

  const res = await fetch('http://localhost:3001/load_all_items', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });

  if (res.ok) {
    const data: ItemCreated[] = await res.json();
    return data;
  } else {
    return 500;
  }
};