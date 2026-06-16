import { View, Text, StyleSheet, useWindowDimensions, Platform } from 'react-native';
import { colors, spacing, mono } from '../theme';

// useWindowDimensions si aggiorna live (ridimensiona la finestra sul web,
// ruota il device su mobile). Platform.OS dice dove sta girando il codice.
export default function ResponsiveDemo() {
  const { width } = useWindowDimensions();
  const compact = width < 480;

  return (
    <View>
      <View style={styles.readout}>
        <Pill k="Platform.OS" v={Platform.OS} />
        <Pill k="larghezza" v={`${Math.round(width)}px`} />
        <Pill k="layout" v={compact ? 'compatto' : 'ampio'} />
      </View>

      <View style={[styles.grid, { flexDirection: compact ? 'column' : 'row' }]}>
        {['Adatta', 'una sola', 'codebase'].map((label) => (
          <View key={label} style={styles.cell}>
            <Text style={styles.cellText}>{label}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.hint}>
        {compact ? 'Allarga la finestra → diventa una riga.' : 'Restringi la finestra → diventa una colonna.'}
      </Text>
    </View>
  );
}

function Pill({ k, v }) {
  return (
    <View style={styles.pill}>
      <Text style={styles.pillK}>{k}</Text>
      <Text style={styles.pillV}>{v}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  readout: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing(1), marginBottom: spacing(2) },
  pill: {
    backgroundColor: colors.bgAlt,
    borderRadius: 10,
    paddingVertical: spacing(0.75),
    paddingHorizontal: spacing(1.5),
    borderWidth: 1,
    borderColor: colors.border,
  },
  pillK: { color: colors.muted, fontFamily: mono, fontSize: 11 },
  pillV: { color: colors.accent2, fontWeight: '800', fontSize: 15 },
  grid: { gap: spacing(1) },
  cell: {
    flex: 1,
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingVertical: spacing(2),
    alignItems: 'center',
  },
  cellText: { color: '#0b1020', fontWeight: '800' },
  hint: { color: colors.muted, fontSize: 13, marginTop: spacing(1.5), fontStyle: 'italic' },
});
