import React, { useEffect, useState, useContext } from "react";
import { Card } from "../components/Card";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export const Product = () => {
  const [products, setProducts] = useState([]);

  const { addToCart, removeFromCart, cart } = useContext(CartContext);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProducts();
  }, []);

  return (
    <>
      <Link to={"/cart"}>
        <h2>Cart page</h2>
      </Link>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {products?.map(
          (
            { title, price, description, category, image, rating, id },
            index
          ) => {
            return (
              <div
                style={{
                  maxWidth: "400px",
                  cursor: "pointer",
                }}
                key={id}
              >
                <Card>
                  <Card.Image image={image} />
                  <Card.Title title={title} />
                  <Card.Price price={price} />
                  <Card.Rating rating={rating.rate} />
                  <Card.Actions addToCart={()=> addToCart(products[index]) } removeFromCart={()=> removeFromCart(id)} />

                </Card>
                {/* <Card
                  title={title}
                  price={price}
                  description={description}
                  category={category}
                  image={image}
                  rating={rating.rate}
                  addToCart={() => addToCart(products[index])}
                  removeFromCart={() => removeFromCart(id)}
                /> */}
              </div>
            );
          }
        )}
      </div>
    </>
  );
};
