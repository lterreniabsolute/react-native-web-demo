import { Platform } from 'react-native';

// Un piccolo design system condiviso da web e mobile.
export const colors = {
  bg: '#0b1020',
  bgAlt: '#121a33',
  card: '#18213f',
  border: '#27345c',
  text: '#e7ecf7',
  muted: '#93a0c4',
  accent: '#5b8cff',
  accent2: '#36d6c3',
  pink: '#ff7ab6',
};

export const spacing = (n) => n * 8;

// Font monospace coerente fra le piattaforme (web/iOS/android).
export const mono = Platform.select({
  ios: 'Courier New',
  android: 'monospace',
  default: 'ui-monospace, SFMono-Regular, Menlo, monospace',
});

// Il driver native non esiste sul web: lì usiamo l'animazione JS.
// transform/opacity restano fluide in entrambi i casi.
export const nativeDriver = Platform.OS !== 'web';
