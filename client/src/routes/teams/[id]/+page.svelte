<script>
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { deleteTeam, getTeam } from '$lib/api/teams';

  let team = $state(null);
  let loading = $state(false);
  let error = $state('');

  async function load() {
    loading = true;
    error = '';

    try {
      team = await getTeam(Number(page.params.id), true);
    } catch (e) {
      error = e.message;
    } finally {
      loading = false;
    }
  }

  async function removeTeam() {
    error = '';

    try {
      await deleteTeam(Number(page.params.id));
      goto('/teams');
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
{:else if team}
  <div class="space-y-6">
    <div class="box flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold">{team.name}</h1>
        <p class="mt-2 text-slate-600">{team.description || 'Pas de description'}</p>
      </div>

      <div class="flex gap-3">
        <a href={`/teams/${team.id}/edit`} class="btn2">Modifier</a>
        <button class="btn" onclick={removeTeam}>Supprimer</button>
      </div>
    </div>

    <div>
      <h2 class="mb-4 text-2xl font-bold">Pokémons</h2>

      {#if !team.pokemons || team.pokemons.length === 0}
        <p>Aucun pokémon dans cette team</p>
      {:else}
        <div class="grid3">
          {#each team.pokemons as pokemon}
            <a href={`/pokemons/${pokemon.id}`} class="box block">
              <p class="text-sm text-slate-500">#{pokemon.id}</p>
              <h3 class="text-xl font-bold">{pokemon.name}</h3>

              <div class="mt-3 grid grid-cols-2 gap-2 text-sm text-slate-600">
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
  </div>
{/if}