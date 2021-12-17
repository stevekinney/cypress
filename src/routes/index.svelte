<script lang="ts">
	import { onMount } from 'svelte';
	import { toast } from '@zerodevx/svelte-toast';
	let showToast = true;

	onMount(() => {
		setTimeout(() => {
			toast.push('Oh, hello there!');
		}, 10000);
	});
</script>

<p>Select an application from the left.</p>
