<script>
  import { getTeams } from '$lib/api/teams';

  let list = $state([]);
  let loading = $state(false);
  let error = $state('');

  async function load() {
    loading = true;
    error = '';

    try {
      list = await getTeams(true);
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
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-bold">Teams</h1>
      <p class="text-slate-600">Tes équipes Pokémon</p>
    </div>

    <a href="/teams/new" class="btn">
      Nouvelle team
    </a>
  </div>

  {#if loading}
    <p>Chargement...</p>
  {:else if error}
    <p class="text-red-600">{error}</p>
  {:else if list.length === 0}
    <p>Aucune team</p>
  {:else}
    <div class="grid3">
      {#each list as team}
        <a href={`/teams/${team.id}`} class="box block">
          <h2 class="text-xl font-bold">{team.name}</h2>
          <p class="mt-2 text-slate-600">{team.description || 'Pas de description'}</p>

          {#if team.pokemons?.length}
            <p class="mt-4 text-sm text-slate-500">
              Pokémons : {team.pokemons.length}
            </p>
          {/if}
        </a>
      {/each}
    </div>
  {/if}
</div>