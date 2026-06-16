import { useRef, useEffect } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';
import { colors, spacing, nativeDriver } from '../theme';
import DocLink from './DocLink';

// Card di sezione che entra con una piccola animazione di fade + slide.
// Usa l'API Animated integrata: stesso codice su web e mobile.
export default function Section({ index = 0, badge, title, subtitle, children, docHref, docLabel }) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 500,
      delay: 120 * index,
      useNativeDriver: nativeDriver,
    }).start();
  }, [anim, index]);

  const animStyle = {
    opacity: anim,
    transform: [
      { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) },
    ],
  };

  return (
    <Animated.View style={[styles.card, animStyle]}>
      {badge ? <Text style={styles.badge}>{badge}</Text> : null}
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      <View style={styles.body}>{children}</View>
      {docHref ? <DocLink href={docHref} label={docLabel} /> : null}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing(3),
    marginBottom: spacing(2.5),
    maxWidth: 720,
    width: '100%',
    alignSelf: 'center',
  },
  badge: {
    color: colors.accent2,
    fontWeight: '700',
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: spacing(1),
  },
  title: { color: colors.text, fontSize: 22, fontWeight: '800' },
  subtitle: { color: colors.muted, fontSize: 15, marginTop: spacing(0.5), lineHeight: 22 },
  body: { marginTop: spacing(2) },
});
