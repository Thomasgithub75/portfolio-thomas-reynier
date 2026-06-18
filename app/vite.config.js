import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const MOCK_LETTER = `Votre offre pour ce poste de **Product Designer IA** retient mon attention : les enjeux que vous décrivez autour de la structuration de l'expérience produit et de l'intégration de l'IA dans le process design correspondent exactement à ce que je pratique depuis plus de deux ans.

Chez **Weborama**, j'ai piloté en autonomie le design de quatre applications SaaS B2B dans un contexte d'intelligence artificielle sémantique. J'ai construit le Design System de zéro, de la définition des tokens à la documentation Zeroheight et l'intégration Storybook, tout en menant en parallèle la recherche utilisateur : benchmark concurrentiel, entretiens avec les POs et les équipes métier, tests modérés. C'est cette double capacité, structurer le socle et comprendre les usages, qui m'a permis d'être Founding Designer IA sur un nouveau produit SaaS, de la phase discovery jusqu'au livrable développé.

[KPI_START]**Exigence** : Designer capable de structurer un Design System et de piloter la recherche · **Ma réponse** : Design System déployé sur 4 applications (−80% de composants via Atomic Design) · UX Research complète sur chaque projet (entretiens, tests, heatmaps)[KPI_END]

Avant Weborama, chez **Pepyte** pendant deux ans, j'ai conçu le Design System d'une HR Tech SaaS de A à Z, animé des ateliers de co-construction avec les équipes produit et commerciales, conduit 12 entretiens recruteurs pour auditer la fonctionnalité de matching, et livré des prototypes testables directement utilisés en tests modérés.

L'IA n'est pas une appétence dans ma pratique : c'est une méthode installée. J'utilise **Figma Make**, **Claude Code** et des MCP servers pour accélérer chaque phase du process design, de la génération de variants à la livraison de code. Mon portfolio React a été entièrement piloté via Claude Code, sans écrire une ligne de code manuellement.

Dans l'attente d'un échange pour vous présenter mes études de cas en détail.`;

function mockApiPlugin() {
  return {
    name: 'mock-api',
    configureServer(server) {
      server.middlewares.use('/api/match-competencies', (req, res) => {
        if (req.method === 'OPTIONS') { res.writeHead(200); res.end(); return; }
        if (req.method !== 'POST') { res.writeHead(405); res.end(); return; }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          entreprise: 'Acme Studio',
          poste: 'Product Designer Senior',
          domaine: 'acme.com',
          matched: ['ux-research', 'design-system', 'ai-usage', 'ux-flows', 'dev-collaboration', 'zero-to-one'],
        }));
      });

      server.middlewares.use('/api/generate-letter', (req, res) => {
        if (req.method === 'OPTIONS') {
          res.writeHead(200); res.end(); return;
        }
        if (req.method !== 'POST') {
          res.writeHead(405); res.end(); return;
        }
        res.writeHead(200, {
          'Content-Type': 'text/event-stream; charset=utf-8',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        });

        const words = MOCK_LETTER.split('');
        let i = 0;
        const interval = setInterval(() => {
          if (i >= words.length) {
            res.write('data: [DONE]\n\n');
            clearInterval(interval);
            res.end();
            return;
          }
          const chunk = words.slice(i, i + 6).join('');
          res.write(`data: ${JSON.stringify({ text: chunk })}\n\n`);
          i += 6;
        }, 18);

        req.on('close', () => clearInterval(interval));
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), mockApiPlugin()],
})
