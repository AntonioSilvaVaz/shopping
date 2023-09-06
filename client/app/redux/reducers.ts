import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  value: {
    isAuth: boolean;
    email: string;
    name: string;
    user_id: string;
    profile_picture: string;
  };
};

type UserProducts = {
  value: [
    {
      item_id: string;
      user_id: string;
      product_name: string;
      product_description: string;
      product_price: number;
      product_region: string;
      product_pictures: string[];
    }
  ];
};

type CartState = {
  value: [
    {
      item_id: string;
      amount: number;
    }
  ];
};

type WishlistState = {
  value: [
    {
      item_id: string;
      amount: number;
    }
  ];
};

const userState: UserState = {
  value: {
    isAuth: false,
    email: "",
    name: "",
    user_id: "",
    profile_picture: "",
  },
};

const cartState: CartState = { value: [{ item_id: "", amount: 0 }] };
const wishlistState: WishlistState = { value: [{ item_id: "", amount: 0 }] };
const userProductsState: UserProducts = {
  value: [
    {
      item_id: "",
      product_description: "",
      product_name: "",
      product_pictures: [],
      product_price: 0,
      product_region: "",
      user_id: "",
    },
  ],
};

const user = createSlice({
  name: "user",
  initialState: userState,
  reducers: {},
});

const userProducts = createSlice({
  name: "user products",
  initialState: userProductsState,
  reducers: {},
});

const cart = createSlice({
  name: "cart",
  initialState: cartState,
  reducers: {},
});

const wishlist = createSlice({
  name: "wishlist",
  initialState: wishlistState,
  reducers: {},
});
