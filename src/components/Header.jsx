import React, { useState } from "react";
import IconButton from "./ui/IconButton";
import { FaCartShopping } from "react-icons/fa6";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import Cart from "./Cart";
import { useSelector } from "react-redux";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const cartItems = useSelector((state) => state.cart.items);
  const products = useSelector((state) => state.cart.products);

  return (
    <div className="container">
      <div className="navbar">
        <h1 style={{ fontSize: 32, fontWeight: "bold" }}>MyStore</h1>

        <div>
          <div style={{ position: "relative" }}>
            <span className="badge">{cartItems.length}</span>
            <IconButton
              icon={<FaCartShopping size={16} />}
              variant="btn-secondary btn-rounded p-4"
              onClick={openModal}
            />
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Cart products={products} onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default Header;
