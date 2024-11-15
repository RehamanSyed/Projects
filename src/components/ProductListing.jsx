import React from "react";
import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "@/store/cartSlice";

import Button from "./ui/Button";
import { FaCartShopping, FaMinus } from "react-icons/fa6";
import IconButton from "./ui/IconButton";
import { MdAdd, MdMinimize } from "react-icons/md";
import { LuTrash2 } from "react-icons/lu";
import { FiMinus } from "react-icons/fi";
import { toast } from "react-toastify";

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
    if (updatedProduct.availableStock === 0) {
      toast.warn("The maximum number of quantity has been added.", {
        hideProgressBar: true,
        theme: "dark",
      });

      return;
    }
    dispatch(incrementQuantity({ id: product.id }));
  };
  const handleDecrement = () => {
    dispatch(decrementQuantity({ id: product.id }));
  };
  const handleRemoveCartItem = () => {
    dispatch(removeFromCart({ id: product.id }));
  };

  return (
    <div className="card">
      <div className="image">
        <Image
          src={updatedProduct.image}
          alt={updatedProduct?.title}
          fill
          priority
          style={{
            objectFit: "contain", // cover, contain, none
          }}
        />
      </div>
      <div className="card-content">
        {updatedProduct.availableStock === 0 && (
          <div className={"no-stock"}>Out of stock</div>
        )}
        <div className="card-title">{updatedProduct.title}</div>
        <div className={"available-stock"}>
          {`Available Stocks : ${updatedProduct.availableStock}`}
        </div>
        <div className={"product-price"}>
          <h3>{updatedProduct.price} SAR</h3>
        </div>

        {cartitem?.quantity > 0 ? (
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
        ) : updatedProduct.availableStock > 0 ? (
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
