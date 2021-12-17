<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ fetch, session }) => {
    const endpoint = '/echo-chamber/api/users';
    const response = await fetch(endpoint);
    const { user } = session;

    if (response.ok) {
      const { users } = await response.json();
      return {
        props: { users, user },
        stuff: { users, user },
      };
    }

    return {
      status: response.status,
      error: new Error(response.body.toString()),
    };
  };
</script>

<script lang="ts">
  import { page, session } from '$app/stores';
  import { post } from '$lib/utilities/post';

  export let user: User;

  const signOut = async () => {
    await post('/echo-chamber/api/sign-out');
    $session.user = null;
  };
</script>

<svelte:head>
  <title>Echo Chamber — Cypress, Frontend Masters</title>
</svelte:head>

<header class="mb-4 lg:mb-8">
  <h1 data-test="application-title"><a href="/echo-chamber">Echo Chamber</a></h1>
  <p data-test="application-blurb">
    A safe place to talk to yourself. Because the thoughts aren't going to lead themselves.
  </p>
</header>

<nav class="mb-8 pb-4 border-b-4 border-purple-900">
  {#if user}
    <span data-test="current-user" class="flex justify-between">
      <p>Signed in as <strong data-test="current-user-email">{user.email}</strong></p>
      <button on:click={signOut} class="danger" data-test="sign-out">Sign Out</button>
    </span>
  {:else}
    <div class="flex gap-2">
      <a
        href="/echo-chamber/sign-in"
        data-test="sign-in"
        class:active={$page.path.endsWith('sign-in')}>Sign In</a
      >
      <a
        href="/echo-chamber/sign-up"
        data-test="sign-up"
        class:active={$page.path.endsWith('sign-up')}>Sign Up</a
      >
    </div>
  {/if}
</nav>

<slot />

<style lang="postcss">
  nav a {
    @apply block p-2 text-purple-700 border-b-4 border-purple-900;
  }

  nav a.active {
    @apply block p-2 text-purple-700 bg-purple-400 border-b-4 border-purple-900;
  }

  nav a:hover {
    @apply bg-purple-200;
  }
</style>
