import React, { useState, useRef, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Animated,
  Easing,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Plus, Trash2, Edit2 } from 'lucide-react-native';
import Wheel from '../components/Wheel';
import { COLORS } from '../constants';
import { WheelOption, Friend } from '../types';

interface WheelData {
  id: string;
  name: string;
  options: WheelOption[];
  collaborators: Friend[];
}

const FRIENDS: Friend[] = [
  { id: '1', name: 'Alex Thompson', avatar: 'https://picsum.photos/seed/alex/150/150', bio: 'Abenteurer', status: 'Online' },
  { id: '2', name: 'Sarah Chen', avatar: 'https://picsum.photos/seed/sarah/150/150', bio: 'Designer', status: 'Abwesend' },
  { id: '3', name: 'Jordan Miller', avatar: 'https://picsum.photos/seed/jordan/150/150', bio: 'Dreher', status: 'Offline' },
];

const INITIAL_WHEELS: WheelData[] = [
  {
    id: 'w1',
    name: 'Mittagessen',
    options: [
      { id: '1', label: 'Pizza', color: COLORS[0] },
      { id: '2', label: 'Sushi', color: COLORS[1] },
      { id: '3', label: 'Burger', color: COLORS[2] },
    ],
    collaborators: [FRIENDS[0]],
  },
];

