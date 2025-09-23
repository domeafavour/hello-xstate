import { assign, fromCallback, setup } from "xstate";
import { frame } from "./utils/frame";

type WalkingDirection = "left" | "right";

export const playerMachine = setup({
  types: {
    context: {} as {
      lp: number;
      x: number;
      y: number;
      walkingDirection?: WalkingDirection;
    },
    events: {} as
      | { type: "JUMP" }
      | { type: "FALL" }
      | { type: "JUMP_END" }
      | { type: "SET_Y"; value: number }
      | { type: "STOP_WALKING" }
      | { type: "START_WALKING"; direction?: WalkingDirection }
      | { type: "MOVE_RIGHT" }
      | { type: "MOVE_LEFT" },
  },
  actors: {
    startWalking: fromCallback<
      { type: "STOP_WALKING" },
      { direction: WalkingDirection }
    >(({ sendBack, receive, input }) => {
      const { direction } = input;

      const cleanup = frame(() => {
        sendBack({
          type: direction === "right" ? "MOVE_RIGHT" : "MOVE_LEFT",
        });
      }, 16);

      receive((e) => {
        if (e.type === "STOP_WALKING") {
          cleanup();
        }
      });

      return cleanup;
    }),

    jumpUp: fromCallback<
      { type: "FALL" } | { type: "SET_Y"; value: number },
      { y: number }
    >(({ sendBack, input }) => {
      let value = 0;

      const cleanup = frame((stop) => {
        const next = input.y + (value += 2);

        if (next > 40) {
          sendBack({ type: "FALL" });
          stop();
        } else {
          sendBack({ type: "SET_Y", value: next });
        }
      }, 16);

      return cleanup;
    }),

    jumpDown: fromCallback<
      { type: "SET_Y"; value: number } | { type: "JUMP_END" },
      { y: number }
    >(({ sendBack, input }) => {
      let value = 0;

      const cleanup = frame((stop) => {
        const next = input.y - (value += 2);

        if (next < 0) {
          sendBack({ type: "SET_Y", value: 0 });
          sendBack({ type: "JUMP_END" });
          stop();
        } else {
          sendBack({ type: "SET_Y", value: next });
        }
      }, 16);

      return cleanup;
    }),
  },
  actions: {
    moveLeft: assign({ x: ({ context }) => Math.max(context.x - 0.5, 0) }),
    moveRight: assign({ x: ({ context }) => Math.min(context.x + 0.5, 100) }),
    setWalking: assign({
      walkingDirection: (_, params?: "left" | "right") => params || "right",
    }),
    setY: assign({ y: (_, value: number) => value }),
  },
  guards: {
    // canMoveLeft: ({ context }) => context.x > 0,
    // canMoveRight: ({ context }) => context.x < 100,
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAcA2BDAnmATgYgFkB5ANQFEB9AJQEkBxACQBUBtABgF1EUB7WASwAu-HgDtuIAB6IAzACYArADoAbIoA0ITIgCMMgJxL9CmTsUBfc5rRZchUpQAyZAGKtOE5HyEjxSKbIybKp6cgAcZgqa2ghmltYY2DhKAO7oqADW-KJQSugAxsIAbmB4AMpMRAAKFADqAIKOANI0AHJ07Fz+XgLCYhLSCHJswQDsACxyOmGjUVqI4zo6RmxqCvEgNkmp6Vk5StkFxaUV9VRMdY0t7Z2e3n1+oIM6+jJKw6Ya8wjjakrjqwsVk2iVwSgAVgBXAC2yGyuUOhX4JTwACkAKoEKq3br3XwDXRhOTvML6QFzGJElRKMJsUZyfQ6FTMlkqDZbMFQ2HwpRQHjw9HIcpkC4ATRxvF6+P8g3k4yU01m0UQox0o3+Mlm7NByS5cP2fIFQpcjUcEs2eP6MoWKnVbDkMnGmopiDCixpZLWlmBoh4EDgnh1dylVqeiAAtHJ5YyAWtlUMZNTPUCErZkmlMvDgz5QwEhvp43L-uTtWmdpn9kdkWBsw8CQgZBElI7nfHxuMwkZmTpxgowjIB4PRqXthm9gjRFWSrXpWGEKNRm2F0pRvp9ONV0zWcPgRzdTD9VAZ7nBg6lGwwgpXkrvmpDNf1rudRCDzzEcdj4886rz5eH-GiXVIJ6UZVkWRHTlXwNfkckFT963CdVjE+F0EAiTtSRLJ8yz1HlDRyAARHgUi-Hocy-QYFBUZRwkiADpg9LDLCAA */
  id: "player",
  context: {
    lp: 100,
    x: 0,
    y: 0,
    walkingDirection: "right",
  },
  // initial: "stand",
  type: "parallel",
  states: {
    // stand: {
    //   on: {
    //     // START_WALKING: {
    //     //   target: "walking",
    //     // },
    //   },
    // },
    walking: {
      initial: "inactive",
      states: {
        active: {
          invoke: {
            src: "startWalking",
            id: "walkingActor",
            input: ({ context }) => ({
              direction: context.walkingDirection ?? "right",
            }),
          },
          on: {
            STOP_WALKING: { target: "inactive" },
            MOVE_RIGHT: {
              description: "move by 5",
              actions: { type: "moveRight" },
            },
            MOVE_LEFT: {
              description: "move by -5",
              actions: { type: "moveLeft" },
            },
          },
        },
        inactive: {
          on: {
            START_WALKING: {
              target: "active",
              actions: {
                type: "setWalking",
                params: ({ event }) => event.direction,
              },
            },
          },
        },
      },
    },
    jumping: {
      initial: "inactive",
      states: {
        inactive: {
          on: {
            JUMP: { target: "goingUp" },
          },
        },
        goingUp: {
          invoke: {
            src: "jumpUp",
            input: ({ context }) => ({ y: context.y }),
          },
          on: {
            FALL: {
              // actions: assign({
              //   y: 0,
              // }),
              target: "goingDown",
            },
          },
        },
        goingDown: {
          // entry: [assign({ y: 0 })],
          invoke: {
            src: "jumpDown",
            input: ({ context }) => ({ y: context.y }),
          },
          on: {
            JUMP_END: { target: "inactive" },
          },
        },
      },
      on: {
        SET_Y: {
          actions: assign({
            y: ({ event }) => event.value,
          }),
        },
      },
    },
  },
  on: {
    // START_WALKING: {
    //   target: '.walking',
    //   actions: { type: 'setWalking', params: ({ event }) => event.direction },
    // },
  },
});
