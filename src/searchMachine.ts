import { assign, fromPromise, setup } from "xstate";

export const searchMachine = setup({
  types: {
    context: {
      loading: false,
      params: { keyword: "" } as { keyword: string } | undefined,
      results: [] as string[],
      error: null as string | null,
    },
    events: {} as { type: "search"; keyword: string } | { type: "retry" },
  },
  actors: {
    onSearch: fromPromise<string[], string>(({ input }) => {
      if (!input) {
        return Promise.reject("Keyword is required");
      }
      // Simulate an API call
      return new Promise<string[]>((resolve) => {
        setTimeout(() => {
          resolve([`${input} result 1`, `${input} result 2`]);
        }, 1000);
      });
    }),
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOlwgBswBiWMdAJxwG0AGAXUVAAcB7WXABdcvfFxAAPRAEYArADYSAFiWyAzACYN8jUtbTWADkMAaEAE9Eh6coCc9wwHZZSw7NmO10gL7ezaLDxCUjpGHAIoaghRMDJ8ADdeAGtYgPDgklCmIKgEAkTMdGFRNnZS8T4BYrEkSURZDUcSeVZbNUcNVg01HUazSwRpW0V5JS821nl3Q11ffwx04kz6bIjqMAYGXgYSbgoigDNt1BI0oKWs9Nz83kLq0vLayqERGtApQYVlVU1tXX0jKYLDIvCR7PZZKxXNovLI5iAzgQltFCLQViwOBV+C9ROIPrJDGoSNJNJ4uoZ5NJHLZHP0ZEpFNIxtINLYSUotGo4X4EQtzqQDuhcBQAK4MGiXbCPHjY6p4mRfFTqLQ6PQGYx0hBaWTKdRQimNYyGJTwxEZQXCsU0cWCBjmaUgZ5y2ofOSKJW-VUAjXArXOMF6nSTYNKWy+Hn4XgQODiM3ELFVV7yhAAWnkmrTpr5SNI5CoCZxbzqCA8YNUrNs1lZunTvusYPBThcbg8aizgRzyzCOQLzveiDUmhIxvazKU1JaGk10iGJBVDOM3Rnhih7cWpBRYF7SZdiHkth1ajG8kJ8k0g5605cJA6o08LMNg40a-5JAtovF29xu4QHOnOhILkmWGIZHCMIxw28IA */
  context: {
    params: { keyword: "" },
    error: null,
    loading: false,
    results: [],
  },

  states: {
    idle: {
      on: {
        search: "searching",
      },
    },

    searching: {
      entry: assign({
        error: null,
        loading: true,
        params: ({ event }) => {
          return event.type === "search"
            ? { keyword: event.keyword }
            : undefined;
        },
      }),

      exit: assign({
        loading: false,
      }),

      invoke: {
        src: "onSearch",
        input: ({ event, context }) => {
          return event.type === "search"
            ? event.keyword
            : context.params?.keyword ?? "";
        },
        onDone: {
          target: "done",
          actions: assign({
            results: ({ event }) => event.output,
            error: null,
          }),
        },
        onError: {
          target: "failure",
          actions: assign({
            error: ({ event }) => event.error as string,
            results: [],
          }),
        },
      },
    },

    done: {
      on: {
        search: "searching",
      },
    },

    failure: {
      on: {
        search: {
          target: "searching",
        },
        retry: {
          target: "searching",
        },
      },
    },
  },

  initial: "idle",
});
