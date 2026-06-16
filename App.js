import { StatusBar } from 'expo-status-bar';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

import { colors, spacing, mono } from './src/theme';
import Hero from './src/components/Hero';
import Section from './src/components/Section';
import CodeBlock from './src/components/CodeBlock';
import DocLink, { DOCS } from './src/components/DocLink';
import PulseDemo from './src/demos/PulseDemo';
import PressDemo from './src/demos/PressDemo';
import TextInputDemo from './src/demos/TextInputDemo';
import ImagePickerDemo from './src/demos/ImagePickerDemo';
import DropdownDemo from './src/demos/DropdownDemo';
import DateTimeDemo from './src/demos/DateTimeDemo';
import FlexDemo from './src/demos/FlexDemo';
import ResponsiveDemo from './src/demos/ResponsiveDemo';

export default function App() {
  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Hero />

        <Section
          index={1}
          badge="I mattoni"
          title="View, Text e StyleSheet"
          subtitle="Niente <div> o <p>: componi l'interfaccia con i primitivi di React Native. Gli stili sono oggetti JS, non CSS."
          docHref={`${DOCS}/style-sheet/`}
          docLabel="StyleSheet"
        >
          <CodeBlock>{`import { View, Text, StyleSheet } from 'react-native';

function Card() {
  return (
    <View style={s.card}>
      <Text style={s.title}>Ciao 👋</Text>
    </View>
  );
}

const s = StyleSheet.create({
  card: { padding: 16, borderRadius: 12 },
  title: { fontSize: 18, fontWeight: '700' },
});`}</CodeBlock>
        </Section>

        <Section
          index={2}
          badge="Movimento"
          title="L'API Animated"
          subtitle="Animazioni fluide a 60fps con lo stesso codice ovunque. Animated.Value + interpolate + loop."
          docHref={`${DOCS}/animated/`}
          docLabel="Animated"
        >
          <PulseDemo />
          <CodeBlock>{`const t = useRef(new Animated.Value(0)).current;

Animated.loop(
  Animated.timing(t, { toValue: 1, duration: 1800,
    useNativeDriver: true })
).start();

const scale = t.interpolate({
  inputRange: [0, 0.5, 1], outputRange: [1, 1.35, 1],
});
// <Animated.View style={{ transform: [{ scale }] }} />`}</CodeBlock>
        </Section>

        <Section
          index={3}
          badge="Interazione"
          title="Pressable + spring"
          subtitle="Un solo gestore per tocco (mobile) e click/hover (web). Provalo qui sotto."
          docHref={`${DOCS}/pressable/`}
          docLabel="Pressable"
        >
          <PressDemo />
          <CodeBlock>{`<Pressable
  onPressIn={() => spring(0.9)}
  onPressOut={() => spring(1)}
  onPress={() => setCount(c => c + 1)}
  style={({ hovered }) => [s.btn, hovered && s.hover]}
>
  <Text>Premimi</Text>
</Pressable>`}</CodeBlock>
        </Section>

        <Section
          index={4}
          badge="Form"
          title="TextInput"
          subtitle="Il campo di testo nativo: stessa API per tastiera mobile e fisica, stato gestito da React."
          docHref={`${DOCS}/text-input/`}
          docLabel="TextInput"
        >
          <TextInputDemo />
          <CodeBlock>{`const [name, setName] = useState('');

<TextInput
  value={name}
  onChangeText={setName}
  placeholder="Scrivi il tuo nome…"
  maxLength={24}
/>`}</CodeBlock>
        </Section>

        <Section
          index={5}
          badge="Form"
          title="Upload di immagini"
          subtitle="Con expo-image-picker una sola API: sul web apre il file dialog, su mobile la galleria. Provalo!"
          docHref={`${DOCS}/image/`}
          docLabel="Image"
        >
          <ImagePickerDemo />
          <CodeBlock>{`import * as ImagePicker from 'expo-image-picker';

const res = await ImagePicker.launchImageLibraryAsync({
  mediaTypes: ['images'], quality: 1,
});
if (!res.canceled) setUri(res.assets[0].uri);
// <Image source={{ uri }} />`}</CodeBlock>
        </Section>

        <Section
          index={6}
          badge="Form"
          title="Dropdown su misura"
          subtitle="React Native non ha un <select>: lo componi con Pressable + lista animata. Tutto stile, tutto tuo."
          docHref={`${DOCS}/pressable/`}
          docLabel="Pressable"
        >
          <DropdownDemo />
          <CodeBlock>{`const [open, setOpen] = useState(false);

<Pressable onPress={() => setOpen(o => !o)}>
  <Text>{selected.label}</Text>
</Pressable>
{open && (
  <Animated.View>
    {OPTIONS.map(o => <Item ... />)}
  </Animated.View>
)}`}</CodeBlock>
        </Section>

        <Section
          index={7}
          badge="Form"
          title="Data e ora"
          subtitle="Componente diverso per piattaforma con le estensioni .web.jsx / .native.jsx: input del browser sul web, picker di sistema su mobile."
          docHref={`${DOCS}/platform/`}
          docLabel="Platform"
        >
          <DateTimeDemo />
          <CodeBlock>{`// DateTimeDemo.web.jsx → input nativo del browser
<input type="datetime-local"
       onChange={e => setValue(e.target.value)} />

// DateTimeDemo.native.jsx → picker di iOS/Android
import DateTimePicker from
  '@react-native-community/datetimepicker';
<DateTimePicker value={date} mode="datetime" ... />`}</CodeBlock>
        </Section>

        <Section
          index={8}
          badge="Layout"
          title="Flexbox, ovunque"
          subtitle="React Native usa Flexbox per il layout (default: column). Cambia le proprietà e guarda i box muoversi."
          docHref={`${DOCS}/view/`}
          docLabel="View"
        >
          <FlexDemo />
          <CodeBlock>{`<View style={{ flexDirection: 'row',
               justifyContent: 'space-between' }}>
  <Box /><Box /><Box />
</View>`}</CodeBlock>
        </Section>

        <Section
          index={9}
          badge="Adattivo"
          title="Responsive e Platform"
          subtitle="useWindowDimensions reagisce alle dimensioni; Platform.OS adatta il comportamento alla piattaforma."
          docHref={`${DOCS}/use-window-dimensions/`}
          docLabel="useWindowDimensions"
        >
          <ResponsiveDemo />
          <CodeBlock>{`const { width } = useWindowDimensions();
const compact = width < 480;

<View style={{ flexDirection: compact ? 'column' : 'row' }}>
  ...
</View>

Platform.OS  // 'ios' | 'android' | 'web'`}</CodeBlock>
        </Section>

        <Section
          index={10}
          badge="Vai in produzione"
          title="Come avviarla"
          subtitle="Lo stesso progetto, tre comandi. Expo si occupa di react-native-web per te."
          docHref={`${DOCS}/`}
          docLabel="Tutta la documentazione"
        >
          <CodeBlock>{`npm run web       # apre nel browser (react-native-web)
npm run ios       # simulatore iOS / app Expo Go
npm run android   # emulatore Android / app Expo Go`}</CodeBlock>
        </Section>

        <View style={styles.footerWrap}>
          <DocLink href={`${DOCS}/`} label="necolas.github.io/react-native-web" />
          <Text style={styles.footer}>
            Fatto con React Native Web · una codebase, tre piattaforme.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scroll: { padding: spacing(2.5), paddingBottom: spacing(6) },
  footerWrap: { alignItems: 'center', marginTop: spacing(2) },
  footer: {
    color: colors.muted,
    textAlign: 'center',
    fontFamily: mono,
    fontSize: 13,
    marginTop: spacing(2),
  },
});
