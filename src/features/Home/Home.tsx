import { useEffect, useState } from "react";
import Carousel from "../../components/Carousel";
import ItemList from "../../components/ItemList/ItemList";
import StoreItem from "../Store/StoreItem";
import { Store } from "../../app/interfaces/store.interface";
import api from "../../app/api/api";
import Section from "../../components/Section";

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
