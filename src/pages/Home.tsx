import { useEffect, useState } from "react";
import Carousel from "../components/Common/Carousel";
import ItemList from "../components/Common/ItemList/ItemList";
import Section from "../components/Common/Section";
import StoreItem from "../components/Store/StoreItem";
import { Store } from "../interfaces/store.interface";
import api from "../services/api";

export default function Home() {
  const [stores, setStores] = useState<Store[] | null>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.Store.list().then(response => {
      setStores(response.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <Carousel />
      <Section title="Khu Mua Sắm">
        <ItemList title="Thời trang và phụ kiện" isLoading={isLoading}>
          {stores &&
            stores.map((store) => (
              <StoreItem key={store.storeId} image={store.logo} storeId={store.storeId} name={store.name} />
            ))}
        </ItemList>
      </Section>
    </>
  );
}
