import { useRef, useState } from 'react';
import { Animated, Pressable, Text, StyleSheet, View } from 'react-native';
import { colors, spacing, nativeDriver } from '../theme';

// Pressable + Animated.spring: gestione del tocco identica su web (mouse)
// e mobile (touch). Premi e tieni premuto per vedere la molla.
export default function PressDemo() {
  const scale = useRef(new Animated.Value(1)).current;
  const [count, setCount] = useState(0);

  const to = (v) =>
    Animated.spring(scale, { toValue: v, useNativeDriver: nativeDriver, friction: 5 }).start();

  return (
    <View style={styles.row}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <Pressable
          onPressIn={() => to(0.9)}
          onPressOut={() => to(1)}
          onPress={() => setCount((c) => c + 1)}
          style={({ hovered }) => [styles.btn, hovered && styles.btnHover]}
        >
          <Text style={styles.btnText}>Premimi</Text>
        </Pressable>
      </Animated.View>
      <Text style={styles.counter}>
        {count} {count === 1 ? 'tocco' : 'tocchi'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing(2) },
  btn: {
    backgroundColor: colors.pink,
    paddingVertical: spacing(1.5),
    paddingHorizontal: spacing(3),
    borderRadius: 999,
  },
  btnHover: { backgroundColor: '#ff97c6' },
  btnText: { color: '#1a0a14', fontWeight: '800', fontSize: 16 },
  counter: { color: colors.muted, fontSize: 16, fontWeight: '600' },
});
