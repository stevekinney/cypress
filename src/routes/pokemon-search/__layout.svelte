<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ page }) => {
    const { query } = page;
    const searchTerm = query.get('name') || '';

    return {
      props: { searchTerm },
    };
  };
</script>

<script lang="ts">
  import { browser } from '$app/env';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  export let searchTerm = '';

  const emptyData = { pokemon: [] };
  let controller: AbortController;

  let timer: ReturnType<typeof setTimeout>;
  let hasSearched = false;

  const searchFor = async (name: string): Promise<PokemonAPIResponse> => {
    if (!name) return emptyData;
    if (controller) controller.abort();

    controller = new AbortController();

    try {
      const signal = controller.signal;
      const response = await fetch(`/pokemon-search/api?name=${name}`, { signal });
      const data = await response.json();

      return data;
    } catch (error) {
      if (error instanceof DOMException) return emptyData;
    }
  };

  const updateSearchTerm = (event: KeyboardEvent) => {
    const value = (event.target as HTMLInputElement).value;
    searchTerm = value;
    clearTimeout(timer);
    timer = setTimeout(() => {
      hasSearched = true;
      if (searchTerm) {
        results = searchFor(searchTerm);
        const search = new URLSearchParams({ name: searchTerm });
        if (browser) goto(`${$page.path}?${search}`, { replaceState: true, keepfocus: true });
      }
    }, 300);
  };

  let results = searchFor(searchTerm);
</script>

<svelte:head>
  <title>Pokémon Search</title>
</svelte:head>

<div class="flex gap-8">
  <section class="w-1/3">
    <h1 class="text-xl">Pokémon Search</h1>
    <input
      id="search"
      data-test="search"
      class="w-full"
      type="search"
      placeholder="Search Pokémon…"
      value={searchTerm}
      on:keyup={updateSearchTerm}
    />
    <label for="search" data-test="search-label"><strong>Searching for…</strong> {searchTerm}</label
    >
    {#await results}
      <p data-test="loading-state">Loading…</p>
    {:then { pokemon }}
      <div class="my-4" data-test="results">
        {#each pokemon as p}
          <article data-test="result">
            <a
              href="/pokemon-search/{p.id}?name={searchTerm}"
              sveltekit:prefetch
              data-test-id={p.id}>{p.name}</a
            >
          </article>
        {:else}
          {#if hasSearched}
            <div class="empty-state" data-test="empty-state">No Pokémon match that query.</div>
          {/if}
        {/each}
      </div>
    {/await}
  </section>
  <section class="w-2/3">
    <slot />
  </section>
</div>

<style lang="postcss">
  a {
    @apply text-blue-600 underline;
  }

  a:hover {
    @apply text-blue-500;
  }

  a:active {
    @apply text-blue-400;
  }
</style>
