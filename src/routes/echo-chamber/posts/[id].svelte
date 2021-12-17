<script context="module" lang="ts">
  import { focusOnMount } from '$lib/utilities/focus-on-mount';
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ page, fetch }) => {
    const endpoint = `/echo-chamber/api/${page.params.id}`;
    const editing = page.query.has('editing');
    const res = await fetch(endpoint);

    if (res.ok) {
      const { post } = await res.json();
      return {
        props: {
          post,
          editing,
        },
      };
    }

    return {
      status: res.status,
      error: new Error(`Could not load ${endpoint}.`),
    };
  };
</script>

<script lang="ts">
  import { goto, invalidate } from '$app/navigation';
  import { page } from '$app/stores';

  export let post: Post;

  $: draft = post.content;
  $: isEditing = $page.query.has('editing');

  const updatePost = () => {
    fetch('/echo-chamber/api/' + post.id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `content=${draft}`,
    }).then((response) => {
      if (response.ok) {
        invalidate(`/echo-chamber/api/${post.id}`);
        invalidate(`/echo-chamber/api`);
      }
    });
  };

  const deletePost = () => {
    fetch('/echo-chamber/api/' + post.id, {
      method: 'DELETE',
    }).then((response) => {
      if (response.ok) {
        invalidate(`/echo-chamber/api`);
        goto('/echo-chamber/posts');
      }
    });
  };
</script>

<article class="post-detail" id="post-detail-{post.id}" data-test="post-detail">
  <header class="flex content-between mb-6">
    <div class="w-full">
      <a href="/echo-chamber/posts" data-test="post-detail-back-arrow" sveltekit:noscroll
        >&larr; Close</a
      >
    </div>
    <div class="w-full flex gap-2 justify-end">
      <div data-test="post-detail-controls">
        {#if !isEditing}
          <a
            class="button small"
            href="{$page.path}?editing"
            sveltekit:noscroll
            data-test="post-detail-controls-edit-button">Edit</a
          >
        {:else}
          <a class="button small" href={$page.path} data-test="post-detail-controls-cancel-button"
            >Cancel</a
          >
        {/if}
      </div>
      <form
        action="/echo-chamber/posts/{post.id}?_method=DELETE"
        method="post"
        on:submit|preventDefault={deletePost}
        data-test="post-detail-controls-delete-button"
      >
        <button class="small danger">Delete</button>
      </form>
    </div>
  </header>
  <p data-test="post-detail-metadata">
    At the exact moment of {post.createdAt}, {post.author.email}'s deepest thought was…
  </p>
  <p class="text-center text-4xl my-4 font-serif italic">
    <span class="quote">“</span>
    <span data-test="post-detail-content">{post.content}</span>
    <span class="quote">”</span>
  </p>
  {#if isEditing}
    <form
      class="post-edit"
      method="post"
      action="/echo-chamber/api/{post.id}?_method=PATCH"
      data-test="post-detail-edit-form"
      on:submit|preventDefault={updatePost}
    >
      <input
        type="text"
        name="text"
        use:focusOnMount
        bind:value={draft}
        data-test="post-detail-draft-content"
      />
      <button type="submit" data-test="post-detail-edit-submit">Update</button>
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
