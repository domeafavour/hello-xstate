import { useMachine } from "@xstate/react";
import { assign, setup } from "xstate";

const countMachine = setup({
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

function App() {
  const [state, send] = useMachine(countMachine);
  return (
    <div>
      <span>{state.context.count}</span>
      <button
        type="button"
        onClick={() => {
          send({ type: "INCREMENT" });
        }}
      >
        +1
      </button>
    </div>
  );
}

export default App;
