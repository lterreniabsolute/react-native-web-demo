import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, mono } from '../theme';

// Variante WEB (Metro carica i file .web.jsx solo sul web).
// react-native-web renderizza via react-dom, quindi qui possiamo usare
// direttamente l'<input> nativo del browser: ottimo picker, zero librerie.
export default function DateTimeDemo() {
  const [value, setValue] = useState('');

  const pretty = value
    ? new Date(value).toLocaleString('it-IT', {
        dateStyle: 'full',
        timeStyle: 'short',
      })
    : 'Nessuna data selezionata';

  return (
    <View>
      <input
        type="datetime-local"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={inputStyle}
      />
      <Text style={styles.readout}>{pretty}</Text>
      <Text style={styles.hint}>📄 file .web.jsx · usa l'input nativo del browser</Text>
    </View>
  );
}

const inputStyle = {
  width: '100%',
  boxSizing: 'border-box',
  backgroundColor: colors.bgAlt,
  border: `1px solid ${colors.border}`,
  borderRadius: 12,
  padding: '12px 16px',
  color: colors.text,
  fontSize: 16,
  colorScheme: 'dark',
  outline: 'none',
};

const styles = StyleSheet.create({
  readout: { color: colors.accent2, fontSize: 16, fontWeight: '700', marginTop: spacing(1.5) },
  hint: { color: colors.muted, fontFamily: mono, fontSize: 12, marginTop: spacing(1) },
});
