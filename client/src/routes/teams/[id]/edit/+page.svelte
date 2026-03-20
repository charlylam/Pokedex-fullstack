<script>
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { getTeam, updateTeam } from '$lib/api/teams';

  let name = $state('');
  let description = $state('');
  let error = $state('');

  async function load() {
    error = '';

    try {
      const team = await getTeam(Number(page.params.id), false);
      name = team.name;
      description = team.description || '';
    } catch (e) {
      error = e.message;
    }
  }

  async function submit() {
    error = '';

    try {
      await updateTeam(Number(page.params.id), { name, description });
      goto(`/teams/${page.params.id}`);
    } catch (e) {
      error = e.message;
    }
  }

  $effect(() => {
    load();
  });
</script>

<div class="box max-w-xl mx-auto">
  <h1 class="mb-6 text-2xl font-bold">Modifier la team</h1>

  <div class="space-y-4">
    <input
      class="input"
      placeholder="Nom"
      bind:value={name}
    />

    <textarea
      class="input min-h-32"
      placeholder="Description"
      bind:value={description}
    ></textarea>

    <button class="btn" onclick={submit}>
      Enregistrer
    </button>

    {#if error}
      <p class="text-red-600">{error}</p>
    {/if}
  </div>
</div>