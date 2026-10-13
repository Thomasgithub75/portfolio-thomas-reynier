import { Theme } from '@astryxdesign/core/theme';
import { Button } from '@astryxdesign/core/Button';
import { VStack, HStack } from '@astryxdesign/core/Layout';
import { neutralTheme } from '@astryxdesign/theme-neutral/built';
// Order matters: reset → component styles → theme tokens
import '@astryxdesign/core/reset.css';
import '@astryxdesign/core/astryx.css';
import '@astryxdesign/theme-neutral/theme.css';

// Isolated playground for the Astryx design system — local only, not linked from the site.
// Astryx styles are loaded only when this page is opened, so MUI pages stay untouched.
export default function AstryxSandbox() {
  return (
    <Theme theme={neutralTheme}>
      <main style={{ padding: 48 }}>
        <VStack gap={4}>
          <h1>Astryx — bac à sable</h1>
          <p>Page de test locale pour valider le Design System Astryx avant de basculer.</p>
          <HStack gap={2}>
            <Button label="Bouton principal" variant="primary" />
            <Button label="Bouton secondaire" variant="secondary" />
          </HStack>
        </VStack>
      </main>
    </Theme>
  );
}
