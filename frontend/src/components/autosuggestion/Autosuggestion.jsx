import React, { useCallback, useEffect } from "react";
import { SuggestionList } from "./SuggestionList";
import "../../styles/autoSuggestions.css";

export const Autosuggestion = ({
  fetchSuggestions,
  onChange,
  onSelect,
  placeholder,
  customLoading = "Loading...",
  customStyles,
}) => {
  const [inputValue, setInputValue] = React.useState("");
  const [suggestions, setSuggestions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  // create a simple debounce function

  const debounce = useCallback((func, delay) => {
    let timer;

    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  }, []);

  const getSuggestions = async (value) => {
    setLoading(true);
    try {
      const response = await fetchSuggestions(value);
      setSuggestions(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const onInputChange = (event) => {
    onChange(event.target.value);
    setInputValue(event.target.value);
  };

  useEffect(() => {
    if (inputValue.length > 1) {
      // getSuggestions(inputValue);
      debounce(getSuggestions,300)(inputValue)
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const handleSelect = useCallback((data) => {
    onSelect(data);
    setInputValue(data.name);
  }, []);

  return (
    <>
      <input
        onChange={onInputChange}
        placeholder={placeholder}
        value={inputValue}
        style={{
          ...customStyles,
        }}
        className="base-input-style"
      />
      {loading && (
        <ul
          style={{
            ...customStyles,
          }}
          className="suggestion-list"
        >
          {customLoading}
        </ul>
      )}
      {error && (
        <ul
          style={{
            ...customStyles,
          }}
          className="suggestion-list"
        >
          Error: {error.message}
        </ul>
      )}
      {suggestions.length === 0 && inputValue.length > 0 && (
        <ul
          style={{
            ...customStyles,
          }}
          className="suggestion-list"
        >
          No suggestions found.
        </ul>
      )}
      {suggestions.length > 0 && (
        <ul
          style={{
            ...customStyles,
          }}
          className="suggestion-list"
        >
          <SuggestionList
            suggestions={suggestions}
            customStyles={customStyles}
            onSelect={handleSelect}
          />{" "}
        </ul>
      )}
    </>
  );
};
