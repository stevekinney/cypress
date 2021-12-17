<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ fetch, session }) => {
    const endpoint = '/echo-chamber/api';
    const response = await fetch(endpoint);
    const { user } = session;

    if (!user) {
      return {
        redirect: '/echo-chamber/sign-in',
        status: 302,
      };
    }

    if (response.ok) {
      const { posts } = await response.json();
      return {
        props: { posts, user },
        stuff: { posts, user },
      };
    }

    return {
      status: response.status,
      error: new Error(response.body.toString()),
    };
  };
</script>

<script lang="ts">
  import PostPreview from './_post.svelte';
  import CreatePost from './_create-post.svelte';

  export let posts: Post[];
  export let user: User;
</script>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-2">
  <CreatePost {user} />
  <div class="content col-span-1 lg:col-span-2 row-span-2">
    <slot />
  </div>
  <section id="posts" class="flex flex-col gap-2" data-test="post-preview-list">
    {#each posts as post (post.id)}
      <PostPreview {post} />
    {/each}
  </section>
</div>

<style lang="postcss">
  .content {
    @apply p-4 border-2 border-purple-400;
  }
</style>
