import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export const paymentsRouter = router({
	paymentIntent: publicProcedure
		.input(
			z.object({
				amount: z.number()
			})
		)
		.query(async ({ ctx, input }) => {
			const paymentIntent = await ctx.stripe.paymentIntents.create({
				amount: input.amount,
				currency: 'usd',
				automatic_payment_methods: {
					enabled: true
				}
			});

			return {
				clientSecret: paymentIntent.client_secret
			};
		})
});
