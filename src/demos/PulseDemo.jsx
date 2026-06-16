import { useRef, useEffect } from 'react';
import { Animated, View, Text, StyleSheet, Easing } from 'react-native';
import { colors, nativeDriver } from '../theme';

// Animazione in loop con Animated.loop + interpolate.
export default function PulseDemo() {
  const t = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(t, {
        toValue: 1,
        duration: 1800,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: nativeDriver,
      })
    );
    loop.start();
    return () => loop.stop();
  }, [t]);

  const scale = t.interpolate({ inputRange: [0, 0.5, 1], outputRange: [1, 1.35, 1] });
  const rotate = t.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const opacity = t.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.6, 1, 0.6] });

  return (
    <View style={styles.stage}>
      <Animated.View
        style={[styles.box, { opacity, transform: [{ scale }, { rotate }] }]}
      >
        <Text style={styles.label}>Animated</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  stage: {
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bgAlt,
    borderRadius: 14,
  },
  box: {
    width: 86,
    height: 86,
    borderRadius: 18,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { color: '#fff', fontWeight: '700', fontSize: 12 },
});
