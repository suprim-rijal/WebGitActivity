// src/UseEffectTest.jsx
import { useEffect, useState } from "react";

const UseEffectTest = () => {
  const [toggleOne, setToggleOne] = useState(false);
  const [toggleTwo, setToggleTwo] = useState(false);
  const [count, setCount] = useState(0);

  // 1. Runs after every render (No dependency array)
  useEffect(() => {
    console.log("UseEffect1 Ran");
  });

  // 2. Runs only once on mount (Empty dependency array)
  useEffect(() => {
    console.log("UseEffect2 Ran (Empty array)");
  }, []);

  // 3. Runs only when toggleTwo changes
  useEffect(() => {
    console.log("UseEffect3 Ran");
    if (toggleTwo) {
      console.log("toggleTwo slice of state is true so this code runs");
    }
  }, [toggleTwo]);

  // 4. Runs when count changes, and uses a CLEANUP function to prevent memory leaks
  useEffect(() => {
    const myInterval = setInterval(() => {
      console.log(`UseEffect4 with interval number ${count} is running`);
    }, 1000);

    // Cleanup function: clears the old interval before starting a new one
    return () => {
      console.log(
        `UseEffect4 cleanup ran.\nsetInterval number ${count} is being cleared out`,
      );
      clearInterval(myInterval);
    };
  }, [count]);

  return (
    <div>
      {console.log("rendered or re-rendered")}
      <h1>UseEffectTest Component</h1>
      <button onClick={() => setToggleOne(!toggleOne)}>ToggleOne</button>
      <button onClick={() => setToggleTwo(!toggleTwo)}>ToggleTwo</button>
      <button onClick={() => setCount(count + 1)}>Count</button>
    </div>
  );
};

export default UseEffectTest;
