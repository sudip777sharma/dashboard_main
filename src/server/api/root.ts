import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { visDataRouter } from "./routers/visData";
import { courseDataArrayRouter } from "./routers/courseList";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  visData: visDataRouter,
  courseListData: courseDataArrayRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
