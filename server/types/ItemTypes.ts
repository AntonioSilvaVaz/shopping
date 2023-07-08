import { UUID } from "crypto"

export type ItemType = {
  product_name: string,
  product_description: string,
  product_price: number,
  product_region: string,
  product_pictures: string,
};

export type ItemCreated = ItemType & {
  item_id: UUID,
  user_created: UUID,
};
