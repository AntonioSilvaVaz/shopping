import { UUID } from "crypto";
import { SetStateAction, Dispatch } from "react";

export async function addToCart(item_id: UUID, amount: number) {
  // ADD TO THE USER CART
}

export async function addToWishlist(item_id: UUID, amount: number, setClicked: Dispatch<SetStateAction<boolean>>) {
  setClicked((clicked: boolean)=>{
    console.log(clicked);

    return !clicked;
  })
  // ADD TO USER WISHLIST
}