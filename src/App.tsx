import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import List from "./components/List";
import AddToList from "./components/AddToList";

import { Stack, IStackTokens } from "@fluentui/react";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";

//////////////////////////////////////////////////////////////////
function Box(props: JSX.IntrinsicElements["mesh"]) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  useFrame((state, delta) => (ref.current.rotation.x += 0.01));
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

//////////////////////////////////////////////////////////////////
export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}

const stackTokens: IStackTokens = { childrenGap: 40 };

export const ButtonDefaultExample: React.FunctionComponent<
  IButtonExampleProps
> = (props) => {
  const { disabled, checked } = props;

  return (
    <Stack horizontal tokens={stackTokens}>
      <DefaultButton
        text="Standard"
        onClick={_alertClicked}
        allowDisabledFocus
        disabled={disabled}
        checked={checked}
      />
      <PrimaryButton
        text="Primary"
        onClick={_alertClicked}
        allowDisabledFocus
        disabled={disabled}
        checked={checked}
      />
    </Stack>
  );
};

function _alertClicked(): void {
  alert("Clicked");
}
//////////////////////////////////////////////////////////////////

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
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
      <ButtonDefaultExample />
    </div>
  );
}

export default App;
