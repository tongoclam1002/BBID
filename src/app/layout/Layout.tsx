import Header from "./Header";

export default function Layout(props: layoutProps) {
  return (
    <div className="box-content">
      <Header />
      <div className="container">
        <div className="row">
          <div className="col col-12">
            
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