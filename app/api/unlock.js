import { passwordFor, checkPassword, createToken } from './_auth.js';

// Vérifie le mot de passe d'une page privée et renvoie un jeton d'accès signé.
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { page, password } = req.body || {};
  if (!passwordFor(page)) return res.status(503).json({ error: 'Mot de passe non configuré' });

  if (!checkPassword(page, password)) {
    // Ralentit les essais en série
    await new Promise(r => setTimeout(r, 800));
    return res.status(401).json({ error: 'Mot de passe incorrect' });
  }

  res.status(200).json({ token: createToken(page) });
}
