const size = {
  laptop: '1024px',
  mobileM: '768px',
  mobileS: '480px',
} as const;

export const device = {
  laptop: `@media (max-width: ${size.laptop})`,
  mobileM: `@media (max-width: ${size.mobileM})`,
  mobileS: `@media (max-width: ${size.mobileS})`,
} as const;
