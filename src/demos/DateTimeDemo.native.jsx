import { useState } from 'react';
import { View, Text, Pressable, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors, spacing, mono } from '../theme';

// Variante NATIVA (file .native.jsx): usa il picker nativo di iOS/Android
// tramite @react-native-community/datetimepicker.
export default function DateTimeDemo() {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const pretty = date.toLocaleString('it-IT', { dateStyle: 'full', timeStyle: 'short' });

  return (
    <View>
      <Pressable onPress={() => setShow(true)} style={styles.btn}>
        <Text style={styles.btnText}>📅 Scegli data e ora</Text>
      </Pressable>

      {show ? (
        <DateTimePicker
          value={date}
          mode={Platform.OS === 'ios' ? 'datetime' : 'date'}
          onChange={(event, selected) => {
            setShow(Platform.OS === 'ios');
            if (selected) setDate(selected);
          }}
        />
      ) : null}

      <Text style={styles.readout}>{pretty}</Text>
      <Text style={styles.hint}>📄 file .native.jsx · usa il picker di sistema</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.bgAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: spacing(1.5),
    paddingHorizontal: spacing(2),
    alignItems: 'center',
  },
  btnText: { color: colors.text, fontSize: 16, fontWeight: '600' },
  readout: { color: colors.accent2, fontSize: 16, fontWeight: '700', marginTop: spacing(1.5) },
  hint: { color: colors.muted, fontFamily: mono, fontSize: 12, marginTop: spacing(1) },
});
