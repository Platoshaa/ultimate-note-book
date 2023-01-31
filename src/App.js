import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeUser, setUser } from "./redux/slices/authSlice";
import { au } from "./api";
import bg from "./assets/paintings/bgList.png";
import "./app.scss";
import Login from "./pages/Login/LogIn";
import { useState } from "react";
import TextEditor from "./components/TextEditor";
import AuthBtn from "./components/AuthBtn";
import Timer from "./components/Timer";
import NoteBook from "./components/NoteBook/NoteBook";

function App() {
  const a = useSelector((s) => s.auth);
  const [isLoad, setIsLoad] = useState(false);
  const dispatch = useDispatch();
  const page = useSelector((s) => s.data.isMain);
  const bookmarks = useSelector((s) => s.data.activeBookmark);
  let counterTimer = useRef();
  let counter = useRef(0);

  useEffect(() => {
    onAuthStateChanged(au, (user) => {
      if (user) {
        dispatch(setUser({ email: user.email, token: user.uid }));
      } else {
        dispatch(removeUser());
      }
      setIsLoad(true);
    });
  }, []);
  return (
    <div className="App">
      <AuthBtn isLoad={isLoad} auth={a}></AuthBtn>
      {isLoad &&
        (a.email ? (
          <>
            <Timer
              style={
                page && !bookmarks
                  ? { left: "50%", transform: "translateX(-50%)" }
                  : { opacity: 0, zIndex: -1 }
              }
            />
            <div className="content">
              <div
                className="wrapper"
                style={{ backgroundImage: `url(${bg})` }}
              >
                <Routes>
                  <Route path="/pages/:id" element={<TextEditor />} />
                  <Route path="*" element={<NoteBook auth={a} />} />
                </Routes>
              </div>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        ))}
    </div>
  );
}
export default App;
