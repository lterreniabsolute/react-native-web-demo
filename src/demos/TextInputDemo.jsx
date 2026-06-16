import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors, spacing, mono } from '../theme';

// TextInput è il campo di testo di React Native: stesso componente per
// tastiera mobile e fisica. Lo stato è React puro.
export default function TextInputDemo() {
  const [name, setName] = useState('');

  return (
    <View>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Scrivi il tuo nome…"
        placeholderTextColor={colors.muted}
        style={styles.input}
        maxLength={24}
      />
      <View style={styles.row}>
        <Text style={styles.greeting}>
          {name ? `Ciao, ${name}! 👋` : 'In attesa di un nome…'}
        </Text>
        <Text style={styles.count}>{name.length}/24</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.bgAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: spacing(1.5),
    paddingHorizontal: spacing(2),
    color: colors.text,
    fontSize: 16,
    outlineStyle: 'none', // niente bordo blu del browser sul web
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing(1.5),
  },
  greeting: { color: colors.accent2, fontSize: 16, fontWeight: '700', flexShrink: 1 },
  count: { color: colors.muted, fontFamily: mono, fontSize: 12 },
});
