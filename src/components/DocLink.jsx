import { Text, Linking, Platform, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme';

// Base della documentazione ufficiale di react-native-web.
export const DOCS = 'https://necolas.github.io/react-native-web/docs';

// Link cross-platform: sul web apre una nuova scheda, su mobile delega
// al browser di sistema con Linking. accessibilityRole="link" dà a RNW
// la semantica corretta (<a>) per accessibilità e SEO.
export default function DocLink({ href, label = 'Documentazione ufficiale' }) {
  function open() {
    if (Platform.OS === 'web') window.open(href, '_blank', 'noopener');
    else Linking.openURL(href);
  }

  return (
    <Text
      onPress={open}
      accessibilityRole="link"
      style={styles.link}
      hrefAttrs={{ target: '_blank', rel: 'noopener' }}
    >
      📖 {label} ↗
    </Text>
  );
}

const styles = StyleSheet.create({
  link: {
    color: colors.accent,
    fontWeight: '700',
    fontSize: 14,
    marginTop: spacing(2),
  },
});
