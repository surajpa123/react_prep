import React from "react";
import { VirtualizedList } from "../components/VirtualizedList";

export const List = () => {
  const data = Array.from(
    {
      length: 1000,
    },
    (_, i) => ({
      id: i,
      name: `Item ${i + 1}`,
      description: `Description for Item ${i + 1}`,
    })
  );

  return (
    <div>
      <h1>List</h1>
      <VirtualizedList data={data} />
    </div>
  );
};
