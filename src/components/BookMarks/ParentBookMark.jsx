import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  asyncGetChildBookmarks,
  removeActiveBookmark,
  removeParentBookmark,
  setParentBookmark,
} from "../../redux/slices/bookmarkSlice";
import { removeArticles } from "../../redux/slices/articleSlice";
import ItemBookMarkList from "./ItemBookmarkList";
const ParentBookMark = (props) => {
  const dispatch = useDispatch();
  const bookmarkParentClick = (e) => {
    dispatch(removeArticles());
    dispatch(removeActiveBookmark());
    if (e.target.id == props.bookmark) {
      dispatch(removeParentBookmark());
    } else {
      dispatch(setParentBookmark(e.target.id));
      dispatch(asyncGetChildBookmarks(props.token, e.target.id));
    }
  };
  return (
    <>
      <ItemBookMarkList
        click={bookmarkParentClick}
        isParent={true}
        {...props}
      />
    </>
  );
};

export default ParentBookMark;
