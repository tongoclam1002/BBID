import { useEffect, useState } from "react";
import Carousel from "../components/Carousel/Carousel";
import ItemList from "../components/ItemList/ItemList";
import Product from "../components/Product/Product";
import Section from "../components/Section/Section";
import { product } from "../../models/product.model";
import { get } from "../api/product";

export default function Home() {
  let sign =
    "storeSlug=MOMOH6JY20211027-211027230728f0a394d&amount=10000&billId=B001221";
  // let signature = CryptoJS.HmacSHA256(
  //   sign,
  //   "KJgseItNjemjI3ywOgL9YqDQyYJAWSyf"
  // ).toString(CryptoJS.enc.Hex);
  const [products, setProducts] = useState<product[]>([]);
  useEffect(() => {
    get().then((data:product[]) => {
      setProducts(data);
    });
  }, []);

  return (
    <>
      <Carousel />
      <Section title="Khu Ẩm Thực">
        <ItemList title="Khu ăn uống">
          {products &&
            products.map((product) => (
              <Product
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                numberOfComments={123}
                imgUrl={product.img}
              />
            ))}
        </ItemList>
      </Section>
    </>
  );
}
