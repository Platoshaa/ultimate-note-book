import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useFirebaseAuth from "./hook/useFirebaseAuth";
import { setUser } from "./redux/slices/authSlice";
import "./app.scss";
import Login from "./pages/LogIn";
import AuthBtn from "./components/AuthBtn";
import TextEditor from "./components/TextEditor/TextEditor";
import NoteBook from "./pages/NoteBook";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
function App() {
  const d = useDispatch();
  const auth = useFirebaseAuth();
  const a = useSelector((s) => s.auth);
  useEffect(() => {
    if (auth) {
      d(setUser({ email: auth.email, token: auth.uid }));
    }
  }, [auth]);
  return (
    <div className="App flow-text">
      {auth !== null ? (
        <>
          <div className="content ">
            <Routes>
              {auth === false ? (
                <Route path="/" element={<Login />} />
              ) : (
                a.email && (
                  <>
                    <Route path="/pages/:id" element={<TextEditor />} />
                    <Route path="/" element={<NoteBook />} />
                  </>
                )
              )}
            </Routes>
          </div>
        </>
      ) : (
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </div>
  );
}
export default App;
