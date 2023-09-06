import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartState = {
  value: CartType[];
};

type CartType = {
  item_id: string;
  amount: number;
};

const cartState: CartState = { value: [] };

const cart = createSlice({
  name: "cart",
  initialState: cartState,
  reducers: {},
});

export const {} = cart.actions;
export default cart.reducer;