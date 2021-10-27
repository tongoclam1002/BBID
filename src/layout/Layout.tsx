import BreadCrumbs from "../components/BreadCrumbs/BreadCrumbs";
import Header from "../components/Header/Header";

export default function Layout(props: layoutProps) {
  return (
    <div className="box-content home">
      <div className="container">
        <div className="row">
          <div className="col col-12">
            <Header />
            <BreadCrumbs />
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}

interface layoutProps {
    children?: React.ReactNode
}