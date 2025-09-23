import { useMachine } from "@xstate/react";
import { tickMachine } from "./tickMachine";

export function Tick() {
  const [state, send] = useMachine(tickMachine);

  return (
    <div>
      <p>Current State: {state.value}</p>
      <div>{JSON.stringify(state.context)}</div>
      {state.matches("active") ? (
        <button onClick={() => send({ type: "STOP" })}>stop</button>
      ) : null}
      {state.matches("inactive") ? (
        <button onClick={() => send({ type: "START" })}>start</button>
      ) : null}
    </div>
  );
}
