import { useDispatch } from "react-redux";
import {
  removeActiveBookmark,
  setActiveBookmark,
} from "../../redux/slices/bookmarkSlice";
import {
  asyncGetArticles,
  removeArticles,
} from "../../redux/slices/articleSlice";
import ItemBookMarkList from "./ItemBookmarkList";

const ActiveBookMark = (props) => {
  const dispatch = useDispatch();
  const click = (e) => {
    if (e.target.id == props.bookmark) {
      dispatch(removeActiveBookmark());
      dispatch(removeArticles());
    } else {
      dispatch(setActiveBookmark(e.target.id));
      dispatch(asyncGetArticles(props.token, props.bookmark));
    }
  };
  return <ItemBookMarkList click={click} isParent={false} {...props} />;
};

export default ActiveBookMark;
