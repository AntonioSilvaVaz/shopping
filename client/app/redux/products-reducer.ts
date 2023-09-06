import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserProducts = {
  value: ProductType[];
};

type ProductType = {
  item_id: string;
  user_id: string;
  product_name: string;
  product_description: string;
  product_price: number;
  product_region: string;
  product_pictures: string[];
};

const userProductsState: UserProducts = {
  value: [],
};

const userProducts = createSlice({
  name: "user products",
  initialState: userProductsState,
  reducers: {},
});

export const {} = userProducts.actions
export default userProducts.reducer;