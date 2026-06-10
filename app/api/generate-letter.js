import Anthropic from '@anthropic-ai/sdk';

const THOMAS_PROFILE = `
Thomas Reynier — Product Designer IA — Paris
Email: reynier.design@gmail.com | Tél: 06 26 53 21 29
LinkedIn: linkedin.com/in/thomas-reynier-product-design
Disponibilité: À l'écoute — Freelance & CDI

EXPÉRIENCES PROFESSIONNELLES:

Weborama — Product Designer IA (Janvier 2025 – présent, 13 mois)
Secteur: Adtech SaaS · Intelligence Artificielle Sémantique
- Piloté en autonomie le design sur 4 applications B2B
- Founding Designer IA sur un nouveau produit SaaS B2B (conçu de zéro)
- Design System déployé sur 4 applications SaaS (réduction de 80% du nombre de composants via Atomic Design)
- UX Research complète: benchmark, entretiens POs et équipes métier, tests utilisateurs, heatmaps
- Documentation sur Zeroheight + intégration Storybook
- Stack: Figma, Figma Make, Zeroheight, Storybook, Claude MCP, Notion

Pepyte — Product Designer (Décembre 2022 – Janvier 2025, 2 ans)
Secteur: HR Tech SaaS · Recrutement en startups et entreprises tech
- Design System complet livré (Atomic Design)
- UX Research: entretiens, ateliers, benchmark
- Conception de la fonctionnalité de matching: 62 champs audités, 12 entretiens recruteurs menés
- Ateliers de co-construction avec équipes produit et commerciales
- Tests utilisateurs modérés, synthèse JTBD, prototypes testables Figma
- Stack: Figma, Supernova, Jira

Nectar — Founding Product Designer IA (Avril 2026, projet personnel)
Secteur: SaaS B2B · Outil mobile-first d'insights terrain
- Process design complet Discovery vers Développement MVP, IA intégrée à chaque étape
- Stack: Figma Make, Claude Code, Supabase, Vercel, Next.js

Portfolio thomas-reynier.fr (Mai–Juin 2026, projet personnel)
- Portfolio React complet livré en 10 jours sans écrire de code, piloté entièrement via Claude Code
- Design System token-based, déploiement continu Vercel

FORMATION:
- Formation Product Design IA (UX Design, UI Design, HTML/CSS, Web Design) — Marcorel, 2022
- Licence Marketing — ISIFA, 2013

COMPÉTENCES:
UX Research · Entretiens utilisateurs · Tests utilisateurs · Animation d'ateliers · User Flows
Prototypage haute fidélité · Design System · Atomic Design · Figma · Figma Make · Zeroheight
Storybook · IA générative · Claude Code · Claude MCP · Supabase · Vercel
`.trim();

const TON_INSTRUCTIONS = {
  equilibre: 'Ton équilibré, professionnel et direct. Phrases courtes. Pas de fioritures.',
  formel: 'Ton formel et structuré. Vocabulaire soutenu mais jamais pompeux.',
  concis: 'Version très concise: 3 paragraphes maximum + 1 bloc KPI. Aller à l\'essentiel.',
  engage: 'Ton direct et engagé. Montrer une vraie compréhension du produit ou de la mission.',
};

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const SECRET = process.env.LETTER_SECRET;
  if (SECRET && req.headers['x-letter-secret'] !== SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { offre, ton = 'equilibre', entreprise = '', poste = '', contexte = '' } = req.body;

  if (!offre || offre.trim().length < 50) {
    return res.status(400).json({ error: 'Offre trop courte' });
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');

  const contexteBlock = contexte.trim()
    ? `\nCONTEXTE COMPLÉMENTAIRE (info trouvée sur l'entreprise à intégrer):\n${contexte.trim()}\n`
    : '';

  const cibleBlock = (entreprise || poste)
    ? `\nCIBLE: ${[entreprise, poste].filter(Boolean).join(' — ')}\n`
    : '';

  try {
    const stream = client.messages.stream({
      model: 'claude-sonnet-4-6',
      max_tokens: 1400,
      messages: [{
        role: 'user',
        content: `Tu es Thomas Reynier. Rédige une lettre de motivation personnalisée pour cette offre d'emploi.

PROFIL DE THOMAS:
${THOMAS_PROFILE}
${cibleBlock}${contexteBlock}
INSTRUCTION DE TON: ${TON_INSTRUCTIONS[ton] || TON_INSTRUCTIONS.equilibre}

OFFRE D'EMPLOI:
${offre}

MÉTHODE D'ANALYSE:
1. Identifier chaque compétence, mission et qualité recherchée dans l'offre
2. Pour chacune, trouver l'expérience concrète de Thomas qui y répond directement
3. Structurer l'argumentation pour que le recruteur voie clairement: ce qu'il cherche → ce que Thomas a fait → la valeur apportée
4. Mobiliser l'ethos (crédibilité par les résultats), le logos (adéquation rationnelle), le pathos (connexion aux enjeux de l'entreprise)

STRUCTURE OBLIGATOIRE:
1. Accroche sur l'entreprise ou l'offre précisément (ce qui retient l'attention, jamais générique)
2. Expérience SaaS concrète (Weborama et/ou Pepyte liés à la mission)
3. Bloc KPI — entre les marqueurs [KPI_START] et [KPI_END]
4. UX Research (si pertinent pour l'offre)
5. IA comme méthode installée (pas une appétence)
6. Conclusion courte et ouverte

RÈGLES STRICTES:
- Commence directement par l'accroche — jamais par "Je vous écris" ou "Suite à votre offre" ou "Madame, Monsieur"
- NE PAS inclure le header (nom, date, destinataire) — géré par l'interface
- NE PAS inclure la signature — gérée par l'interface
- Pas de tirets "—" dans le corps du texte: utiliser des virgules ou des deux-points
- Aucune affirmation générale: toujours appuyer sur une expérience concrète
- Jamais: "je suis passionné", "je suis motivé", "n'hésitez pas", superlatifs creux
- 5 à 6 paragraphes, doit tenir sur un A4
- Mettre en **gras** les éléments clés (entreprises, chiffres, compétences)
- Le bloc KPI contient: une exigence extraite de l'offre + la réponse de Thomas avec résultat chiffré
- Dernier paragraphe: conclusion ouverte courte (1-2 phrases max)`
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
