import cl from "./BookMark.module.scss";
import { BsPenFill, BsX } from "react-icons/bs";
import { asyncDeleteBookmarks } from "../../../redux/slices/bookmarkSlice";
import { useDispatch, useSelector } from "react-redux";
const BookMark = ({ children, rename, ...prop }) => {
  const auth = useSelector((s) => s.auth.token);
  const parent = useSelector((s) => s.bookmark.parentBookmark);
  const dispatch = useDispatch();
  const deleteBookmark = (e) => {
    let q = window.confirm("Delete this bookmark?");
    if (q) {
      dispatch(asyncDeleteBookmarks(auth, e.currentTarget.id, parent));
    }
  };
  return (
    <div {...prop} tabIndex={0}>
      {children}
      <button id={prop.id} className={cl.btn} onClick={rename}>
        <BsPenFill></BsPenFill>
      </button>
      <button id={prop.id} className={cl.btn} onClick={deleteBookmark}>
        <BsX></BsX>
      </button>
    </div>
  );
};
export default BookMark;
