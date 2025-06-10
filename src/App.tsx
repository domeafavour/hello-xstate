import { useMachine } from "@xstate/react";
import { useRef } from "react";
import { searchMachine } from "./searchMachine";

function App() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [state, send] = useMachine(searchMachine);
  const { loading, error, results, params } = state.context;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send({ type: "search", keyword: inputRef.current!.value });
        }}
      >
        <input ref={inputRef} disabled={loading} />
        <button type="submit" disabled={loading}>
          search
        </button>
      </form>
      {loading ? (
        <div>loading...</div>
      ) : state.matches("failure") ? (
        <div>
          <span style={{ color: "red" }}>{error}</span>
          {params?.keyword.length ? (
            <button
              type="button"
              onClick={() => {
                send({ type: "retry" });
              }}
            >
              retry
            </button>
          ) : null}
        </div>
      ) : (
        <ul>
          {results.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
