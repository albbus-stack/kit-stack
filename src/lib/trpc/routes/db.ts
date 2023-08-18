import { z } from 'zod';
import { protectedProcedure, router } from '../trpc';
import type { Post } from '@prisma/client';

export const dbRouter = router({
	greeting: protectedProcedure.query(async ({ ctx }) => {
		const { prisma } = ctx;
		const users = await prisma.user.findMany();

		console.log('All Users:', users);

		return `Hello from the authed db`;
	}),
	createPost: protectedProcedure
		.input(
			z.object({
				title: z.string(),
				content: z.string()
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { prisma } = ctx;

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

			console.log(post);

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
