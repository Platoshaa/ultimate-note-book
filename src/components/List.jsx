import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { asyncGetArticles } from "../redux/slices/dataSlice";
import { useNavigate } from "react-router-dom";
const List = () => {
  const dispatch = useDispatch();
  const articles = useSelector((s) => s.data.articles);
  const active = useSelector((s) => s.data.activeBookmark);
  const auth = useSelector((s) => s.auth.token);
  const n = useNavigate();
  useEffect(() => {
    if (active) {
      dispatch(asyncGetArticles(auth, active));
    }
  }, [active]);
  const clickItem = (id) => {
    n(`/pages/${id}`);
  };
  return (
    <div style={{ overflowY: "auto" }}>
      {active
        ? articles.length
          ? articles.map((e) => (
              <div
                style={{
                  padding: "1em 2em",
                  backgroundColor: "rgba(255, 235, 235, 0.541)",
                  marginBottom: "1em",
                  cursor: "pointer",
                  borderBottom: "2px solid #303030",
                }}
                key={e.id}
                onClick={() => clickItem(e.id)}
              >
                {e.name}
              </div>
            ))
          : ""
        : " "}
    </div>
  );
};

export default List;
