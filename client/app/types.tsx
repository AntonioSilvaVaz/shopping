import { UUID } from "crypto";

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