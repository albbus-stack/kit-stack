import { z } from 'zod';
import { protectedProcedure, router } from '../trpc';
import { TRPCClientError } from '@trpc/client';

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
			const { user, prisma } = ctx;

			// REMOVE THIS CHECK
			// It prevents post creation spamming on the live demo
			if(user !== "50c7cfa4-7d29-498d-9725-902d8e6618c2") {
				throw new TRPCClientError("You are not authorized to create a post.")
			}

			const post = await prisma.post.create({
				data: {
					title: input.title,
					content: input.content,
					author: {
						connect: {
							id: ctx.user
						}
					}
				}
			});

			return post;
		}),
	getPosts: protectedProcedure.query(async ({ ctx }) => {
		const { prisma } = ctx;

		const posts = await prisma.post.findMany();

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
			const { prisma } = ctx;

			const post = await prisma.post.update({
				where: {
					id: input.postId
				},
				data: {
					title: input.title,
					content: input.content
				}
			});

			return post;
		}),
	deletePost: protectedProcedure
		.input(z.object({ postId: z.number() }))
		.mutation(async ({ ctx, input }) => {
			const { prisma } = ctx;

			const post = await prisma.post.delete({
				where: {
					id: input.postId
				}
			});

			return post;
		})
});
