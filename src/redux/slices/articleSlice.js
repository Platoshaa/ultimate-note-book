import { createSlice } from "@reduxjs/toolkit";
import { articleAPI } from "../../api";
import { removeActiveBookmark, setActiveBookmark } from "./bookmarkSlice";
const initialState = {
  articles: [],
  favorite: [],
  articleId: null,
  article: { name: "", body: "...", favorite: null },
};

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    setFavorite(state, action) {
      state.favorite = action.payload;
    },

    setArticles(state, action) {
      state.articles = action.payload;
    },
    removeArticles(state) {
      state.articles = [];
    },
    setArticleId(state, action) {
      state.articleId = action.payload;
    },
    removeArticleId(state) {
      state.articleId = null;
    },
    setArticle(state, action) {
      state.article = action.payload;
    },
    removeArticle(state) {
      state.article = { name: "", body: "" };
    },
  },
});
export const {
  setArticles,
  setArticleId,
  setFavorite,
  removeArticleId,
  removeArticles,
  setArticle,
  removeArticle,
  setIsMain,
} = articleSlice.actions;
export default articleSlice.reducer;
export const asyncCreateNewArticle = (token, parent) => {
  return (dispatch) => {
    articleAPI.addArticle(token, parent).then((r) => {
      if (r) {
        dispatch(setArticleId(r));
      }
    });
  };
};
export const asyncGetFaforite = (token) => {
  return (dispatch) => {
    articleAPI.getFavoriteArticles(token).then((r) => {
      if (r) {
        dispatch(setFavorite(r));
      }
    });
  };
};
export const asyncSetFaforite = (token, id, favorite) => {
  console.log(token, id, favorite);
  return (dispatch) => {
    articleAPI.setFavoriteArticle(token, id, favorite).then((r) => {
      if (r) {
        dispatch(asyncGetArticle(token, id));
      }
    });
  };
};
export const asyncGetArticles = (token, bookmark) => {
  return (dispatch) => {
    articleAPI.getArticles(token, bookmark).then((r) => {
      if (r) {
        dispatch(setArticles(r));
      }
    });
  };
};
export const asyncDeleteArticle = (token, id, bookmark) => {
  return (dispatch) => {
    articleAPI.deleteArticle(token, id).then((r) => {
      dispatch(asyncGetArticles(token, bookmark));
    });
  };
};
export const asyncGetArticle = (token, id) => {
  return (dispatch) => {
    articleAPI.getArticle(token, id).then((r) => {
      if (r) {
        if (r.favorite) {
          dispatch(
            setArticle({ name: r.name, body: r.content, favorite: r.favorite })
          );
        } else {
          dispatch(
            setArticle({ name: r.name, body: r.content, favorite: false })
          );
        }
      }
    });
  };
};
export const asyncUpdateArticle = (token, id, article) => {
  return (dispatch) => {
    articleAPI.updateArticle(token, id, article).then((r) => {});
  };
};