export default function WheelScreen({ isDarkMode }: { isDarkMode: boolean }) {
  const [wheels, setWheels] = useState<WheelData[]>(INITIAL_WHEELS);
  const [activeWheelId, setActiveWheelId] = useState(INITIAL_WHEELS[0].id);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<WheelOption | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [newOptionLabel, setNewOptionLabel] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState('');

  const rotation = useRef(new Animated.Value(0)).current;
  const currentRotation = useRef(0);

  const activeWheel = useMemo(
    () => wheels.find(w => w.id === activeWheelId) || wheels[0],
    [wheels, activeWheelId]
  );

  const updateActiveWheel = (updates: Partial<WheelData>) => {
    setWheels(prev => prev.map(w => (w.id === activeWheelId ? { ...w, ...updates } : w)));
  };

  const spin = () => {
    if (isSpinning || activeWheel.options.length < 2) return;

    setIsSpinning(true);
    const extraRotations = 5 + Math.random() * 5;
    const addedDegrees = extraRotations * 360;
    const targetRotation = currentRotation.current + addedDegrees;

    Animated.timing(rotation, {
      toValue: targetRotation,
      duration: 4000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      currentRotation.current = targetRotation;
      const normalizedRotation = targetRotation % 360;
      const degreesPerSegment = 360 / activeWheel.options.length;

      // pointer at 12 o'clock => 270° from 3 o'clock
      const adjustedRotation = (270 - normalizedRotation + 360) % 360;
      const winningIndex = Math.floor(adjustedRotation / degreesPerSegment) % activeWheel.options.length;

      setResult(activeWheel.options[winningIndex]);
      setShowResultModal(true);
      setIsSpinning(false);
    });
  };

  const addOption = () => {
    if (!newOptionLabel.trim()) return;
    const newOption: WheelOption = {
      id: Date.now().toString(),
      label: newOptionLabel.trim(),
      color: COLORS[activeWheel.options.length % COLORS.length],
    };
    updateActiveWheel({ options: [...activeWheel.options, newOption] });
    setNewOptionLabel('');
  };

  const addNewWheel = () => {
    const newId = `w${Date.now()}`;
    setWheels([...wheels, { id: newId, name: 'Neues Rad', options: [], collaborators: [] }]);
    setActiveWheelId(newId);
    setTempName('Neues Rad');
    setIsEditingName(true);
  };

  const styles = getStyles(isDarkMode);

  return (
    <>
      {/* SettingsScreen-like Header Block */}
      <SafeAreaView style={{ backgroundColor: isDarkMode ? '#1c1c1e' : 'white', flex: 0 }}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={{ flex: 1 }}>
              <Text style={styles.appName}>CHOOSER</Text>

              {isEditingName ? (
                <View style={styles.editingContainer}>
                  <TextInput
                    style={styles.nameInput}
                    value={tempName}
                    onChangeText={setTempName}
                    autoFocus
                    onBlur={() => {
                      updateActiveWheel({ name: tempName || 'Unnamed' });
                      setIsEditingName(false);
                    }}
                  />
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.nameRow}
                  onPress={() => {
                    setTempName(activeWheel.name);
                    setIsEditingName(true);
                  }}
                >
                  <Text style={styles.wheelName}>{activeWheel.name}</Text>
                  <Edit2 size={16} color={isDarkMode ? '#636366' : '#8e8e93'} />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.avatarGroup}>
              {activeWheel.collaborators.map(c => (
                <Image key={c.id} source={{ uri: c.avatar }} style={styles.miniAvatar} />
              ))}
              <TouchableOpacity style={styles.inviteButton} onPress={() => setShowInviteModal(true)}>
                <Plus size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScroll}>
            {wheels.map(w => (
              <TouchableOpacity
                key={w.id}
                onPress={() => setActiveWheelId(w.id)}
                style={[styles.tab, activeWheelId === w.id && styles.activeTab]}
              >
                <Text style={[styles.tabText, activeWheelId === w.id && styles.activeTabText]}>{w.name}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.addWheelTab} onPress={addNewWheel}>
              <Plus size={18} color="#007AFF" />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>

      {/* Body stays the same (in SafeAreaView like SettingsScreen) */}
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.wheelContainer}>
              <Wheel options={activeWheel.options} rotation={rotation} isSpinning={isSpinning} />
              <TouchableOpacity
                style={[styles.spinButton, (isSpinning || activeWheel.options.length < 2) && styles.spinButtonDisabled]}
                onPress={spin}
                disabled={isSpinning || activeWheel.options.length < 2}
              >
                <Text style={styles.spinButtonText}>{isSpinning ? 'DREHT...' : 'DREHEN'}</Text>
              </TouchableOpacity>
              {activeWheel.options.length < 2 && <Text style={styles.hintText}>Mindestens 2 Optionen zum Drehen erforderlich!</Text>}
            </View>

            <View style={styles.optionsSection}>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.optionInput}
                  placeholder="Option hinzufügen..."
                  placeholderTextColor={isDarkMode ? '#636366' : '#8e8e93'}
                  value={newOptionLabel}
                  onChangeText={setNewOptionLabel}
                />
                <TouchableOpacity style={styles.addButton} onPress={addOption}>
                  <Plus size={24} color="white" />
                </TouchableOpacity>
              </View>

              <View style={styles.optionsList}>
                {activeWheel.options.map((opt, index) => (
                  <View
                    key={opt.id}
                    style={[styles.optionItem, index === activeWheel.options.length - 1 && { borderBottomWidth: 0 }]}
                  >
                    <View style={styles.optionInfo}>
                      <View style={[styles.colorDot, { backgroundColor: opt.color }]} />
                      <Text style={styles.optionLabel}>{opt.label}</Text>
                    </View>
                    <TouchableOpacity onPress={() => updateActiveWheel({ options: activeWheel.options.filter(o => o.id !== opt.id) })}>
                      <Trash2 size={20} color="#ff3b30" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>

          <Modal visible={showResultModal} transparent animationType="fade">
            <View style={styles.modalOverlay}>
              <View style={styles.resultCard}>
                <Text style={styles.resultSub}>DAS ERGEBNIS</Text>
                <Text style={[styles.resultText, { color: result?.color }]}>{result?.label}</Text>
                <TouchableOpacity style={styles.modalButton} onPress={() => setShowResultModal(false)}>
                  <Text style={styles.modalButtonText}>SUPER!</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: isDarkMode ? '#1c1c1e' : '#f2f2f7' }]}
                  onPress={() => {
                    if (result) updateActiveWheel({ options: activeWheel.options.filter(o => o.id !== result.id) });
                    setShowResultModal(false);
                  }}
                >
                  <Text style={[styles.modalButtonText, { color: '#ff3b30' }]}>ENTFERNEN & SCHLIESSEN</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Invite modal placeholder, kept to avoid unused state issues */}
          <Modal visible={showInviteModal} transparent animationType="fade" onRequestClose={() => setShowInviteModal(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.resultCard}>
                <Text style={styles.resultSub}>Einladen</Text>
                <Text style={{ color: isDarkMode ? 'white' : 'black', fontSize: 16, marginBottom: 20 }}>
                  Nicht implementiert.
                </Text>
                <TouchableOpacity style={styles.modalButton} onPress={() => setShowInviteModal(false)}>
                  <Text style={styles.modalButtonText}>SCHLIESSEN</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    // SettingsScreen look
    container: { flex: 1, backgroundColor: isDarkMode ? '#1c1c1e' : '#f2f2f7' },

    header: {
      padding: 20,
      paddingTop: 10,
      backgroundColor: isDarkMode ? '#1c1c1e' : 'white',
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#38383a' : '#c6c6c8',
    },

    // header content
    headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 15 },
    appName: { fontSize: 12, fontWeight: '800', color: '#8e8e93', letterSpacing: 1, marginBottom: 4 },
    wheelName: { fontSize: 28, fontWeight: 'bold', color: isDarkMode ? 'white' : 'black', marginRight: 8 },
    nameRow: { flexDirection: 'row', alignItems: 'center' },
    nameInput: { fontSize: 24, fontWeight: 'bold', color: '#007AFF', borderBottomWidth: 2, borderBottomColor: '#007AFF', minWidth: 150 },
    editingContainer: { flexDirection: 'row', alignItems: 'center' },

    avatarGroup: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
    miniAvatar: { width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: isDarkMode ? '#1c1c1e' : 'white', marginLeft: -8 },
    inviteButton: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#007AFF', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: isDarkMode ? '#1c1c1e' : 'white', marginLeft: -8 },

    tabScroll: { flexDirection: 'row', marginBottom: 10 },

    tab: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: isDarkMode ? '#2c2c2e' : 'white',
      marginRight: 8,
      borderWidth: 0.5,
      borderColor: isDarkMode ? '#38383a' : '#c6c6c8',
    },
    activeTab: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
    tabText: { fontSize: 14, fontWeight: '600', color: '#8e8e93' },
    activeTabText: { color: 'white' },

    addWheelTab: {
      padding: 8,
      borderRadius: 20,
      backgroundColor: isDarkMode ? '#2c2c2e' : 'white',
      width: 36,
      alignItems: 'center',
      borderWidth: 0.5,
      borderColor: isDarkMode ? '#38383a' : '#c6c6c8',
    },

    // body
    scrollContent: { padding: 20 },
    wheelContainer: { alignItems: 'center', marginVertical: 30 },

    spinButton: { backgroundColor: '#007AFF', width: 180, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', marginTop: 40 },
    spinButtonDisabled: { backgroundColor: isDarkMode ? '#3a3a3c' : '#c7c7cc' },
    spinButtonText: { color: 'white', fontSize: 18, fontWeight: '800' },
    hintText: { marginTop: 15, color: '#8e8e93', fontSize: 13, fontWeight: '500' },

    optionsSection: { marginTop: 20 },
    inputRow: { flexDirection: 'row', marginBottom: 20 },

    optionInput: {
      flex: 1,
      height: 50,
      backgroundColor: isDarkMode ? '#2c2c2e' : 'white',
      borderRadius: 12,
      paddingHorizontal: 15,
      color: isDarkMode ? 'white' : 'black',
      borderWidth: 1,
      borderColor: isDarkMode ? '#38383a' : '#c6c6c8',
    },

    addButton: { width: 50, height: 50, backgroundColor: '#34C759', borderRadius: 12, marginLeft: 10, justifyContent: 'center', alignItems: 'center' },

    optionsList: { backgroundColor: isDarkMode ? '#2c2c2e' : 'white', borderRadius: 12, overflow: 'hidden' },

    optionItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottomWidth: 0.5, borderBottomColor: isDarkMode ? '#38383a' : '#c6c6c8' },
    optionInfo: { flexDirection: 'row', alignItems: 'center' },
    colorDot: { width: 12, height: 12, borderRadius: 6, marginRight: 12 },
    optionLabel: { fontSize: 16, fontWeight: '500', color: isDarkMode ? 'white' : 'black' },

    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', padding: 20 },

    resultCard: { backgroundColor: isDarkMode ? '#2c2c2e' : 'white', width: '100%', borderRadius: 12, padding: 30, alignItems: 'center' },
    resultSub: { fontSize: 13, fontWeight: '700', color: '#8e8e93', letterSpacing: 2, marginBottom: 10 },
    resultText: { fontSize: 42, fontWeight: '900', textAlign: 'center', marginBottom: 30 },

    modalButton: { backgroundColor: '#007AFF', width: '100%', height: 56, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
    modalButtonText: { color: 'white', fontSize: 17, fontWeight: '700' },
  });
