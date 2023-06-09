import { createSlice } from "@reduxjs/toolkit";
import { bookmarkAPI } from "../../api";
const initialState = {
  bookmarks: [null, null],
  parentBookmark: null,
  activeBookmark: null,
};

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    setRootBookmarks(state, action) {
      state.bookmarks[0] = action.payload;
    },
    setChildBookmarks(state, action) {
      state.bookmarks[1] = action.payload;
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
} = bookmarkSlice.actions;
export default bookmarkSlice.reducer;

export const asyncGetRootBookmarks = (token) => {
  return (dispatch) => {
    bookmarkAPI.getBookMarks(token).then((r) => {
      if (r) {
        if (localStorage.getItem("bookmarksParents")) {
          const sortedRes = JSON.parse(
            localStorage.getItem("bookmarksParents")
          ).map((el) => {
            return r.filter((v) => v.id == el)[0];
          });

          dispatch(setRootBookmarks(Array.from(new Set([...sortedRes, ...r]))));
        } else {
          dispatch(setRootBookmarks(r));
        }
      }
    });
  };
};
export const asyncAddBookmarks = (token, name, parent) => (dispatch) => {
  bookmarkAPI.addBookMark(token, name, parent).then((r) => {
    if (r) {
      if (parent) {
        dispatch(setChildBookmarks(r));
      } else {
        dispatch(setRootBookmarks(r));
      }
    }
  });
};

export const asyncDeleteBookmarks = (token, id, parent) => {
  return (dispatch) => {
    bookmarkAPI.deleteBookMark(token, id, parent).then((r) => {
      if (r) {
        if (parent) {
          dispatch(setChildBookmarks(r[0]));
        }
        dispatch(setRootBookmarks(r[1]));
      }
    });
  };
};
export const asyncRenameBookmarks = (token, id, name, parent) => {
  return (dispatch) => {
    bookmarkAPI.renameBookMark(token, id, name, parent).then((r) => {
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
export const asyncGetChildBookmarks = (token, parent) => {
  return (dispatch) => {
    bookmarkAPI.getBookMarks(token, parent).then((r) => {
      if (r) {
        dispatch(setChildBookmarks(r));
      }
    });
  };
};
