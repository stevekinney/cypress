<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ stuff }) => {
		return {
			props: {
				posts: stuff.posts
			}
		};
	};
</script>

<script lang="ts">
	export let posts: Post[];
</script>

<div class="flex flex-col place-items-center">
	{#if posts.length}
		<p>Select a hot take from the left.</p>
	{:else}
		<p>Add your first hot take.</p>
	{/if}
</div>
