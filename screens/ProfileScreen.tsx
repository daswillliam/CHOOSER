
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { Friend } from '../types';

const FRIENDS: Friend[] = [
  { id: '1', name: 'Alex Thompson', avatar: 'https://picsum.photos/seed/alex/150/150', bio: 'Abenteurer', status: 'Online' },
  { id: '2', name: 'Sarah Chen', avatar: 'https://picsum.photos/seed/sarah/150/150', bio: 'Designer', status: 'Abwesend' },
  { id: '3', name: 'Jordan Miller', avatar: 'https://picsum.photos/seed/jordan/150/150', bio: 'Dreher', status: 'Offline' },
];

export default function ProfileScreen({ isDarkMode, navigation }: { isDarkMode: boolean, navigation: any }) {
  const styles = getStyles(isDarkMode);

  return (
    <>
      <SafeAreaView style={{ backgroundColor: isDarkMode ? '#1c1c1e' : 'white', flex: 0 }}>
        <View style={styles.header}>
          <Text style={styles.title}>Profil</Text>
        </View>
      </SafeAreaView>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileCard}>
          <Image source={{ uri: 'https://picsum.photos/seed/me/200/200' }} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>John Appleseed</Text>
            <Text style={styles.userTitle}>Meister der Unentschlossenheit</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>99 DREHUNGEN HEUTE</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ÜBER MICH</Text>
          <View style={styles.aboutBox}>
            <Text style={styles.aboutText}>
              Ich benutze diese App gerne, um zu entscheiden, wo ich essen soll! Das Leben ist zu kurz, um sich über Entscheidungen Sorgen zu machen. 🍕🍣🍔
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.friendsHeader}>
            <Text style={styles.sectionTitle}>FREUNDE</Text>
            <TouchableOpacity><Text style={styles.seeAll}>Alle anzeigen</Text></TouchableOpacity>
          </View>
          <View style={styles.friendsList}>
            {FRIENDS.map((f, i) => (
              <TouchableOpacity 
                key={f.id} 
                style={[styles.friendItem, i === FRIENDS.length - 1 && { borderBottomWidth: 0 }]}
                onPress={() => navigation.navigate('FriendDetail', { id: f.id })}
              >
                <Image source={{ uri: f.avatar }} style={styles.friendAvatar} />
                <View style={styles.friendInfo}>
                  <Text style={styles.friendName}>{f.name}</Text>
                  <Text style={styles.friendStatus}>{f.status}</Text>
                </View>
                <ChevronRight size={18} color="#C7C7CC" />
              </TouchableOpacity>
            ))}
          </View>
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
  content: { padding: 20 },
  profileCard: { flexDirection: 'row', backgroundColor: isDarkMode ? '#2c2c2e' : 'white', borderRadius: 20, padding: 20, alignItems: 'center', marginBottom: 30 },
  avatar: { width: 80, height: 80, borderRadius: 40, marginRight: 20 },
  profileInfo: { flex: 1 },
  userName: { fontSize: 20, fontWeight: 'bold', color: isDarkMode ? 'white' : 'black' },
  userTitle: { fontSize: 14, color: '#8e8e93', marginTop: 2 },
  badge: { alignSelf: 'flex-start', backgroundColor: '#007AFF15', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, marginTop: 8 },
  badgeText: { fontSize: 10, fontWeight: '800', color: '#007AFF' },
  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 13, color: '#8e8e93', marginLeft: 15, marginBottom: 8, fontWeight: '500' },
  aboutBox: { backgroundColor: isDarkMode ? '#2c2c2e' : 'white', borderRadius: 16, padding: 15 },
  aboutText: { fontSize: 15, lineHeight: 22, color: isDarkMode ? '#e5e5ea' : '#3a3a3c' },
  friendsHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingRight: 10 },
  seeAll: { fontSize: 13, color: '#007AFF', fontWeight: '600' },
  friendsList: { backgroundColor: isDarkMode ? '#2c2c2e' : 'white', borderRadius: 16, overflow: 'hidden' },
  friendItem: { flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomWidth: 0.5, borderBottomColor: isDarkMode ? '#38383a' : '#c6c6c8' },
  friendAvatar: { width: 44, height: 44, borderRadius: 22, marginRight: 12 },
  friendInfo: { flex: 1 },
  friendName: { fontSize: 16, fontWeight: '600', color: isDarkMode ? 'white' : 'black' },
  friendStatus: { fontSize: 12, color: '#8e8e93' },
});
