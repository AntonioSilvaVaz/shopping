import { UUID } from "crypto";

export type ItemType = {
  product_name: string,
  product_description: string,
  product_price: number,
  product_region: string,
  product_pictures: string,
};

export type ItemCreated = ItemType & {
  item_id: string,
  user_created: string,
};


export type ItemProps = {
  title: string;
  item_id: string;
  creator_id: string;
  price: number;
  productPicture: string;
  sellerPicture: string;
  showProfilePicture: boolean;
}

export type UserInfo = {
  email: string;
  name: string;
  profile_picture: string;
  user_id: string;
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

export type ItemClickedType = {
  list: {
    amount: number;
    item_id: string;
  }
};

export type ListType = {
  user_id: string;
  list: ItemClickedType[]
}