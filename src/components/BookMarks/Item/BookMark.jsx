import Button from "../Button/Button";
import cl from "./BookMark.module.scss";
import { BsPenFill, BsX } from "react-icons/bs";

const BookMark = ({ del, children, ...prop }) => {
  return (
    <div {...prop}>
      {children}
      <button className={cl.btn} onClick={del}>
        <BsX></BsX>
      </button>
    </div>
  );
};

export default BookMark;
