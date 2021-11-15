import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "../../features/Cart/cartSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { storeSlice } from "../../features/Store/storeSlice";
import { productSlice } from "../../features/Product/productSlice";

export const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        store: storeSlice.reducer,
        product: productSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;