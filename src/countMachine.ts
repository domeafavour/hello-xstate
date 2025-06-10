import { assign, setup } from "xstate";

export const countMachine = setup({
  types: {
    context: { count: 0 },
    events: {} as { type: "INCREMENT" },
  },
  actions: {
    increment: assign({
      count: ({ context }) => context.count + 1,
    }),
  },
}).createMachine({
  id: "count",
  context: {
    count: 0,
  },
  on: {
    INCREMENT: {
      actions: "increment",
    },
  },
});
