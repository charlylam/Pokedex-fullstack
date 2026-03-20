<script>
  import { page } from '$app/state';
  import { getPokemon, votePokemon } from '$lib/api/pokemons';

  let pokemon = $state(null);
  let loading = $state(false);
  let error = $state('');
  let msg = $state('');

  async function load() {
    loading = true;
    error = '';

    try {
      pokemon = await getPokemon(Number(page.params.id));
    } catch (e) {
      error = e.message;
    } finally {
      loading = false;
    }
  }

  async function vote() {
    msg = '';
    error = '';

    try {
      await votePokemon(Number(page.params.id));
      msg = 'Vote enregistré';
      await load();
    } catch (e) {
      error = e.message;
    }
  }

  $effect(() => {
    load();
  });
</script>

{#if loading}
  <p>Chargement...</p>
{:else if error}
  <p class="text-red-600">{error}</p>
{:else if pokemon}
  <div class="grid gap-6 lg:grid-cols-2">
    <div class="box">
      <p class="text-sm text-slate-500">#{pokemon.id}</p>
      <h1 class="mb-4 text-4xl font-bold">{pokemon.name}</h1>

      <div class="mb-4 flex flex-wrap gap-2">
        {#each pokemon.types ?? [] as type}
          <span
            class="rounded-full px-3 py-1 text-sm text-white"
            style={`background:${type.color}`}
          >
            {type.name}
          </span>
        {/each}
      </div>

      <div class="space-y-2">
        <div class="box">HP : {pokemon.hp}</div>
        <div class="box">ATK : {pokemon.atk}</div>
        <div class="box">DEF : {pokemon.def}</div>
        <div class="box">ATK SPE : {pokemon.atk_spe}</div>
        <div class="box">DEF SPE : {pokemon.def_spe}</div>
        <div class="box">SPEED : {pokemon.speed}</div>
      </div>
    </div>

    <div class="box">
    <img src={pokemon.image} alt={pokemon.name} />
      <h2 class="mb-4 text-2xl font-bold">Popularité</h2>
      <p class="mb-4">Votes : {pokemon.votesCount ?? 0}</p>

      <button class="btn" onclick={vote}>
        Voter
      </button>

      {#if msg}
        <p class="mt-4 text-green-600">{msg}</p>
      {/if}

      {#if error}
        <p class="mt-4 text-red-600">{error}</p>
      {/if}

      <div class="mt-6">
        <a href="/pokemons/compare" class="text-indigo-600">
          Aller à la comparaison
        </a>
      </div>
    </div>
  </div>
{/if}