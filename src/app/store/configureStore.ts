import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { cartSlice } from "../../features/Cart/cartSlice";
import { storeSlice } from "../../features/Store/storeSlice";
import { productSlice } from "../../features/Product/productSlice";
import { commentSlice } from "../../features/Rating/commentSlice";
import { accountSlice } from "../../features/Account/accountSlice";

export const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        store: storeSlice.reducer,
        product: productSlice.reducer,
        comment: commentSlice.reducer,
        account: accountSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;