<script lang="ts">
	import { page } from '$app/stores';
	import { trpc } from '$lib/trpc/client';
	import type { Post } from '@prisma/client';
	import { TRPCClientError } from '@trpc/client';
	import { Icon, ArrowLeft } from 'svelte-hero-icons';

	let loading = false;
	let error = '';
	let posts: Post[] = [];

	// This queries all the posts from the database
	const loadPosts = async () => {
		loading = true;
		try {
			posts = await trpc($page).db.getPosts.query();
		} catch (e) {
			if (e instanceof TRPCClientError) {
				error = e.message;
			}
		} finally {
			loading = false;
		}
	};

	// This creates a new post
	const createPost = async () => {
		loading = true;
		try {
			await trpc($page).db.createPost.mutate({
				title: 'Hello world',
				content: 'This is a post'
			});
			await loadPosts();
		} catch (e) {
			if (e instanceof TRPCClientError) {
				error = e.message;
			}
		} finally {
			loading = false;
		}
	};

	// This updates an existing post with a certain id
	const updatePost = async (id: number) => {
		loading = true;
		try {
			await trpc($page).db.updatePost.mutate({
				postId: id,
				title: 'Hello world',
				content: 'This has been updated'
			});
			await loadPosts();
		} catch (e) {
			if (e instanceof TRPCClientError) {
				error = e.message;
			}
		} finally {
			loading = false;
		}
	};

	// This deletes an existing post with a certain id
	const deletePost = async (id: number) => {
		loading = true;
		try {
			await trpc($page).db.deletePost.mutate({ postId: id });
			await loadPosts();
		} catch (e) {
			if (e instanceof TRPCClientError) {
				error = e.message;
			}
		} finally {
			loading = false;
		}
	};

	$: {
		loadPosts();
	}
</script>

<div class="card w-full flex-col items-center justify-center gap-10 p-10">
	<a href="/" role="button" class="btn btn-primary -mb-10 self-start">
		<Icon class="w-7" src={ArrowLeft} />
	</a>
	<p class="text-red-500">{error}</p>
	<div class="card mx-auto min-w-[250px] flex-col items-center gap-5">
		{#if loading}
			<p>Loading...</p>
		{/if}
		{#each posts as post}
			<div class="card w-full flex-col items-center gap-2 bg-gray-600/30 p-5">
				<p class="opacity-75">{post.id}</p>
				<h1 class="text-2xl">{post.title}</h1>
				<p>{post.content}</p>
				<p class="text-sm opacity-50">{post.authorId}</p>
				<div class="flex flex-row gap-5">
					<a
						href="#update-post"
						role="button"
						class="mt-2 rounded-md bg-info px-3 py-1 text-white"
						aria-busy={loading}
						on:click|preventDefault={() => {
							updatePost(post.id);
						}}>Update</a
					>
					<a
						href="#delete-post"
						role="button"
						class="mt-2 rounded-md bg-error px-3 py-1 text-white"
						aria-busy={loading}
						on:click|preventDefault={() => {
							deletePost(post.id);
						}}>Delete</a
					>
				</div>
			</div>
		{/each}
	</div>
	<div class="x-auto card mb-10 min-w-[250px] flex-col items-center gap-5">
		<a
			href="#create-post"
			role="button"
			class="btn btn-primary w-full"
			aria-busy={loading}
			on:click|preventDefault={createPost}>Create Post</a
		>
	</div>
</div>
