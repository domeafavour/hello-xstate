import { assign, setup } from "xstate";
import { frameLogic } from "./frameLogic";

export const jumpMachine = setup({
  types: {
    context: { y: 0 } as { y: number },
    events: {} as
      | { type: "JUMP" }
      | { type: "UPDATE"; value: number }
      | { type: "STOP"; value: number },
  },
  actors: {
    jump: frameLogic,
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgAcAnMM9KgYgCkBVAWQAUBtABgF1FQyAe1i4ALrkH5+IAB6IAjAFYA7CQDMigJxrlyrorWaATMaMAaEAE9Ea+VxLz5m3QDYuRo8s2aXygL5+FmhYeISkAK5kdExsACIAggAqAKLcfEggQiLiktJyCGpcLiRu2soAHNpGauUuahbWCEZc9soALN6a5YYdRS5tAUEYOATEJJF0AMqJAPKcvNJZYhJSGfltviXlyopctZruB7oNNkaKJM22+jtqt5qDIMEjYSQQggDu+NFxSakLGUscqtQPkXPI2iRlHZNG1arYXOU2ooTk0lCRurcjOV5Gc2kjnA8nqExm9PlNZvN0gJhMtcmtELpzhUjt1KopypUUWo2vYsf0NLCahVuYThsTSAAzAi4WDYSB0GSwUToURgEjoCWqijIeQuIh0ImjSXS2WQNKLGlAvIMnaQypcYVsjmaFHYkgdTrYowuRS+sEBQIgfCCCBwaSGsIW7Ira0IAC0LhRCdFISN5CoNCoUdpwNkiDa5isiFqJD2t1usIdLm88hTzzGkWzVvpTTqpeqbRqamq2w2bS57guXFsRicRRM7jr4teH1zgJjLZU8gcZxa5XctmUWK58lUfKRurUCJMvqnaal+BlcogTYXIMQB2XXsUY6MBf0rvKJHZ5e56+U1b3AGQA */
  context: {
    y: 0,
  },
  initial: "prepare",
  states: {
    prepare: {
      on: {
        JUMP: {
          target: "up",
        },
      },
    },
    up: {
      invoke: {
        id: "jump",
        src: "jump",
        input: { max: 12 },
      },
      on: {
        UPDATE: {
          actions: [
            assign({
              y: ({ event }) => event.value,
            }),
          ],
        },
        STOP: {
          target: "down",
        },
      },
    },
    down: {
      invoke: {
        id: "jump",
        src: "jump",
        input: { max: 12 },
      },
      on: {
        UPDATE: {
          actions: [
            assign({
              y: ({ event }) => 12 - event.value,
            }),
          ],
        },
        STOP: {
          target: "finished",
        },
      },
    },
    finished: {
      after: {
        16: {
          target: "prepare",
        },
      },
    },
  },
});
