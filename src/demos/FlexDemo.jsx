import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, mono } from '../theme';

// Flexbox è il motore di layout di React Native (default: flexDirection 'column').
// Qui lo cambi dal vivo e vedi i box riposizionarsi.
const DIRECTIONS = ['row', 'column'];
const JUSTIFY = ['flex-start', 'center', 'space-between'];

export default function FlexDemo() {
  const [dir, setDir] = useState('row');
  const [justify, setJustify] = useState('space-between');

  return (
    <View>
      <View style={styles.controls}>
        <Toggle label="flexDirection" value={dir} options={DIRECTIONS} onChange={setDir} />
        <Toggle label="justifyContent" value={justify} options={JUSTIFY} onChange={setJustify} />
      </View>

      <View style={[styles.stage, { flexDirection: dir, justifyContent: justify }]}>
        {['1', '2', '3'].map((n, i) => (
          <View key={n} style={[styles.box, { backgroundColor: BOX_COLORS[i] }]}>
            <Text style={styles.boxText}>{n}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function Toggle({ label, value, options, onChange }) {
  return (
    <View style={styles.toggle}>
      <Text style={styles.toggleLabel}>{label}</Text>
      <View style={styles.pills}>
        {options.map((opt) => {
          const active = opt === value;
          return (
            <Pressable key={opt} onPress={() => onChange(opt)} style={[styles.pill, active && styles.pillActive]}>
              <Text style={[styles.pillText, active && styles.pillTextActive]}>{opt}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const BOX_COLORS = [colors.accent, colors.accent2, colors.pink];

const styles = StyleSheet.create({
  controls: { gap: spacing(1.5), marginBottom: spacing(2) },
  toggle: { gap: spacing(0.75) },
  toggleLabel: { color: colors.muted, fontFamily: mono, fontSize: 12 },
  pills: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing(1) },
  pill: {
    paddingVertical: spacing(0.75),
    paddingHorizontal: spacing(1.5),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bgAlt,
  },
  pillActive: { backgroundColor: colors.accent, borderColor: colors.accent },
  pillText: { color: colors.muted, fontFamily: mono, fontSize: 12 },
  pillTextActive: { color: '#0b1020', fontWeight: '700' },
  stage: {
    minHeight: 130,
    backgroundColor: colors.bgAlt,
    borderRadius: 14,
    padding: spacing(1.5),
    alignItems: 'center',
  },
  box: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    margin: spacing(0.5),
  },
  boxText: { color: '#0b1020', fontWeight: '800', fontSize: 18 },
});
