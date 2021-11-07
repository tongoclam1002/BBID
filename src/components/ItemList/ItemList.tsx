export default function ItemList(props: Props) {
  return (
    <>
      <h4>Khu ăn uống</h4>
      <div className="box-list-main product clearfix">
        <ul>
          {props.children}
          <li className="no-border">
            <a href="#test" className="box-more">
              <span>
                <i className="fas fa-chevron-right"></i>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

interface Props {
  children?: React.ReactNode;
  title: string;
}
