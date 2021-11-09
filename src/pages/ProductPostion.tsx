import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { product } from "../interfaces/product.interface";
import { NavLink } from "react-router-dom";
import Api from "../services/api";
import Configuration from "../services/configuration";
import ProductDetail from "../components/Product/ProductDetail";
import { Radio, Form, Space, Skeleton, Divider, Switch } from "antd";
import ProductDetailSkeleton from "../components/Product/ProductDetailSkeleton";

export default function ProductPosition() {
  const api = new Api();
  const config = new Configuration();
  const { code }: any = useParams();
  const [product, setProduct] = useState<product>();
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    api
      .get(config.GET_PRODUCT_DETAIL_URL + code)
      .then((media) => {
        console.log(media);
        if (media.productId != null) {
          api
            .get(config.GET_PRODUCT_DETAIL_URL + media.productId)
            .then((product) => {
              setProduct(product);
              setIsFetching(false);
            });
        }
      })
      .catch((error) => {
        console.log(error);
        setIsFetching(false);
      });
  }, []);

  return (
    <>
      {product && !isFetching ? (
        <ProductDetail product={product} />
      ) : <ProductDetailSkeleton isFetching={isFetching} />}
    </>
  );
}
