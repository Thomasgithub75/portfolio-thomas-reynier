import { IconButton } from '@astryxdesign/core/IconButton';
import { Text } from '@astryxdesign/core/Text';
import { Divider } from '@astryxdesign/core/Divider';
import { HStack } from '@astryxdesign/core/Layout';
import MailOutlined from '@mui/icons-material/MailOutlined';
import LinkedIn from '@mui/icons-material/LinkedIn';
import FileDownloadOutlined from '@mui/icons-material/FileDownloadOutlined';
import { trackEvent } from '../utils/analytics';
import { CONTACT } from '../data/home';

// Footer Astryx — à placer dans un <Theme> (voir AstryxPage)
export default function Footer() {
  const open = (url, track) => { track?.(); window.open(url, '_blank', 'noopener'); };
  return (
    <footer className="ax-container ax-footer">
      <Divider />
      <HStack hAlign="between" vAlign="center" wrap="wrap" gap={2}>
        <Text type="supporting">© 2026 Thomas Reynier · Product Designer · Paris</Text>
        <HStack gap={1}>
          <IconButton label="Email" tooltip={CONTACT.email} icon={<MailOutlined sx={{ fontSize: 18 }} />} variant="ghost" onClick={() => open(CONTACT.mailto, () => trackEvent.contactClick('footer'))} />
          <IconButton label="LinkedIn" tooltip="Voir mon profil LinkedIn" icon={<LinkedIn sx={{ fontSize: 18 }} />} variant="ghost" onClick={() => open(CONTACT.linkedin, () => trackEvent.linkedinClick('footer'))} />
          <IconButton label="Télécharger mon CV (PDF)" tooltip="Télécharger mon CV (PDF)" icon={<FileDownloadOutlined sx={{ fontSize: 18 }} />} variant="ghost" onClick={() => open(CONTACT.cv, trackEvent.cvDownload)} />
        </HStack>
      </HStack>
    </footer>
  );
}
