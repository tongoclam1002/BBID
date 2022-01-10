export interface Comment {
  commentId: number;
  author: string;
  content: string;
  rating: number;
  productId: number;
  isEnabled: boolean;
  createdBy: number;
  createdDate: Date;
  modifiedBy: number;
  modifiedDate: Date;
}
