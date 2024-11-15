import ReactDOM from "react-dom";
import { useEffect } from "react";
import IconButton from "./IconButton";
import { MdClose } from "react-icons/md";

const Modal = ({ isOpen, onClose, children }) => {
  // Prevent scrolling on body when the modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={`modalBackdrop ${isOpen ? "open" : ""}`} onClick={onClose}>
      <div
        className={`modalContent ${isOpen ? "open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <IconButton
          icon={<MdClose size={24} />}
          variant="btn-plain-primary btn-rounded closeButton"
          onClick={onClose}
          className={"closeButton"}
        />
      </div>
    </div>,
    document.body
  );
};

export default Modal;
