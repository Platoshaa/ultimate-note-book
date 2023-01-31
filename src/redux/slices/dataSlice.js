import { createSlice } from "@reduxjs/toolkit";
import { dataAPI } from "../../api";
const initialState = {
  isMain: null,
  bookmarks: [null, null],
  parentBookmark: null,
  activeBookmark: null,
  articles: [],
  articleId: null,
  articleName: "Заголовок",
  articleContent: "Напишите заметочку...",
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setRootBookmarks(state, action) {
      state.bookmarks[0] = action.payload;
    },
    setChildBookmarks(state, action) {
      state.bookmarks[1] = action.payload;
    },
    setIsMain(state, action) {
      state.isMain = action.payload;
    },
    removeBookmarks(state) {
      state.bookmarks = [null, null];
    },
    setParentBookmark(state, action) {
      state.parentBookmark = action.payload;
    },
    removeParentBookmark(state) {
      state.parentBookmark = null;
    },
    setActiveBookmark(state, action) {
      state.activeBookmark = action.payload;
    },
    removeActiveBookmark(state) {
      state.activeBookmark = null;
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

    setArticleContent(state, action) {
      state.articleContent = action.payload;
    },
    removeArticleContent(state) {
      state.articleContent = null;
    },
    setArticleName(state, action) {
      state.articleName = action.payload;
    },
    removeArticleName(state) {
      state.articleName = null;
    },
  },
});
export const {
  setRootBookmarks,
  setChildBookmarks,
  removeBookmarks,
  setParentBookmark,
  removeParentBookmark,
  setActiveBookmark,
  removeActiveBookmark,
  setArticles,
  setArticleId,
  removeArticleId,
  removeArticles,
  setArticleContent,
  setArticleName,
  setIsMain,
} = dataSlice.actions;
export default dataSlice.reducer;

export const asyncGetRootBookmarks = (token, parent) => {
  return (dispatch) => {
    dataAPI.getBookMarks(token, parent).then((r) => {
      if (r) {
        dispatch(setRootBookmarks(r));
      }
    });
  };
};
export const asyncCreateNewArticle = (token, parent) => {
  return (dispatch) => {
    dataAPI.addArticle(token, parent).then((r) => {
      if (r) {
        dispatch(setArticleId(r));
      }
    });
  };
};
export const asyncGetArticle = (token, parent) => {
  return (dispatch) => {
    dataAPI.getArticle(token, parent).then((r) => {
      if (r) {
        dispatch(setArticleName(r.name));
        dispatch(setArticleContent(r.content));
      }
    });
  };
};
export const asyncGetArticles = (token, bookmark) => {
  return (dispatch) => {
    dataAPI.getArticles(token, bookmark).then((r) => {
      if (r) {
        dispatch(setArticles(r));
      }
    });
  };
};
export const asyncUpdateArticleName = (token, id, name) => {
  return (dispatch) => {
    dataAPI.updateArticleName(token, id, name).then((r) => {
      if (r) {
        dispatch(setArticleName(r));
      }
    });
  };
};
export const asyncUpdateArticleContent = (token, id, content) => {
  return (dispatch) => {
    dataAPI.updateArticleContent(token, id, content).then((r) => {
      if (r) {
        dispatch(setArticleContent(r));
      }
    });
  };
};
export const asyncAddBookmarks = (token, name, parent) => {
  return (dispatch) => {
    dataAPI.addBookMark(token, name, parent).then((r) => {
      if (r) {
        if (parent) {
          dispatch(setChildBookmarks(r));
        } else {
          dispatch(setRootBookmarks(r));
        }
      }
    });
  };
};
export const asyncDeleteBookmarks = (token, id) => {
  return (dispatch) => {
    dataAPI.deleteBookMark(token, id).then((r) => {
      if (r) {
        dispatch(setRootBookmarks(r));
      }
    });
  };
};
export const asyncGetChildBookmarks = (token, parent) => {
  return (dispatch) => {
    dataAPI.getBookMarks(token, parent).then((r) => {
      if (r) {
        dispatch(setChildBookmarks(r));
      }
    });
  };
};
