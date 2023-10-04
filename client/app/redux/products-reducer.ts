import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserProducts = {
  value: {
    productsLoaded: boolean;
    products: ProductType[];
  };
};

type ProductType = {
  item_id: string;
  user_created: string;
  product_name: string;
  product_description: string;
  product_price: number;
  product_region: string;
  product_pictures: string[];
};

const userProductsState: UserProducts = {
  value: {
    productsLoaded: false,
    products: [],
  },
};

const userProducts = createSlice({
  name: "user products",
  initialState: userProductsState,
  reducers: {
    emptyProducts: (state) => {
      return {
        value: {
          ...userProductsState.value,
        },
      };
    },
    updateProducts: (
      state,
      action: PayloadAction<{
        products: ProductType[];
        productsLoaded: boolean;
      }>
    ) => {
      return {
        value: {
          ...action.payload,
        },
      };
    },
    addProduct: (state, action: PayloadAction<{ newProduct: ProductType }>) => {
      return {
        value: {
          products: [...state.value.products, action.payload.newProduct],
          productsLoaded: true,
        },
      };
    },
    updateStoreProduct: (
      state,
      action: PayloadAction<{ updatedProduct: ProductType }>
    ) => {
      const index = state.value.products.findIndex(
        (item) => item.item_id === action.payload.updatedProduct.item_id
      );
      const newArr = [...state.value.products];
      newArr[index] = action.payload.updatedProduct;

      return {
        value: {
          productsLoaded: true,
          products: newArr,
        },
      };
    },
  },
});

export const { updateProducts, emptyProducts, addProduct, updateStoreProduct } =
  userProducts.actions;
export default userProducts.reducer;
