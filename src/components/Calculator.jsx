import { useState, useEffect } from "react";

/* 
   Doesn't support decimals in calculations
*/

function Calculator() {
  const [input1, setInput1] = useState(0);
  const [input2, setInput2] = useState(0);
  const [operation, setOperation] = useState("+");
  const [calc, setCalc] = useState(0);

  function changeHandler(e, state, setState) {
    const value = Number(e.target.value);
    Number.isNaN(value) ? setState(state) : setState(value);
  }

  useEffect(() => {
    let result;

    switch (operation) {
      case "+":
        result = input1 + input2;
        break;
      case "-":
        result = input1 - input2;
        break;
      case "*":
        result = input1 * input2;
        break;
      case "/":
        result = input1 / input2;
        break;
      default:
        throw new Error("Should only contain basic arithmetic operators");
    }

    // to take care of React wanting NaN cast to a string
    if (Number.isNaN(result)) result = String(result);

    /* 
       React doesn't like the use of eval because it can be dangerous
       setCalc(eval(`${input1} ${operation} ${input2}`));
    */

    setCalc(result);
  }, [input1, input2, operation]);

  return (
    <div className="container">
      <h1>Arithmetic with React!</h1>
      <form className="add">
        <div className="inputs">
          <input
            type="text"
            name="value1"
            value={input1}
            onChange={e => changeHandler(e, input1, setInput1)}
          />
          <select
            value={operation}
            onChange={e => setOperation(e.target.value)}
          >
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">*</option>
            <option value="/">/</option>
          </select>
          <input
            type="text"
            name="value2"
            value={input2}
            onChange={e => changeHandler(e, input2, setInput2)}
          />
        </div>
        <span className="equals">Equals</span>
        <h3 className="result">{calc}</h3>
      </form>
    </div>
  );
}

export default Calculator;
