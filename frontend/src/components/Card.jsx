import React from "react";

// Parent Component
export const Card = ({ children }) => {
  return <div className="card">{children}</div>;
};

// Subcomponents
Card.Title = ({ title }) => <h2>{title}</h2>;

Card.Image = ({ image, alt }) => (
  <img
    style={{
      width: "100px",
      height: "100px",
    }}
    src={image}
    alt={alt}
  />
);

Card.Price = ({ price }) => <p>Price: ${price}</p>;

Card.Description = ({ description }) => <p>Description: {description}</p>;

Card.Category = ({ category }) => <p>Category: {category}</p>;

Card.Rating = ({ rating }) => <p>Rating: {rating}/5</p>;

Card.Quantity = ({ quantity }) =>
  quantity && <p>Quantity: {quantity}</p>;

Card.Actions = ({ addToCart, removeFromCart }) => (
  <div>
    <button onClick={addToCart}>Add to Cart</button>
    <button onClick={removeFromCart}>Remove from cart</button>
  </div>
);
