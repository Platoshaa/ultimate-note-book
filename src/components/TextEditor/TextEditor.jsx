import { useDispatch, useSelector } from "react-redux";
import cl from "./TextEditor.module.scss";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  asyncGetArticle,
  asyncUpdateArticle,
  removeArticleId,
  removeArticle,
  asyncSetFaforite,
} from "../../redux/slices/articleSlice";
import { useDebounce } from "../../hook/useDebounce";
import { useState } from "react";
import Btn from "../Btn";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const TextEditor = () => {
  const dispatch = useDispatch();
  const articleId = useParams();
  const token = useSelector((s) => s.auth.token);
  const { name, body, favorite } = useSelector((s) => s.article.article);

  const [article, setArticle] = useState({ name: "", body: "" });
  const favoriteClick = () => {
    dispatch(asyncSetFaforite(token, articleId.id, !favorite));
  };
  useEffect(() => {
    dispatch(asyncGetArticle(token, articleId.id));
    return () => {
      dispatch(removeArticle());
    };
  }, []);
  useEffect(() => {
    setArticle((prev) => {
      return { ...prev, name, body };
    });
  }, [name, body]);
  const debAsyncUpdateArticle = useDebounce((a) => {
    dispatch(asyncUpdateArticle(token, articleId.id, a));
  }, 500);
  const changeArticle = (e) => {
    if (e.target.type == "text") {
      setArticle((prev) => {
        debAsyncUpdateArticle({ ...prev, name: e.target.value });
        return { ...prev, name: e.target.value };
      });
    } else {
      setArticle((prev) => {
        debAsyncUpdateArticle({ ...prev, body: e.target.value });
        return { ...prev, body: e.target.value };
      });
    }
  };
  return (
    <div className={cl.wr + " wrapper"}>
      <header className={cl.header}>
        <Link onClick={() => dispatch(removeArticleId())} to="/">
          <Btn>
            <ArrowBackIcon></ArrowBackIcon>
          </Btn>
        </Link>

        <input
          value={article.name}
          className={cl.input + " " + cl.form}
          onChange={changeArticle}
          type="text"
        />
        <Btn active={favorite} onClick={favoriteClick}>
          <FavoriteIcon />
        </Btn>
      </header>

      <textarea
        value={article.body}
        className={cl.textarea + " " + cl.form}
        onChange={changeArticle}
      ></textarea>
    </div>
  );
};

export default TextEditor;
