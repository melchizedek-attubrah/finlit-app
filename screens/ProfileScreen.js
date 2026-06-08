import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet
} from 'react-native';

export default function ProfileScreen() {
  const stats = [
    { label: 'Lessons', value: '12' },
    { label: 'Streak', value: '7 🔥' },
    { label: 'Points', value: '450' },
  ];

  const badges = [
    { icon: '🎯', title: 'First Lesson' },
    { icon: '🏆', title: 'Quiz Master' },
    { icon: '📅', title: '7-Day Streak' },
  ];

  const settings = [
    { icon: '👤', label: 'Edit Profile', color: '#333' },
    { icon: '🔔', label: 'Notifications', color: '#333' },
    { icon: '⭐', label: 'Premium Upgrade', color: '#2ECC71' },
    { icon: '❓', label: 'Help & Support', color: '#333' },
    { icon: '🚪', label: 'Logout', color: '#E74C3C' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>MA</Text>
        </View>
        <Text style={styles.userName}>Melchizedek Attubrah</Text>
        <Text style={styles.userEmail}>melchizedek@finlit.app</Text>
      </View>

      <View style={styles.statsRow}>
        {stats.map((stat, i) => (
          <View key={i} style={styles.statCard}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Badges</Text>
        <View style={styles.badgesRow}>
          {badges.map((badge, i) => (
            <View key={i} style={styles.badgeCard}>
              <Text style={styles.badgeIcon}>{badge.icon}</Text>
              <Text style={styles.badgeTitle}>{badge.title}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Goals</Text>
        <View style={styles.goalCard}>
          <Text style={styles.goalTitle}>Save GHS 500 in 3 months</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '45%' }]} />
          </View>
          <Text style={styles.goalProgress}>45% complete</Text>
        </View>
      </View>

      <View style={styles.section}>
        {settings.map((item, i) => (
          <TouchableOpacity key={i} style={styles.settingRow}>
            <Text style={styles.settingIcon}>{item.icon}</Text>
            <Text style={[styles.settingLabel, { color: item.color }]}>
              {item.label}
            </Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F6FA' },
  header: {
    backgroundColor: '#1B2E4B', padding: 20, paddingTop: 50,
    alignItems: 'center'
  },
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  avatarSection: { alignItems: 'center', padding: 20, backgroundColor: '#1B2E4B', paddingBottom: 30 },
  avatar: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: '#2ECC71', justifyContent: 'center', alignItems: 'center', marginBottom: 10
  },
  avatarText: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
  userName: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  userEmail: { color: '#aaa', fontSize: 14, marginTop: 4 },
  statsRow: {
    flexDirection: 'row', backgroundColor: '#fff',
    margin: 16, borderRadius: 12, padding: 16,
    justifyContent: 'space-around', elevation: 3
  },
  statCard: { alignItems: 'center' },
  statValue: { fontSize: 22, fontWeight: 'bold', color: '#1B2E4B' },
  statLabel: { fontSize: 12, color: '#666', marginTop: 4 },
  section: { marginHorizontal: 16, marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1B2E4B', marginBottom: 10 },
  badgesRow: { flexDirection: 'row', justifyContent: 'space-between' },
  badgeCard: {
    backgroundColor: '#fff', borderRadius: 12, padding: 16,
    alignItems: 'center', width: '30%', elevation: 2
  },
  badgeIcon: { fontSize: 28 },
  badgeTitle: { fontSize: 11, color: '#333', marginTop: 6, textAlign: 'center' },
  goalCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, elevation: 2 },
  goalTitle: { fontSize: 14, color: '#333', marginBottom: 10 },
  progressBar: { backgroundColor: '#eee', borderRadius: 10, height: 8 },
  progressFill: { backgroundColor: '#2ECC71', height: 8, borderRadius: 10 },
  goalProgress: { fontSize: 12, color: '#666', marginTop: 6 },
  settingRow: {
    backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center',
    padding: 16, borderRadius: 12, marginBottom: 8, elevation: 1
  },
  settingIcon: { fontSize: 20, marginRight: 12 },
  settingLabel: { flex: 1, fontSize: 15 },
  arrow: { fontSize: 20, color: '#ccc' },
});