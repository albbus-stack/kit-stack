import { z } from 'zod';
import { protectedProcedure, router } from '../trpc';
import { TRPCClientError } from '@trpc/client';
import { post } from '$lib/db/drizzle/schema';
import { eq } from 'drizzle-orm';

export const dbRouter = router({
	greeting: protectedProcedure.query(async () => {
		return `Hello from the authed db @ ${new Date().toLocaleTimeString()}`;
	}),
	createPost: protectedProcedure
		.input(
			z.object({
				title: z.string(),
				content: z.string()
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { user, db } = ctx;

			// REMOVE THIS CHECK
			// It prevents post creation spamming on the live demo
			if(user !== "50c7cfa4-7d29-498d-9725-902d8e6618c2") {
				throw new TRPCClientError("You are not authorized to create a post.")
			}

			const p = await db.insert(post).values({
				title: input.title,
				content: input.content,
				authorId: ctx.user
			}).returning();

			return p;
		}),
	getPosts: protectedProcedure.query(async ({ ctx }) => {
		const { db } = ctx;

		const posts = await db.query.post.findMany();

		return posts;
	}),
	updatePost: protectedProcedure
		.input(
			z.object({
				postId: z.number(),
				title: z.string(),
				content: z.string()
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { db } = ctx;

			const p = await db.update(post).set({
				title: input.title,
				content: input.content
			}).where(eq(post.id, input.postId)).returning();

			return p;
		}),
	deletePost: protectedProcedure
		.input(z.object({ postId: z.number() }))
		.mutation(async ({ ctx, input }) => {
			const { db } = ctx;

			const p = await db.delete(post).where(eq(post.id, input.postId));

			return p;
		})
});
