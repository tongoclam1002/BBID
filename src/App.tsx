import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import routes from './route-config';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          {routes.map(route =>
            <Route key={route.path} path={route.path} exact={route.exact}>
              <route.component />
            </Route>)}
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
