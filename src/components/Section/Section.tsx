export default function Section(props: sectionProps) {
  return (
    <>
      <div className="heading">
        <h3>{props.title}</h3>
      </div>
      {props.children}
    </>
  );
}

interface sectionProps {
    children?: React.ReactNode;
    title: string;
  }
