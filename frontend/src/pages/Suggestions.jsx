import React from "react";
import { Autosuggestion } from "../components/autosuggestion/Autosuggestion";

export const Suggestions = () => {
  const fetchSuggestions = async (query) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/recipes/search?q=${query}`
      );
      const data = await response.json();

      return data.recipes;
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      return error.message;
    }
  };
  return (
    <div>
      <Autosuggestion
        fetchSuggestions={fetchSuggestions}
        onChange={(e) => {
          console.log(e, "Suggestion changed");
        }}
        customStyles={{
          width: "200px",
        }}
        placeholder="Search for recipes"
        customLoading={<>Loading...</>}
        onSelect={(data) => {
          console.log(data, "Suggestion selected");
          // Handle recipe selection here
        }}
      />
    </div>
  );
};
