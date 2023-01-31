import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import BookMark from "../Item/BookMark";

const AddButton = (props) => {
  return (
    <button
      style={{
        borderRadius: "0px 0px 10px 10px",
        border: "2px solid #fff",
        // border: "none",
        padding: ".5em",
        filter: "brightness(.8)",
      }}
      {...props}
    >
      +
    </button>
  );
};

export default AddButton;
