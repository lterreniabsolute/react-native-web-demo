import { useRef, useState } from 'react';
import { Animated, View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, nativeDriver } from '../theme';

// React Native non ha un <select>: si compone con Pressable + una lista
// animata. Tutto stile, tutto cross-platform.
const OPTIONS = [
  { label: 'Blu oceano', value: '#5b8cff' },
  { label: 'Verde menta', value: '#36d6c3' },
  { label: 'Rosa confetto', value: '#ff7ab6' },
  { label: 'Ambra', value: '#ffb454' },
];

export default function DropdownDemo() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(OPTIONS[0]);
  const anim = useRef(new Animated.Value(0)).current;

  function toggle() {
    const next = !open;
    setOpen(next);
    Animated.timing(anim, {
      toValue: next ? 1 : 0,
      duration: 180,
      useNativeDriver: nativeDriver,
    }).start();
  }

  function choose(opt) {
    setSelected(opt);
    toggle();
  }

  const listStyle = {
    opacity: anim,
    transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [-8, 0] }) }],
  };

  return (
    <View style={styles.wrap}>
      <View style={[styles.preview, { backgroundColor: selected.value }]}>
        <Text style={styles.previewText}>Anteprima</Text>
      </View>

      <View style={styles.field}>
        <Pressable onPress={toggle} style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={[styles.swatch, { backgroundColor: selected.value }]} />
            <Text style={styles.headerText}>{selected.label}</Text>
          </View>
          <Animated.Text
            style={[
              styles.chevron,
              { transform: [{ rotate: anim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] }) }] },
            ]}
          >
            ▾
          </Animated.Text>
        </Pressable>

        {open ? (
          <Animated.View style={[styles.list, listStyle]}>
            {OPTIONS.map((opt) => {
              const active = opt.value === selected.value;
              return (
                <Pressable
                  key={opt.value}
                  onPress={() => choose(opt)}
                  style={({ hovered }) => [styles.item, hovered && styles.itemHover]}
                >
                  <View style={[styles.swatch, { backgroundColor: opt.value }]} />
                  <Text style={[styles.itemText, active && styles.itemActive]}>{opt.label}</Text>
                </Pressable>
              );
            })}
          </Animated.View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // zIndex sul wrap: così la lista aperta passa SOPRA gli elementi
  // fratelli che la seguono (es. il blocco di codice).
  wrap: { gap: spacing(2), zIndex: 20 },
  preview: { height: 80, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  previewText: { color: '#0b1020', fontWeight: '800', fontSize: 16 },
  field: { position: 'relative', zIndex: 10 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.bgAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: spacing(1.5),
    paddingHorizontal: spacing(2),
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing(1.5) },
  headerText: { color: colors.text, fontSize: 16, fontWeight: '600' },
  chevron: { color: colors.muted, fontSize: 14 },
  swatch: { width: 20, height: 20, borderRadius: 6 },
  list: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: spacing(0.75),
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing(0.5),
    zIndex: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(1.5),
    paddingVertical: spacing(1.25),
    paddingHorizontal: spacing(1.5),
    borderRadius: 8,
  },
  itemHover: { backgroundColor: colors.bgAlt },
  itemText: { color: colors.muted, fontSize: 15, fontWeight: '600' },
  itemActive: { color: colors.text },
});
