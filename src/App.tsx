import 'antd/dist/antd.css';
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Layout from "./app/layout/Layout";
import routes from "./route-config";
import BreadCrumbs from "./app/layout/BreadCrumbs";
import Video from "./features/VirtualMall/PanelPage";
import NotFound from "./app/errors/NotFound";
import { useAppDispatch } from './app/store/configureStore';
import { useEffect } from 'react';
import { fetchCartAsync } from './features/Cart/cartSlice';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCartAsync())
  }, [dispatch])

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
                  <route.Component {...props} />
                </Layout>
              </div>
            );
          }}
        </Route>
      ))}
      <Route path="/video/:code" exact={true}><Video /></Route>
      <Route><Layout><NotFound /></Layout></Route>
    </Switch>
  );
}

export default App;
