import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { Product } from '@/shared/types/Types';

type BasketTypes = {
  basket: Product[];
  isBasketShow: boolean;
};

const initialState: BasketTypes = {
  basket: [],
  isBasketShow: false
};

export const getUserProductsInBasket = createAsyncThunk(
  'basket/getUserProductsInBasket',
  async () => {}
);

const basket = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setIsBasketShow(state) {
      console.log('!state.isBasketShow', !state.isBasketShow);
      state.isBasketShow = !state.isBasketShow;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUserProductsInBasket.pending, () => {});
  }
});

export const { setIsBasketShow } = basket.actions;

export default basket.reducer;
