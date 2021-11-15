import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import api from "../../app/api/api";
import { Product } from "../../app/interfaces/product.interface";
import { RootState } from "../../app/store/configureStore";

export const productsAdapter = createEntityAdapter<Product>({
    selectId: (product: Product) => product.productId
});

export const fetchProductsAsync = createAsyncThunk<Product[], { storeId: number }>(
    'product/fetchProductsAsync',
    async ({ storeId }, thunkAPI) => {
        try {
            return await api.Product.list(storeId).then(response => response.data);
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const fetchProductAsync = createAsyncThunk<Product, number>(
    'product/fetchProductAsync',
    async (productId, thunkAPI) => {
        try {
            return await api.Product.details(productId).then(response => response.data);
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const productSlice = createSlice({
    name: "product",
    initialState: productsAdapter.getInitialState({
        productsLoaded: false,
        status: "idle"
    }),
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = "pendingFetchProducts";
        });
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload);
            state.status = "idle";
            state.productsLoaded = true;
        });
        builder.addCase(fetchProductsAsync.rejected, (state, action) => {
            console.log(action);
            state.status = "idle"
        });
        builder.addCase(fetchProductAsync.pending, (state) => {
            state.status = "pendingFetchProduct";
        });
        builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload);
            state.status = "idle";
        });
        builder.addCase(fetchProductAsync.rejected, (state) => {
            state.status = "idle"
        })
    })
})

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.product);