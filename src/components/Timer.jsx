import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncAddTimer,
  asyncAddTimerCounter,
  asyncGetTimerCounter,
  asyncGetTimerList,
  asyncUpdateTimer,
  setCounter,
} from "../redux/slices/timerSlice";
import "./Timer.css";
import ItemTimer from "./ItemTimer";
import audio from "../assets/notification.mp3";
import { useRef } from "react";
const Timer = ({ style }) => {
  const t = useSelector((s) => s.auth.token);
  const timerList = useSelector((s) => s.timer.list);
  const d = useDispatch();
  const refId = useRef(null);
  const [currentTimer, setCurrentTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const myWorker = useRef();
  const timerCounter = useSelector((s) => s.timer.counter);

  useEffect(() => {
    if (refId.current) {
      if (isActive) {
        myWorker.current.postMessage([currentTimer, timerCounter[0], "start"]);
      } else {
        myWorker.current.postMessage([currentTimer, timerCounter[0], "stop"]);
      }
    }
  }, [isActive]);
  useEffect(() => {
    d(asyncGetTimerList(t));
    myWorker.current = new window.Worker("./cw.js");
    myWorker.current.addEventListener("message", (event) => {
      if (refId.current) {
        if (event.data[2]) {
          setCurrentTimer(event.data[0]);
          d(setCounter([event.data[1], new Date().getDate()]));
        } else {
          d(asyncUpdateTimer(t, refId.current, event.data[0]));
          d(asyncAddTimerCounter(t, [event.data[1], new Date().getDate()]));
          new Audio(audio).play();
        }
      }
    });
    d(asyncGetTimerCounter(t));
  }, []);
  useEffect(() => {
    if (timerCounter[1]) {
      if (new Date().getDate() == timerCounter[1]) {
      } else {
        d(asyncAddTimerCounter(t, [0, new Date().getDate()]));
      }
    }
  }, [timerCounter]);
  const addTimer = () => {
    d(asyncAddTimer(t, title));
    setTitle("");
  };
  const [title, setTitle] = useState("");
  const [isOpened, setIsOpened] = useState(true);
  return (
    <div style={style} className="time-wr">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2
          onClick={() => setIsOpened((s) => !s)}
          style={{ marginBottom: ".3em" }}
        >
          Skillometr
        </h2>
        <div>Сегодня: {Math.floor(timerCounter[0] / 60)} мин</div>
      </div>
      <div className={isOpened ? "stpw-body active" : "stpw-body"}>
        <div className="stpw">
          {timerList.map((e) => (
            <ItemTimer
              currentTimer={currentTimer}
              refId={refId}
              setCurrentTimer={setCurrentTimer}
              token={t}
              isActive={isActive}
              setIsActive={setIsActive}
              item={e}
              key={e.id}
            ></ItemTimer>
          ))}
        </div>
        <div style={{ display: "flex" }}>
          <input
            placeholder="Название таймера"
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              flex: "1 1 auto",
            }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            style={{ backgroundColor: "darkcyan", color: "#fff" }}
            className="timer-btn"
            onClick={addTimer}
          >
            add new
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
