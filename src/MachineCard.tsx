import { type PropsWithChildren } from "react";
import type { MachineSnapshot } from "xstate";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MachineState = MachineSnapshot<any, any, any, any, any, any, any, any>;

interface Props<T extends MachineState> extends PropsWithChildren {
  state: T;
}

export type MachineCardProps<T extends MachineState> = Props<T>;

export function MachineCard<T extends MachineState>({
  state,
  children,
}: Props<T>) {
  return (
    <div>
      <h1>{JSON.stringify(state.value)}</h1>
      <pre>{JSON.stringify(state.context)}</pre>
      {children}
    </div>
  );
}
