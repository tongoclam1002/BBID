export default function Section(props: Props) {
  return (
    <>
      <div className="heading">
        <h3>{props.title}</h3>
      </div>
      {props.children}
    </>
  );
}

interface Props {
    children?: React.ReactNode;
    title: string;
  }
