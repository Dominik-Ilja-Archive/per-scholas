function Card(props) {

  return (
    <div className="card">
      <div>{props.name}</div>
      <div>Crew: {props.crew}</div>
      <div>Length: {props.length}</div>
    </div>
  );
}

export default Card;
