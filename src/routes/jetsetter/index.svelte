<script lang="ts">
  import ItemList from '$lib/components/item-list.svelte';
  import { packed, unpacked, filter, add, markAllAsUnpacked, removeAll } from '$lib/stores/items';

  let newItemName = '';

  const addItem = (event: Event) => {
    add(newItemName);
    newItemName = '';
  };
</script>

<svelte:head>
  <title>Jetsetter — Cypress, Frontend Masters</title>
</svelte:head>

<form class="flex gap-2 items-end" on:submit|preventDefault={addItem}>
  <div class="w-full">
    <label class="block" for="new-item-input">Item</label>
    <input
      class="block w-3/4"
      id="new-item-input"
      data-test="new-item-input"
      type="text"
      placeholder="New Item"
      required
      bind:value={newItemName}
    />
  </div>
  <button class="block w-1/4" disabled={!newItemName} id="add-item" data-test="add-item">
    Add Item
  </button>
</form>

<div class="mt-2">
  <label for="filter-items">Filter</label>
  <input
    id="filter-items"
    data-test="filter-items"
    class="block w-full small"
    placeholder="Filter Items"
    bind:value={$filter}
  />
</div>

<section class="flex gap-2 my-8" data-test="items">
  <ItemList title="Unpacked" items={$unpacked} />
  <ItemList title="Packed" items={$packed} />
</section>

<footer class="flex gap-2 w-full">
  <button data-test="mark-all-as-unpacked" class="block" on:click={markAllAsUnpacked}
    >Mark All as Unpacked</button
  >
  <button data-test="remove-all" class="block" on:click={removeAll}>Remove All</button>
</footer>
