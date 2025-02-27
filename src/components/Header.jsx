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

  


  return (
    <div className="container">
      <div className="navbar pt-4 pb-4">
        <h1 style={{ fontSize: 28, fontWeight: "500" }}>My Store.com</h1>

          {/* <p className="badge">{cartItems && cartItems?.length}</p> */}
        <div style={{ position: "relative" }}>
          <IconButton
            icon={<FaCartShopping size={16} />}
            variant="btn-secondary btn-rounded p-4"
            onClick={openModal}
          />
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Cart onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default Header;
