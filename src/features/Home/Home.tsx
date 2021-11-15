import { useEffect } from "react";
import Carousel from "../../components/Carousel";
import ItemList from "../../components/ItemList/ItemList";
import StoreItem from "../Store/StoreItem";
import Section from "../../components/Section";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchStoresAsync, storeSelectors } from "../Store/storeSlice";

export default function Home() {
  const stores = useAppSelector(storeSelectors.selectAll);
  const dispatch = useAppDispatch();
  const {storesLoaded, status} = useAppSelector(state => state.store);
  
  useEffect(() => {
    if (!storesLoaded) dispatch(fetchStoresAsync());
  }, [storesLoaded, dispatch]);

  return (
    <>
      <Carousel />
      <Section title="Khu Mua Sắm">
        <ItemList title="Thời trang và phụ kiện" isLoading={status.includes("pending")}>
          {stores &&
            stores.map((store) => (
              <StoreItem key={store.storeId} image={store.logo} storeId={store.storeId} name={store.name} />
            ))}
        </ItemList>
      </Section>
    </>
  );
}
