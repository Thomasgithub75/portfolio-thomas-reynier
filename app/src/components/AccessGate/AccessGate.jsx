import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Theme } from '@astryxdesign/core/theme';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { Text } from '@astryxdesign/core/Text';
import { TextInput } from '@astryxdesign/core/TextInput';
import { Button } from '@astryxdesign/core/Button';
import { Link } from '@astryxdesign/core/Link';
import { VStack, HStack } from '@astryxdesign/core/Layout';
import LockOutlined from '@mui/icons-material/LockOutlined';
import ArrowBack from '@mui/icons-material/ArrowBack';
import useColorMode from '../../hooks/useColorMode';
import { portfolioTheme } from '../../theme/astryxTheme';
import { CONTACT } from '../../data/home';
import '@astryxdesign/core/astryx.css';
import './AccessGate.css';

function RouterAnchor({ href, ...props }) {
  return <RouterLink to={href} {...props} />;
}

// Écran d'accès aux pages privées (étude de cas présentée en entretien, lettre, design system).
// check(code) → boolean | Promise<boolean> ; onUnlock() est appelé si le code est bon.
export default function AccessGate({ check, onUnlock, title, description, eyebrow, bgImage, placeholder = "Code d'accès", submitLabel = 'Accéder', errorMessage = 'Code incorrect.', showContact = false }) {
  const { mode } = useColorMode();
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (!code || busy) return;
    setBusy(true);
    const ok = await check(code);
    setBusy(false);
    if (ok) { onUnlock(); return; }
    setError(true);
  }

  return (
    <Theme theme={portfolioTheme} mode={mode}>
      <div className="ax-gate">
        {bgImage && <div className="ax-gate-bg" style={{ backgroundImage: `url(${bgImage})` }} />}
        <div className="ax-gate-back">
          <Link as={RouterAnchor} href="/" color="secondary" isStandalone>
            <HStack gap={1} vAlign="center"><ArrowBack sx={{ fontSize: 16 }} />Retour</HStack>
          </Link>
        </div>
        <div className={`ax-gate-card${error ? ' is-error' : ''}`}>
          <Card padding={8} elevation="high">
            <form onSubmit={e => { e.preventDefault(); submit(); }}>
              <VStack gap={5}>
                <VStack gap={3} hAlign="center">
                  <span className="ax-gate-icon"><LockOutlined /></span>
                  {eyebrow}
                  <Heading level={1} type="display-3" justify="center">{title}</Heading>
                  {description && <Text color="secondary" justify="center">{description}</Text>}
                </VStack>
                <TextInput
                  type="password"
                  label={placeholder}
                  isLabelHidden
                  placeholder={placeholder}
                  value={code}
                  onChange={value => { setCode(value); setError(false); }}
                  status={error ? { type: 'error', message: errorMessage } : undefined}
                  statusVariant="detached"
                  hasAutoFocus
                  width="100%"
                />
                <Button type="submit" label={submitLabel} variant="primary" size="lg" width="100%" isLoading={busy} />
                {showContact && (
                  <Text type="supporting" justify="center">
                    Pas encore de code ? <Link href={CONTACT.mailto} target="_blank">Contactez Thomas</Link>
                  </Text>
                )}
              </VStack>
            </form>
          </Card>
        </div>
      </div>
    </Theme>
  );
}
