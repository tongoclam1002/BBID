import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import routes from "./route-config";
import BreadCrumbs from "./components/BreadCrumbs/BreadCrumbs";
import { Component } from "react";

function App() {
  return (
    <BrowserRouter>
      <Layout>
      
        <Switch>
          {routes.map((route, key) => (
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
                            path.replace(
                              `:${param}`,
                              props.match.params[param]
                            ),
                          path
                        )
                      : path,
                    ...rest,
                  }));
                //console.log(`Generated crumbs for ${props.match.path}`);
                // crumbs.map(({ title, path }) => console.log({ title, path }));
                return (
                  <div key={route.path}>
                    <BreadCrumbs key={route.path} crumbs={crumbs} />
                    <route.Component {...props} />
                  </div>
                );
              }}
            </Route>
          ))}
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
