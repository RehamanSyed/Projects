import React from "react";
import styles from "@/styles/Home.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "@/store/cartSlice";

const ProductListing = ({ product }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);
  const cartItems = useSelector((state) => state.cart.items);

  const updatedProduct = products.find((p) => p.id === product.id);
  const quantity = cartItems?.find((f) => f.id === product.id)?.quantity;

  const handleAddToCart = () => {
    dispatch(addToCart(updatedProduct));
  };
  const handleIncrement = () => {
    dispatch(incrementQuantity({ id: product.id }));
  };
  const handleDecrement = () => {
    dispatch(decrementQuantity({ id: product.id }));
  };
  const handleRemoveCartItem = () => {
    dispatch(removeFromCart({ id: product.id }));
  };
  return (
    <div className={styles.product}>
      <Image
        src={updatedProduct.image}
        alt={updatedProduct.title}
        width={200}
        height={200}
      />
      <h5>{updatedProduct.title}</h5>
      <p>stock: {updatedProduct.availableStock}</p>
      <p>{updatedProduct.price}</p>
      <div>
        {quantity > 0 ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              width: "100%",
            }}
          >
            {quantity <= 1 ? (
              <button onClick={handleRemoveCartItem}>X</button>
            ) : (
              <button onClick={handleDecrement}>-</button>
            )}
            <button>{quantity}</button>
            <button onClick={handleIncrement}>+</button>
          </div>
        ) : updatedProduct.availableStock > 0 ? (
          <button onClick={handleAddToCart}>Add to Cart</button>
        ) : (
          <button disabled>Out of Stock</button>
        )}
      </div>
    </div>
  );
};

export default ProductListing;
