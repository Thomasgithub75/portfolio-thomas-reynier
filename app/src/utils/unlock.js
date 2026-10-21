// Accès aux pages privées : le mot de passe est vérifié par /api/unlock (côté serveur),
// qui renvoie un jeton gardé dans le navigateur.

const key = page => `auth_${page}`;

export function getToken(page) {
  try { return localStorage.getItem(key(page)) || ''; } catch { return ''; }
}

export function forgetToken(page) {
  try { localStorage.removeItem(key(page)); } catch { /* stockage indisponible */ }
}

// Renvoie true si le mot de passe est bon, false sinon.
export async function unlock(page, password) {
  const res = await fetch('/api/unlock', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ page, password }),
  });
  if (!res.ok) return false;
  const { token } = await res.json();
  try { localStorage.setItem(key(page), token); } catch { /* stockage indisponible */ }
  return true;
}
