import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncDeleteTimer, asyncUpdateTimer } from "../redux/slices/timerSlice";
let count = 0;
const ItemTimer = ({
  token,
  item,
  refId,
  currentTimer,
  setIsActive,
  setCurrentTimer,
  isActive,
}) => {
  const d = useDispatch();
  count++;
  // console.log("Item ", count);
  const handleStart = () => {
    refId.current = item.id;
    setCurrentTimer(Number(item.time));
    setIsActive(true);
  };
  const handleDelete = () => {
    if (window.confirm("are you going to delete this timer"))
      d(asyncDeleteTimer(token, item.id));
  };
  const formatTime = (timer) => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);
    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };
  const time = useMemo(() =>
    item.id == refId.current ? currentTimer : item.time
  );
  const handlePause = () => {
    setIsActive(false);
  };
  return (
    <div className="stopwatch">
      <div className="stopwatch-card">
        <h3>{item.name}</h3>
        <p>{formatTime(time)}</p>
      </div>
      <div className="timer-buttons">
        {isActive && item.id == refId.current ? (
          <button
            style={{
              backgroundColor: "red",
            }}
            className="timer-btn"
            onClick={handlePause}
          >
            Pause
          </button>
        ) : (
          <button
            style={{
              backgroundColor: "darkcyan",
            }}
            className="timer-btn"
            onClick={handleStart}
          >
            Start
          </button>
        )}

        <button
          style={{ backgroundColor: "red" }}
          className="timer-btn"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ItemTimer;
