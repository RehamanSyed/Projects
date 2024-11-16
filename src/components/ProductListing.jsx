import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "@/store/cartSlice";

import { toast } from "react-toastify";
import Image from "next/image";
import { FiMinus } from "react-icons/fi";
import { MdAdd } from "react-icons/md";
import { LuTrash2 } from "react-icons/lu";
import IconButton from "./ui/IconButton";
import Button from "./ui/Button";

const ProductListing = ({ product }) => {
  const dispatch = useDispatch();
  const { products, items: cartItems } = useSelector((state) => state.cart);

  const updatedProduct = products.find((p) => p.id === product.id);
  const cartItem = cartItems?.find((f) => f.id === updatedProduct.id);

  // Add product to cart
  const handleAddToCart = useCallback(() => {
    dispatch(addToCart(updatedProduct));
  }, [dispatch, updatedProduct]);

  // Increment quantity in cart
  const handleIncrement = useCallback(() => {
    console.log(cartItem.quantity);
    if (updatedProduct?.availableStock === 0) {
      const toastId = "stockToast";
      if (!toast.isActive(toastId)) {
        toast.warn("The maximum number of quantity has been added.", {
          hideProgressBar: true,
          theme: "dark",
          toastId: toastId,
        });
      }
      return;
    }
    dispatch(incrementQuantity({ id: updatedProduct.id }));
  }, [dispatch, updatedProduct]);

  // Decrement quantity in cart
  const handleDecrement = useCallback(() => {
    dispatch(decrementQuantity({ id: updatedProduct.id }));
  }, [dispatch, updatedProduct]);

  // Remove item from cart
  const handleRemoveCartItem = useCallback(() => {
    dispatch(removeFromCart({ id: updatedProduct.id }));
  }, [dispatch, updatedProduct]);

  // Check if item is in cart, and its stock status
  const isInCart = cartItem?.quantity > 0;
  const isOutOfStock = updatedProduct?.availableStock === 0;
  const isStockAvailable = updatedProduct?.availableStock > 0;

  return (
    <div className="card">
      <div className="image">
        <Image
          src={updatedProduct?.image}
          alt={updatedProduct?.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          style={{
            objectFit: "contain",
          }}
        />
      </div>
      <div className="card-content">
        {isOutOfStock && <div className="no-stock">Out of stock</div>}
        <div className="card-title">{updatedProduct?.title}</div>
        <div className="available-stock">{`Available Stocks: ${updatedProduct?.availableStock}`}</div>
        <div className="product-price mb-3">
          <h3>{updatedProduct?.price} SAR</h3>
        </div>

        {/* Cart actions */}
        {isInCart ? (
          <div className="btncontianer">
            {cartItem?.quantity <= 1 ? (
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
              {cartItem?.quantity}
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
          <Button
            variant="btn-primary"
            label="Out of stock"
            disabled
            onClick={() => {}}
          />
        )}
      </div>
    </div>
  );
};

export default ProductListing;
