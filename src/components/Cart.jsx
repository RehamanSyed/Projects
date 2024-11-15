import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "./ui/IconButton";
import { LuTrash2 } from "react-icons/lu";
import { MdAdd, MdHorizontalRule } from "react-icons/md";
import Button from "./ui/Button";
import Image from "next/image";
import successGif from "./../../public/like.gif";
import {
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "@/store/cartSlice";
import { BiSolidCartDownload } from "react-icons/bi";

const Cart = ({ onClose }) => {
  const [isSuccess, setIsSuccess] = useState(false);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const products = useSelector((state) => state.cart.products);

  const subtotal = cartItems.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

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

  const handleConfirmOrder = () => {
    setIsSuccess(true);

    dispatch(clearCart());
  };

  return isSuccess ? (
    <div className="grid">
      <div className="grid-col-12">
        <div className="ordercomplete">
          <Image src={successGif} alt="succes" width={100} height={100} />
          <h4>Order Confirmed</h4>
          <p>
            We are Getting your order ready to be shipped. we will notify once
            it has be packed
          </p>
          <Button
            label={"Close"}
            variant="btn-primary"
            onClick={() => {
              setIsSuccess(false);
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  ) : (
    <div className="grid">
      <div className="grid-col-12">
        Total Cart items {cartItems && cartItems.length}
      </div>
      <div
        className="grid-col-xs-12 grid-col-sm-12 grid-col-lg-8"
        style={{ minHeight: 350, maxHeight: 350, overflowY: "scroll" }}
      >
        {cartItems.length === 0 ? (
          <div className="emptycart">
            <BiSolidCartDownload size={48} color="gray" />
            <h2>Your cart is empty</h2>
          </div>
        ) : (
          cartItems.map((product, idx) => {
            const updatedProduct = products.find((p) => p.id === product.id);
            console.log("updatedProduct --->", updatedProduct.availableStock);
            return (
              <div key={idx} className="cart-items mb-2">
                <div className="cart-details">
                  <div className="cart-item-image">
                    <Image
                      src={product.image}
                      alt={"image"}
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="cart-item-info">
                    <p style={{ fontSize: 12 }}> {product?.title} </p>
                    <p> Total Price : {product.price * product.quantity} SAR</p>
                    <p>
                      Quantity : {product.price} X {product.quantity}
                    </p>
                    {product.quantity > updatedProduct.availableStock && (
                      <p style={{color:'blue', fontSize:9}}> Maximum quanity reached</p>
                    )}
                  </div>
                </div>
                <div className="btncontianer">
                  {product.quantity <= 1 ? (
                    <IconButton
                      icon={<LuTrash2 size={16} />}
                      variant="btn-outline-error"
                      onClick={() => handleRemoveCartItem(product)}
                    />
                  ) : (
                    <IconButton
                      icon={<MdHorizontalRule size={16} />}
                      variant="btn-outline-primary"
                      onClick={() => handleDecrement(product)}
                    />
                  )}
                  <IconButton
                    icon={<MdAdd size={16} />}
                    variant="btn-outline-primary"
                    onClick={() => handleIncrement(product)}
                    disabled={
                      product.quantity > updatedProduct.availableStock
                        ? true
                        : false
                    }
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="grid-col-xs-12 grid-col-sm-12 grid-col-lg-4">
        <div className={"order-summary "}>
          <h4>Price Summary</h4>

          <table width={"100%"} className="summary-table">
            <tbody>
              <tr>
                <td>Sub Total </td>
                <td>: {subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Discount Applied</td>
                <td> : {discount * 100}%</td>
              </tr>
              <tr>
                <td>Discount Amount</td>
                <td> : {(subtotal - discountedPrice).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Total amount</td>
                <td> : {discountedPrice.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <Button
            label="Confirm Order"
            variant="btn-primary"
            onClick={handleConfirmOrder}
            disabled={!cartItems.length > 0 ? true : false}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
