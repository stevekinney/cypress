<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch, session }) => {
		const endpoint = '/echo-chamber/api';
		const response = await fetch(endpoint);

		if (!session.user) {
			return {
				redirect: '/echo-chamber',
				status: 302
			};
		}

		if (response.ok) {
			const { posts } = await response.json();
			return {
				props: { posts },
				stuff: { posts }
			};
		}

		return {
			status: response.status,
			error: new Error(response.body.toString())
		};
	};
</script>

<script lang="ts">
	import HotTake from '$lib/components/post.svelte';
	import CreatePost from './_create-post.svelte';

	export let posts: Post[];
</script>

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
