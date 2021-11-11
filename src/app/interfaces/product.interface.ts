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
}

export interface ProductProperty {
  key?: string;
  value?: string;
}
