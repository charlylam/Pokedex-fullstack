import { apiFetch } from './client';

export function login(body) {
  return apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify(body)
  });
}

export function register(body) {
  return apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify(body)
  });
}

export function getMe() {
  return apiFetch('/auth/me');
}