import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ListItemButton, Stack } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import DeleteIcon from "@mui/icons-material/Delete";
import Btn from "../Btn";

const ListArticle = ({ data, deleteArticle }) => {
  const n = useNavigate();
  const clickItem = (id) => {
    n(`/pages/${id}`);
  };
  console.log(data);
  return (
    <List sx={{ overflowY: "auto", paddingBottom: "5em", height: 400 }}>
      {data.length
        ? data.map((e) => (
            <ListItem
              disablePadding
              sx={{
                "& .MuiListItemButton-root:hover": {
                  bgcolor: "#42a5f5",
                  color: "#fff",
                },
              }}
            >
              <ListItemButton
                tabIndex={0}
                key={e.id}
                sx={{
                  bgcolor: "#90caf9",
                  marginBottom: ".5em",
                  color: "#303030",
                }}
                onClick={() => clickItem(e.id)}
              >
                <ListItemText primary={e.name} />
                {deleteArticle && (
                  <Btn id={e.id} onClick={deleteArticle}>
                    <DeleteIcon></DeleteIcon>
                  </Btn>
                )}
              </ListItemButton>
            </ListItem>
          ))
        : Array(5)
            .fill("")
            .map((e) => (
              <Skeleton
                variant="rectangular"
                sx={{ fontSize: "3rem", marginBottom: ".2rem" }}
              />
            ))}
    </List>
  );
};

export default ListArticle;
