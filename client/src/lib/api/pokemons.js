import { apiFetch } from './client';

export function getPokemons(name = '') {
  const query = name ? `?name=${encodeURIComponent(name)}` : '';
  return apiFetch(`/pokemons${query}`);
}

export function getPokemon(id) {
  return apiFetch(`/pokemons/${id}`);
}

export function votePokemon(id) {
  return apiFetch(`/pokemons/${id}/votes`, {
    method: 'POST'
  });
}

export function getPodium() {
  return apiFetch('/pokemons/podium');
}

export function comparePokemons(id1, id2) {
  return apiFetch(`/pokemons/compare/${id1}/${id2}`);
}