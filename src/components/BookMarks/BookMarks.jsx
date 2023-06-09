import "./BookMarks.scss";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  asyncAddBookmarks,
  asyncGetChildBookmarks,
  removeBookmarks,
  asyncRenameBookmarks,
  removeActiveBookmark,
} from "../../redux/slices/bookmarkSlice";
import {
  asyncGetArticles,
  removeArticles,
} from "../../redux/slices/articleSlice";
import Modal from "../Modal/Modal";
import { useRef } from "react";
import { useEffect } from "react";
import { useDebounce } from "../../hook/useDebounce";
import ParentBookMark from "./ParentBookMark";
import ActiveBookMark from "./ActiveBookMark";
import { asyncGetRootBookmarks } from "../../redux/slices/bookmarkSlice";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  setChildBookmarks,
  setRootBookmarks,
} from "../../redux/slices/bookmarkSlice";
const BookMarks = ({ token }) => {
  const listChildren = useSelector((s) => s.bookmark.bookmarks[1]);
  const listParent = useSelector((s) => s.bookmark.bookmarks[0]);
  const parentBookmark = useSelector((s) => s.bookmark.parentBookmark);
  const activeBookmark = useSelector((s) => s.bookmark.activeBookmark);
  const dispatch = useDispatch();

  // MODAL
  const inp = useRef();
  useEffect(() => {
    dispatch(asyncGetRootBookmarks(token));
  }, []);
  useEffect(() => {}, [listChildren, listParent]);
  const [isOpen, setIsOpen] = useState(false);
  const [renameId, setRenameId] = useState(null);
  useEffect(() => {
    if (inp.current && isOpen) {
      inp.current.focus();
    }
  }, [inp, isOpen]);
  const addBookMarkClick = () => {
    setIsOpen(true);
  };
  const renameBookMarkClick = (e) => {
    setIsOpen(true);
    setRenameId(e.currentTarget.id);
    inp.current.value = [...listParent, ...listChildren].filter(
      (el) => el?.id == e.currentTarget.id
    )[0].name;
  };
  const addBookmark = () => {
    dispatch(asyncAddBookmarks(token, inp.current.value, parentBookmark));
    inp.current.value = "";
    setIsOpen(false);
  };
  const renameBookmark = () => {
    dispatch(
      asyncRenameBookmarks(token, renameId, inp.current.value, parentBookmark)
    );
    inp.current.value = "";
    setIsOpen(false);
    setRenameId(null);
  };
  const addBookmarkDebounced = useDebounce(addBookmark);
  const renameBookmarkDebounced = useDebounce(renameBookmark);

  // END_MODAL

  useEffect(() => {
    if (activeBookmark) {
      dispatch(asyncGetArticles(token, activeBookmark));
    }
    if (parentBookmark) {
      dispatch(asyncGetChildBookmarks(token, parentBookmark));
    }
  }, []);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  const getListStyle = (isDraggingOver) => ({
    display: "flex",
    padding: 1,
  });
  const onDragEndChild = (result) => {
    if (!result.destination) {
      return;
    }
    const items = reorder(
      listChildren,
      result.source.index,
      result.destination.index
    );

    dispatch(setChildBookmarks(items));
  };
  const onDragEndRoot = (result) => {
    if (!result.destination) {
      return;
    }
    const items = reorder(
      listParent,
      result.source.index,
      result.destination.index
    );
    window.localStorage.setItem(
      "bookmarksParents",
      JSON.stringify(items.map((e) => e.id))
    );
    dispatch(setRootBookmarks(items));
  };
  return (
    <>
      <div className="wr">
        <Modal setRenameId={setRenameId} isOpen={isOpen} setIsOpen={setIsOpen}>
          <input
            title={renameId ? "Переимменовать" : "Новая закладка"}
            ref={inp}
            type="text"
            onChange={renameId ? renameBookmarkDebounced : addBookmarkDebounced}
          />
        </Modal>
        <DragDropContext onDragEnd={onDragEndRoot}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                <ParentBookMark
                  token={token}
                  data={listParent}
                  bookmark={parentBookmark}
                  rename={renameBookMarkClick}
                  addClick={addBookMarkClick}
                ></ParentBookMark>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {parentBookmark && (
          <DragDropContext onDragEnd={onDragEndChild}>
            <Droppable droppableId="droppable" direction="horizontal">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  <ActiveBookMark
                    token={token}
                    data={listChildren}
                    rename={renameBookMarkClick}
                    bookmark={activeBookmark}
                    addClick={addBookMarkClick}
                  ></ActiveBookMark>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
    </>
  );
};

export default BookMarks;
