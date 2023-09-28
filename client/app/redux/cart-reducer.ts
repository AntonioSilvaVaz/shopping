import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartState = {
  value: {
    cart: CartType[];
    cartUpdated: boolean;
  };
};

type CartType = {
  item_id: string;
  amount: number;
};

const cartState: CartState = { value: { cart: [], cartUpdated: false } };

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
      action: PayloadAction<{ cart: CartType[], cartUpdated: boolean }>
    ) => {
      return {
        value: action.payload,
      };
    },
  },
});

export const { updateCart, emptyCart } = cart.actions;
export default cart.reducer;
