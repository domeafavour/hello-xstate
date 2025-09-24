import { fromCallback } from "xstate";
import { frame } from "./utils/frame";

export const frameLogic = fromCallback<
  { type: "RESET" } | { type: "SET_STEP"; step: number },
  { step?: number } | undefined
>(({ sendBack, receive, input }) => {
  let value = 0;
  let { step = 1 } = input || {};

  receive((e) => {
    if (e.type == "RESET") {
      value = 0;
    } else if (e.type === "SET_STEP") {
      step = e.step;
    }
  });

  return frame(() => {
    value += step;
    sendBack({ type: "UPDATE", value });
  }, 16);
});
