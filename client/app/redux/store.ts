import { configureStore } from "@reduxjs/toolkit";
import user from './user-reducer';
import products from './products-reducer';
import wishlist from './wishlist-reducer';
import cart from './cart-reducer';
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    user,
    products,
    wishlist,
    cart
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;