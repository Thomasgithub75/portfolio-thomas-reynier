import { createHmac, timingSafeEqual } from 'node:crypto';
import { Buffer } from 'node:buffer';
import process from 'node:process';

// Mots de passe des pages privées — uniquement côté serveur (variables Vercel, jamais VITE_).
// Chaque page a sa variable ; SITE_PASSWORD sert pour toutes celles qui n'en ont pas.
// Les VITE_* sont lus en secours pour ne rien casser si seuls les anciens noms sont réglés.
const PAGES = {
  letter: ['LETTER_PASSWORD', 'VITE_LETTER_PASSWORD'],
  ds:     ['DS_PASSWORD', 'VITE_DS_PASSWORD'],
  pepyte: ['PEPYTE_PASSWORD'],
};

const TOKEN_DAYS = 30;

export function passwordFor(page) {
  const names = PAGES[page];
  if (!names) return '';
  for (const name of [...names, 'SITE_PASSWORD']) {
    if (process.env[name]) return process.env[name];
  }
  return '';
}

function sameText(a, b) {
  const ba = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  return ba.length === bb.length && timingSafeEqual(ba, bb);
}

function sign(page, exp) {
  // Signé avec le mot de passe : le changer invalide tous les accès déjà donnés.
  return createHmac('sha256', passwordFor(page)).update(`${page}.${exp}`).digest('base64url');
}

export function checkPassword(page, password) {
  const expected = passwordFor(page);
  return !!expected && sameText(password || '', expected);
}

export function createToken(page) {
  const exp = Date.now() + TOKEN_DAYS * 24 * 60 * 60 * 1000;
  return `${exp}.${sign(page, exp)}`;
}

export function verifyToken(page, token) {
  if (!passwordFor(page) || typeof token !== 'string') return false;
  const [exp, sig] = token.split('.');
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  return sameText(sig, sign(page, exp));
}

export function bearer(req) {
  const header = req.headers.authorization || '';
  return header.startsWith('Bearer ') ? header.slice(7) : '';
}
