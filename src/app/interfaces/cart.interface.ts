export interface CartItem {
    productId: number;
    name: string;
    price: number;
    discountPrice: number;
    storeId: string;
    image: string;
    quantity: number;
    isSelected: boolean;
}

export interface Cart {
    cartId: number;
    productLists: CartItem[];
}
