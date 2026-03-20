<script>
  import { login } from '$lib/api/auth';
  import { setToken } from '$lib/store';
  import { goto } from '$app/navigation';

  let username = $state('');
  let password = $state('');
  let error = $state('');

  async function submit() {
    error = '';

    try {
      const data = await login({ username, password });
      setToken(data.token);
      goto('/pokemons');
    } catch (e) {
      error = e.message;
    }
  }
</script>

<div class="box max-w-md mx-auto">
  <h1 class="text-2xl font-bold mb-6">Connexion</h1>

  <div class="space-y-4">
    <input
      class="input"
      placeholder="Username"
      bind:value={username}
    />

    <input
      class="input"
      type="password"
      placeholder="Password"
      bind:value={password}
    />

    <button class="btn w-full" onclick={submit}>
      Se connecter
    </button>

    {#if error}
      <p class="text-red-600">{error}</p>
    {/if}
  </div>
</div>