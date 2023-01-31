import { useState } from "react";
import cl from "./Modal.module.scss";
const Modal = ({ children, isOpen, setIsOpen }) => {
  return (
    <div
      className={isOpen ? cl.wrapperModal + " " + cl.open : cl.wrapperModal}
      onClick={() => {
        setIsOpen(false);
      }}
    >
      <div
        className={cl.wrapperInner}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2>Добавьте закладку</h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;
