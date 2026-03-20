<script>
  import { register } from '$lib/api/auth';
  import { goto } from '$app/navigation';

  let username = $state('');
  let email = $state('');
  let password = $state('');
  let error = $state('');

  async function submit() {
    error = '';

    try {
      await register({ username, email, password });
      goto('/auth/login');
    } catch (e) {
      error = e.message;
    }
  }
</script>

<div class="box max-w-md mx-auto">
  <h1 class="text-2xl font-bold mb-6">Inscription</h1>

  <div class="space-y-4">
    <input class="input" placeholder="Username" bind:value={username} />
    <input class="input" placeholder="Email" bind:value={email} />
    <input class="input" type="password" placeholder="Password" bind:value={password} />

    <button class="btn w-full" onclick={submit}>
      Créer un compte
    </button>

    {#if error}
      <p class="text-red-600">{error}</p>
    {/if}
  </div>
</div>