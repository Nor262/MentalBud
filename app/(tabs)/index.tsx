import { Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

// Components for the specific cards
const TrackerCard = ({ title, value, subtext, icon, color, type, onPress }: any) => (
  <TouchableOpacity style={styles.trackerCard} onPress={onPress}>
    <View style={[styles.iconCircle, { backgroundColor: color }]}>
      <Ionicons name={icon} size={20} color="#FFF" />
    </View>
    <View style={{ flex: 1, paddingHorizontal: 12 }}>
      <Text style={styles.trackerTitle}>{title}</Text>
      <Text style={styles.trackerSub}>{subtext || value}</Text>
    </View>

    {/* Visualizations based on type */}
    <View style={{ width: 80, height: 40, justifyContent: 'center', alignItems: 'flex-end' }}>
      {type === 'wave' && (
        <Svg height="30" width="60">
          <Path d="M0,15 Q15,5 30,15 T60,15" fill="none" stroke="#8CAD65" strokeWidth="3" />
        </Svg>
      )}
      {type === 'circle' && (
        <Svg height="36" width="36">
          <Circle cx="18" cy="18" r="14" stroke="#44352D" strokeWidth="4" />
          <Circle cx="18" cy="18" r="14" stroke="#5C6BC0" strokeWidth="4" strokeDasharray="30 100" />
          <Text style={{ color: '#FFF', fontSize: 10, fontWeight: 'bold', textAlign: 'center' }}>1</Text>
        </Svg>
      )}
      {type === 'dots' && (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, width: 60, justifyContent: 'flex-end' }}>
          {[...Array(12)].map((_, i) => (
            <View key={i} style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: i < 8 ? '#FF8C60' : '#44352D' }} />
          ))}
        </View>
      )}
      {type === 'bars' && (
        <View style={{ flexDirection: 'row', gap: 4, alignItems: 'flex-end' }}>
          <View style={{ width: 12, height: 4, backgroundColor: '#FFCA28', borderRadius: 2 }} />
          <View style={{ width: 12, height: 4, backgroundColor: '#FFCA28', borderRadius: 2 }} />
          <View style={{ width: 12, height: 4, backgroundColor: '#FFCA28', borderRadius: 2 }} />
          <View style={{ width: 12, height: 4, backgroundColor: '#44352D', borderRadius: 2 }} />
        </View>
      )}
    </View>
  </TouchableOpacity>
);

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

          {/* Header */}
          <View style={styles.header}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/100?img=5' }} // Placeholder avatar
                style={styles.avatar}
              />
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.dateText}>Tue, 25 Jan 2025</Text>
                <Text style={styles.greeting}>Hi, Shinomiya!</Text>
                <View style={styles.statusRow}>
                  <View style={styles.proTag}><Text style={styles.proText}>Pro Member</Text></View>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.notifBtn} onPress={() => router.push('/notifications')}>
              <Ionicons name="notifications-outline" size={24} color="#FFF" />
              <View style={styles.redDot} />
            </TouchableOpacity>
          </View>

          {/* Search */}
          <TouchableOpacity style={styles.searchBar}>
            <Text style={styles.searchText}>Search anything...</Text>
            <Ionicons name="search" size={20} color="#BBB" />
          </TouchableOpacity>

          {/* Metrics Row */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mental Health Metrics</Text>
            <Ionicons name="ellipsis-vertical" size={16} color="#AAA" />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsRow}>
            {/* Freud Score */}
            <TouchableOpacity style={[styles.metricCard, { backgroundColor: '#8CAD65' }]} onPress={() => router.push('/score')}>
              <View style={styles.metricHeader}>
                <Ionicons name="heart-outline" size={18} color="#FFF" />
                <Text style={styles.metricTitle}>Freud Score</Text>
              </View>
              <View style={styles.scoreCircle}>
                <Text style={styles.scoreVal}>80</Text>
                <Text style={styles.scoreLabel}>Healthy</Text>
              </View>
            </TouchableOpacity>

            {/* Mood */}
            <TouchableOpacity style={[styles.metricCard, { backgroundColor: '#FF8C60' }]} onPress={() => router.push('/mood/stats')}>
              <View style={styles.metricHeader}>
                <Ionicons name="sad-outline" size={18} color="#FFF" />
                <Text style={styles.metricTitle}>Mood</Text>
              </View>
              <Text style={styles.moodVal}>Sad</Text>
              {/* Tiny Bar Chart */}
              <View style={styles.miniBars}>
                {[10, 15, 25, 40, 30, 20, 10, 15, 20].map((h, i) => (
                  <View key={i} style={[styles.bar, { height: h, backgroundColor: 'rgba(255,255,255,0.6)' }]} />
                ))}
              </View>
            </TouchableOpacity>

            {/* Sleep Card (Purple) */}
            <TouchableOpacity style={[styles.metricCard, { backgroundColor: '#5E35B1' }]} onPress={() => router.push('/sleep')}>
              <View style={styles.metricHeader}>
                <Ionicons name="moon-outline" size={18} color="#FFF" />
                <Text style={styles.metricTitle}>Sleep</Text>
              </View>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name="star" size={32} color="#FFF" />
                <Text style={[styles.scoreVal, { fontSize: 28 }]}>85</Text>
                <Text style={styles.scoreLabel}>Splendid</Text>
              </View>
            </TouchableOpacity>

            {/* Stress Card (Yellow) */}
            <TouchableOpacity style={[styles.metricCard, { backgroundColor: '#FBC02D' }]} onPress={() => router.push('/stress')}>
              <View style={styles.metricHeader}>
                <Ionicons name="flash-outline" size={18} color="#FFF" />
                <Text style={styles.metricTitle}>Stress</Text>
              </View>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={[styles.moodVal, { marginTop: 0 }]}>Normal</Text>
                <View style={{ height: 4, backgroundColor: 'rgba(255,255,255,0.4)', marginTop: 10, borderRadius: 2 }}>
                  <View style={{ width: '30%', height: '100%', backgroundColor: '#FFF', borderRadius: 2 }} />
                </View>
                <Text style={styles.scoreLabel}>Level 3</Text>
              </View>
            </TouchableOpacity>

            {/* Mindful Card (Teal/Green) */}
            <TouchableOpacity style={[styles.metricCard, { backgroundColor: '#26A69A' }]} onPress={() => router.push('/mindful')}>
              <View style={styles.metricHeader}>
                <Ionicons name="time-outline" size={18} color="#FFF" />
                <Text style={styles.metricTitle}>Mindful</Text>
              </View>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={[styles.scoreVal, { fontSize: 24 }]}>2.5h</Text>
                <Text style={styles.scoreLabel}>Target 8h</Text>
                <Svg height="30" width="80" style={{ marginTop: 10 }}>
                  <Path d="M0,15 Q20,5 40,15 T80,15" fill="none" stroke="#FFF" strokeWidth="2" />
                </Svg>
              </View>
            </TouchableOpacity>
          </ScrollView>


          {/* Pagination Dots */}
          <View style={styles.pagination}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>

          {/* Mindful Tracker List */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mindful Tracker</Text>
            <Ionicons name="ellipsis-vertical" size={16} color="#AAA" />
          </View>

          <View style={styles.listContainer}>
            <TrackerCard
              title="Mindful Hours"
              value="2.5h/8h"
              icon="time"
              color="#4CAF50" // Dark Green
              type="wave"
              onPress={() => router.push('/mindful')}
            />
            <TrackerCard
              title="Sleep Quality"
              value="Insomniac (~2h Avg)"
              icon="moon"
              color="#3D2C69" // Indigo
              type="circle"
              onPress={() => router.push('/sleep')}
            />
            <TrackerCard
              title="Mindful Journal"
              subtext="64 Day Streak"
              icon="book"
              color="#D84315" // Rust
              type="dots"
              onPress={() => router.push('/journal')}
            />
            <TrackerCard
              title="Stress Level"
              subtext="Level 3 (Normal)"
              icon="skull-outline"
              color="#FBC02D" // Yellow/Gold
              type="bars"
              onPress={() => router.push('/stress')}
            />
          </View>

          {/* AI Chatbot Card */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>AI Therapy Chatbot</Text>
            <Ionicons name="settings-outline" size={16} color="#AAA" />
          </View>

          <TouchableOpacity style={styles.chatBotCard} onPress={() => router.push('/chat/history')}>
            <View>
              <Text style={styles.chatCount}>2541</Text>
              <Text style={styles.chatLabel}>Conversations</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                <Ionicons name="chatbubble" size={14} color="#FFF" style={{ marginRight: 4 }} />
                <Text style={{ color: '#D1C4E9', fontSize: 12 }}>83 left this month</Text>
              </View>
              <TouchableOpacity onPress={() => router.push('/pro/upgrade')} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={{ color: '#FFF', fontSize: 12, marginLeft: 4, fontWeight: 'bold' }}>Go Pro, Now!</Text>
              </TouchableOpacity>
            </View>
            {/* Robot Illustration Placeholder */}
            <View style={styles.botIllustration}>
              <Ionicons name="happy-outline" size={60} color="#8B7D76" />
            </View>
            {/* Floating Action Buttons overlaid */}
            <View style={styles.chatFabRow}>
              <TouchableOpacity style={[styles.miniFab, { backgroundColor: '#8CAD65' }]} onPress={() => router.push('/chat/new')}>
                <Ionicons name="add" size={24} color="#FFF" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.miniFab, { backgroundColor: '#FF8C60' }]} onPress={() => router.push('/chat/settings')}>
                <Ionicons name="settings-outline" size={20} color="#FFF" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <View style={{ height: 100 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1610',
  },
  scrollContent: {
    paddingHorizontal: Spacing.l,
    paddingTop: Spacing.m,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.l,
  },
  avatar: {
    width: 50, height: 50, borderRadius: 25, borderWidth: 2, borderColor: '#FFF',
  },
  dateText: {
    color: '#AAA', fontSize: 12, marginBottom: 2,
  },
  greeting: {
    color: '#FFF', fontSize: 18, fontWeight: 'bold', fontFamily: Typography.heading,
  },
  statusRow: {
    flexDirection: 'row', gap: 6, marginTop: 4,
  },
  proTag: {
    backgroundColor: '#2E3B28', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4,
  },
  proText: {
    color: '#8CAD65', fontSize: 10, fontWeight: 'bold',
  },
  notifBtn: {
    width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: '#44352D', alignItems: 'center', justifyContent: 'center',
  },
  redDot: {
    position: 'absolute', top: 10, right: 10, width: 8, height: 8, borderRadius: 4, backgroundColor: '#FF8C60',
  },
  searchBar: {
    backgroundColor: '#332419', // New Card Color
    borderRadius: 25,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.l,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: '#44352D'
  },
  searchText: {
    color: '#AAA',
  },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.m,
  },
  sectionTitle: {
    color: '#FFF', fontSize: 16, fontWeight: 'bold',
  },
  metricsRow: {
    flexDirection: 'row',
    overflow: 'visible',
    marginBottom: Spacing.m,
  },
  metricCard: {
    width: 140, height: 160, borderRadius: 24, padding: Spacing.m, marginRight: Spacing.m, justifyContent: 'space-between',
  },
  metricHeader: {
    flexDirection: 'row', gap: 6, alignItems: 'center',
  },
  metricTitle: {
    color: '#FFF', fontWeight: 'bold',
  },
  scoreCircle: {
    width: 90, height: 90, borderRadius: 45, borderWidth: 6, borderColor: 'rgba(255,255,255,0.3)', alignSelf: 'center', alignItems: 'center', justifyContent: 'center',
  },
  scoreVal: {
    color: '#FFF', fontSize: 24, fontWeight: 'bold',
  },
  scoreLabel: {
    color: '#FFF', fontSize: 10,
  },
  moodVal: {
    color: '#FFF', fontSize: 28, fontWeight: 'bold', marginTop: 10,
  },
  miniBars: {
    flexDirection: 'row', alignItems: 'flex-end', gap: 4, height: 40, justifyContent: 'center',
  },
  bar: {
    width: 6, borderRadius: 3,
  },
  pagination: {
    flexDirection: 'row', justifyContent: 'center', gap: 6, marginBottom: Spacing.xl,
  },
  dot: {
    width: 6, height: 6, borderRadius: 3, backgroundColor: '#44352D',
  },
  dotActive: {
    backgroundColor: '#C8A087',
  },
  listContainer: {
    gap: Spacing.m, marginBottom: Spacing.xl,
  },
  trackerCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#332419', padding: Spacing.m, borderRadius: 20,
  },
  iconCircle: {
    width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center',
  },
  trackerTitle: {
    color: '#FFF', fontWeight: 'bold', fontSize: 15,
  },
  trackerSub: {
    color: '#AAA', fontSize: 12, marginTop: 2,
  },
  chatBotCard: {
    backgroundColor: '#332419', // New Card Color
    borderRadius: 24,
    padding: Spacing.l,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 160,
    overflow: 'hidden',
  },
  chatCount: {
    color: '#FFF', fontSize: 36, fontWeight: 'bold', fontFamily: Typography.heading,
  },
  chatLabel: {
    color: '#FFF', fontSize: 16,
  },
  botIllustration: {
    width: 100, alignItems: 'center', justifyContent: 'center', opacity: 0.5,
  },
  chatFabRow: {
    position: 'absolute', bottom: 16, right: 16, flexDirection: 'row', gap: 12,
  },
  miniFab: {
    width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center',
    shadowColor: "#000", shadowOpacity: 0.3, shadowRadius: 4, shadowOffset: { width: 0, height: 2 },
  }
});
