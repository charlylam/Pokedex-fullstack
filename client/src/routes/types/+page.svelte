<script>
	import { onMount } from 'svelte';
	let types = $state([]);
	onMount(async () => {
		try {
			const res = await fetch('http://localhost:8000/types');
			types = await res.json();
		} catch (err) {
			console.error('Erreur chargement types :', err);
		}
	});
</script>

<h1>Types Pokémon</h1>
<div class="types-grid">
	{#each types as type}
		<div class="type-card" style="background-color: {type.color}">{type.name}</div>
	{/each}
</div>

<style>
	h1 {
		text-align: center;
		font-family: 'Pokemon Solid', sans-serif;
		font-size: 2.5rem;
		margin: 2rem 0;
		color: #333;
		text-shadow: 1px 1px 2px #fff;
	}
	.types-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		gap: 1rem;
		padding: 0 2rem;
		margin-bottom: 2rem;
	}
	.type-card {
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: bold;
		color: white;
		padding: 1.5rem 0;
		border-radius: 12px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		text-transform: capitalize;
		cursor: pointer;
		transition:
			transform 0.2s,
			box-shadow 0.2s;
		font-family: 'Arial', sans-serif;
		font-size: 1.1rem;
	}
	.type-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
	}
</style>
