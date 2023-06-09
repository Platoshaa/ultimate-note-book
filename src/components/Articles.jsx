import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  asyncDeleteArticle,
  asyncGetArticles,
} from "../redux/slices/articleSlice";
import { useNavigate } from "react-router-dom";
import { BsX } from "react-icons/bs";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ListItemButton } from "@mui/material";
import ListArticle from "./UI/ListArticle";

const Articles = ({ token }) => {
  const dispatch = useDispatch();
  const articles = useSelector((s) => s.article.articles);
  const active = useSelector((s) => s.bookmark.activeBookmark);

  useEffect(() => {
    if (active) {
      dispatch(asyncGetArticles(token, active));
    }
  }, [active]);

  const deleteItem = (e) => {
    e.stopPropagation();
    dispatch(asyncDeleteArticle(token, e.currentTarget.id, active));
  };
  return active && <ListArticle data={articles} deleteArticle={deleteItem} />;
};

export default Articles;
