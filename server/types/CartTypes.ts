import { UUID } from "crypto"


export type CartListType = {
  amount: number;
  item_id: UUID;
}

export type CartType = {
  user_id: UUID;
  list: CartListType[];
}

export type CartTypeJSON = {
  user_id: UUID;
  list: string;
}
