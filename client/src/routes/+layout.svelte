<script>
	import '../app.css';

	let { children } = $props();

	let isLogged = $state(false);

	if (typeof localStorage !== 'undefined') {
		isLogged = !!localStorage.getItem('token');
	}

	function logout() {
		localStorage.removeItem('token');
		location.reload();
	}
</script>

<div>
	<nav class="border-b border-slate-200 bg-white">
		<div class="page flex items-center justify-between">
			<a href="/" class="text-xl font-bold">Pokedex</a>

			<div class="flex gap-4 text-sm items-center">
				<a href="/pokemons">Pokemons</a>
				<a href="/pokemons/compare">Compare</a>
				<a href="/types">Types</a>
				<a href="/pokemons/podium">Podium</a>
				<a href="/teams">Teams</a>

				{#if isLogged}
					<button class="btn2" onclick={logout}>Logout</button>
				{:else}
					<a href="/auth/login" class="btn2">Login</a>
					<a href="/auth/register" class="btn">Register</a>
				{/if}
			</div>
		</div>
	</nav>

	<main class="page">
		{@render children()}
	</main>
</div>