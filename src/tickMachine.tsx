import { assign, fromCallback, setup } from "xstate";

export const tickMachine = setup({
  types: {
    context: {} as { ticks: number },
    events: {} as { type: "TICK" } | { type: "STOP" } | { type: "START" },
  },
  actors: {
    startTicking: fromCallback(({ sendBack, receive }) => {
      let timeoutId: ReturnType<typeof setTimeout>;
      function _tick() {
        timeoutId = setTimeout(() => {
          sendBack({ type: "TICK" });
          _tick();
        }, 1000);
      }
      _tick();

      function cleanup() {
        clearTimeout(timeoutId);
      }

      receive((e) => {
        if (e.type === "STOP") {
          cleanup();
        }
      });

      return cleanup;
    }),
  },
  actions: {
    tick: assign({
      ticks: ({ context }) => context.ticks + 1,
    }),
  },
}).createMachine({
  id: "clock",
  initial: "active",
  context: { ticks: 0 },
  states: {
    active: {
      invoke: {
        src: "startTicking",
      },
      on: {
        TICK: {
          actions: "tick",
        },
        STOP: {
          target: "inactive",
        },
      },
    },
    inactive: {
      on: {
        START: {
          target: "active",
        },
      },
    },
  },
});
