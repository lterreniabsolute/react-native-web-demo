import { useRef, useEffect } from 'react';
import { Animated, View, Text, StyleSheet, Platform } from 'react-native';
import { colors, spacing, nativeDriver } from '../theme';

export default function Hero() {
  const a = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(a, { toValue: 1, useNativeDriver: nativeDriver, friction: 7, tension: 40 }).start();
  }, [a]);

  const style = {
    opacity: a,
    transform: [{ translateY: a.interpolate({ inputRange: [0, 1], outputRange: [30, 0] }) }],
  };

  return (
    <Animated.View style={[styles.wrap, style]}>
      <Text style={styles.kicker}>UNA CODEBASE · TRE PIATTAFORME</Text>
      <Text style={styles.title}>React Native Web</Text>
      <Text style={styles.lead}>
        Scrivi con i componenti di React Native — <Text style={styles.code}>View</Text>,{' '}
        <Text style={styles.code}>Text</Text>, <Text style={styles.code}>StyleSheet</Text>,{' '}
        <Text style={styles.code}>Animated</Text> — e lo stesso codice gira su iOS, Android e nel browser.
      </Text>
      <View style={styles.platforms}>
        {['📱 iOS', '🤖 Android', '🌐 Web'].map((p) => (
          <View key={p} style={styles.badge}>
            <Text style={styles.badgeText}>{p}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.meta}>
        Questa pagina è scritta interamente in React Native — la stai vedendo girare su{' '}
        <Text style={styles.code}>{Platform.OS}</Text>.
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: { maxWidth: 720, width: '100%', alignSelf: 'center', marginBottom: spacing(4), paddingTop: spacing(2) },
  kicker: { color: colors.accent2, fontWeight: '800', fontSize: 12, letterSpacing: 2 },
  title: { color: colors.text, fontSize: 44, fontWeight: '900', marginTop: spacing(1), lineHeight: 48 },
  lead: { color: colors.muted, fontSize: 17, lineHeight: 26, marginTop: spacing(2) },
  code: { color: colors.accent, fontWeight: '700' },
  platforms: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing(1), marginTop: spacing(2.5) },
  badge: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingVertical: spacing(1),
    paddingHorizontal: spacing(2),
  },
  badgeText: { color: colors.text, fontWeight: '700', fontSize: 14 },
  meta: { color: colors.muted, fontSize: 13, marginTop: spacing(2.5) },
});
