import { useRef } from "react";
import { useCallback } from "react";
export const useDebounce = (cb, ms = 2000) => {
  const timer = useRef("lol");
  return useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      cb();
    }, ms);
  }, [cb, ms]);
};
