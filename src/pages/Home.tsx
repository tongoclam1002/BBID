import { useEffect, useState } from "react";
import Carousel from "../components/Carousel/Carousel";
import ItemList from "../components/ItemList/ItemList";
import Section from "../components/Section/Section";
import StoreItem from "../components/Store/StoreItem";
import { store } from "../interfaces/store.interface";
import Api from "../services/api";
import Configuration from "../services/configuration";

export default function Home() {
  const api = new Api();
  const config = new Configuration();
  const [stores, setStores] = useState<store[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    api.get(config.GET_ALL_STORE_URL).then((stores) => {
      setStores(stores);
      setIsFetching(false)
    }).catch((error) => {
      console.log(error);
      setIsFetching(false)
    });
  }, []);

  return (
    <>
      <Carousel />
      <Section title="Khu Mua Sắm">
      <ItemList title="Thời trang và phụ kiện" isFetching={isFetching}>
          {stores &&
            stores.map((store) => (
              <StoreItem key={store.storeId} image={store.logo} storeId={store.storeId} name={store.name}/>
            ))}
        </ItemList>
      </Section>
    </>
  );
}
