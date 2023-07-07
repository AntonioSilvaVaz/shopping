import { UUID } from "crypto"

export type UserType = {
  name: string,
  email: string,
  password: string,
};

export type UserRegistered = UserType & {
  user_id: UUID,
};

export type ItemType = {
  product_name: string,
  product_description: string,
  product_price: number,
  product_region: string,
  product_pictures: string,
};

export type ItemCreated =  ItemType & {
  product_id: UUID,
  user_id: UUID,
};