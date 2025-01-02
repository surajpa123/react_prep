import React, { useState, createContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingProduct = cart.find((ele) => ele.id === product.id);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    const updatedCart = cart?.filter((ele) => ele.id != id);
    setCart(updatedCart);
  };

  const manageQuantity = (id,type)=>{
    


  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
