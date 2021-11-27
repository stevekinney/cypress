<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ page, fetch }) => {
		const endpoint = `${page.path}/hot-takes`;
		const res = await fetch(endpoint);

		if (res.ok) {
			const { posts } = await res.json();
			return {
				props: {
					posts,
					endpoint
				}
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

	export let posts: Post[];
	export let endpoint: string;
</script>

<header>
	<h1>Echo Chamber</h1>
	<p>A safe place to talk to yourself. Because the thoughts aren't going to lead themselves.</p>
</header>

<form
	id="new-post"
	class="my-4 bg-purple-200 p-4 border-2 border-purple-400 flex gap-2 items-end justify-center"
	action={endpoint}
	method="post"
>
	<input
		name="text"
		class="w-full"
		aria-label="New Post"
		placeholder="What if your hottest take?"
	/>
	<button class="w-5/12">Lead Thought</button>
</form>

<section id="posts">
	{#each posts as post}
		<HotTake {post} />
	{/each}
</section>

<style lang="postcss">
	#posts {
		@apply mt-4;
	}
</style>
