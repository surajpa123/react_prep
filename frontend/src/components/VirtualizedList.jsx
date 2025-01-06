import React, { useEffect, useRef, useState } from "react";

export const VirtualizedList = ({ data }) => {
  const [dataInChunks, setDataInChunks] = useState([]);
  const chunkSize = 10;
  const listRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const chuncked = data.slice(0, chunkSize);
    setDataInChunks(chuncked);
  }, [data]);

  const handleScroll = () => {
    if (!listRef.current) return;
    const bottom =
      listRef.current.scrollHeight ===
      listRef.current.scrollTop + listRef.current.clientHeight;
    if (bottom) {
      setIsLoading(true);
      const chuncked = data.slice(
        dataInChunks.length,
        chunkSize + dataInChunks.length
      );

      setDataInChunks((prev) => [...prev, ...chuncked]);
      setIsLoading(false);
    }
  };

  return (
    <div
      ref={listRef}
      style={{
        border: "1px solid",
        width: "400px",
        height: "200px",
        overflow: "scroll",
      }}
      onScroll={handleScroll}
    >
      {isLoading && <div>Loading...</div>}
      {!isLoading &&
        dataInChunks?.map((item, index) => <div key={index}>{item.name}</div>)}
    </div>
  );
};
