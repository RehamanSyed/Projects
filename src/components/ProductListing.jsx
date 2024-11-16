import React, { useCallback } from "react";
import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "@/store/cartSlice";

import Button from "./ui/Button";

import IconButton from "./ui/IconButton";
import { MdAdd } from "react-icons/md";
import { LuTrash2 } from "react-icons/lu";
import { FiMinus } from "react-icons/fi";
import { toast } from "react-toastify";

const ProductListing = ({ product }) => {
  
  const dispatch = useDispatch();

  const { products, items: cartItems } = useSelector((state) => state.cart);
  const updatedProduct = products.find((p) => p.id === product.id);
  const cartitem = cartItems?.find((f) => f.id === product.id);

  const handleAddToCart = useCallback(() => {
    dispatch(addToCart(updatedProduct));
  }, [dispatch, updatedProduct]);

  const handleIncrement = useCallback(() => {
    if (updatedProduct.availableStock === 0) {
      const toastId = "stockToast"; // You can define a unique ID for this toast
      if (!toast.isActive(toastId)) {
        toast.warn("The maximum number of quantity has been added.", {
          hideProgressBar: true,
          theme: "dark",
          toastId: toastId, // Assign the toast ID to prevent duplicate
        });
      }
      return;
    }
    dispatch(incrementQuantity({ id: product.id }));
  }, [dispatch, updatedProduct, product.id]);

  const handleDecrement = useCallback(() => {
    dispatch(decrementQuantity({ id: product.id }));
  }, [dispatch, product.id]);

  const handleRemoveCartItem = useCallback(() => {
    dispatch(removeFromCart({ id: product.id }));
  }, [dispatch, product.id]);

  const isInCart = cartitem?.quantity > 0;
  const isOutOfStock = updatedProduct.availableStock === 0;
  const isStockAvailable = updatedProduct.availableStock > 0;

  return (
    <div className="card">
      <div className="image">
        <Image
          src={updatedProduct.image}
          alt={updatedProduct?.title}
          fill
          priority
          style={{
            objectFit: "contain",
          }}
        />
      </div>
      <div className="card-content">
        {isOutOfStock && <div className={"no-stock"}>Out of stock</div>}
        <div className="card-title">{updatedProduct.title}</div>
        <div className={"available-stock"}>
          {`Available Stocks : ${updatedProduct.availableStock}`}
        </div>
        <div className={"product-price"}>
          <h3>{updatedProduct.price} SAR</h3>
        </div>

        {isInCart ? (
          <div className="btncontianer">
            {cartitem?.quantity <= 1 ? (
              <IconButton
                variant="btn-outline-primary"
                icon={<LuTrash2 size={16} />}
                onClick={handleRemoveCartItem}
              />
            ) : (
              <IconButton
                variant="btn-outline-primary"
                icon={<FiMinus size={16} />}
                onClick={handleDecrement}
              />
            )}
            <p style={{ fontSize: 20, fontWeight: "bold", margin: 0 }}>
              {cartitem?.quantity}
            </p>
            <IconButton
              variant="btn-outline-primary"
              icon={<MdAdd size={16} />}
              onClick={handleIncrement}
            />
          </div>
        ) : isStockAvailable ? (
          <Button
            variant="btn-outline-primary"
            label="Add to Cart"
            onClick={handleAddToCart}
          />
        ) : (
          <>
            <Button
              variant="btn-primary "
              label=" Out of stock"
              disabled
              onClick={() => {}}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductListing;
