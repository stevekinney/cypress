<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch, page }) => {
		const { params } = page;
		const { id } = params;

		if (!id) {
			return {
				redirect: '/pokemon-search/1',
				status: 302
			};
		}

		return {};
	};
</script>

<script lang="ts">
	const emptyData = { pokemon: [] };
	let controller: AbortController;

	const searchFor = async (name: string) => {
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

	let searchTerm = '';
	$: results = searchFor(searchTerm);
</script>

<div class="flex gap-8">
	<section class="w-1/3">
		<h1 class="text-xl">Pokemon Search</h1>
		<input class="w-full" type="search" placeholder="Search Pokémon…" bind:value={searchTerm} />
		<p><strong>Searching for…</strong> {searchTerm}</p>
		{#await results}
			<p>Loading…</p>
		{:then { pokemon }}
			<div class="my-4">
				{#each pokemon as p}
					<article>
						<a href="/pokemon-search/{p.id}" sveltekit:prefetch>{p.name}</a>
					</article>
				{/each}
			</div>
		{/await}
	</section>
	<section class="w-2/3">
		<slot />
	</section>
</div>
