import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const homelessStatsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.homelessStats.findMany();
  }),

  addStat: publicProcedure
    .input(
      z.object({
        date: z.string(),
        count: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.homelessStats.create({
        data: {
          date: new Date(input.date),
          peopleFed: input.count,
        },
      });
    }),
});
