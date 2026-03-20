<script>
  import { getPokemons } from '$lib/api/pokemons';

  let search = $state('');
  let list = $state([]);
  let loading = $state(false);
  let error = $state('');

  async function load() {
    loading = true;
    error = '';

    try {
      list = await getPokemons(search);
    } catch (e) {
      error = e.message;
    } finally {
      loading = false;
    }
  }

  $effect(() => {
    load();
  });
</script>

<div class="space-y-6">
  <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h1 class="text-3xl font-bold">Pokemons</h1>
      <p class="text-slate-600">Recherche par nom</p>
    </div>

    <input
      class="input sm:max-w-xs"
      bind:value={search}
      placeholder="Rechercher..."
    />
  </div>

  {#if loading}
    <p>Chargement...</p>
  {:else if error}
    <p class="text-red-600">{error}</p>
  {:else if list.length === 0}
    <p>Aucun pokemon</p>
  {:else}
    <div class="grid3">
      {#each list as pokemon}
        <a href={`/pokemons/${pokemon.id}`} class="box block">
          <p class="text-sm text-slate-500">#{pokemon.id}</p>
          <h2 class="text-xl font-bold">{pokemon.name}</h2>
          <img src={pokemon.image} alt={pokemon.name} />

          {#if pokemon.types?.length}
            <div class="mt-3 flex flex-wrap gap-2">
              {#each pokemon.types as type}
                <span
                  class="rounded-full px-3 py-1 text-sm text-white"
                  style={`background:${type.color}`}
                >
                  {type.name}
                </span>
              {/each}
            </div>
          {/if}

          <div class="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-600">
            <div>HP : {pokemon.hp}</div>
            <div>ATK : {pokemon.atk}</div>
            <div>DEF : {pokemon.def}</div>
            <div>SPD : {pokemon.speed}</div>
          </div>
        </a>
      {/each}
    </div>
  {/if}
</div>