import BreadCrumbs from "../components/Common/BreadCrumbs";
import Header from "../components/Common/Header";

export default function Layout(props: layoutProps) {
  return (
    <div className="box-content home">
      <div className="container">
        <div className="row">
          <div className="col col-12">
            <Header />
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