
import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

export default function SettingsScreen({ isDarkMode, toggleDarkMode }: { isDarkMode: boolean, toggleDarkMode: () => void }) {
  const [sounds, setSounds] = useState(true);
  const [haptics, setHaptics] = useState(true);

  const styles = getStyles(isDarkMode);

  // Added optional modifier to children to resolve TS error at call site where children are expected but not found in the props object before JSX processing
  const Section = ({ title, children }: { title: string, children?: React.ReactNode }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>{children}</View>
    </View>
  );

  const Item = ({ label, value, onToggle, isLast }: { label: string, value?: boolean, onToggle?: () => void, isLast?: boolean }) => (
    <View style={[styles.item, isLast && { borderBottomWidth: 0 }]}>
      <Text style={styles.itemLabel}>{label}</Text>
      {onToggle ? (
        <Switch 
          value={value} 
          onValueChange={onToggle} 
          trackColor={{ false: '#767577', true: '#34C759' }}
          thumbColor="white"
          ios_backgroundColor="#3e3e3e"
        />
      ) : (
        <ChevronRight size={20} color={isDarkMode ? '#636366' : '#C7C7CC'} />
      )}
    </View>
  );

  return (
    <>
      <SafeAreaView style={{ backgroundColor: isDarkMode ? '#1c1c1e' : 'white', flex: 0 }}>
        <View style={styles.header}>
          <Text style={styles.title}>Einstellungen</Text>
        </View>
      </SafeAreaView>
      <SafeAreaView style={styles.container}>
        <ScrollView>
        <Section title="EINSTELLUNGEN">
          <Item label="Dunkler Modus" value={isDarkMode} onToggle={toggleDarkMode} />
          <Item label="Soundeffekte" value={sounds} onToggle={() => setSounds(!sounds)} />
          <Item label="Haptisches Feedback" value={haptics} onToggle={() => setHaptics(!haptics)} isLast />
        </Section>
        <Section title="HILFE">
          <Item label="Hilfezentrum" />
          <Item label="Nutzungsbedingungen" />
          <Item label="Datenschutz" isLast />
        </Section>
        <View style={styles.footer}>
          <Text style={styles.footerText}>App-Version 1.0.0 (Expo)</Text>
          <Text style={styles.footerText}>Entwickelt mit ❤️ für Entscheider</Text>
        </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const getStyles = (isDarkMode: boolean) => StyleSheet.create({
  container: { flex: 1, backgroundColor: isDarkMode ? '#1c1c1e' : '#f2f2f7' },
  header: { padding: 20, paddingTop: 10, backgroundColor: isDarkMode ? '#1c1c1e' : 'white', borderBottomWidth: 1, borderBottomColor: isDarkMode ? '#38383a' : '#c6c6c8' },
  title: { fontSize: 34, fontWeight: 'bold', color: isDarkMode ? 'white' : 'black' },
  section: { marginTop: 25, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 13, color: '#8e8e93', marginBottom: 8, marginLeft: 15, fontWeight: '500' },
  sectionContent: { backgroundColor: isDarkMode ? '#2c2c2e' : 'white', borderRadius: 12, overflow: 'hidden' },
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottomWidth: 0.5, borderBottomColor: isDarkMode ? '#38383a' : '#c6c6c8' },
  itemLabel: { fontSize: 17, color: isDarkMode ? 'white' : 'black' },
  footer: { padding: 40, alignItems: 'center' },
  footerText: { fontSize: 13, color: '#8e8e93', marginTop: 5 },
});
