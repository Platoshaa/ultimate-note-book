import BookMark from "./Item/BookMark";
import cl from "./BookMarks.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import AddButton from "./AddButton/AddButton";
import {
  asyncAddBookmarks,
  asyncDeleteBookmarks,
  asyncGetChildBookmarks,
  setParentBookmark,
  removeParentBookmark,
  setActiveBookmark,
  removeActiveBookmark,
  asyncGetArticles,
  removeArticles,
  toggleIsMain,
} from "../../redux/slices/dataSlice";
import Modal from "../Modal/Modal";
import { useRef } from "react";
import { useEffect } from "react";
import { useDebounce } from "../../hook/useDebounce";
const BookMarks = () => {
  const auth = useSelector((s) => s.auth);
  const list = useSelector((s) => s.data.bookmarks);
  const parentBookmark = useSelector((s) => s.data.parentBookmark);
  const activeBookmark = useSelector((s) => s.data.activeBookmark);
  const dispatch = useDispatch();
  const inp = useRef();
  const deleteBookmark = (e) => {
    let q = window.confirm("Delete this bookmark?");
    if (q) {
      dispatch(asyncDeleteBookmarks(auth.token, e.id));
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  const bookmarkParentClick = (e) => {
    dispatch(removeArticles());
    dispatch(removeActiveBookmark());
    if (e.target.id == parentBookmark) {
      dispatch(removeParentBookmark());
    } else {
      dispatch(setParentBookmark(e.target.id));
      dispatch(asyncGetChildBookmarks(auth.token, e.target.id));
    }
  };
  useEffect(() => {
    if (inp.current && isOpen) {
      inp.current.focus();
    }
  }, [inp, isOpen]);
  useEffect(() => {
    if (activeBookmark) {
      dispatch(asyncGetArticles(auth.token, activeBookmark));
    }
    if (parentBookmark) {
      dispatch(asyncGetChildBookmarks(auth.token, parentBookmark));
    }
  }, []);
  const addBookMarkClick = () => {
    setIsOpen(true);
  };
  const activeBookmarkClick = (e) => {
    if (e.target.id == activeBookmark) {
      dispatch(removeActiveBookmark());
      dispatch(removeArticles());
    } else {
      dispatch(setActiveBookmark(e.target.id));
      dispatch(asyncGetArticles(auth.token, activeBookmark));
    }
  };
  const addBookmark = () => {
    dispatch(asyncAddBookmarks(auth.token, inp.current.value, parentBookmark));
    inp.current.value = "";
    setIsOpen(false);
  };
  const addBookmarkDebounced = useDebounce(addBookmark);
  return (
    <>
      <div className={cl.wr}>
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          <input ref={inp} type="text" onChange={addBookmarkDebounced} />
        </Modal>
        <div className={cl.bookmarkPlank}>
          {list[0] &&
            list[0].length > 0 &&
            list[0].map((e) => (
              <BookMark
                style={
                  parentBookmark == e.id
                    ? { filter: "brightness(0.4)" }
                    : { filter: "brightness(1)" }
                }
                className={cl.item + " " + cl.itemParent}
                del={() => deleteBookmark(e)}
                onClick={bookmarkParentClick}
                key={e.id}
                id={e.id}
              >
                {e.name}
              </BookMark>
            ))}
          {!parentBookmark && (
            <AddButton className={cl.itemParent} onClick={addBookMarkClick} />
          )}
        </div>

        <div className={cl.bookmarkPlank}>
          {" "}
          {parentBookmark && (
            <>
              {list[1] &&
                list[1].length > 0 &&
                list[1].map((e) => (
                  <BookMark
                    del={() => deleteBookmark(e)}
                    onClick={activeBookmarkClick}
                    style={
                      activeBookmark == e.id
                        ? { filter: "brightness(0.4)" }
                        : { filter: "brightness(1)" }
                    }
                    className={cl.item + " " + cl.itemChild}
                    key={e.id}
                    id={e.id}
                  >
                    {e.name}
                  </BookMark>
                ))}
              <AddButton className={cl.itemChild} onClick={addBookMarkClick} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BookMarks;
