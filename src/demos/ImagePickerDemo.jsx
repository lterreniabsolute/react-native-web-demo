import { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors, spacing, mono } from '../theme';

// expo-image-picker: una sola API per scegliere immagini. Sul web apre il
// file dialog del browser, su mobile la galleria (chiedendo i permessi).
export default function ImagePickerDemo() {
  const [uri, setUri] = useState(null);
  const [error, setError] = useState(null);

  async function pick() {
    setError(null);
    if (Platform.OS !== 'web') {
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) {
        setError('Permesso negato');
        return;
      }
    }
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
    });
    if (!res.canceled) setUri(res.assets[0].uri);
  }

  return (
    <View>
      <View style={styles.stage}>
        {uri ? (
          <Image source={{ uri }} style={styles.preview} resizeMode="cover" />
        ) : (
          <Text style={styles.placeholder}>Nessuna immagine 🖼️</Text>
        )}
      </View>

      <View style={styles.row}>
        <Pressable
          onPress={pick}
          style={({ hovered }) => [styles.btn, hovered && styles.btnHover]}
        >
          <Text style={styles.btnText}>{uri ? 'Cambia immagine' : 'Carica immagine'}</Text>
        </Pressable>
        {uri ? (
          <Pressable onPress={() => setUri(null)} style={styles.ghost}>
            <Text style={styles.ghostText}>Rimuovi</Text>
          </Pressable>
        ) : null}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  stage: {
    height: 170,
    borderRadius: 14,
    backgroundColor: colors.bgAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  preview: { width: '100%', height: '100%' },
  placeholder: { color: colors.muted, fontFamily: mono, fontSize: 14 },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing(1.5), marginTop: spacing(2) },
  btn: {
    backgroundColor: colors.accent,
    paddingVertical: spacing(1.5),
    paddingHorizontal: spacing(3),
    borderRadius: 999,
  },
  btnHover: { backgroundColor: '#7aa2ff' },
  btnText: { color: '#0b1020', fontWeight: '800', fontSize: 15 },
  ghost: { paddingVertical: spacing(1.5), paddingHorizontal: spacing(2) },
  ghostText: { color: colors.muted, fontWeight: '700', fontSize: 15 },
  error: { color: colors.pink, marginTop: spacing(1), fontSize: 13 },
});
