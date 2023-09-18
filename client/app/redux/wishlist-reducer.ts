import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type WishlistState = {
  value: WishlistType[];
};

type WishlistType = {
  item_id: string;
  amount: number;
};

const wishlistState: WishlistState = { value: [{ item_id: "", amount: 0 }] };

const wishlist = createSlice({
  name: "wishlist",
  initialState: wishlistState,
  reducers: {},
});

export const {} = wishlist.actions;
export default wishlist.reducer;