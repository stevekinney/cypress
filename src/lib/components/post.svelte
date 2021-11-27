<script lang="ts">
	export let post: Post;

	let isEditing = false;
	let draft = post.text;

	function focusOnMount(node: HTMLInputElement) {
		node.focus();
	}

	const toggleEditing = () => {
		isEditing = !isEditing;
	};
</script>

<article id="post-{post.id}" class="post">
	<p class="post-content">{post.text}</p>
	<footer class="post-controls">
		<p class="post-metadata">
			<a href="/echo-chamber/{post.id}">— Me, {post.createdAt}</a>
		</p>
	</footer>
</article>

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
