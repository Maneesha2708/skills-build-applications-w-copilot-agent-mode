export function buildApiUrl(resource) {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api';

  return `${baseUrl}/${resource.replace(/^\/+/, '')}/`;
}

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  const candidates = ['data', 'results', 'items', 'docs', 'records'];

  for (const candidate of candidates) {
    if (Array.isArray(payload[candidate])) {
      return payload[candidate];
    }
  }

  if (Array.isArray(payload.items)) {
    return payload.items;
  }

  return [];
}
