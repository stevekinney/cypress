<script lang="ts">
	export let post: Post;
</script>

<a href="/echo-chamber/{post.id}">
	<article id="post-{post.id}" class="post">
		<p class="post-content">{post.text}</p>
		<footer class="post-controls">
			<p class="post-metadata">
				— Me, {post.createdAt}
			</p>
		</footer>
	</article>
</a>

<style lang="postcss">
	.post-content {
		@apply text-lg;
	}

	.post {
		@apply p-4 border-purple-400 border-2 my-2;
	}

	.post-metadata {
		@apply italic text-right text-sm text-purple-700;
	}
</style>
