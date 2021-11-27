<script context="module" lang="ts">
	import { focusOnMount } from '$lib/utilities/focus-on-mount';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ page, fetch }) => {
		const endpoint = `/echo-chamber/hot-takes/${page.params.id}`;
		const res = await fetch(endpoint);

		if (res.ok) {
			const { post } = await res.json();
			return {
				props: {
					post
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

	let isEditing = false;
	let draft = post.text;

	const toggleEditing = () => {
		isEditing = !isEditing;
	};

	const updatePost = () => {
		fetch('/echo-chamber/hot-takes/' + post.id, {
			method: 'PATCH'
		});
	};
</script>

<article class="post-detail" id="post-detail-{post.id}">
	<header class="flex content-between mb-6">
		<div class="w-full"><a href="/echo-chamber">&larr; Close</a></div>
		<div class="w-full flex gap-2 justify-end">
			<button on:click={toggleEditing} class="small">Edit</button>
			<form action="/echo-chamber/hot-takes/{post.id}?_method=DELETE" method="post">
				<button class="small danger">Delete</button>
			</form>
		</div>
	</header>
	<p>At the exact moment of {post.createdAt}, your deepest thought was…</p>
	<p class="text-center text-4xl my-4 font-serif italic">
		<span class="quote">“</span>{post.text}<span class="quote">”</span>
	</p>
	{#if isEditing}
		<form class="post-edit" method="post" action="/echo-chamber/hot-takes/{post.id}?_method=PATCH">
			<input type="text" name="text" use:focusOnMount bind:value={draft} />
			<button>Update</button>
		</form>
	{/if}
</article>

<style lang="postcss">
	.quote {
		@apply text-purple-600;
	}

	.post-edit {
		@apply bg-purple-200 border-2 border-purple-400 my-4 p-4 flex gap-2 justify-between;
	}

	.post-edit input {
		@apply w-full;
	}
</style>
