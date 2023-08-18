<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { loadStripe, type Stripe, type StripeError } from '@stripe/stripe-js';
	import { PUBLIC_STRIPE_KEY } from '$env/static/public';
	import { Elements, PaymentElement, LinkAuthenticationElement, Address } from 'svelte-stripe';
	import { trpc } from '$lib/trpc/client';
	import { page } from '$app/stores';
	import { TRPCClientError } from '@trpc/client';
	import type { PaymentIntent } from '$lib/trpc/routes/payments';
	import { ArrowLeft, Icon } from 'svelte-hero-icons';

	let paymentAmount = 200;

	let stripe: Stripe | null = null;
	let clientSecret: string | null = null;
	let error: StripeError | null = null;
	let elements: any;
	let processing = false;

	onMount(async () => {
		stripe = await loadStripe(PUBLIC_STRIPE_KEY);
		clientSecret = await createPaymentIntent();
	});

	async function createPaymentIntent() {
		// Create a new stripe payment intent with the specified amount
		let intent: PaymentIntent | null = null;
		try {
			intent = await trpc($page).payments.paymentIntent.query({ amount: paymentAmount });
		} catch (e) {
			if (e instanceof TRPCClientError) {
				throw e.message;
			}
		}

		return intent!.clientSecret;
	}

	async function submitForm() {
		// Block another click on the button while processing a payment
		if (processing) return;
		processing = true;

		// Confirm the payment that was created server side
		const result = await stripe?.confirmPayment({
			elements,
			redirect: 'if_required'
		});

		if (result?.error) {
			// Show the error to the user
			error = result.error;
			processing = false;
		} else {
			// Redirect to a success page
			goto('/');
		}
	}
</script>

<a href="/" role="button" class="btn btn-primary m-10 mb-5">
	<Icon class="w-7" src={ArrowLeft} />
</a>

{#if stripe && clientSecret}
	<div class="flex w-full justify-center text-4xl font-bold text-primary">
		<div class="relative mx-auto mb-10 w-[200px] rounded-lg bg-gray-600/30 p-5 pr-2">
			<div class="absolute left-5 top-1/2 -translate-y-1/2">$</div>
			<input type="number" class="ml-7 w-3/4 bg-transparent" bind:value={paymentAmount} />
		</div>
	</div>
	<Elements {stripe} {clientSecret} theme="flat" labels="floating" bind:elements>
		<form
			class="mx-auto mb-20 flex max-w-3xl flex-col gap-5 px-10"
			on:submit|preventDefault={submitForm}
		>
			<LinkAuthenticationElement />
			<PaymentElement />
			<!-- Listing all the following props is needed for typescript not to complain -->
			<Address
				mode="billing"
				allowedCountries={[]}
				blockPoBox={false}
				display={{}}
				contacts={[]}
				defaultValues={{}}
				fields={{}}
				validation={{}}
			/>

			<button class="btn btn-primary" disabled={processing}>
				{#if processing}
					Processing...
				{:else}
					Pay
				{/if}
			</button>

			{#if error}
				<p class="text-center text-error">{error.message}</p>
			{/if}
		</form>
	</Elements>
{:else}
	<p class="text-center text-xl">Loading...</p>
{/if}
