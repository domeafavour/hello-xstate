import { assign, fromCallback, setup } from "xstate";

type WalkingDirection = "left" | "right";

export const playerMachine = setup({
  types: {
    context: {} as {
      lp: number;
      x: number;
      y: number;
      walkingDirection?: WalkingDirection;
    },
    events: {} as
      | { type: "STOP_WALKING" }
      | { type: "START_WALKING"; direction?: WalkingDirection }
      | { type: "MOVE_RIGHT" }
      | { type: "MOVE_LEFT" },
  },
  actors: {
    startWalking: fromCallback<
      { type: "STOP_WALKING" },
      { direction: WalkingDirection }
    >(({ sendBack, receive, input }) => {
      const { direction } = input;

      let timeoutId: ReturnType<typeof setTimeout>;

      function _run() {
        sendBack({
          type: direction === "right" ? "MOVE_RIGHT" : "MOVE_LEFT",
        });
        timeoutId = setTimeout(_run, 200);
      }
      _run();

      function cleanup() {
        clearTimeout(timeoutId);
      }

      receive((e) => {
        if (e.type === "STOP_WALKING") {
          cleanup();
        }
      });

      return cleanup;
    }),
  },
  actions: {
    moveLeft: assign({ x: ({ context }) => Math.max(context.x - 5, 0) }),
    moveRight: assign({ x: ({ context }) => Math.min(context.x + 5, 100) }),
    setWalking: assign({
      walkingDirection: (_, params?: "left" | "right") => params || "right",
    }),
  },
  guards: {
    // canMoveLeft: ({ context }) => context.x > 0,
    // canMoveRight: ({ context }) => context.x < 100,
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAcA2BDAnmATgOlgBd0A7CAYgFkB5ANQFEB9AGXoDEAVAbQAYBdRCgD2sAJaFRQkoJAAPRABYAbHgCcADnUAmdQEYtAVgA0ITIl0B2C2oMBmXQp6H1F9ap5KAvp5NosuAmIyKjomACUASQBxAAlufhlkEXFJaSQ5RS0TMwQ9PANvHxASIQg4RIxsHETkiSkZeQQAWiVsxBbvX0qAolIIGrE6tNBGiy08WyULXRdjU0QtC1U8RyUdHgNLA1ddQs8gA */
  id: "player",
  context: {
    lp: 100,
    x: 0,
    y: 0,
    walkingDirection: "right",
  },
  initial: "stand",
  states: {
    stand: {
      on: {
        // START_WALKING: {
        //   target: "walking",
        // },
      },
    },
    walking: {
      invoke: {
        src: "startWalking",
        id: "walkingActor",
        input: ({ context }) => ({
          direction: context.walkingDirection ?? "right",
        }),
      },
      on: {
        STOP_WALKING: {
          target: "stand",
        },
      },
    },
  },
  on: {
    START_WALKING: {
      target: ".walking",
      actions: { type: "setWalking", params: ({ event }) => event.direction },
    },
    MOVE_RIGHT: {
      description: "move by 5",
      actions: { type: "moveRight" },
    },
    MOVE_LEFT: {
      description: "move by -5",
      actions: { type: "moveLeft" },
    },
  },
});
