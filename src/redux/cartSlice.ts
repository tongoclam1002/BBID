import { Cart } from "../interfaces/cart.interface";
import { createSlice } from "@reduxjs/toolkit"
interface CartState {
    cart: Cart | null
}

const initialState: CartState = {
    cart: null
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload
        },
        removeItem: (state, action) => {
            const { productId, quantity } = action.payload;
            const itemIndex = state.cart?.productLists.findIndex(i => i.productId == productId);
            if (itemIndex === -1 || itemIndex === undefined) return;
            state.cart!.productLists[itemIndex].quantity -= quantity;
            if (state.cart?.productLists[itemIndex].quantity === 0)
                state.cart.productLists.splice(itemIndex, 1);
        }
    }
})

export const { setCart, removeItem } = cartSlice.actions;