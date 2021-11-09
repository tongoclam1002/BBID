import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { product } from "../interfaces/product.interface";
import { NavLink } from "react-router-dom";
import Api from "../services/api";
import Configuration from "../services/configuration";
import ProductDetail from "../components/Product/ProductDetail";
import { Skeleton } from "antd";
import ProductDetailSkeleton from "../components/Product/ProductDetailSkeleton";

export default function ProductPage() {
  const api = new Api();
  const config = new Configuration();
  const { productId }: any = useParams();
  const [product, setProduct] = useState<product>();
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    api
      .get(config.GET_PRODUCT_DETAIL_URL + productId)
      .then((product) => {
        setProduct(product);
        setIsFetching(false);
      })
      .catch((error) => {
        console.log(error);
        setIsFetching(false);
      });
  }, []);

  return <>{product && !isFetching ? <ProductDetail product={product} /> : <ProductDetailSkeleton isFetching={isFetching} />}</>;
}
