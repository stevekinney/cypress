<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		const endpoint = '/echo-chamber/hot-takes';
		const res = await fetch(endpoint);

		if (res.ok) {
			const { posts } = await res.json();
			return {
				props: { posts },
				stuff: { posts }
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${endpoint}`)
		};
	};
</script>

<script lang="ts">
	import HotTake from '$lib/components/post.svelte';
	import CreatePost from './_create-post.svelte';

	export let posts: Post[];
</script>

<svelte:head>
	<title>Echo Chamber — Cypress, Frontend Masters</title>
</svelte:head>

<header>
	<h1>Echo Chamber</h1>
	<p>A safe place to talk to yourself. Because the thoughts aren't going to lead themselves.</p>
</header>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-2">
	<CreatePost />
	<div class="content col-span-2 row-span-2">
		<slot />
	</div>
	<section id="posts" class="flex flex-col gap-2">
		{#each posts as post (post.id)}
			<HotTake {post} />
		{/each}
	</section>
</div>

<style lang="postcss">
	.content {
		@apply p-4 border-2 border-purple-400;
	}
</style>
