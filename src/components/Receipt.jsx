function Receipt(props) {
  const mappedToppings = props.toppings.map(topping => {
    return <li>{topping}</li>;
  });

  return (
    <div className="receipt" onClick={() => props.handleOnClick(props.id)}>
      <h3 className="receipt__title">{props.name}</h3>
      <ul className="receipt__list unstyle-list">
        <li className="receipt__item">
          <span className="receipt__key">Main:</span>{" "}
          <span className="receipt__value">{props.main}</span>
        </li>
        <li className="receipt__item">
          <span className="receipt__key">Protein:</span>{" "}
          <span className="receipt__value">{props.protein}</span>
        </li>
        <li className="receipt__item">
          <span className="receipt__key">Rice:</span>{" "}
          <span className="receipt__value">{props.rice}</span>
        </li>
        <li className="receipt__item">
          <span className="receipt__key">Sauce:</span>{" "}
          <span className="receipt__value">{props.sauce}</span>
        </li>
        <li className="receipt__item">
          <span className="receipt__key">Drink:</span>{" "}
          <span className="receipt__value">{props.drink}</span>
        </li>
        <li className="receipt__item">
          <span className="receipt__key">Toppings:</span>{" "}
          <ul className="receipt__value">{mappedToppings}</ul>
        </li>
        <li className="receipt__item">
          <span className="receipt__key">Cost:</span>{" "}
          <span className="receipt__value">{props.cost}</span>
        </li>
      </ul>
    </div>
  );
}

export default Receipt;
