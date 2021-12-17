<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ session }) => {
    if (session.user) {
      return {
        redirect: '/echo-chamber/posts',
        status: 302,
      };
    }
    return {};
  };
</script>

<p>Sign in or create an account above.</p>
