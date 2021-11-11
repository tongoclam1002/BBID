import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../interfaces/product.interface";
import ProductDetail from "../components/Product/ProductDetail";
import ProductDetailSkeleton from "../components/Product/ProductDetailSkeleton";
import api from "../services/api";

export default function ProductPosition() {
  const { code }: any = useParams();
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.Product.details(code).then((response) => {
        if (response.data.productId != null) {
          api.Product.details(code).then((product) => {
              setProduct(product);
              setIsLoading(false);
            });
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {product && !isLoading ? (
        <ProductDetail product={product} />
      ) : <ProductDetailSkeleton isLoading={isLoading} />}
    </>
  );
}
