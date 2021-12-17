<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ page }) => {
    const numberOfFacts = +page.query.get('amount') || 3;

    return {
      props: { numberOfFacts },
    };
  };
</script>

<script lang="ts">
  export let numberOfFacts: number = 3;
  let facts: DogFact[] = [];

  const fetchFacts = () => {
    fetch(`/dog-facts/api?amount=${numberOfFacts}`)
      .then((response) => response.json())
      .then((response) => (facts = response.facts));
  };
</script>

<svelte:head>
  <title>{numberOfFacts} Dog Facts</title>
</svelte:head>

<h1>Dog Facts</h1>

<div>
  <p>How many dog facts would you like?</p>
  <form on:submit|preventDefault={fetchFacts} class="py-4">
    <label for="number-of-facts">Number of Facts</label>
    <select
      id="number-of-facts"
      class="block my-2 p-2 w-80 border-2 border-purple-700"
      bind:value={numberOfFacts}
      data-test="amount-select"
    >
      {#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as number}
        <option value={number}>{number} {number === 1 ? 'Fact' : 'Facts'}</option>
      {/each}
    </select>
    <button data-test="fetch-button">Fetch</button>
    <button class="secondary" data-test="clear-button" on:click|preventDefault={() => (facts = [])}
      >Clear</button
    >
  </form>

  <section id="facts">
    {#each facts as fact}
      <article class="my-4 p-4 border-4 border-purple-600" data-test="dog-fact">
        <h2>Dog Fact #{fact.id}</h2>
        <p>{fact.fact}</p>
      </article>
    {:else}
      <p class="text-center p-4 my-4" data-test="empty-state">Fetch some dog facts or something.</p>
    {/each}
  </section>
</div>
