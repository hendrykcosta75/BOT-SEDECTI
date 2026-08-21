import { apiFetch } from '../services/api.js';

export async function returnCurso() {
    return apiFetch('/cursos/list', { method: 'POST', body: {} });
}
