import { useState } from "react";
import cl from "./Modal.module.scss";
const Modal = ({ children, isOpen, setIsOpen, title, setRenameId }) => {
  return (
    <div
      className={isOpen ? cl.wrapperModal + " " + cl.open : cl.wrapperModal}
      onClick={() => {
        setIsOpen(false);
        setRenameId(null);
      }}
    >
      <div
        className={cl.wrapperInner}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;
