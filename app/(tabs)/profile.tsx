import { Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');

// Reusing Metric Card Logic for visual consistency
const MetricCard = ({ title, icon, color, children, onPress }: any) => (
    <TouchableOpacity style={[styles.metricCard, { backgroundColor: color }]} onPress={onPress}>
        <View style={styles.metricHeader}>
            <Ionicons name={icon} size={18} color="#FFF" />
            <Text style={styles.metricTitle}>{title}</Text>
        </View>
        {children}
    </TouchableOpacity>
);

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
                {/* Header Image */}
                <View style={styles.headerContainer}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1000&auto=format&fit=crop' }}
                        style={styles.headerImage}
                    />
                    <View style={styles.headerOverlay} />

                    {/* Top Actions */}
                    <View style={styles.topBar}>
                        <TouchableOpacity style={styles.circleBtn} onPress={() => router.back()}>
                            <Ionicons name="chevron-back" size={24} color="#FFF" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.circleBtn} onPress={() => router.push('/settings')}>
                            <Ionicons name="settings-outline" size={24} color="#FFF" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Profile Info (Overlapping) */}
                <View style={styles.profileSection}>
                    {/* Avatar */}
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }}
                            style={styles.avatar}
                        />
                        <View style={styles.editBadge}>
                            <Ionicons name="pencil" size={14} color="#FFF" />
                        </View>
                    </View>

                    <Text style={styles.name}>Shinomiya Kaguya</Text>
                    <View style={styles.memberBadge}>
                        <Text style={styles.memberText}>BASIC MEMBER</Text>
                    </View>

                    {/* Stats Row */}
                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Text style={styles.statLabel}>Age</Text>
                            <Text style={styles.statVal}>17y</Text>
                        </View>
                        <View style={styles.verticalLine} />
                        <View style={styles.statItem}>
                            <Text style={styles.statLabel}>Weight</Text>
                            <Text style={styles.statVal}>48kg</Text>
                        </View>
                        <View style={styles.verticalLine} />
                        <View style={styles.statItem}>
                            <Text style={styles.statLabel}>Height</Text>
                            <Text style={styles.statVal}>162cm</Text>
                        </View>
                    </View>

                    {/* Metrics Carousel */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsList}>
                        {/* Freud Score */}
                        <MetricCard title="Freud Score" icon="heart-outline" color="#8CAD65" onPress={() => router.push('/score')}>
                            <View style={styles.scoreCircle}>
                                <Text style={styles.scoreVal}>80</Text>
                                <Text style={styles.scoreLabel}>Healthy</Text>
                                <Svg width="90" height="90" style={{ position: 'absolute' }}>
                                    <Circle cx="45" cy="45" r="40" stroke="rgba(255,255,255,0.3)" strokeWidth="4" />
                                    <Circle cx="45" cy="45" r="40" stroke="#FFF" strokeWidth="4" strokeDasharray={`${2 * Math.PI * 40 * 0.8} ${2 * Math.PI * 40}`} strokeLinecap="round" transform="rotate(-90 45 45)" />
                                </Svg>
                            </View>
                        </MetricCard>

                        {/* Mood */}
                        <MetricCard title="Mood" icon="happy-outline" color="#FF8A65" onPress={() => router.push('/mood/stats')}>
                            <Text style={styles.moodBig}>Sad</Text>
                            <View style={styles.barRow}>
                                {[20, 40, 60, 30, 50, 20, 40].map((h, i) => (
                                    <View key={i} style={[styles.bar, { height: h, backgroundColor: 'rgba(255,255,255,0.6)' }]} />
                                ))}
                            </View>
                        </MetricCard>

                        <View style={{ width: 20 }} />
                    </ScrollView>

                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F1610',
    },
    headerContainer: {
        height: 280,
        width: '100%',
    },
    headerImage: {
        width: '100%', height: '100%', resizeMode: 'cover',
    },
    headerOverlay: { // Gradient-like overlay for text readability if needed
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(31, 22, 16, 0.3)',
    },
    topBar: {
        position: 'absolute', top: 50, left: 20, right: 20, flexDirection: 'row', justifyContent: 'space-between',
    },
    circleBtn: {
        width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(0,0,0,0.3)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
    },
    profileSection: {
        marginTop: -60, // Overlap
        alignItems: 'center',
        backgroundColor: '#1F1610',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingTop: 0,
    },
    avatarContainer: {
        marginTop: -50,
        marginBottom: 16,
    },
    avatar: {
        width: 100, height: 100, borderRadius: 50, borderWidth: 4, borderColor: '#1F1610',
    },
    editBadge: {
        position: 'absolute', bottom: 0, right: 0, width: 30, height: 30, borderRadius: 15, backgroundColor: '#44352D', alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#1F1610',
    },
    name: {
        fontSize: 22, fontWeight: 'bold', color: '#FFF', fontFamily: Typography.heading,
    },
    memberBadge: {
        marginTop: 8, backgroundColor: '#2E3B28', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, borderWidth: 1, borderColor: '#8CAD65',
    },
    memberText: { color: '#8CAD65', fontSize: 10, fontWeight: 'bold' },

    statsRow: {
        flexDirection: 'row', alignItems: 'center', marginTop: 30,
        width: '80%', justifyContent: 'space-between',
    },
    statItem: { alignItems: 'center' },
    statLabel: { color: '#AAA', fontSize: 12, marginBottom: 4 },
    statVal: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    verticalLine: { width: 1, height: 24, backgroundColor: '#44352D' },

    metricsList: {
        marginTop: 40,
        paddingLeft: Spacing.l,
        width: '100%',
    },
    metricCard: {
        width: 160, height: 180, borderRadius: 24, padding: 16, marginRight: 16, justifyContent: 'space-between',
    },
    metricHeader: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    metricTitle: { color: '#FFF', fontWeight: 'bold' },
    scoreCircle: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    scoreVal: { color: '#FFF', fontSize: 32, fontWeight: 'bold' },
    scoreLabel: { color: '#FFF', fontSize: 10 },
    moodBig: { color: '#FFF', fontSize: 32, fontWeight: 'bold', marginTop: 10 },
    barRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 4, height: 60, justifyContent: 'center' },
    bar: { width: 8, borderRadius: 4 },
});
