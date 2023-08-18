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

	const PAYMENT_AMOUNT = 200;

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
			intent = await trpc($page).payments.paymentIntent.query({ amount: PAYMENT_AMOUNT });
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

<h1 class="mb-10 text-center text-2xl font-bold">Stripe Payment Example</h1>

{#if stripe && clientSecret}
	<h4
		class="mx-auto mb-10 w-fit select-none rounded-lg bg-gray-600/30 p-5 text-4xl font-bold text-primary"
	>
		{PAYMENT_AMOUNT.toString()}$
	</h4>
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
				<p class="text-center text-red-400">{error.message}</p>
			{/if}
		</form>
	</Elements>
{:else}
	<p class="text-center text-xl">Loading...</p>
{/if}
