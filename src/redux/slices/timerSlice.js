import { createSlice } from "@reduxjs/toolkit";
import { timerAPI } from "../../api";
const initialState = {
  list: [],
  counter: [],
};
const dataSlice = createSlice({
  name: "skillometr",
  initialState,
  reducers: {
    setCounter(state, action) {
      state.counter = action.payload;
    },
    setList(state, action) {
      state.list = action.payload;
    },
    resetList(state) {
      state.list = [];
    },
    addTimer(state, action) {
      state.list = action.payload;
    },
  },
});
export const { resetList, setList, setCurrentTimer, setTime, setCounter } =
  dataSlice.actions;
export default dataSlice.reducer;
export const asyncGetTimerList = (token) => {
  return (dispatch) => {
    timerAPI.getSkillometr(token).then((r) => {
      if (r) {
        dispatch(setList(r));
      }
    });
  };
};
export const asyncGetTimerCounter = (token) => {
  return (dispatch) => {
    timerAPI.getCounter(token).then((r) => {
      if (r.timerCounter) {
        dispatch(setCounter(r.timerCounter));
      } else {
        dispatch(setCounter([0, null]));
      }
    });
  };
};
export const asyncAddTimerCounter = (token, counter) => {
  console.log(counter);
  return (dispatch) => {
    timerAPI.addCounter(token, counter).then((r) => {
      if (r) {
        dispatch(asyncGetTimerCounter(token));
      }
    });
  };
};
export const asyncAddTimer = (token, title) => {
  return (dispatch) => {
    timerAPI.addTimer(token, title).then(() => {
      dispatch(asyncGetTimerList(token));
    });
  };
};
export const asyncDeleteTimer = (token, id) => {
  return (dispatch) => {
    timerAPI.deleteTimer(token, id).then(() => {
      dispatch(asyncGetTimerList(token));
    });
  };
};
export const asyncUpdateTimer = (token, id, time) => {
  return (dispatch) => {
    timerAPI.editTime(token, id, time).then(() => {
      dispatch(asyncGetTimerList(token));
    });
  };
};
