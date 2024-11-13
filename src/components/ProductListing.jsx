import React, { useEffect } from "react";
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

  const cartitem = cartItems?.find((f) => f.id === product.id);

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
        src={"/no-img.png"}
        alt={updatedProduct?.title}
        width={200}
        height={200}
      />
      <h5>{updatedProduct.title}</h5>
      <p style={{ margin: "10px 0px" }}>stock: {cartitem?.availableStock}</p>
      <p>{updatedProduct.price}</p>
      <div style={{ marginTop: "10px" }}>
        {cartitem?.quantity > 0 ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              width: "100%",
            }}
          >
            {cartitem?.quantity <= 1 ? (
              <button onClick={handleRemoveCartItem}>X</button>
            ) : (
              <button onClick={handleDecrement}>-</button>
            )}
            <button>{cartitem?.quantity}</button>
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
