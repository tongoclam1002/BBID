import { useEffect } from "react";
import Carousel from "../../components/Carousel";
import ItemList from "../../components/ItemList/ItemList";
import StoreItem from "../Store/StoreItem";
import Section from "../../components/Section";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchStoresAsync, storeSelectors } from "../Store/storeSlice";
import { Col } from "antd";
import { t } from "i18next";

export default function Home() {
  const stores = useAppSelector(storeSelectors.selectAll);
  const dispatch = useAppDispatch();
  const { storesLoaded, status } = useAppSelector((state) => state.store);

  useEffect(() => {
    if (!storesLoaded) dispatch(fetchStoresAsync());
  }, [storesLoaded, dispatch]);

  return (
    <>
      <Carousel />
      <Section title={t("section.SHOPPING_AREA")}>
        <ItemList
          // title="Thời trang và phụ kiện"
          isLoading={status.includes("pending")}
          lg={6}
          md={12}
          sm={24}
          height={169}
        >
          {stores &&
            stores.map((store) => (
              <Col lg={6} md={12} sm={24} key={store.storeId}>
                <StoreItem
                  key={store.storeId}
                  image={store.logo}
                  storeId={store.storeId}
                  name={store.name}
                />
              </Col>
            ))}
        </ItemList>
      </Section>
    </>
  );
}
