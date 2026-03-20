import { apiFetch } from './client';

export function getTeams(include = true) {
  const query = include ? '?include=pokemons' : '';
  return apiFetch(`/teams${query}`);
}

export function getTeam(id, include = true) {
  const query = include ? '?include=pokemons' : '';
  return apiFetch(`/teams/${id}${query}`);
}

export function createTeam(body) {
  return apiFetch('/teams', {
    method: 'POST',
    body: JSON.stringify(body)
  });
}

export function updateTeam(id, body) {
  return apiFetch(`/teams/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body)
  });
}

export function deleteTeam(id) {
  return apiFetch(`/teams/${id}`, {
    method: 'DELETE'
  });
}