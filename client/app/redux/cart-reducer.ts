import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemClickedType, ItemCreated, ListType } from "../types";

type CartState = {
  value: {
    cart: ItemClickedType[];
    cartWithInfo: ItemCreated[];
    cartUpdated: boolean;
  };
};

const cartState: CartState = {
  value: {
    cart: [],
    cartWithInfo: [],
    cartUpdated: false,
  },
};

const cart = createSlice({
  name: "cart",
  initialState: cartState,
  reducers: {
    emptyCart: (state) => {
      return {
        value: {
          ...cartState.value,
        },
      };
    },
    updateCart: (
      state,
      action: PayloadAction<{ cart: ItemClickedType[]; cartUpdated: boolean }>
    ) => {
      return {
        value: {
          cart: action.payload.cart,
          cartUpdated: true,
          cartWithInfo: state.value.cartWithInfo,
        },
      };
    },
  },
});

export const { updateCart, emptyCart } = cart.actions;
export default cart.reducer;
