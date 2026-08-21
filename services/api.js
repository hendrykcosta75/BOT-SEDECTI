import { API_BASE_URL, apiHeaders } from '../config.js';

/**
 * Wrapper de fetch para a API do smcmais.
 * Injeta automaticamente Content-Type e X-Api-Key (via SMCMAIS_API_KEY).
 */
export async function apiFetch(path, { method = 'GET', body } = {}) {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        method,
        headers: apiHeaders(),
        ...(body !== undefined ? { body: JSON.stringify(body) } : {})
    });

    if (!response.ok) {
        throw new Error(`API ${method} ${path} respondeu ${response.status}`);
    }

    return response.json();
}
