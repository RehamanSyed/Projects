import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "@/styles/Home.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "@/store/cartSlice";

const cart = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  console.log(cartItems);

  const subtotal = cartItems.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  console.log(subtotal);
    let discount = 0;

    if (subtotal > 200) {
      discount = 0.15; // 15% discount if total is above SAR 200
    } else if (subtotal > 100) {
      discount = 0.1; // 10% discount if total is above SAR 100
    } else if (subtotal > 50) {
      discount = 0.05; // 5% discount if total is above SAR 50
    }

    // Step 3: Calculate final price after discount
    const discountedPrice = subtotal * (1 - discount);

  const handleIncrement = (product) => {
    dispatch(incrementQuantity({ id: product.id }));
  };
  const handleDecrement = (product) => {
    dispatch(decrementQuantity({ id: product.id }));
  };
  const handleRemoveCartItem = (product) => {
    dispatch(removeFromCart({ id: product.id }));
  };
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          Total Cart items {cartItems && cartItems.length}
          <button onClick={() => router.back()}> back</button>
        </div>

        <div className={styles.grid}>
          <div className={`${styles.griditem} ${styles.item1}`}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {cartItems.map((product, idx) => {
                return (
                  <>
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        gap: 2,
                        justifyContent: "space-between",
                      }}
                    >
                      <Image
                        src={"/no-img.png"}
                        alt={"image"}
                        width={50}
                        height={50}
                      />
                      <p style={{ fontSize: 12 }}>{product?.title}</p>
                      <p>{product.price * product.quantity}</p>
                      <p>{product.quantity}</p>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      {product?.quantity > 0 ? (
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 10,
                            width: "100%",
                          }}
                        >
                          {product?.quantity <= 1 ? (
                            <button
                              onClick={() => handleRemoveCartItem(product)}
                            >
                              X
                            </button>
                          ) : (
                            <button onClick={() => handleDecrement(product)}>
                              -
                            </button>
                          )}
                          <button>{product?.quantity}</button>
                          <button onClick={() => handleIncrement(product)}>
                            +
                          </button>
                        </div>
                      ) : (
                        <button onClick={handleAddToCart}>Remve cart</button>
                      )}
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className={`${styles.griditem} ${styles.item2}`}>
            <h4>Price Summary</h4>

            <div>
              <div>Sub Total : {subtotal.toFixed(2)}</div>
              <div>Discount Applied: {discount * 100}%</div>
              <div>Discount amount :{discountedPrice.toFixed(2)}</div>
              <hr />
              <div>Total amount :{discountedPrice.toFixed(2)} </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default cart;
