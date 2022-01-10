import "antd/dist/antd.css";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Layout from "./app/layout/Layout";
import routes from "./route-config";
import BreadCrumbs from "./app/layout/BreadCrumbs";
import Video from "./features/VirtualMall/PanelPage";
import NotFound from "./app/errors/NotFound";
import { useAppDispatch } from "./app/store/configureStore";
import { useCallback, useEffect } from "react";
import { fetchCartAsync } from "./features/Cart/cartSlice";
import ProfileLayout from "./app/layout/ProfileLayout";
import ProductPosition from "./features/VirtualMall/ProductPostionPage";
import { fetchCurrentUser } from "./features/Account/accountSlice";

function App() {
  const dispatch = useAppDispatch();

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchCartAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp();
  }, [initApp]);

  return (
    <Switch>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} exact={route.exact}>
          {(props) => {
            const crumbs = routes
              // Get all routes that contain the current one.
              .filter(({ path }) => props.match.path.includes(path))
              // Swap out any dynamic routes with their param values.
              // E.g. "/pizza/:pizzaId" will become "/pizza/1"
              .map(({ path, ...rest }) => ({
                path: Object.keys(props.match.params).length
                  ? Object.keys(props.match.params).reduce(
                      (path, param) =>
                        path.replace(`:${param}`, props.match.params[param]),
                      path
                    )
                  : path,
                ...rest,
              }));
            //console.log(`Generated crumbs for ${props.match.path}`);
            // crumbs.map(({ title, path }) => console.log({ title, path }));
            return (
              <div key={route.path}>
                <Layout>
                  <BreadCrumbs key={route.path} crumbs={crumbs} />
                  {route.isProfile ? (
                    <ProfileLayout>
                      <route.Component {...props} />
                    </ProfileLayout>
                  ) : (
                    <route.Component {...props} />
                  )}
                </Layout>
              </div>
            );
          }}
        </Route>
      ))}
      <Route path="/video/:code" exact={true}>
        <Video />
      </Route>
      <Route path="/product/:code" exact={true}>
        <ProductPosition />
      </Route>
      <Route>
        <Layout>
          <NotFound />
        </Layout>
      </Route>
    </Switch>
  );
}

export default App;
