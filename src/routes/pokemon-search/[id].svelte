<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ fetch, page }) => {
    const { params } = page;
    const endpoint = '/pokemon-search/api/' + params.id;
    const response = await fetch(endpoint);

    if (response.ok) {
      const { pokemon } = await response.json();
      return {
        props: { pokemon },
      };
    }

    return {
      status: response.status,
      error: new Error(`Could not load ${endpoint}.`),
    };
  };
</script>

<script lang="ts">
  const attributesWithLabels = {
    pokedex_number: 'Pokédex Number',
    hp: 'Hit Points',
    attack: 'Attack',
    defense: 'Defense',
    height_m: 'Height',
    weight_kg: 'Weight',
    speed: 'Speed',
    generation: 'Generation',
  };

  export let pokemon;
</script>

<svelte:head>
  <title>Pokémon Search - {pokemon.name}</title>
</svelte:head>

<header>
  <h1>{pokemon.name}</h1>
  <ul>
    <li>{pokemon.japanese_name}</li>
    <li>{pokemon.classification}</li>
  </ul>
</header>

<section class="my-4">
  <h2>Abilities</h2>

  <ul class="abilities">
    {#each pokemon.abilities as ability}
      <li>{ability}</li>
    {/each}
  </ul>
</section>

<table class="w-full border-2 border-blue-800">
  <tbody>
    {#each Object.entries(attributesWithLabels) as [attribute, label]}
      <tr>
        <th class="text-left p-2">{label}</th>
        <td class="text-left p-2">{pokemon[attribute]}</td>
      </tr>
    {/each}
  </tbody>
</table>

<style lang="postcss">
  header ul {
    @apply text-gray-500;
  }

  header li {
    @apply inline-block;
  }

  header li:not(:last-of-type)::after {
    content: ' - ';
  }

  .abilities {
    @apply pl-4 list-disc;
  }
</style>
