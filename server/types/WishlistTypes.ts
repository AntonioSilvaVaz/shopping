import { UUID } from "crypto"



export type WishlistList = {
  amount: number;
  item_id: UUID;
}

export type WishlistType = {
  user_id: UUID;
  list: WishlistList[];
}

export type WishlistJSON = {
  user_id: UUID;
  list: string;
}