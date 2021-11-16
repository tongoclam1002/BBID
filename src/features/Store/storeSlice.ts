import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import api from "../../app/api/api";
import { Store } from "../../app/interfaces/store.interface";
import { RootState } from "../../app/store/configureStore";

export const storesAdapter = createEntityAdapter<Store>({
    selectId: (store: Store) => store.storeId
});

export const fetchStoresAsync = createAsyncThunk<Store[]>(
    'store/fetchStoresAsync',
    async (_, thunkAPI) => {
        try {
            return await api.Store.list().then(response => response.data);
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const fetchStoreAsync = createAsyncThunk<Store, number>(
    'store/fetchStoreAsync',
    async (storeId, thunkAPI) => {
        try {
            return await api.Store.details(storeId).then(response => response.data[0]);
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const storeSlice = createSlice({
    name: "store",
    initialState: storesAdapter.getInitialState({
        storesLoaded: false,
        status: "idle"
    }),
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchStoresAsync.pending, (state) => {
            state.status = "pendingFetchStores";
        });
        builder.addCase(fetchStoresAsync.fulfilled, (state, action) => {
            storesAdapter.setAll(state, action.payload);
            state.status = "idle";
            state.storesLoaded = true;
        });
        builder.addCase(fetchStoresAsync.rejected, (state) => {
            state.status = "idle"
        });
        builder.addCase(fetchStoreAsync.pending, (state) => {
            state.status = "pendingFetchStore";
        });
        builder.addCase(fetchStoreAsync.fulfilled, (state, action) => {
            storesAdapter.upsertOne(state, action.payload);
            state.status = "idle";
        });
        builder.addCase(fetchStoreAsync.rejected, (state, action) => {
            state.status = "idle"
        })
    })
})

export const storeSelectors = storesAdapter.getSelectors((state: RootState) => state.store);