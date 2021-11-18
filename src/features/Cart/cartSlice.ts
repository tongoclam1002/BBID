import { Cart, CartStore } from "../../app/interfaces/cart.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../app/api/api";
import toast from "../../app/utils/toast";
import constant from "../../app/utils/constant";
import { getPrice, groupBy } from "../../app/utils/utils";

interface CartState {
    cart: Cart;
    status: string;
    selectedCart: CartStore[];
    totalPrice: number;
}

const initialState: CartState = {
    cart: null,
    status: 'idle',
    selectedCart: [],
    totalPrice: 0
}

export const fetchCartAsync = createAsyncThunk<any>(
    'store/fetchCartAsync',
    async (_, thunkAPI) => {
        try {
            return await api.Cart.get().then(response => { return response.data });
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

export const addCartItemAsync = createAsyncThunk<any, { productId: number, quantity?: number }>(
    'cart/addCartItemAsync',
    async ({ productId, quantity }, thunkAPI) => {
        try {
            return await api.Cart.addItem(productId, quantity).then(async () => {
                return api.Cart.get().then(cart => {
                    toast.success(constant.text.ADD_CART_ITEM_SUCCESS_MESSAGE, 0.5);
                    return cart.data
                });
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
            return await api.Cart.updateItem(productId, quantity)
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

export const removeCartItemAsync = createAsyncThunk<void, { productId: number, quantity?: number }>(
    'cart/removeCartItemAsync',
    async ({ productId }, thunkAPI) => {
        try {
            await api.Cart.removeItem(productId);
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

function getTotalPriceInCart (stores: CartStore[]) {
    return stores.reduce((sum, store) =>
    sum + store.productList.reduce((sum, product) =>
      sum + (product.quantity * getPrice(product.price, product.discountPrice)), 0)
    , 0)
}

function filterSelected(state) {
    state.selectedCart = state.cart?.storeList.filter((store) => {
        let products = store.productList.filter(product => product.isSelected === true)
        if (products.length === 0) {
            return false
        }
        return store;
    }).map(store => {
        return {
            ...store,
            productList: store.productList.filter(product => product.isSelected === true)
        }
    });
    console.log(state.selectedCart);
    state.totalPrice = getTotalPriceInCart(state.selectedCart)
}

function setCartState(state, action) {
    state.cart = {
        ...state.cart,
        cartId: action.payload.cartId,
        storeList: groupBy(action.payload.productLists, "storeId", "productList")
    }
    filterSelected(state);
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action) => {
            setCartState(state, action);
        },
        selectItem: (state, action) => {
            state.cart.storeList.forEach(store => {
                const itemIndex = store.productList.findIndex(i => i.productId === action.payload);
                if (itemIndex === -1 || itemIndex === undefined) return;
                store.productList[itemIndex] =
                {
                    ...store.productList[itemIndex],
                    isSelected: !store.productList[itemIndex].isSelected
                }
            })
            filterSelected(state);
        },
        selelctAllItemInStore: (state, action) => {
            state.cart!.storeList = state.cart?.storeList.map(store => {
                if (store.storeId === action.payload) {
                    store.productList = store.productList.map(product => {
                        return {
                            ...product,
                            isSelected: !store.isSelected
                        }
                    })
                    return {
                        ...store,
                        isSelected: !store.isSelected
                    }
                }
                return store
            })
            filterSelected(state);
        }
    },
    extraReducers: (builder => {
        //fetchCartAsync
        builder.addCase(fetchCartAsync.pending, (state) => {
            state.status = "pendingFetchCart";
        });
        builder.addCase(fetchCartAsync.fulfilled, (state, action) => {
            setCartState(state, action);
            state.status = "idle";
        });
        builder.addCase(fetchCartAsync.rejected, (state) => {
            state.status = "idle";
        });

        //addCartItemAsync
        builder.addCase(addCartItemAsync.pending, (state, action) => {
            state.status = "pendingAddItem" + action.meta.arg.productId;
        });
        builder.addCase(addCartItemAsync.fulfilled, (state, action) => {
            setCartState(state, action);
            state.status = "idle";
        });
        builder.addCase(addCartItemAsync.rejected, (state) => {
            state.status = "idle";
        });

        //removeCartItemAsync
        builder.addCase(removeCartItemAsync.pending, (state, action) => {
            state.status = "pendingRemoveItem" + action.meta.arg.productId;
        });
        builder.addCase(removeCartItemAsync.fulfilled, (state, action) => {
            state.cart.storeList.forEach((store, index) => {
                const { productId } = action.meta.arg;
                const itemIndex = store.productList.findIndex(i => i.productId === productId);
                if (itemIndex === -1 || itemIndex === undefined) return;
                store.productList.splice(itemIndex, 1);
                if (store.productList.length === 0) state.cart.storeList.splice(index, 1);
            });
            filterSelected(state);
            state.status = "idle";
        });
        builder.addCase(removeCartItemAsync.rejected, (state) => {
            state.status = "idle";
        });

        //updateCartItemAsync
        builder.addCase(updateCartItemAsync.pending, (state, action) => {
            state.status = "pendingUpdateItem" + action.meta.arg.productId + action.meta.arg.name;
        });
        builder.addCase(updateCartItemAsync.fulfilled, (state, action) => {
            const { productId, quantity } = action.meta.arg;
            state.cart.storeList.forEach(store => {
                const itemIndex = store.productList.findIndex(i => i.productId === productId);
                if (itemIndex === -1 || itemIndex === undefined) return;
                store.productList[itemIndex].quantity = quantity;
            });
            filterSelected(state);
            state.status = "idle";
        });
        builder.addCase(updateCartItemAsync.rejected, (state) => {
            state.status = "idle";
        })
    })
})

export const { setCart, selectItem, selelctAllItemInStore } = cartSlice.actions;