<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const ssr = false;

  export const load: Load = async ({ fetch }) => {
    const { data }: SecretMenuItemAPIResponse = await fetch('/secret-menu/api').then((response) =>
      response.json(),
    );

    return {
      props: { data },
    };
  };
</script>

<script lang="ts">
  export let data: SecretMenuItem[] = [];

  const restaurants = [
    'Chick-fil-A',
    'McDonalds',
    'In-N-Out',
    'KFC',
    'Jack In The Box',
    'Jamba Juice',
    'Starbucks',
    'Dairy Queen',
    'Burger King',
    'Chipotle',
    'Taco Bell',
    'Five Guys',
    'Sonic',
    'Subway',
    'Panera Bread',
  ] as const;

  const ratings = [1, 2, 3, 4, 5, 6, 7] as const;

  let restuarant: typeof restaurants[number] = null;
  let minimumRating: typeof ratings[number] = 1;

  let name = true;
  let whereToOrder = true;
  let description = true;
  let secret = true;
  let ingredients = true;
  let popularity = true;
  let price = true;
  let howToOrder = true;

  $: visible = data.filter((datum) => {
    if (restuarant && datum.whereToOrder !== restuarant) return false;
    if (datum.popularity < +minimumRating) return false;
    return true;
  });

  $: asCSV = encodeURI(
    'data:text/csv;charset=utf-8,' +
      visible.map((menuItem) => Object.values(menuItem).join(',')).join('\n'),
  );
</script>

<svelte:head>
  <title>Secret Menu Items</title>
</svelte:head>

<header class="my-4">
  <h1>
    Secret Menu Items (<a href={asCSV} download="secret-menu-items" data-test="download-link"
      >Download</a
    >)
  </h1>
</header>

<div class="flex gap-6 my-4">
  <section id="rating-visibility">
    <label for="minimum-rating-visibility" class="block">Minimum Rating: {minimumRating}</label>
    <input
      id="minimum-rating-visibility"
      type="range"
      min="1"
      max="7"
      bind:value={minimumRating}
      class="block"
    />
  </section>

  <section id="restaurant-visibility">
    <label for="restaurant-visibility-filter" class="block">Restaurant</label>
    <select id="restaurant-visibility-filter" bind:value={restuarant} class="block">
      <option value={null}>All</option>
      {#each restaurants as r}
        <option value={r}>{r}</option>
      {/each}
    </select>
  </section>

  <section id="column-visibility">
    <h2>Show Columns</h2>
    <div class="flex gap-2 flex-wrap">
      <label for="show-name"
        ><input
          id="show-name"
          bind:checked={name}
          type="checkbox"
          name="column-visibility"
        />Name</label
      >
      <label for="show-whereToOrder"
        ><input
          id="show-whereToOrder"
          bind:checked={whereToOrder}
          type="checkbox"
          name="column-visibility"
        />Where to Order</label
      >
      <label for="show-description"
        ><input
          id="show-description"
          bind:checked={description}
          type="checkbox"
          name="column-visibility"
        />Description</label
      >
      <label for="show-secret"
        ><input
          id="show-secret"
          bind:checked={secret}
          type="checkbox"
          name="column-visibility"
        />Secret</label
      >
      <label for="show-ingredients"
        ><input
          id="show-ingredients"
          bind:checked={ingredients}
          type="checkbox"
          name="column-visibility"
        />Ingredients</label
      >
      <label for="show-popularity"
        ><input
          id="show-popularity"
          bind:checked={popularity}
          type="checkbox"
          name="column-visibility"
        />Popularity</label
      >
      <label for="show-price"
        ><input
          id="show-price"
          bind:checked={price}
          type="checkbox"
          name="column-visibility"
        />Price</label
      >
      <label for="show-howToOrder"
        ><input
          id="show-howToOrder"
          bind:checked={howToOrder}
          type="checkbox"
          name="column-visibility"
        />How to Order</label
      >
    </div>
  </section>
</div>

<section>
  <table class="w-full">
    <thead>
      <tr>
        <th id="name-column" class:hidden={!name}>Name</th>
        <th id="whereToOrder-column" class:hidden={!whereToOrder}>Where to Order</th>
        <th id="description-column" class:hidden={!description}>Description</th>
        <th id="secret-column" class:hidden={!secret}>The Secret</th>
        <th id="ingredients-column" class:hidden={!ingredients}>Ingredients</th>
        <th id="popularity-column" class:hidden={!popularity}>Popularity</th>
        <th id="price-column" class:hidden={!price}>Price</th>
        <th id="howToOrder-column" class:hidden={!howToOrder}>How to Order</th>
      </tr>
    </thead>
    <tbody>
      {#each visible as datum}
        <tr>
          <td headers="name-column" class="name" class:hidden={!name}
            ><div class="cell"><a href={datum.sourceUrl}>{datum.name}</a></div></td
          >
          <td headers="whereToOrder-column" class="whereToOrder" class:hidden={!whereToOrder}
            ><div class="cell">{datum.whereToOrder}</div></td
          >
          <td headers="description-column" class="description" class:hidden={!description}
            ><div class="cell">{datum.description}</div></td
          >
          <td headers="secret-column" class="secret" class:hidden={!secret}
            ><div class="cell">{datum.secret}</div></td
          >
          <td headers="ingredients-column" class="ingredients" class:hidden={!ingredients}
            ><div class="cell">{datum.ingredients}</div></td
          >
          <td headers="popularity-column" class="popularity" class:hidden={!popularity}
            ><div class="cell">{datum.popularity}</div></td
          >
          <td headers="price-column" class="price" class:hidden={!price}
            ><div class="cell">{datum.price}</div></td
          >
          <td headers="howToOrder-column" class="howToOrder" class:hidden={!howToOrder}
            ><div class="cell">{datum.howToOrder}</div></td
          >
        </tr>
      {/each}
    </tbody>
  </table>
</section>

<footer class="my-6">
  (<a
    href="https://github.com/ali-ce/datasets/blob/master/Hack-the-menu-scrape/Secret%20Menu%20Items.csv"
    >Source</a
  >.)
</footer>

<style lang="postcss">
  th {
    @apply bg-purple-300;
  }

  th,
  td {
    @apply align-text-top p-2 max-w-sm border-2 border-purple-900;
  }

  .cell {
    @apply max-h-48 overflow-scroll;
  }

  td.description,
  td.howToOrder,
  td.secret {
    @apply text-sm;
  }

  .hidden {
    @apply hidden;
  }

  #column-visibility label {
    @apply block;
  }

  #column-visibility input[type='checkbox'] {
    @apply mr-2;
  }

  a {
    @apply text-pink-500 underline;
  }

  a:hover {
    @apply text-pink-600 no-underline;
  }

  a:hover {
    @apply text-pink-400;
  }
</style>
