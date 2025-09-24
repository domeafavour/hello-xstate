import { assign, setup } from "xstate";
import { frameLogic } from "./frameLogic";
import { type WalkingDirection } from "./walkMachine";

export const monsterMachine = setup({
  types: {
    tags: "" as "attacking_one" | "attacking_two",
    context: {
      lp: 100,
      x: 0,
      y: 0,
      direction: "right" as WalkingDirection,
    },
    events: {} as
      | { type: "JUMP" }
      | { type: "REST" }
      | { type: "AWAKEN" }
      | { type: "STOP" }
      | { type: "WALK"; direction: WalkingDirection }
      | { type: "JUMP" }
      | { type: "UPDATE"; value: number }
      | { type: "ATTACK" },
  },
  actors: {
    walk: frameLogic,
    jump: frameLogic,
  },
  delays: {
    jumpUpDelay: 500,
    freeFallDelay: 500,
  },
  guards: {
    canJumpUp: ({ context }) => context.y < 60,
    canFreeFall: ({ context }) => context.y > 0,
    canWalk: ({ context, event }) => {
      if (event.type !== "UPDATE") {
        return true;
      }
      return (
        (context.direction === "left" && context.x > 0) ||
        (context.direction === "right" && context.x < 300)
      );
    },
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOlgBd18ICoSB3dAGwGtaSCtzcA3MAYgDqAQQAyAaQDaABgC6iUAAcA9rFzdl+BSAAeiAEwBGABwl90gMyH9+gJwAWQ9MMB2ADQgAnoheGAbCT2Ln4h+hb69vYArC5RAL5xHmhYeISkFFQ0+HSMrOxcvAIAygAqAPIACjLySCAqahpatXoINgEWfr7GxjZR0bYRHt4IIVEktsF+QfpRhha2xi4JSRg4BMRklNTsuWzZJAV8-ACqFQAiwiUAotXa9eq4mtot4bYk3foui+EfC0OIflcJCi0lBfmkny+EOMyxAyTWaU2mXYACsAK6oRTsRQAJzAinQeP4ACljgBZKpyO6qB5PZoGIEWKK2CzfCyxFwzdxeRBOewWMyWML6Yx+WxREFLRJw1apDYZbb7dGY9hoxT8HQZchgA4AM21OOQysUx0UZzATHQniI-HhcvSWyydGNqsUt1q90az0Q9mkASiYUi0mCAxiFn+CD59hILiFjki9k+3VhdvWDuRSoxWP2EGU9HwGq1OvQ+rAht1eLAADFmExzZbrbbZWmkYrnVn2Ln8+6lDSvfSRpzAtFwh0nB0LPYI1GY3HDAmkzDpanEQqnSQXTnNAJNZRtXqDcgnNIbSv5Y7UR2t4Qe3U+48mqAWrHTCLbNZwRZRy4pzyEAMBXFcJLEMKJwWkAMU2bVcL32dByEoTA9joPF0AgTx+EuEphAAYSkKkPXvOknwBRZgVBYNY1sSi-QjeZpECfw-H0PxRX5FiOiglIWzXfIEKwZCSG3EpsBxZQEKYWhCz3YtS0NYxQVPaDzwzOh4MQwThNE8TyEk7Jb09B9vX-YMzEnexjD6BS-C-QwIxsBj7FsZzLIsgYuj8LiERUtsDn4pD2G3KsCFwWBsEgTCSmwvCDKIx9dAMZkSE6ExqPHVjmLo+YYychZIlmYNwi8+1W3XdSBMCwhgvwULwogaT4Nkw9jxPJtuJg1S-I0yrqxCsLIFihojIHGY3hS4w0ssDL9AjexwXIiiIOYr8-WKnjYLU-zNMIfhBtpeKWmolwzMiVzrNsuiQXGZyFgDb5bBstaOt88qAv2bcGv3EtD3ApT2p8sqtp6vb+xIkYyJBUEXComi-DoxNxiY6iF2sYMnoBvjuv2ch6GUT6mrLI8KL+7z0xeoHsdxkHhrBuaxmMJk8q-H8Il-YZJ0MMxcuYz5fRiCCEmlfBlAgOBtDPIhqSG4iEoQABaRMIwVzmbtVtWFk85dlLJp0pf24y4b-aJAhu4wnOsEFQ3RnWdmYZC9dB2W+gjKILAYxbmQWBwjHiLX-pt-ZdnYThMG4PgHZp2WnBmv8XCsd4xVFQxk4mbolxWf3SttvI4NDwoI5ll47HeaQ5uhibFmY2IIy6cZXfMQEOhA2xrazzMVWyAuDsQZ2-wZgIR3MEVOmY+xW949vszoXF8UJMAu+M6OIwGUxXb8MDk6+V3k-HjaNyvOg1QXgdRxICFJxYuwHPmQ3hj5AVY3CGzmOsBx05lTOJ-bDu6C7eLDMLj3L4JBWQijCH6B6Flb68lLg-IUz8jB2AsrvTqm5f7bmPmDM2+hAiAmcFEM27IrBRGXvHKaG9XCWSsIYFB5MsZQEwU7NmvJwjXRcgGUEE0IIWFoYDehJBULoUYS0Ahx0RRzA4nNBYIp4bHVyhrB64QnKawzqTNum1+FaTEhJWgwiYH8hAT0BwHQEwPW5MMGwx0CG2U+OBNeUpVElS-l1Cq70qp9TqnoyMEJ7KfHeD+BYfoegKUsrwzGri6AYMItLbuCAegP3MqKdkDhZjGEuu7RaP4piODCCoj+ajnGvUEjjZQXjQEgMZpZXJEQrDwwYhEZya9nI-Aeq3PEFAvGKz-MnGys4lEuG9uCFkgs4hAA */
  context: {
    lp: 100,
    x: 0,
    y: 0,
    direction: "right",
  },
  initial: "standing",
  states: {
    standing: {
      type: "parallel",
      states: {
        walking: {
          initial: "inactive",
          states: {
            inactive: {
              on: {
                WALK: {
                  target: "active",
                  actions: assign({
                    direction: ({ event }) => event.direction,
                  }),
                },
              },
            },
            active: {
              invoke: {
                id: "walk",
                src: "walk",
                input: () => ({ max: Infinity }),
              },
              on: {
                STOP: { target: "inactive" },
                UPDATE: {
                  guard: { type: "canWalk" },
                  actions: assign({
                    x: ({ event, context }) =>
                      context.direction === "left"
                        ? Math.max(context.x - event.value, 0)
                        : Math.min(context.x + event.value, 300),
                  }),
                },
              },
            },
          },
        },
        jumping: {
          initial: "prepare",
          states: {
            prepare: {
              on: {
                JUMP: { target: "up" },
              },
            },
            up: {
              invoke: {
                src: "jump",
                id: "jump",
              },
              on: {
                UPDATE: {
                  guard: { type: "canJumpUp" },
                  actions: assign({
                    y: ({ event, context }) =>
                      Math.min(context.y + event.value, 60),
                  }),
                },
              },
              after: {
                jumpUpDelay: { target: "down" },
              },
            },
            down: {
              invoke: {
                src: "jump",
                id: "jump",
              },
              on: {
                UPDATE: {
                  guard: { type: "canFreeFall" },
                  actions: assign({
                    y: ({ event, context }) =>
                      Math.max(context.y - event.value, 0),
                  }),
                },
              },
              after: {
                freeFallDelay: { target: "done" },
              },
            },
            done: {
              after: {
                100: { target: "prepare" },
              },
            },
          },
        },
        attacking: {
          initial: "ready",
          states: {
            ready: {
              on: {
                ATTACK: [{ target: "one" }],
              },
            },
            oneThrottling: {
              tags: ["attacking_one"],
              after: {
                800: { target: "oneFinished" },
              },
            },
            oneFinished: {
              tags: ["attacking_one"],
              on: {
                ATTACK: { target: "two" },
              },
              after: {
                1000: { target: "ready" },
              },
            },
            one: {
              tags: ["attacking_one"],
              always: { target: "oneThrottling" },
              after: {
                600: { target: "ready" },
              },
            },
            two: {
              tags: ["attacking_two"],
              after: {
                1000: { target: "ready" },
              },
            },
          },
        },
      },
      on: {
        REST: { target: "rest" },
      },
    },
    rest: {
      on: {
        AWAKEN: { target: "standing" },
      },
    },
  },
});
