import { useDispatch } from "react-redux";
import { asyncSignIn, asyncSignOut } from "../redux/slices/authSlice";
const AuthBtn = ({ isLoad, auth }) => {
  const dispatch = useDispatch();
  return (
    <>
      {isLoad &&
        (auth.email ? (
          <button className="authBtn" onClick={() => dispatch(asyncSignOut())}>
            Sign out
          </button>
        ) : (
          <button className="authBtn" onClick={() => dispatch(asyncSignIn())}>
            Sign in
          </button>
        ))}
    </>
  );
};

export default AuthBtn;
