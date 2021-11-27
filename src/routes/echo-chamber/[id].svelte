<script context="module" lang="ts">
	import { focusOnMount } from '$lib/utilities/focus-on-mount';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ page, fetch }) => {
		const endpoint = `/echo-chamber/hot-takes/${page.params.id}`;
		const editing = page.query.has('editing');
		const res = await fetch(endpoint);

		if (res.ok) {
			const { post } = await res.json();
			return {
				props: {
					post,
					editing
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
	import { goto, invalidate } from '$app/navigation';
	import { page } from '$app/stores';

	export let post: Post;
	let draft = post.text;

	$: isEditing = $page.query.has('editing');

	const updatePost = () => {
		fetch('/echo-chamber/hot-takes/' + post.id, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: `text=${draft}`
		}).then((response) => {
			if (response.ok) {
				invalidate(`/echo-chamber/hot-takes/${post.id}`);
				invalidate(`/echo-chamber/hot-takes`);
			}
		});
	};

	const deletePost = () => {
		fetch('/echo-chamber/hot-takes/' + post.id, {
			method: 'DELETE'
		}).then((response) => {
			if (response.ok) {
				invalidate(`/echo-chamber/hot-takes`);
				goto('/echo-chamber');
			}
		});
	};
</script>

<article class="post-detail" id="post-detail-{post.id}">
	<header class="flex content-between mb-6">
		<div class="w-full"><a href="/echo-chamber">&larr; Close</a></div>
		<div class="w-full flex gap-2 justify-end">
			<div>
				{#if !isEditing}
					<a class="button small" href="{$page.path}?editing">Edit</a>
				{:else}
					<a class="button small" href={$page.path}>Cancel</a>
				{/if}
			</div>
			<form
				action="/echo-chamber/hot-takes/{post.id}?_method=DELETE"
				method="post"
				on:submit|preventDefault={deletePost}
			>
				<button class="small danger">Delete</button>
			</form>
		</div>
	</header>
	<p>At the exact moment of {post.createdAt}, your deepest thought was…</p>
	<p class="text-center text-4xl my-4 font-serif italic">
		<span class="quote">“</span>{post.text}<span class="quote">”</span>
	</p>
	{#if isEditing}
		<form
			class="post-edit"
			method="post"
			action="/echo-chamber/hot-takes/{post.id}?_method=PATCH"
			on:submit|preventDefault={updatePost}
		>
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
		@apply flex gap-2 justify-between my-4 p-4 bg-purple-200 border-2 border-purple-400;
	}

	.post-edit input {
		@apply w-full;
	}
</style>
