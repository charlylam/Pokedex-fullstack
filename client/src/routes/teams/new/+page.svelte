<script>
  import { goto } from '$app/navigation';
  import { createTeam } from '$lib/api/teams';

  let name = $state('');
  let description = $state('');
  let error = $state('');

  async function submit() {
    error = '';

    try {
      const team = await createTeam({ name, description });
      goto(`/teams/${team.id}`);
    } catch (e) {
      error = e.message;
    }
  }
</script>

<div class="box max-w-xl mx-auto">
  <h1 class="mb-6 text-2xl font-bold">Créer une team</h1>

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
      Créer
    </button>

    {#if error}
      <p class="text-red-600">{error}</p>
    {/if}
  </div>
</div>