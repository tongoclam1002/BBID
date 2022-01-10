import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import ProductDetailSkeleton from "./ProductDetailSkeleton";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductAsync, productSelectors } from "./productSlice";
import CommentItem from "../Rating/CommentItem";
import { Card } from "antd";
import RateProduct from "../Rating/RateProduct";
import {
  commentSelectors,
  fetchCommentsAsync,
  postCommentAsync,
} from "../Rating/commentSlice";

export default function ProductPage() {
  const { productId }: any = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) =>
    productSelectors.selectById(state, productId)
  );
  const comments = useAppSelector(commentSelectors.selectAll);
  const { status } = useAppSelector((state) => state.product);
  const [rating, setRating] = useState();
  const [comment, setComment] = useState("");

  function onChangeRate(value) {
    setRating(value);
  }

  function onChangeComment(e) {
    setComment(e.target.value);
  }

  function onPostComment() {
    if (rating !== 0 && comment) {
      dispatch(
        postCommentAsync({
          content: comment,
          rating: rating,
          productId: productId,
        })
      ).then((response) => {setComment("")});
    }
  }

  useEffect(() => {
    if (!product) dispatch(fetchProductAsync(parseInt(productId)));
    if (comments.length === 0) dispatch(fetchCommentsAsync(parseInt(productId)));
  }, [productId, dispatch, product]);

  return (
    <>
      {product && !status.includes("pending") ? (
        <>
          <ProductDetail product={product} />
          <Card title="ĐÁNH GIÁ SẢN PHẨM">
            <RateProduct
              rating={rating}
              onChangeRate={(value: number) => onChangeRate(value)}
              onChangeComment={(e) => onChangeComment(e)}
              onClick={() => onPostComment()}
            />
            {comments?.map((comment, key) => {
              return <CommentItem key={key} comment={comment} />;
            })}
          </Card>
        </>
      ) : (
        <ProductDetailSkeleton isLoading={status.includes("pending")} />
      )}
    </>
  );
}
