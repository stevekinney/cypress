<script lang="ts">
	import { page } from '$app/stores';
	import '../app.css';

	let applications = [
		{ name: 'Jetsetter', path: '/jetsetter', active: false },
		{ name: 'Echo Chamber', path: '/echo-chamber', active: false },
		{ name: 'Pokémon Search', path: '/pokemon-search', active: false },
		{ name: 'Dog Facts', path: '/dog-facts', active: false },
		{ name: 'Secret Menu', path: '/secret-menu', active: false }
	];

	$: {
		const { path } = $page;
		applications = applications.map((application) => ({
			...application,
			active: path.startsWith(application.path)
		}));
	}
</script>

<svelte:head>
	<title>Pokémon Search</title>
</svelte:head>

<div class="flex gap-4 min-h-screen">
	<nav id="table-of-contents">
		<h3>Applications</h3>
		<ul>
			{#each applications as application}
				<li>
					<a href={application.path} class:active={application.active}>{application.name}</a>
				</li>
			{/each}
		</ul>
	</nav>
	<main class="mx-auto p-4 w-full lg:w-2/3">
		<slot />
	</main>
</div>

<style lang="postcss">
	nav {
		@apply p-8 w-48 min-h-screen text-white bg-purple-900 border-r-4 border-purple-400;
	}

	h3 {
		@apply mb-4 text-lg border-b-4 border-purple-500;
	}

	.active {
		@apply font-bold;
	}
</style>
