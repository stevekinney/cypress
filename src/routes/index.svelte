<script lang="ts">
  import { onMount } from 'svelte';
  import { toast } from '@zerodevx/svelte-toast';

  onMount(() => {
    setTimeout(() => {
      toast.push('Oh, hello there!');
      console.log('Wow');
    }, 10000);
  });
</script>

<p>Select an application from the left.</p>
