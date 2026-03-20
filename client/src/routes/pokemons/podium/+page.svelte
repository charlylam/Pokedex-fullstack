<script>
  import { getPodium } from '$lib/api/pokemons';

  let list = $state([]);
  let loading = $state(false);
  let error = $state('');

  async function load() {
    loading = true;
    error = '';

    try {
      list = await getPodium();
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
  <div>
    <h1 class="text-3xl font-bold">Podium</h1>
    <p class="text-slate-600">Les pokémons les plus votés</p>
  </div>

  {#if loading}
    <p>Chargement...</p>
  {:else if error}
    <p class="text-red-600">{error}</p>
  {:else if list.length === 0}
    <p>Aucun vote pour le moment</p>
  {:else}
    <div class="space-y-4">
      {#each list as item, i}
        <div class="box flex items-center justify-between">
<div class="flex items-center gap-4">

  {#if i === 0}
    <div class="text-3xl">🥇</div>
  {:else if i === 1}
    <div class="text-3xl">🥈</div>
  {:else if i === 2}
    <div class="text-3xl">🥉</div>
  {:else}
    <div class="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700">
      {i + 1}
    </div>
  {/if}

  <div>
    <p class="text-sm text-slate-500">#{item.pokemon.id}</p>
    <h2 class="text-xl font-bold">{item.pokemon.name}</h2>
  </div>

</div>

          <div class="text-right">
            <p class="text-sm text-slate-500">Votes</p>
            <p class="text-2xl font-bold text-indigo-600">{item.votes}</p>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>