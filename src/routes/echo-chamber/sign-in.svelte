<script context="module">
  export async function load({ session, page }) {
    const error = page.query.get('error');

    if (session.user) {
      return {
        status: 302,
        redirect: '/echo-chamber/posts',
      };
    }

    return {
      props: { error },
    };
  }
</script>

<script lang="ts">
  export let error: string;
</script>

<h2>Sign In</h2>

{#if error}
  <p class="text-red-900 border-red-900 bg-red-300 border-2 p-2 my-4">{error}</p>
{/if}

<form action="/echo-chamber/api/sign-in" method="post" data-test="sign-in-form">
  <label for="email">Email Address</label><input
    type="email"
    name="email"
    id="email"
    data-test="sign-in-email"
    required
  />
  <label for="password">Password</label><input
    type="password"
    name="password"
    id="password"
    data-test="sign-in-password"
    required
  />
  <button type="submit" data-test="sign-in-submit">Sign In</button>
</form>

<style lang="postcss">
  form {
    @apply flex flex-col gap-2;
  }

  label {
    @apply block;
  }

  button {
    @apply block;
  }
</style>
