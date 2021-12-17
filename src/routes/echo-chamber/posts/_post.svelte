<script lang="ts">
  import { page } from '$app/stores';

  export let post: Post;

  $: active = +$page.params.id === post.id;
</script>

<a href="/echo-chamber/posts/{post.id}" sveltekit:noscroll>
  <article
    id="post-preview-{post.id}"
    class="post-preview"
    data-test="post-preview-{post.id}"
    class:active
  >
    <p class="post-content" data-test="post-preview-{post.id}-content">{post.content}</p>
    <footer>
      <p class="post-metadata" data-test="post-preview-{post.id}-metadata">
        — <span class="post-preview-author" data-test="post-preview-{post.id}-author"
          >{post?.author?.email}</span
        >,
        <span class="post-preview-datetime" data-test="post-preview-{post.id}-datetime"
          >{post.createdAt}</span
        >
      </p>
    </footer>
  </article>
</a>

<style lang="postcss">
  .post-content {
    @apply text-lg;
  }

  .post-preview {
    @apply p-4 border-2 border-purple-400;
  }

  .active {
    @apply bg-purple-100;
  }

  .post-metadata {
    @apply text-right text-purple-700 text-sm italic;
  }
</style>
