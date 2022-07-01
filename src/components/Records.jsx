import { useState } from "react";
import Receipt from "./Receipt";
import { v4 as uuidv4 } from "uuid";

const prevReceipts = [
  {
    person: "Andre",
    order: {
      main: "Burrito",
      protein: "Organic Tofu",
      rice: "Purple Rice",
      sauce: "Green Crack",
      toppings: ["Baby Bok Choy", "Cucumber Kimchi"],
      drink: "Korchata",
      cost: 22,
    },
    paid: false,
  },
  {
    person: "Katelyn",
    order: {
      main: "Rice Bowl",
      protein: "Ginger Soy Chix",
      rice: "Sticky Rice",
      sauce: "Korilla",
      toppings: ["Yuzu Pickled Sweet Pepper", "Kale"],
      drink: "Korchata",
      cost: 19,
    },
    paid: false,
  },
  {
    person: "Bruno",
    order: {
      main: "Salad Bowl",
      protein: "Organic Tofu",
      rice: "none",
      sauce: "K'lla",
      toppings: ["Blue Potato Salad", "Pico De Gallo", "Red Kimchi"],
      drink: "Sparkling Blood Orange Soda",
      cost: 20,
    },
    paid: true,
  },
];

const Records = props => {
  const [receipts, setReceipts] = useState(prevReceipts);

  function handleOnClick(id) {
    // update the paid property of the receipt that matches
    // the id

    // filter our receipts. keep any that don't match the id
    const filtered = receipts.filter(receipt => {
      if (receipt.id === id) {
        receipt.paid = true;
      }

      return receipt.id !== id;
    });
    setReceipts(filtered);
  }

  const mappedReceipts = receipts.map(receipt => {
    const { person: name, order } = receipt;
    const { main, protein, rice, sauce, drink, cost, toppings } = order;
    const uuid = uuidv4();
    receipt.id = uuid;

    return (
      <Receipt
        name={name}
        main={main}
        protein={protein}
        rice={rice}
        sauce={sauce}
        drink={drink}
        toppings={toppings}
        cost={cost}
        key={uuid}
        id={uuid}
        handleOnClick={handleOnClick}
      />
    );
  });

  return <div className="records">{mappedReceipts}</div>;
};

export default Records;
