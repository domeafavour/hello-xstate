import { fromCallback } from "xstate";
import { frame } from "./utils/frame";

export const frameLogic = fromCallback<
  | { type: "RESET" }
  | { type: "SET_STEP"; step: number }
  | { type: "STOP"; value: number },
  { step?: number; max?: number } | undefined
>(({ sendBack, receive, input }) => {
  let value = 0;
  // eslint-disable-next-line prefer-const
  let { step = 1, max = 100 } = input || {};

  receive((e) => {
    if (e.type == "RESET") {
      value = 0;
    } else if (e.type === "SET_STEP") {
      step = e.step;
    }
  });

  return frame((stop) => {
    value += step;
    sendBack({ type: "UPDATE", value });
    if (value >= max) {
      sendBack({ type: "STOP", value });
      stop();
    }
  }, 16);
});
