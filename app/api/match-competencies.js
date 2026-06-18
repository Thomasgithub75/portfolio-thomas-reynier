import Anthropic from '@anthropic-ai/sdk';

// Liste compacte pour le prompt — les preuves complètes restent côté frontend
const COMPETENCY_LIST = [
  { id: 'ux-research',              label: 'Recherche utilisateur',          keywords: 'recherche utilisateur, ux research, entretiens, interviews, discovery, investigation utilisateur' },
  { id: 'user-tests',               label: 'Tests utilisateurs',             keywords: 'tests utilisateurs, user testing, validation, tests modérés, usability' },
  { id: 'workshops',                label: "Facilitation d'ateliers",        keywords: 'atelier, workshop, facilitation, co-construction, design sprint, animation' },
  { id: 'benchmark',                label: 'Benchmark concurrentiel',        keywords: 'benchmark, veille concurrentielle, analyse concurrentielle, competitive analysis' },
  { id: 'ux-flows',                 label: 'Conception de parcours',         keywords: 'parcours utilisateur, user flow, user journey, ux design, refonte, expérience utilisateur' },
  { id: 'design-system',            label: 'Design System',                  keywords: 'design system, composants, atomic design, tokens, storybook, zeroheight, bibliothèque' },
  { id: 'dev-collaboration',        label: 'Collaboration développeurs',     keywords: 'collaboration dev, développeurs, handoff, specs, intégration, agile, sprint, livraison' },
  { id: 'ai-usage',                 label: "Utilisation de l'IA",           keywords: 'intelligence artificielle, ia, ai, figma make, claude, llm, génératif, automatisation' },
  { id: 'zero-to-one',              label: 'Conception 0 → 1',              keywords: 'from scratch, de zéro, nouveau produit, founding designer, lancement, startup, mvp' },
  { id: 'mobile-first',             label: 'Design mobile-first',           keywords: 'mobile, mobile-first, application mobile, app mobile, responsive, ios, android' },
  { id: 'prioritization',           label: 'Priorisation produit',           keywords: 'priorisation, priorité, roadmap, backlog, product owner, po, arbitrage produit, impact' },
  { id: 'documentation',            label: 'Documentation & specs',          keywords: 'documentation, specs, spécifications, rédaction, storybook, zeroheight, handoff, livrable' },
  { id: 'product-vision',           label: 'Vision & stratégie produit',    keywords: 'vision produit, stratégie produit, product strategy, product thinking, positionnement' },
  { id: 'ux-writing',               label: 'UX Writing',                     keywords: 'ux writing, microcopy, wording, contenu, content design, libellé, nomenclature' },
  { id: 'stakeholder-communication',label: 'Communication & présentation',   keywords: 'présentation, communication, parties prenantes, stakeholders, restitution, pitch, alignement' },
  { id: 'accessibility',            label: 'Accessibilité',                  keywords: 'accessibilité, wcag, a11y, contraste, lecteur écran, inclusive design, aria, rgaa' },
];

function checkOrigin(req) {
  const origin = req.headers.origin || req.headers.referer || '';
  if (!origin) return { allowed: false, origin: '' };
  if (origin.includes('localhost') || origin.includes('127.0.0.1')) return { allowed: true, origin };
  const host = req.headers.host || '';
  if (host && origin.includes(host)) return { allowed: true, origin };
  const allowed = (process.env.ALLOWED_ORIGINS || '').split(',').map(o => o.trim()).filter(Boolean);
  const matched = allowed.find(a => origin.startsWith(a));
  return { allowed: !!matched, origin: matched ? origin : '' };
}

export default async function handler(req, res) {
  const { allowed, origin } = checkOrigin(req);
  res.setHeader('Access-Control-Allow-Origin', origin || 'null');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Vary', 'Origin');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!allowed) return res.status(403).json({ error: 'Forbidden' });

  const { offre } = req.body;
  if (!offre || offre.trim().length < 50) {
    return res.status(400).json({ error: 'Offre trop courte' });
  }
  if (offre.length > 12000) {
    return res.status(400).json({ error: 'Offre trop longue' });
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const competencyListText = COMPETENCY_LIST
    .map(c => `- ${c.id} : ${c.label} (mots-clés : ${c.keywords})`)
    .join('\n');

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 400,
      messages: [{
        role: 'user',
        content: `Tu es un assistant qui analyse des offres d'emploi Product Designer.

Voici les compétences disponibles (avec leurs IDs) :
${competencyListText}

Voici l'offre d'emploi à analyser :
---
${offre}
---

Retourne UNIQUEMENT un objet JSON valide, sans markdown, sans explication :
{
  "entreprise": "Nom exact de l'entreprise (null si non trouvé)",
  "poste": "Intitulé du poste (null si non trouvé)",
  "domaine": "domaine.com de l'entreprise si mentionné dans l'offre, sinon null",
  "matched": ["id1", "id2", ...]
}

Règles pour matched :
- Maximum 7 compétences
- Ordonnées par pertinence décroissante
- N'inclure que les IDs de la liste fournie
- Si une compétence n'est pas clairement demandée, ne pas l'inclure`,
      }],
    });

    const raw = message.content[0].text.trim();
    const json = JSON.parse(raw);
    if (!Array.isArray(json.matched)) throw new Error('Invalid response shape');
    return res.status(200).json(json);
  } catch (err) {
    const isProd = process.env.NODE_ENV === 'production';
    return res.status(500).json({ error: isProd ? 'Erreur serveur' : err.message });
  }
}
