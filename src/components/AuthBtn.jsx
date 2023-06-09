import { useDispatch, useSelector } from "react-redux";
import { asyncSignOut, signIn } from "../redux/slices/authSlice";
import Button from "@mui/material/Button";
const AuthBtn = (cl = "") => {
  const auth = useSelector((s) => s.auth.email);
  const dispatch = useDispatch();
  cl = cl ? cl : "";
  return (
    <Button
      variant="contained"
      className=" authBtn"
      onClick={() => dispatch(auth ? asyncSignOut() : signIn())}
      sx={cl}
    >
      {auth ? "Sign out" : "Sign in"}
    </Button>
  );
};

export default AuthBtn;
