import { useSyncExternalStore } from "react";
import { assign, createActor, setup } from "xstate";

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

const countActor = createActor(countMachine);

function subscribe(callback: () => void) {
  const { unsubscribe } = countActor.subscribe(callback);
  return () => unsubscribe();
}

function getSnapshot() {
  return countActor.getSnapshot().context.count;
}

function increment() {
  countActor.send({ type: "INCREMENT" });
}

countActor.start();

function App() {
  const count = useSyncExternalStore(subscribe, getSnapshot);
  return (
    <div>
      <span>{count}</span>
      <button
        type="button"
        onClick={() => {
          increment();
        }}
      >
        +1
      </button>
    </div>
  );
}

export default App;
