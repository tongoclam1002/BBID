import Text from "antd/lib/typography/Text";

export default function PriceAndDiscountPrice({ price, discountPrice }) {
  return (
    <>
      {discountPrice < price && discountPrice > 0 ? (
        <>
          <div>
            <Text delete>{price?.toLocaleString("vi-VN")}đ</Text>
          </div>
          <div>
            <Text strong>{discountPrice?.toLocaleString("vi-VN")}đ</Text>
          </div>
        </>
      ) : (
        <div>
          <Text strong>{price?.toLocaleString("vi-VN")}đ</Text>
        </div>
      )}
    </>
  );
}
