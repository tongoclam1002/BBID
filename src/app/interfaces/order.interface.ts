export interface OrderItem {
  productOrderId: number;
  orderId: number;
  productId: number;
  productDetailId: number;
  price: number;
  discountPrice: number;
  name: string;
  size?: any;
  color: string;
  quantity: number;
}

export interface OrderStore {
    storeId: number;
    productOrders: OrderItem[];
}

export interface Order {
  orderId: number;
  code?: string;
  addressFrom?: string;
  addressTo: string;
  senderName?: string;
  receiverName: string;
  senderNumber?: string;
  receiverNumber?: string;
  orderStatusId: number;
  productOrders: OrderStore[];
}
