import Anthropic from '@anthropic-ai/sdk';

const THOMAS_PROFILE = `
Thomas Reynier — Product Designer IA — Paris
Email: reynier.design@gmail.com | Tél: 06 26 53 21 29
LinkedIn: linkedin.com/in/thomas-reynier-product-design
Disponibilité: À l'écoute — Freelance & CDI

EXPÉRIENCES PROFESSIONNELLES:

Weborama — Product Designer IA (Janvier 2025 – présent, 16 mois)
Secteur: Adtech SaaS · Intelligence Artificielle Sémantique
- Founding Designer sur un nouveau produit SaaS B2B IA (conçu de 0)
- Design System déployé sur 4 applications SaaS (réduction de 80% du nombre de composants via Atomic Design)
- UX Research complète: benchmark, entretiens POs et équipes métier, tests utilisateurs, heatmaps
- Documentation sur Zeroheight + intégration Storybook
- Stack: Figma, Figma Make, Zeroheight, Storybook, Claude MCP, Notion

Pepyte — Product Designer (Décembre 2022 – Janvier 2025, 2 ans)
Secteur: HR Tech SaaS · Recrutement en startups et entreprises tech
- Création du Design System complet (Atomic Design)
- Conception de la fonctionnalité de matching: 62 champs audités, 12 entretiens recruteurs menés
- Ateliers de co-construction avec équipes produit et commerciales
- Tests utilisateurs modérés, synthèse JTBD, prototypes testables Figma
- Stack: Figma, Supernova, Jira

Nectar — Founding Product Designer IA (Avril 2026 – présent, projet personnel)
Secteur: SaaS B2B · Outil mobile-first d'insights terrain
- Process design complet de A à Z piloté par IA: JTBD, Figma Make, Atomic Design, Claude Code
- MVP complet Discovery → Développement en un mois
- Stack: Figma Make, Claude Code, Supabase, Vercel, Next.js

Portfolio thomas-reynier.fr (Mai–Juin 2026, projet personnel)
- Portfolio React complet livré en 10 jours sans écrire de code, piloté entièrement via Claude Code
- Design System token-based, 155 itérations, déploiement continu Vercel

FORMATION:
- Formation Product Design IA (UX Design, UI Design, HTML/CSS, Web Design) — Marcorel, 2022
- Licence Marketing — ISIFA, 2013

COMPÉTENCES CLÉS:
Design System, Atomic Design, UX Research, JTBD, Figma, Figma Make, Claude Code, Claude MCP,
Supabase, Vercel, React (pilotage via IA), Zeroheight, Storybook, Notion MCP

STYLE D'ÉCRITURE DES LETTRES:
- Ton professionnel, direct, sobre — jamais de superlatifs creux
- Accroche sur ce qui retient l'attention dans l'OFFRE précisément (citer un extrait réel)
- Paragraphe expérience: lier concrètement Weborama et/ou Pepyte à la mission
- Un bloc KPI: extraire une exigence de l'offre et y répondre avec un résultat chiffré
- Paragraphe IA: montrer que c'est une méthode installée, pas une appétence
- Conclusion courte et ouverte
- Jamais de "je suis passionné", "je suis motivé", "n'hésitez pas"
`.trim();

const TON_INSTRUCTIONS = {
  equilibre: 'Ton équilibré, professionnel et direct. Phrases courtes. Pas de fioritures.',
  formel: 'Ton formel et structuré. Vocabulaire soutenu mais jamais pompeux.',
  concis: 'Version très concise: 3 paragraphes maximum + 1 bloc KPI. Aller à l\'essentiel.',
  enthousiaste: 'Ton direct et engagé. Montrer une vraie compréhension du produit ou de la mission.',
};

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { offre, ton = 'equilibre' } = req.body;

  if (!offre || offre.trim().length < 50) {
    return res.status(400).json({ error: 'Offre trop courte' });
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');

  try {
    const stream = client.messages.stream({
      model: 'claude-sonnet-4-6',
      max_tokens: 1200,
      messages: [{
        role: 'user',
        content: `Tu es Thomas Reynier. Rédige une lettre de motivation personnalisée pour cette offre d'emploi.

PROFIL DE THOMAS:
${THOMAS_PROFILE}

INSTRUCTION DE TON: ${TON_INSTRUCTIONS[ton] || TON_INSTRUCTIONS.equilibre}

OFFRE D'EMPLOI:
${offre}

RÈGLES STRICTES:
- Commence directement par "Ce qui retient mon attention..." ou une accroche directe sur l'offre (jamais par "Je vous écris" ou "Suite à votre offre")
- NE PAS inclure le header (nom, date, destinataire) — c'est géré par l'interface
- NE PAS inclure "Madame, Monsieur," — commence directement le premier paragraphe
- NE PAS inclure la signature finale — c'est géré par l'interface
- Inclure exactement 1 bloc KPI entre les marqueurs [KPI_START] et [KPI_END], contenant une exigence de l'offre et la réponse avec résultat chiffré
- 4 à 5 paragraphes maximum (ou 3 si ton = concis)
- Chaque paragraphe séparé par une ligne vide
- Mettre en **gras** les éléments clés (entreprises, chiffres, compétences)
- La dernière phrase doit être une conclusion ouverte courte`
      }]
    });

    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
        res.write(`data: ${JSON.stringify({ text: chunk.delta.text })}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err) {
    res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
    res.end();
  }
}
