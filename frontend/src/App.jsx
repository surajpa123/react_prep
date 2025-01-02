import { useState, useContext } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ThemedComponent } from "./components/ThemedComponent";
import { Product } from "./pages/Product";
import { CartProvider } from "./context/CartContext";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Cart } from "./pages/Cart";
import { VirtualizedList } from "./components/VirtualizedList";
import { List } from "./pages/List";
import { Peformance } from "./pages/Peformance";

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/lists" element={<List />} />
            <Route path="/performance" element = {<Peformance/>} />
          </Routes>
        </Router>
      </CartProvider>
      {/* <ThemedComponent /> */}
    </>
  );
}

export default App;
