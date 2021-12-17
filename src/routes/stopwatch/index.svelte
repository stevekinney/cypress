<script lang="ts">
  import { toast } from '@zerodevx/svelte-toast';
  import { onDestroy, onMount } from 'svelte';

  let count = 0;
  let interval: ReturnType<typeof setInterval>;

  onMount(() => {
    console.log('Mounted!');
    interval = setInterval(() => {
      count++;
    }, 1000);
  });

  onDestroy(() => {
    clearInterval(interval);
  });

  const writeToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.push(`Wrote "${text}" to the clipboard.`);
      })
      .catch(console.error);
  };
</script>

<h1>This page has been loaded for {count} seconds.</h1>
<section class="my-4">
  <button on:click={() => writeToClipboard('Snap')}>Snap!</button>
  <button on:click={() => writeToClipboard('Crackle')}>Crackle!</button>
  <button on:click={() => writeToClipboard('Pop')}>Pop!</button>
</section>
