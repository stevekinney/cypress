<script lang="ts">
  import { toggle, remove } from '../stores/items';

  export let title: string;
  export let items: Item[];
</script>

<section class="w-full" data-test="items-{title.toLowerCase()}">
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
          {item.title}
        </label>
        <button data-test="remove" class="small" on:click={() => remove(item.id)}>Remove</button>
      </li>
    {:else}
      <p data-test="items-empty-state" class="font-light text-purple-600">No items to show.</p>
    {/each}
  </ul>
</section>

<style lang="postcss">
  button {
    @apply ml-2 px-0 py-0 text-red-800 bg-white border-none;
  }

  button:hover {
    @apply underline bg-white;
  }
</style>
