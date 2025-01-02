import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Card } from "../components/Card";

export const Cart = () => {
  const { cart } = useContext(CartContext);

  console.log(cart, "cartitem");

  return (
    <div>
      <h1>Cart Items</h1>
      {cart.length === 0 ? (
        <p>No items in the cart.</p>
      ) : (
        cart?.map((product) => {
          return (
            <Card>
              <Card.Image image={product.image} />
              <Card.Title title={product.title} />
              <Card.Quantity quantity={product.quantity} />
            </Card>
          );
        })
      )}
    </div>
  );
};
