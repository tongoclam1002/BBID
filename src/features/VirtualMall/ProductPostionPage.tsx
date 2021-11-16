import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductDetail from "../Product/ProductDetail";
import ProductDetailSkeleton from "../Product/ProductDetailSkeleton";
import api from "../../app/api/api";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductAsync, productSelectors } from "../Product/productSlice";

export default function ProductPosition() {
  const { code }: any = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector(state => productSelectors.selectById(state, code));
  const { status } = useAppSelector(state => state.product);

  useEffect(() => {
    api.Product.details(code).then((response) => {
      if (response.data.productId != null) {
        if (!product) dispatch(fetchProductAsync(parseInt(code)))
      }
    })
      .catch((error) => {
        // console.log(error);
      });
  }, [code, dispatch, product]);

  return (
    <>
      {product !== null && !status.includes("pending") ? (
        <ProductDetail product={product} />
      ) : <ProductDetailSkeleton isLoading={status.includes("pending")} />}
    </>
  );
}
