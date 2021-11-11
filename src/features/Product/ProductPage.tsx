import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/interfaces/product.interface";
import ProductDetail from "./ProductDetail";
import ProductDetailSkeleton from "./ProductDetailSkeleton";
import api from "../../app/api/api";

export default function ProductPage() {
  const { productId }: any = useParams();
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.Product.details(productId).then(response => {
      setProduct(response.data);
    }).catch(error => console.log(error.response)).finally(() => setIsLoading(false))
  }, [productId]);

  return <>{product && !isLoading ? <ProductDetail product={product} /> : <ProductDetailSkeleton isLoading={isLoading} />}</>;
}
