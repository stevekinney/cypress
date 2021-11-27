<script lang="ts">
	import { toggle, remove } from '../stores/items';

	export let title: string;
	export let items: Item[];
</script>

<section class="w-full">
	<h1>{title}</h1>
	<ul>
		{#each items as item (item.id)}
			<li>
				<label for="item-{item.id}">
					<input
						id="item-{item.id}"
						type="checkbox"
						checked={item.packed}
						on:change={() => toggle(item.id)}
					/>
					{item.title}</label
				>
				<button class="small danger" on:click={() => remove(item.id)}>Remove</button>
			</li>
		{:else}
			<p class="font-light text-purple-600">No items to show.</p>
		{/each}
	</ul>
</section>

<style lang="postcss">
	button {
		@apply invisible;
	}

	li:hover button {
		@apply visible;
	}
</style>
