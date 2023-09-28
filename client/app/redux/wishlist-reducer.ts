import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemClickedType, ItemCreated } from "../types";

type WishlistState = {
  value: {
    wishlist: ItemClickedType[];
    wishlistInfo: ItemCreated[];
    updated: boolean;
  };
};

const wishlistState: WishlistState = {
  value: {
    wishlist: [],
    wishlistInfo: [],
    updated: false,
  },
};

const wishlist = createSlice({
  name: "wishlist",
  initialState: wishlistState,
  reducers: {
    emptyWishlist: (state) => {
      return {
        value: {
          ...wishlistState.value,
        },
      };
    },

    updateWishlist: (
      state,
      action: PayloadAction<{ wishlist: ItemClickedType[]; updated: boolean }>
    ) => {
      return {
        value: {
          updated: action.payload.updated,
          wishlist: action.payload.wishlist,
          wishlistInfo: state.value.wishlistInfo,
        }
      };
    },
  },
});

export const { emptyWishlist, updateWishlist } = wishlist.actions;
export default wishlist.reducer;
