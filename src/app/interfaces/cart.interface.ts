export interface CartItem {
    productId: number;
    productDetailId: number;
    name: string;
    price: number;
    discountPrice: number;
    storeId: string;
    image: string;
    quantity: number;
    isSelected: boolean;
}

export interface CartStore {
    storeId: number;
    name: string;
    productList: CartItem[];
    isSelected: boolean;
}

export interface Cart {
    cartId: number;
    storeList: CartStore[];
}
