import "./styles/App.scss";
import "./styles/utilities.scss";
import CardContainer from "./components/CardContainer";
import Card from "./components/Card";
import Button from "./components/Button";
import { useState, useEffect } from "react";
import { getAllStarships } from "./services/sw-api";
import { v4 as uuidv4 } from "uuid";


function App() {
  const [shipData, setShipData] = useState(null);
  const [ships, setShips] = useState([]);
  const [canShowMoreShip, setCanShowMoreShip] = useState(true);

  useEffect(() => {

    async function request() {

      try {
        const data = await getAllStarships();
        setShipData(data);
        setShips(data.results);
      } catch (error) {
        console.log(error);
      }
    }

    request();

  }, []);

  async function clickHandler(url) {
    try {
      const data = await getAllStarships(url);
      setShipData(data);
      setShips([...ships, ...data.results]);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  const mappedShips = ships.map(ship => {
    console.log(ship.length, ship.crew);
    const uuid = uuidv4();
    return <Card key={uuid} name={ship.name} length={ship.length} crew={ship.crew} />;
  });

  return (
    <div className="App">
      <CardContainer>
        {mappedShips}
      </CardContainer>
      {canShowMoreShip ?
        <Button text="Show More" clickHandler={async (e) => {
          if (shipData.next !== null) {
            const data = await clickHandler(shipData.next);
            const { next } = data;

            if (next === null) {
              setCanShowMoreShip(false);
            }
          } else {
            setCanShowMoreShip(false);
          }
        }} /> : null
      }
    </div>
  );
}

export default App;
