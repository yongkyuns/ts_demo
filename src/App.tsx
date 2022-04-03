import { useState, useEffect } from "react";
import "./App.css";
import List from "./components/List";
import AddToList from "./components/AddToList";

export interface IState {
  people: {
    name: string;
    age: number;
    url: string;
    note?: string;
  }[];
}

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [people, setPeople] = useState<IState["people"]>([]);

  // Retrieve previously stored people at start-up
  useEffect(() => {
    const peopleJson = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (peopleJson) {
      const storedPeople = JSON.parse(peopleJson);
      if (storedPeople) setPeople(storedPeople);
    } else {
      setPeople([
        {
          name: "Lebron James",
          url: "https://cdn.sportsforecaster.com/players/l.nba.com/60900/head/no-background/web",
          age: 36,
          note: "Allergic to stayin on the same team",
        },
      ]);
    }
  }, []);

  // Store any changes to people
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(people));
  }, [people]);

  return (
    <div className="App">
      <h1>People Invited to my Party</h1>
      <List people={people} />
      <AddToList people={people} setPeople={setPeople} />
    </div>
  );
}

export default App;
