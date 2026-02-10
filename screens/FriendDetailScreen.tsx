
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { Friend } from '../types';

const FRIENDS: Friend[] = [
  { id: '1', name: 'Alex Thompson', avatar: 'https://picsum.photos/seed/alex/300/300', bio: 'Adventurer & Foodie.', status: 'Online' },
  { id: '2', name: 'Sarah Chen', avatar: 'https://picsum.photos/seed/sarah/300/300', bio: 'Design is life.', status: 'Away' },
  { id: '3', name: 'Jordan Miller', avatar: 'https://picsum.photos/seed/jordan/300/300', bio: 'Always spinning.', status: 'Offline' },
];

export default function FriendDetailScreen({ route, navigation, isDarkMode }: { route: any, navigation: any, isDarkMode: boolean }) {
  const { id } = route.params;
  const friend = FRIENDS.find(f => f.id === id);
  const styles = getStyles(isDarkMode);

  if (!friend) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={28} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Friend Profile</Text>
        <View style={{ width: 28 }} />
      </View>
      <View style={styles.content}>
        <Image source={{ uri: friend.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{friend.name}</Text>
        <Text style={[styles.status, { color: friend.status === 'Online' ? '#34C759' : '#8e8e93' }]}>
          {friend.status}
        </Text>
        
        <View style={styles.bioCard}>
          <Text style={styles.bioTitle}>Bio</Text>
          <Text style={styles.bioText}>{friend.bio}</Text>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Send a Wheel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const getStyles = (isDarkMode: boolean) => StyleSheet.create({
  container: { flex: 1, backgroundColor: isDarkMode ? '#1c1c1e' : '#f2f2f7' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: isDarkMode ? '#38383a' : '#c6c6c8' },
  headerTitle: { fontSize: 17, fontWeight: 'bold', color: isDarkMode ? 'white' : 'black' },
  content: { alignItems: 'center', padding: 40 },
  avatar: { width: 150, height: 150, borderRadius: 75, marginBottom: 20, borderWidth: 5, borderColor: isDarkMode ? '#2c2c2e' : 'white' },
  name: { fontSize: 28, fontWeight: 'bold', color: isDarkMode ? 'white' : 'black' },
  status: { fontSize: 16, fontWeight: '600', marginTop: 4 },
  bioCard: { width: '100%', backgroundColor: isDarkMode ? '#2c2c2e' : 'white', padding: 20, borderRadius: 20, marginTop: 40 },
  bioTitle: { fontSize: 14, fontWeight: 'bold', color: '#8e8e93', marginBottom: 10, textTransform: 'uppercase' },
  bioText: { fontSize: 16, color: isDarkMode ? '#e5e5ea' : '#3a3a3c', lineHeight: 24 },
  button: { width: '100%', height: 56, backgroundColor: '#007AFF', borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginTop: 40 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});
