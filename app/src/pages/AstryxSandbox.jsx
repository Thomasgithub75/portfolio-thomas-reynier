import { useState } from 'react';
import { Theme } from '@astryxdesign/core/theme';
import { Button } from '@astryxdesign/core/Button';
import { Badge } from '@astryxdesign/core/Badge';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { Text } from '@astryxdesign/core/Text';
import { TextInput } from '@astryxdesign/core/TextInput';
import { SegmentedControl, SegmentedControlItem } from '@astryxdesign/core/SegmentedControl';
import { Switch } from '@astryxdesign/core/Switch';
import { CheckboxInput } from '@astryxdesign/core/CheckboxInput';
import { TabList, Tab } from '@astryxdesign/core/TabList';
import { Avatar } from '@astryxdesign/core/Avatar';
import { Divider } from '@astryxdesign/core/Divider';
import { VStack, HStack } from '@astryxdesign/core/Layout';
import { portfolioTheme, brand } from '../theme/astryxTheme';
// Order matters: reset → component styles (theme tokens are injected by <Theme>)
import '@astryxdesign/core/reset.css';
import '@astryxdesign/core/astryx.css';

const SWATCHES = [
  ['Body', 'var(--color-background-body)'],
  ['Surface', 'var(--color-background-surface)'],
  ['Muted', 'var(--color-background-muted)'],
  ['Accent', 'var(--color-accent)'],
  ['Highlight', brand.orange],
  ['Texte', 'var(--color-text-primary)'],
  ['Texte secondaire', 'var(--color-text-secondary)'],
  ['Bordure', 'var(--color-border)'],
];

const RADII = [
  ['Inner · 4', 'var(--radius-inner)'],
  ['Element · 8', 'var(--radius-element)'],
  ['Container · 16', 'var(--radius-container)'],
  ['Page · 28', 'var(--radius-page)'],
  ['Full', 'var(--radius-full)'],
];

function Swatch({ label, color }) {
  return (
    <VStack gap={1}>
      <div
        style={{
          width: 96,
          height: 64,
          background: color,
          borderRadius: 'var(--radius-element)',
          border: '1px solid var(--color-border)',
        }}
      />
      <Text type="supporting">{label}</Text>
    </VStack>
  );
}

function RadiusSample({ label, radius }) {
  return (
    <VStack gap={1}>
      <div
        style={{
          width: 96,
          height: 64,
          background: 'var(--color-background-surface)',
          border: '1px solid var(--color-border-emphasized)',
          borderRadius: radius,
        }}
      />
      <Text type="supporting">{label}</Text>
    </VStack>
  );
}

// Isolated playground for the Astryx design system — local only, not linked from the site.
// Astryx styles are loaded only when this page is opened, so MUI pages stay untouched.
export default function AstryxSandbox() {
  const [mode, setMode] = useState('light');
  const [email, setEmail] = useState('');
  const [tab, setTab] = useState('projets');
  const [notify, setNotify] = useState(true);
  const [accepted, setAccepted] = useState(true);

  return (
    <Theme theme={portfolioTheme} mode={mode}>
      <main
        style={{
          minHeight: '100vh',
          padding: 48,
          background: 'var(--color-background-body)',
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-family-body)',
        }}
      >
        <VStack gap={8}>
          <HStack gap={4} hAlign="between" vAlign="center" wrap="wrap">
            <VStack gap={1}>
              <Heading level={1} type="display-3">Astryx — bac à sable</Heading>
              <Text color="secondary">
                Thème « portfolio » : couleurs et arrondis inspirés de Stark Future.
              </Text>
            </VStack>
            <SegmentedControl label="Mode" value={mode} onChange={setMode}>
              <SegmentedControlItem value="light" label="Clair" />
              <SegmentedControlItem value="dark" label="Sombre" />
            </SegmentedControl>
          </HStack>

          <VStack gap={3}>
            <Heading level={2}>Couleurs</Heading>
            <HStack gap={4} wrap="wrap">
              {SWATCHES.map(([label, color]) => <Swatch key={label} label={label} color={color} />)}
            </HStack>
          </VStack>

          <VStack gap={3}>
            <Heading level={2}>Arrondis</Heading>
            <HStack gap={4} wrap="wrap">
              {RADII.map(([label, radius]) => <RadiusSample key={label} label={label} radius={radius} />)}
            </HStack>
          </VStack>

          <VStack gap={3}>
            <Heading level={2}>Boutons</Heading>
            <HStack gap={2} wrap="wrap">
              <Button label="Voir mes projets" variant="primary" size="lg" />
              <Button label="LinkedIn" variant="secondary" size="lg" />
              <Button label="En savoir plus" variant="ghost" size="lg" />
              <Button label="Supprimer" variant="destructive" size="lg" />
            </HStack>
            <HStack gap={2} wrap="wrap" vAlign="center">
              <Button label="Petit" variant="primary" size="sm" />
              <Button label="Moyen" variant="primary" size="md" />
              <Button label="Grand" variant="primary" size="lg" />
              <Button label="Désactivé" variant="primary" isDisabled />
              <Button label="Désactivé" variant="secondary" isDisabled />
            </HStack>
          </VStack>

          <VStack gap={3}>
            <Heading level={2}>Badges</Heading>
            <HStack gap={2} wrap="wrap">
              <Badge label="Design System" />
              <Badge label="UX Research" variant="orange" />
              <Badge label="À l'écoute" variant="success" />
              <Badge label="IA" variant="info" />
            </HStack>
          </VStack>

          <VStack gap={3}>
            <Heading level={2}>Onglets</Heading>
            <TabList value={tab} onChange={setTab} hasDivider>
              <Tab value="accueil" label="Accueil" />
              <Tab value="expertises" label="Expertises" />
              <Tab value="projets" label="Projets" />
            </TabList>
          </VStack>

          <VStack gap={3}>
            <Heading level={2}>Sélection</Heading>
            <HStack gap={6} wrap="wrap" vAlign="center">
              <Switch label="Notifications" value={notify} onChange={setNotify} />
              <Switch label="Mode discret" value={!notify} onChange={(v) => setNotify(!v)} />
              <CheckboxInput label="J'accepte" value={accepted} onChange={setAccepted} />
              <CheckboxInput label="Newsletter" value={!accepted} onChange={(v) => setAccepted(!v)} />
            </HStack>
          </VStack>

          <VStack gap={3}>
            <Heading level={2}>Avatars</Heading>
            <HStack gap={3} vAlign="center">
              <Avatar name="Thomas Reynier" size="sm" />
              <Avatar name="Thomas Reynier" size="md" />
              <Avatar name="Thomas Reynier" size="lg" />
            </HStack>
            <Divider />
          </VStack>

          <VStack gap={3}>
            <Heading level={2}>Carte projet</Heading>
            <Card maxWidth={420} padding={6}>
              <VStack gap={3}>
                <HStack><Badge label="Adtech SaaS" variant="orange" /></HStack>
                <Heading level={3}>Weborama</Heading>
                <Text color="secondary">
                  Design System déployé sur 4 applications et UX Research de bout en bout.
                </Text>
                <HStack gap={2}>
                  <Button label="Lire l'étude de cas" variant="primary" />
                </HStack>
              </VStack>
            </Card>
          </VStack>

          <VStack gap={3}>
            <Heading level={2}>Champ de saisie</Heading>
            <div style={{ maxWidth: 420 }}>
              <TextInput
                label="Email"
                type="email"
                placeholder="vous@entreprise.com"
                value={email}
                onChange={setEmail}
              />
            </div>
          </VStack>
        </VStack>
      </main>
    </Theme>
  );
}
