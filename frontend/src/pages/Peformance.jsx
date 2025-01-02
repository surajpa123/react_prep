import React, { useCallback, useMemo, useState } from "react";
import { SlowComponent } from "../components/SlowComponent";

function calculate() {
  let result = 0;
  for (let i = 0; i < 1000000000; i++) {
    result += i;
  }
  return result;
}

export const Peformance = () => {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState("");

  const [memoCount, setMemoCount] = useState(0);

  const handleClick = useCallback(() => {
    setValue("Kunal");
  }, [value, setValue]);

  // without useCallback
  //   const handleClick = () => {
  //     setValue("Kunal");
  //   };

  const expensiveCalculation = useMemo(() => {
    return calculate();
  }, []);

  // without usememo it will calculate every time does not cache the result
  //   const expensiveCalculation = calculate();

  console.log(expensiveCalculation, "expensiveCalculation");

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <button onClick={() => setMemoCount(memoCount + 1)}>
        Increment Memo Count
      </button>
      <p>Count: {count}</p>
      <p>Value: {value}</p>
      <p>Memo Count: {memoCount}</p>
      <SlowComponent handleClick={handleClick} />
    </div>
  );
};
