<script>
	import '../app.css';

	let { children } = $props();

	let isLogged = $state(false);
	let menuOpen = $state(false);

	if (typeof localStorage !== 'undefined') {
		isLogged = !!localStorage.getItem('token');
	}

	function logout() {
		localStorage.removeItem('token');
		location.reload();
	}

	function closeMenu() {
		menuOpen = false;
	}
</script>

<div>
	<nav class="border-b border-slate-200 bg-white">
		<div class="page nav-wrapper">
			<a href="/" class="text-xl font-bold" onclick={closeMenu}>Pokedex</a>

			<button
				class="burger"
				type="button"
				aria-label="Ouvrir le menu"
				aria-expanded={menuOpen}
				onclick={() => (menuOpen = !menuOpen)}
			>
				☰
			</button>

			<div class:open={menuOpen} class="nav-links">
				<a href="/pokemons" onclick={closeMenu}>Pokemons</a>
				<a href="/pokemons/compare" onclick={closeMenu}>Comparer</a>
				<a href="/types" onclick={closeMenu}>Types</a>
				<a href="/pokemons/podium" onclick={closeMenu}>Podium</a>
				<a href="/teams" onclick={closeMenu}>Equipes</a>

				{#if isLogged}
					<button class="btn2" onclick={logout}>Logout</button>
				{:else}
					<a href="/auth/login" class="btn2" onclick={closeMenu}>Login</a>
					<a href="/auth/register" class="btn" onclick={closeMenu}>Register</a>
				{/if}
			</div>
		</div>
	</nav>

	<main class="page">
		{@render children()}
	</main>
</div>

<style>
	.nav-wrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
		padding: 1rem 0;
	}

	.burger {
		display: none;
		background: none;
		border: none;
		font-size: 1.8rem;
		cursor: pointer;
	}

	.nav-links {
		display: flex;
		gap: 1rem;
		align-items: center;
		font-size: 0.875rem;
	}

	@media (max-width: 768px) {
		.burger {
			display: block;
		}

		.nav-links {
			display: none;
			position: absolute;
			top: 100%;
			left: 0;
			right: 0;
			background: white;
			border-top: 1px solid #e2e8f0;
			padding: 1rem;
			flex-direction: column;
			align-items: flex-start;
			z-index: 20;
		}

		.nav-links.open {
			display: flex;
		}
	}
</style>