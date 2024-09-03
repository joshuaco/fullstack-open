interface TotalProps {
  total: number;
}

function Total(props: TotalProps) {
  return <p>Number of exercises {props.total}</p>;
}

export default Total;
