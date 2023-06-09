import BookMarks from "../components/BookMarks/BookMarks";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncCreateNewArticle } from "../redux/slices/articleSlice";
import { useEffect } from "react";
import Favorite from "../components/Favorite";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Btn from "../components/Btn";
import Articles from "../components/Articles";
import AuthBtn from "../components/AuthBtn";
const NoteBook = () => {
  const token = useSelector((s) => s.auth.token);
  const { activeBookmark } = useSelector((s) => s.bookmark);
  const { articleId, favorite } = useSelector((s) => s.article); /*why here?
   Only to demonstrate how memo in Favorite works.
    I don't have big components to use it properly :()
  */
  const newPage = () => {
    if (activeBookmark) {
      dispatch(asyncCreateNewArticle(token, activeBookmark));
    } else {
      alert("Пожалуйста выберите или создайте подзакладку");
    }
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (articleId) {
      navigate("/pages/" + articleId);
    }
  }, [articleId]);

  return (
    <div className="container">
      <div className="wrapper ">
        <BookMarks token={token}></BookMarks>
        {activeBookmark ? (
          <Articles token={token} />
        ) : (
          <Favorite token={token} favorite={favorite} />
        )}
      </div>

      <div className="btns">
        <AuthBtn
          cl={{
            position: "absolute",
            left: "1em",
            bottom: "1em",
          }}
        />
        <Btn
          onClick={newPage}
          // sx={{ }}
        >
          <AddCircleIcon
            color="primary"
            size="large"
            sx={{ fontSize: "2.5em" }}
          ></AddCircleIcon>
        </Btn>
      </div>
    </div>
  );
};

export default NoteBook;
