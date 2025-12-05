import { Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

export default function ChatDashboardScreen() {
    return (
        <View style={styles.container}>
            {/* Background Abstract Shapes (Simulated with SVG) */}
            <View style={StyleSheet.absoluteFillObject}>
                <Svg height="100%" width="100%">
                    <Circle cx="10%" cy="20%" r="50" fill="#2C211B" />
                    <Circle cx="90%" cy="60%" r="80" fill="#2C211B" />
                    <Path d={`M0,${width} Q${width / 2},${width - 100} ${width},${width}`} fill="#2C211B" opacity={0.5} />
                </Svg>
            </View>

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.circleBtn}>
                    <Ionicons name="chevron-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Conversations</Text>
                <View style={styles.badge}><Text style={styles.badgeText}>BASIC</Text></View>
            </View>

            {/* Hero Stats */}
            <View style={styles.heroContent}>
                <Text style={styles.heroCount}>1571</Text>
                <Text style={styles.heroLabel}>Total Conversations</Text>

                <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Ionicons name="chatbubble-ellipses-outline" size={18} color="#FFF" />
                            <Text style={styles.statVal}>32</Text>
                        </View>
                        <Text style={styles.statLabel}>Left this month</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.statItem}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Ionicons name="bar-chart-outline" size={18} color="#FFF" />
                            <Text style={styles.statVal}>Slow</Text>
                        </View>
                        <Text style={styles.statLabel}>Response & Support</Text>
                    </View>
                </View>
            </View>

            {/* Action Buttons Row */}
            <View style={styles.actionRow}>
                {/* Orange Filter/History Button */}
                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#FF8C60' }]} onPress={() => router.push('/chat/history')}>
                    <Ionicons name="options" size={24} color="#FFF" />
                </TouchableOpacity>

                {/* Main Add Button (White) */}
                <TouchableOpacity style={styles.mainAddBtn} onPress={() => router.push('/chat/new')}>
                    <Ionicons name="add" size={32} color="#1F1610" />
                </TouchableOpacity>

                {/* Green Settings Button */}
                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#8CAD65' }]} onPress={() => router.push('/chat/settings')}>
                    <Ionicons name="settings-outline" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>

            {/* Upgrade Pro Card - Green */}
            <TouchableOpacity style={styles.proCard} onPress={() => router.push('/pro/upgrade')}>
                {/* Decoration */}
                <View style={styles.proDecor}>
                    <Ionicons name="happy-outline" size={80} color="rgba(0,0,0,0.1)" />
                </View>

                <View style={styles.botAvatar}>
                    <View style={styles.botFace}><Text style={{ fontSize: 20 }}>🤖</Text></View>
                </View>

                <View style={{ flex: 1, paddingLeft: 16 }}>
                    <Text style={styles.proTitle}>Upgrade to Pro!</Text>

                    <View style={styles.benefitRow}>
                        <Ionicons name="checkmark-circle" size={16} color="#FFF" />
                        <Text style={styles.benefitText}>24/7 Live & Fast Support</Text>
                    </View>
                    <View style={styles.benefitRow}>
                        <Ionicons name="checkmark-circle" size={16} color="#FFF" />
                        <Text style={styles.benefitText}>Unlimited Conversations!</Text>
                    </View>

                    <View style={styles.goProBtn}>
                        <Text style={styles.goProText}>Go Pro, Now!</Text>
                    </View>
                </View>
            </TouchableOpacity>

            {/* Bottom Spacer for Dock */}
            <View style={{ height: 100 }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F1410',
        paddingHorizontal: Spacing.l,
    },
    header: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 60, marginBottom: 40,
    },
    circleBtn: {
        width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center'
    },
    headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    badge: { backgroundColor: '#8CAD65', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
    badgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },

    heroContent: { alignItems: 'center', marginBottom: 50 },
    heroCount: { fontSize: 80, fontWeight: 'bold', color: '#FFF', fontFamily: Typography.heading, lineHeight: 90 },
    heroLabel: { color: '#FFF', fontSize: 16, marginBottom: 30 },

    statsRow: { flexDirection: 'row', alignItems: 'center', gap: 30 },
    statItem: { alignItems: 'center', gap: 4 },
    statVal: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    statLabel: { color: '#AAA', fontSize: 12 },
    divider: { width: 1, height: 30, backgroundColor: 'rgba(255,255,255,0.2)' },

    actionRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 20, marginBottom: 50 },
    actionBtn: { width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center', elevation: 5 },
    mainAddBtn: {
        width: 90, height: 90, borderRadius: 45, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center',
        shadowColor: "#000", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20, elevation: 10, zIndex: 10
    },

    proCard: {
        backgroundColor: '#3E4A35', // Dark Olive Green
        borderRadius: 30,
        height: 160,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        overflow: 'hidden',
        position: 'relative',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)'
    },
    proDecor: { position: 'absolute', right: -20, bottom: -20 },
    botAvatar: {
        width: 60, height: 80, justifyContent: 'flex-end',
    },
    botFace: {
        width: 50, height: 50, borderRadius: 25, backgroundColor: '#8CAD65', alignItems: 'center', justifyContent: 'center',
        borderWidth: 2, borderColor: '#FFF'
    },
    proTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
    benefitRow: { flexDirection: 'row', gap: 6, marginBottom: 4 },
    benefitText: { color: '#EEE', fontSize: 10 },
    goProBtn: {
        backgroundColor: '#FFF', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, alignSelf: 'flex-start', marginTop: 12
    },
    goProText: { color: '#2E3B28', fontWeight: 'bold', fontSize: 12 }
});
