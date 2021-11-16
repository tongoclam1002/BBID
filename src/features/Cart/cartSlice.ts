import { Cart, CartItem } from "../../app/interfaces/cart.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../app/api/api";
import toast from "../../app/utils/toast";
import constant from "../../app/utils/constant";

interface CartState {
    cart: Cart;
    status: string;
}

const initialState: CartState = {
    cart: null,
    status: 'idle'
}

export const fetchCartAsync = createAsyncThunk<Cart>(
    'store/fetchCartAsync',
    async (_, thunkAPI) => {
        try {
            return await api.Cart.get().then(response => response.data);
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

export const addCartItemAsync = createAsyncThunk<Cart, { productId: number, quantity?: number }>(
    'cart/addCartItemAsync',
    async ({ productId, quantity }, thunkAPI) => {
        try {
            return await api.Cart.addItem(productId, quantity).then(async () => {
                return api.Cart.get().then(cart => { toast.success(constant.text.ADD_CART_ITEM_SUCCESS_MESSAGE); return cart.data });
            })
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

export const updateCartItemAsync = createAsyncThunk<Cart, { productId: number, quantity: number, name?: string }>(
    'cart/updateCartItemAsync',
    async ({ productId, quantity }, thunkAPI) => {
        try {
            return await api.Cart.updateItem(productId, quantity).then(async () => {
                return api.Cart.get().then(cart => { return cart.data });
            })
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

export const removeCartItemAsync = createAsyncThunk<void, { productId: number, quantity?: number }>(
    'cart/removeCartItemAsync',
    async ({ productId, quantity = 1 }, thunkAPI) => {
        try {
            await api.Cart.removeItem(productId);
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.data })
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
        selectItem: (state, action) => {
            const itemIndex = state.cart?.productLists.findIndex(i => i.productId === action.payload);
            if (itemIndex === -1 || itemIndex === undefined) return;
            state.cart!.productLists[itemIndex] =
            {
                ...state.cart!.productLists[itemIndex],
                isSelected: !state.cart!.productLists[itemIndex].isSelected
            }
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchCartAsync.pending, (state) => {
            state.status = "pendingFetchCart";
        });
        builder.addCase(fetchCartAsync.fulfilled, (state, action) => {
            let cart: CartItem = <CartItem>(action.payload.productLists[0]);
            console.log(cart);
            state.cart = action.payload;


            state.status = "idle";
        });
        builder.addCase(fetchCartAsync.rejected, (state) => {
            state.status = "idle";
        });
        builder.addCase(addCartItemAsync.pending, (state, action) => {
            state.status = "pendingAddItem" + action.meta.arg.productId;
        });
        builder.addCase(addCartItemAsync.fulfilled, (state, action) => {
            state.cart = action.payload;
            state.status = "idle";
        });
        builder.addCase(addCartItemAsync.rejected, (state) => {
            state.status = "idle";
        });

        builder.addCase(removeCartItemAsync.pending, (state, action) => {
            state.status = "pendingRemoveItem" + action.meta.arg.productId;
        });
        builder.addCase(removeCartItemAsync.fulfilled, (state, action) => {
            const { productId, quantity } = action.meta.arg;
            const itemIndex = state.cart?.productLists.findIndex(i => i.productId === productId);
            if (itemIndex === -1 || itemIndex === undefined) return;
            state.cart!.productLists[itemIndex].quantity -= quantity;
            if (state.cart?.productLists[itemIndex].quantity === 0)
                state.cart.productLists.splice(itemIndex, 1);
            state.status = "idle";
        });
        builder.addCase(removeCartItemAsync.rejected, (state) => {
            state.status = "idle";
        });

        builder.addCase(updateCartItemAsync.pending, (state, action) => {
            state.status = "pendingUpdateItem" + action.meta.arg.productId + action.meta.arg.name;
        });
        builder.addCase(updateCartItemAsync.fulfilled, (state, action) => {
            state.cart = action.payload;
            state.status = "idle";
        });
        builder.addCase(updateCartItemAsync.rejected, (state) => {
            state.status = "idle";
        })
    })
})

export const { setCart, selectItem } = cartSlice.actions;