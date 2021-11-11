export interface CartItem {
    productId: number;
    name: string;
    price: number;
    storeId: string;
    image: string;
    quantity: number;
}

export interface Cart {
    cartId: number;
    productLists: CartItem[];
}