import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

const visDataArraySchema = z.array(
  z.object({
    end_year: z.number(),
    intensity: z.number(),
    sector: z.string(),
    topic: z.string(),
    insight: z.string(),
    url: z.string(),
    region: z.string(),
    start_year: z.number(),
    impact: z.number(),
    added: z.string(),
    published: z.string(),
    country: z.string(),
    relevance: z.number(),
    pestle: z.string(),
    source: z.string(),
    title: z.string(),
    likelihood: z.number(),
  })
);

export const visDataRouter = createTRPCRouter({
  addVisDataArray: publicProcedure
    .input(visDataArraySchema)
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.visData.createMany({
          data: input,
        });
      } catch (error) {
        // console.log(error);
      }
    }),
  getAllVisData: publicProcedure.query(async ({ ctx }) => {
    // getAllVisData: publicProcedure.query(({ ctx }) => {
    return await ctx.prisma.visData.findMany();
    // return [];
  }),
});
