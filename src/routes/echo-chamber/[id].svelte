<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { post } from './hot-takes';

	export const load: Load = async ({ page, fetch }) => {
		const endpoint = `/echo-chamber/hot-takes/${page.params.id}`;
		const res = await fetch(endpoint);

		if (res.ok) {
			const { post } = await res.json();
			return {
				props: {
					post,
					endpoint
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${endpoint}.`)
		};
	};
</script>

<script lang="ts">
	export let post: Post;
</script>

<p>{post.text}</p>
