import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetail from "../Product/ProductDetail";
import ProductDetailSkeleton from "../Product/ProductDetailSkeleton";
import api from "../../app/api/api";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductAsync, productSelectors } from "../Product/productSlice";

export default function ProductPosition() {
  const { code }: any = useParams();
  const dispatch = useAppDispatch();
  const [productId, setProductId] = useState();
  const product = useAppSelector((state) =>
    productSelectors.selectById(state, productId)
  );

  const { status } = useAppSelector((state) => state.product);

  useEffect(() => {
    api.Product.position(code)
      .then((response) => {
        if (response.data != null) {
          setProductId(response.data);
          if (!product) dispatch(fetchProductAsync(parseInt(response.data)));
        }
      })
      .catch((error) => {
        // console.log(error);
      });
  }, [code, dispatch, product]);

  return (
    <div className="d-flex align-items-center h-100 w-100">
      {product && !status.includes("pending") ? (
        <ProductDetail product={product} />
      ) : (
        <ProductDetailSkeleton isLoading={status.includes("pending")} />
      )}
    </div>
  );
}
