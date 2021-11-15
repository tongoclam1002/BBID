import { Cart } from "../../app/interfaces/cart.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../app/api/api";
interface CartState {
    cart: Cart | null;
    status: string;
}

const initialState: CartState = {
    cart: null,
    status: 'idle'
}

export const addCartItemAsync = createAsyncThunk<Cart, {productId: number, quantity?: number}>(
    'cart/addCartItemAsync',
    async ({productId, quantity}) => {
        try {
            return await api.Cart.addItem(productId, quantity).then(async() => {
                 return api.Cart.get().then(cart => cart.data);
            })
            
        } catch (error) {
            console.log(error);
        }
    }
)

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload
        },
        removeItem: (state, action) => {
            const { productId, quantity } = action.payload;
            const itemIndex = state.cart?.productLists.findIndex(i => i.productId === productId);
            if (itemIndex === -1 || itemIndex === undefined) return;
            state.cart!.productLists[itemIndex].quantity -= quantity;
            if (state.cart?.productLists[itemIndex].quantity === 0)
                state.cart.productLists.splice(itemIndex, 1);
        },
        selectitem: (state, action) => {
            
        }
    },
    extraReducers: (builder => {
        builder.addCase(addCartItemAsync.pending, (state, action) => {
            console.log(action);
            state.status = "pendingAddItem" + action.meta.arg.productId;
            console.log(state.status);
        });
        builder.addCase(addCartItemAsync.fulfilled, (state, action) => {
            state.cart = action.payload;
            state.status = "idle";
        });
        builder.addCase(addCartItemAsync.rejected, (state, action) => {
            state.status = "idle";
        })
    })
})

export const { setCart, removeItem } = cartSlice.actions;