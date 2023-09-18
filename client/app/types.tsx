import { UUID } from "crypto";

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


export type ItemProps = {
  title: string;
  item_id: UUID;
  creator_id: UUID;
  price: number;
  productPicture: string;
  sellerPicture: string;
  showProfilePicture: boolean;
}

export type UserRegisterType = {
  email: string;
  password: string;
  name: string;
  profile_picture: string;
}

export type UserRegisteredType = UserRegisterType & {
  user_id: UUID;
}

export type UserLoginInformation = {
  email: string;
  password: string;
}