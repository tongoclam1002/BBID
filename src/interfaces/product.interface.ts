export interface product {
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
  productProperty?: productProperty[];
}

export interface productProperty {
  key?: string;
  value?: string;
}
