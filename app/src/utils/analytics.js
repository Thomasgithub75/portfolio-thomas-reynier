import { track } from '@vercel/analytics';

export const trackEvent = {
  contactClick: (source) => track('contact_click', { source }),
  cvDownload: () => track('cv_download'),
  linkedinClick: (source) => track('linkedin_click', { source }),
  caseStudyOpen: (project) => track('case_study_open', { project }),
  emailCopy: () => track('email_copy'),
};
