<script>
	import { comparePokemons } from '$lib/api/pokemons';
	import { onMount } from 'svelte';
	import { apiFetch } from '$lib/api/client.js';

	let id1 = $state('');
	let id2 = $state('');
	let p1 = $state(null);
	let p2 = $state(null);
	let error = $state('');
	let loading = $state(false);
	let pokemons = $state([]);

	async function compare() {
		error = '';
		p1 = null;
		p2 = null;
		loading = true;

		try {
			const data = await comparePokemons(Number(id1), Number(id2));
			p1 = data.firstPokemon;
			p2 = data.secondPokemon;
		} catch (e) {
			error = e.message;
		} finally {
			loading = false;
		}
	}

	onMount(async () => {
  try {
    const data = await apiFetch('/pokemons');
    pokemons = Array.isArray(data) ? data : (data.pokemons ?? []);
  } catch (e) {
    error = e.message;
  }
});
</script>

<div class="space-y-6">
	<div>
		<h1 class="text-3xl font-bold">Comparer deux pokémons</h1>
		<p class="text-slate-600">Choisis deux pokémons pour comparer leurs stats</p>
	</div>

	<div class="box flex flex-col gap-4 sm:flex-row">
<select class="input" bind:value={id1}>
        <option value="">Premier pokémon</option>
        {#each pokemons as p (p.id)}
                <option value={p.id}>#{p.id} {p.name}</option>
        {/each}
</select>
<select class="input" bind:value={id2}>
        <option value="">Second pokémon</option>
        {#each pokemons as p (p.id)}
                <option value={p.id}>#{p.id} {p.name}</option>
        {/each}
</select>
<button class="btn" onclick={compare} disabled={!id1 || !id2 || loading}>Comparer</button>
	</div>

	{#if loading}
		<p>Chargement...</p>
	{/if}

	{#if error}
		<p class="text-red-600">{error}</p>
	{/if}

	{#if p1 && p2}
		<div class="grid gap-6 lg:grid-cols-2">
			<!-- Carte du premier Pokémon -->
			<div class="box flex flex-col items-center text-center">
				<p class="text-sm text-slate-500">#{p1.id}</p>
				<h2 class="mb-4 text-3xl font-bold">{p1.name}</h2>
				<img src={p1.image} alt={p1.name} class="w-32 h-32 object-contain mb-4" />

				<div class="mb-4 flex flex-wrap justify-center gap-2">
					{#each p1.types ?? [] as type}
						<span
							class="rounded-full px-3 py-1 text-sm text-white"
							style={`background:${type.color}`}
						>
							{type.name}
						</span>
					{/each}
				</div>

				<div class="space-y-2 w-full">
					<div class={`stat ${Number(p1.hp) > Number(p2.hp) ? 'win' : Number(p1.hp) === Number(p2.hp) ? 'same' : ''}`}>HP : {p1.hp}</div>
					<div class={`stat ${Number(p1.atk) > Number(p2.atk) ? 'win' : Number(p1.atk) === Number(p2.atk) ? 'same' : ''}`}>ATK : {p1.atk}</div>
					<div class={`stat ${Number(p1.def) > Number(p2.def) ? 'win' : Number(p1.def) === Number(p2.def) ? 'same' : ''}`}>DEF : {p1.def}</div>
					<div class={`stat ${Number(p1.atk_spe) > Number(p2.atk_spe) ? 'win' : Number(p1.atk_spe) === Number(p2.atk_spe) ? 'same' : ''}`}>ATK SPE : {p1.atk_spe}</div>
					<div class={`stat ${Number(p1.def_spe) > Number(p2.def_spe) ? 'win' : Number(p1.def_spe) === Number(p2.def_spe) ? 'same' : ''}`}>DEF SPE : {p1.def_spe}</div>
					<div class={`stat ${Number(p1.speed) > Number(p2.speed) ? 'win' : Number(p1.speed) === Number(p2.speed) ? 'same' : ''}`}>SPEED : {p1.speed}</div>
				</div>
			</div>

			<!-- Carte du second Pokémon -->
			<div class="box flex flex-col items-center text-center">
				<p class="text-sm text-slate-500">#{p2.id}</p>
				<h2 class="mb-4 text-3xl font-bold">{p2.name}</h2>
				<img src={p2.image} alt={p2.name} class="w-32 h-32 object-contain mb-4" />

				<div class="mb-4 flex flex-wrap justify-center gap-2">
					{#each p2.types ?? [] as type}
						<span
							class="rounded-full px-3 py-1 text-sm text-white"
							style={`background:${type.color}`}
						>
							{type.name}
						</span>
					{/each}
				</div>

				<div class="space-y-2 w-full">
					<div class={`stat ${Number(p2.hp) > Number(p1.hp) ? 'win' : Number(p2.hp) === Number(p1.hp) ? 'same' : ''}`}>HP : {p2.hp}</div>
					<div class={`stat ${Number(p2.atk) > Number(p1.atk) ? 'win' : Number(p2.atk) === Number(p1.atk) ? 'same' : ''}`}>ATK : {p2.atk}</div>
					<div class={`stat ${Number(p2.def) > Number(p1.def) ? 'win' : Number(p2.def) === Number(p1.def) ? 'same' : ''}`}>DEF : {p2.def}</div>
					<div class={`stat ${Number(p2.atk_spe) > Number(p1.atk_spe) ? 'win' : Number(p2.atk_spe) === Number(p1.atk_spe) ? 'same' : ''}`}>ATK SPE : {p2.atk_spe}</div>
					<div class={`stat ${Number(p2.def_spe) > Number(p1.def_spe) ? 'win' : Number(p2.def_spe) === Number(p1.def_spe) ? 'same' : ''}`}>DEF SPE : {p2.def_spe}</div>
					<div class={`stat ${Number(p2.speed) > Number(p1.speed) ? 'win' : Number(p2.speed) === Number(p1.speed) ? 'same' : ''}`}>SPEED : {p2.speed}</div>
				</div>
			</div>
		</div>
	{/if}
</div>