import { defineConfig } from "orval";

const target = "http://localhost:3001/api-json";

export default defineConfig({
  creditCardPlanner: {
    output: {
      mode: "tags-split",
      target: "./services/api/creditCardPlanner.ts",
      schemas: "./services/model",
      client: "react-query",
      prettier: true,

      override: {
        mutator: {
          path: "./lib/axios.ts",
          name: "customInstance",
        },
        query: {
          useQuery: true,
          useMutation: true,
          options: true,
        },
      },
    },
    input: {
      target,
    },
    hooks: {
      afterAllFilesWrite: "prettier --write",
    },
  },
  creditCardPlannerZod: {
    input: {
      target,
    },
    output: {
      mode: "tags-split",
      client: "zod",
      target: "./services/zod",
      fileExtension: ".zod.ts",
    },
  },
});
