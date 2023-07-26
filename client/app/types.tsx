import { UUID } from "crypto";

export type ItemProps = {
  title: string;
  item_id: UUID;
  creator_id: UUID;
  price: number;
  productPicture: string;
  sellerPicture: string;
}