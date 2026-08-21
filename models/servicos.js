import { apiFetch } from '../services/api.js';

export async function getServicos() {
    return apiFetch('/smcmais/servicos');
}
