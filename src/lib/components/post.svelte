<script lang="ts">
	import { page } from '$app/stores';

	export let post: Post;

	$: active = +$page.params.id === post.id;
</script>

<a href="/echo-chamber/posts/{post.id}" sveltekit:noscroll>
	<article id="post-{post.id}" class="post" class:active>
		<p class="post-content">{post.content}</p>
		<footer class="post-controls">
			<p class="post-metadata">
				— {post?.author?.email}, {post.createdAt}
			</p>
		</footer>
	</article>
</a>

<style lang="postcss">
	.post-content {
		@apply text-lg;
	}

	.post {
		@apply p-4 border-2 border-purple-400;
	}

	.active {
		@apply bg-purple-100;
	}

	.post-metadata {
		@apply text-right text-purple-700 text-sm italic;
	}
</style>
