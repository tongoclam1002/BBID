import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import api from "../../app/api/api";

interface SearchState {
  searchResults: [];
  hits: number;
  currentQuery: string;
}

const initialState: SearchState = {
  searchResults: [],
  hits: 0,
  currentQuery: "",
};

export const filterProductAsync = createAsyncThunk<
  any,
  {
    productKeyword: string;
    categoryIds: number[];
    SortType: string;
    PageNumber: number;
    PageSize: number;
  }
>(
  "product/filterProductAsync",
  async (
    { productKeyword, categoryIds, SortType, PageNumber, PageSize },
    thunkAPI
  ) => {
    try {
      return await api.Product.search(
        productKeyword,
        categoryIds,
        SortType,
        PageNumber,
        PageSize
      ).then((response) => {
        return response.data;
      });
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});
