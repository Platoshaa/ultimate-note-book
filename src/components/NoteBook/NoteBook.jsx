import BookMarks from "../BookMarks/BookMarks";
import List from "../List";
import { Route, Routes, useNavigate } from "react-router-dom";
import { BsStarFill } from "react-icons/bs";

import TextEditor from "../TextEditor";
import { useDispatch, useSelector } from "react-redux";
import { dataAPI } from "../../api";
import { asyncCreateNewArticle, setIsMain } from "../../redux/slices/dataSlice";
import { Fragment, useCallback, useEffect } from "react";
import {
  asyncGetRootBookmarks,
  removeBookmarks,
} from "../../redux/slices/dataSlice";
import Timer from "../Timer";
const NoteBook = ({ auth }) => {
  const authToken = useSelector((s) => s.auth.token);
  const activeBookmark = useSelector((s) => s.data.activeBookmark);
  const page = useSelector((s) => s.data.isMain);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const articleId = useSelector((s) => s.data.articleId);
  useEffect(() => {
    dispatch(asyncGetRootBookmarks(auth.token));
    dispatch(setIsMain(true));

    return () => {
      dispatch(removeBookmarks());
    };
  }, []);
  useEffect(() => {
    if (articleId && page) {
      navigate("/pages/" + articleId);
    }
  }, [articleId]);
  const newPage = () => {
    if (activeBookmark) {
      dispatch(asyncCreateNewArticle(authToken, activeBookmark));
    } else {
      alert("Пожалуйста выберите или создайте подзакладку");
    }
  };
  return (
    <>
      {/* {ac && (
        <BsStarFill className="favorite favorite-bookmark"></BsStarFill>
      )} */}

      <BookMarks></BookMarks>

      <List />
      <button
        style={{
          position: "absolute",
          bottom: "1em",
          padding: ".2em",
          backgroundColor: "darkcyan",
          borderRadius: ".3em",
          width: "20%",
          left: "70%",
          cursor: "pointer",
          zIndex: "4",
          fontSize: "2em",
        }}
        onClick={newPage}
      >
        +
      </button>
    </>
  );
};

export default NoteBook;
