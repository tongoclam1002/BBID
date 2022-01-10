export interface Product {
  isEnabled?: boolean;
  createdBy?: number;
  createdDate?: string;
  modifiedBy?: number;
  modifiedDate?: string;
  productId: number;
  name?: string;
  price?: number;
  color?: string;
  storeId: number;
  quantity?: number;
  image?: string;
  productTypeId?: number;
  caterogyId?: number;
  description?: string;
  productProperty?: ProductProperty[];
  productDetails?: ProductDetail[];
}

export interface ProductProperty {
  key?: string;
  value?: string;
}

export interface ProductDetail {
  productDetailId: number;
  productId: number;
  price: number;
  color: string;
  quantity: number;
  size: string;
  discountPrice: number;
  isEnabled: boolean;
  createdBy: number;
  createdDate: Date;
  modifiedBy: number;
  modifiedDate: Date;
}
