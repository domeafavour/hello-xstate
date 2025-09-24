import { assign, sendTo, setup } from "xstate";
import { frameLogic } from "./frameLogic";

export type WalkingDirection = "left" | "right";

export const walkMachine = setup({
  types: {
    context: { x: 0, direction: "right" as WalkingDirection },
    events: {} as
      | { type: "START_WALKING"; direction: WalkingDirection }
      | { type: "STOP" }
      | { type: "WALK"; direction?: WalkingDirection }
      | { type: "JUMP" }
      | { type: "UPDATE"; value: number },
  },
  actors: {
    walk: frameLogic,
  },
  actions: {
    update: assign({
      x: (
        { context },
        payload: { value: number; direction: WalkingDirection }
      ) => {
        return payload.direction === "right"
          ? Math.min(100, context.x + payload.value)
          : Math.max(0, context.x - payload.value);
      },
    }),
  },
  guards: {
    canUpdate: ({ context }) =>
      context.direction === "left" ? context.x > 0 : context.x < 100,
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAYgFUAFAEQEEAVAUQG0AGAXUVAAcB7WXAC64e+TiAAeiAIwB2AJwA6KQCYArABoQAT2nKAvns1oseQkQUEsQgG5gSAdRoAZANKsOSEL35CRYyQhSAGwAzArKLCEqGtqIynJB4ZHRBkYYOATECla4tiQAynQA8hTuYt6CwqKeAcGJIapSqkFqmjoIygAsqgoyyWoGhiD4PBBwYsYZZuV8lX41iAC0Um2Icj3dUQNDk6ZZlpg2YDM+Vf6InTKrHY29ABxB3XchL68hnakgu5nmObYnc2qoACyiCihkdzkLBaMXayniCnWW1Ugz0QA */
  context: {
    x: 0,
    direction: "right",
  },
  initial: "inactive",
  on: {},
  states: {
    inactive: {
      on: {
        WALK: {
          actions: assign({
            direction: ({ event }) => event.direction || "right",
          }),
          target: "active",
        },
      },
    },
    active: {
      invoke: {
        id: "walk",
        src: "walk",
      },
      on: {
        STOP: {
          target: "inactive",
        },
        UPDATE: {
          description: "update the x position",
          guard: { type: "canUpdate" },
          actions: {
            type: "update",
            params: ({ context, event }) => ({
              direction: context.direction,
              value: event.value,
            }),
          },
        },
        WALK: {
          actions: [
            assign({
              direction: ({ event }) => event.direction || "right",
            }),
            sendTo("walk", { type: "RESET" }),
          ],
        },
      },
    },
  },
});
