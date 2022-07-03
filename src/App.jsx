import UserSummary from "./components/UserSummary";
import UserList from "./components/UserList";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import fetchUser from "./services/random_user";
import "./styles/App.scss";
import "./styles/utilities.scss";

function App() {
  const [listOfUsers, setListOfUsers] = useState([]);

  async function refreshUser(e) {
    const user = await fetchUser();
    console.log(user);
    setListOfUsers([...listOfUsers, user]);

    return user;
  }

  useEffect(() => {
    async function request() {
      await refreshUser();
    }
    request();
  }, []);

  const mappedListOfUsers = listOfUsers.map(user => {
    return <UserSummary key={uuidv4()} userData={user} />;
  });

  return (
    <div className="app">
      <h1 className="app__title">Get Random User</h1>
      <div className="app__buttons">
        <button className="app__button" onClick={refreshUser}>
          Get User
        </button>
      </div>
      <UserList>{mappedListOfUsers}</UserList>
    </div>
  );
}

export default App;
