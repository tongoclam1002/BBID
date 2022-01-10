import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../app/api/api";
import { Order } from "../../app/interfaces/order.interface";

interface OrderState {
    order: Order;
    status: string;
    totalPrice: number;
}

const initialState: OrderState = {
    order: null,
    status: 'idle',
    totalPrice: 0
}

export const fetchOrdersAsync = createAsyncThunk(
    'order/fetchOrdersAsync',
    async (_, thunkAPI) => {
        try {
            return await api.Order.list().then(response => response.data)
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const createOrderAsync = createAsyncThunk<any, {addressTo, receiverName, receiverNNumber, productDetails}>(
    'order/createOrderAsync',
    async ({addressTo, receiverName, receiverNNumber, productDetails}, thunkAPI) => {
        try {
            return await api.Order.createOrder(addressTo, receiverName, receiverNNumber, productDetails).then(response => response.data)
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

function setOrderState(state, action) {
    state.order = {
        ...state.order,
        orderId: action.payload.orderId,
        code: action.payload.orderId,
        addressFrom: action.payload.addressFrom,
        addressTo: action.payload.addressTo,
        senderName: action.payload.senderName,
        receiverName: action.payload.receiverName,
        senderNumber: action.payload.senderNumber,
        receiverNumber: action.payload.receiverNumber,
        orderStatusId: action.payload.orderStatusId,
        // productOrders: 
    }
}

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {

    },
    extraReducers: (builder => {

    })
})