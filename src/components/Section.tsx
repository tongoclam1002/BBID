import { Card } from "antd";

export default function Section(props: Props) {
  return (
    <>
      <Card>
        <div className="heading">
          <h3>{props.title}</h3>
        </div>
        {props.children}
      </Card>
    </>
  );
}

interface Props {
  children?: React.ReactNode;
  title: string;
}
