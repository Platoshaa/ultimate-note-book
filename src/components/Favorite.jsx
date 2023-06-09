import { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asyncGetFaforite } from "../redux/slices/articleSlice";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ListItemButton } from "@mui/material";
import ListArticle from "./UI/ListArticle";
const Favorite = ({ token, favorite }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncGetFaforite(token));
  }, []);
  return <ListArticle data={favorite}></ListArticle>;
};

export default memo(Favorite);
