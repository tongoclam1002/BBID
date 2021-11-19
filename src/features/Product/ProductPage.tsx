import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import ProductDetailSkeleton from "./ProductDetailSkeleton";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductAsync, productSelectors } from "./productSlice";

export default function ProductPage() {
  const { productId }: any = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) =>
    productSelectors.selectById(state, productId)
  );
  const { status } = useAppSelector((state) => state.product);

  useEffect(() => {
    if (!product) dispatch(fetchProductAsync(parseInt(productId)));
  }, [productId, dispatch, product]);

  return (
    <>
      {product && !status.includes("pending") ? (
        <ProductDetail product={product} />
      ) : (
        <ProductDetailSkeleton isLoading={status.includes("pending")} />
      )}
    </>
  );
}
