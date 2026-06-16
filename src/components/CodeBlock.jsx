import { View, Text, StyleSheet } from 'react-native';
import { colors, mono, spacing } from '../theme';

// Mostra uno snippet di codice. Niente di magico: è solo un <Text>
// monospazio dentro una <View> — gli stessi mattoni che spieghiamo.
export default function CodeBlock({ children }) {
  return (
    <View style={styles.wrap}>
      <Text selectable style={styles.code}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#0a0f22',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing(2),
    marginTop: spacing(2),
  },
  code: {
    color: '#cdd7f5',
    fontFamily: mono,
    fontSize: 13,
    lineHeight: 20,
  },
});
