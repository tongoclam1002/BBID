import { Cart } from "./cart.interface";

export interface User {
    username: string;
    token: string;
    cart?: Cart
}