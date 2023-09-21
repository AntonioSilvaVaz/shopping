import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartState = {
  value: {
    cart: CartType[];
    cartUpdated: boolean;
  };
};

type CartType = {
  product_name: string;
  product_description: string;
  product_price: number;
  product_region: string;
  product_pictures: string;
  item_id: string;
  user_created: string;
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
      action: PayloadAction<{ cart: CartType[]; cartUpdated: boolean }>
    ) => {
      return {
        value: action.payload,
      };
    },
  },
});

export const { updateCart, emptyCart } = cart.actions;
export default cart.reducer;
