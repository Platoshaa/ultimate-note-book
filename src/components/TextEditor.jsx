import { useDispatch, useSelector } from "react-redux";
import { BsArrowLeftShort } from "react-icons/bs";
import cl from "./TextEditor.module.scss";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  asyncGetArticle,
  asyncUpdateArticleContent,
  asyncUpdateArticleName,
  removeArticleId,
  setIsMain,
} from "../redux/slices/dataSlice";
import { useDebounce } from "../hook/useDebounce";
import { useRef } from "react";

const TextEditor = () => {
  const title = useRef(null);
  const content = useRef(null);
  const dispatch = useDispatch();
  const aToken = useSelector((s) => s.auth.token);
  const articleId = useParams();

  const name = useSelector((s) => s.data.articleName);
  const body = useSelector((s) => s.data.articleContent);
  const editName = () => {
    dispatch(asyncUpdateArticleName(aToken, articleId.id, title.current.value));
  };
  const editBody = () => {
    dispatch(
      asyncUpdateArticleContent(aToken, articleId.id, content.current.value)
    );
  };
  const debEditName = useDebounce(editName, 500);
  const debEditBody = useDebounce(editBody, 500);

  useEffect(() => {
    dispatch(setIsMain(false));
    dispatch(asyncGetArticle(aToken, articleId.id));
    return () => {
      dispatch(removeArticleId());
    };
  }, []);

  useEffect(() => {
    if (name || body) {
      title.current.value = name;
      content.current.value = body;
    }
  }, [name, body]);
  return (
    <div className={cl.wr}>
      <div>TimerVidget</div>
      <header className={cl.header}>
        <Link to="/">
          <BsArrowLeftShort></BsArrowLeftShort>
        </Link>
        <input
          ref={title}
          onChange={debEditName}
          className={cl.input + " " + cl.form}
          type="text"
        />
      </header>

      <textarea
        ref={content}
        className={cl.textarea + " " + cl.form}
        defaultValue={body}
        onChange={debEditBody}
      ></textarea>
    </div>
  );
};

export default TextEditor;
