import { memo } from "react";
import IconButton from "@mui/material/IconButton";

const Btn = ({ children, active = false, ...rest }) => {
  return (
    <IconButton
      color="secondary"
      aria-label="add an alarm"
      color={active ? "primary" : "secondary "}
      {...rest}
    >
      {children}
    </IconButton>
  );
};

export default memo(Btn);
