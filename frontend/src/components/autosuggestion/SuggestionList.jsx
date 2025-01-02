import React from "react";

export const SuggestionList = ({ suggestions, onSelect , customStyles }) => {
  console.log(suggestions, "suggestions");
  return (
    <React.Fragment>
      {suggestions?.map((item, index) => {
        return (
          <li  className="list-item" onClick={() => onSelect(item)} key={index}>
            {item.name}
          </li>
        );
      })}
    </React.Fragment>
  );
};
