import { Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

// Reusing Mood Images for History
const MOOD_IMAGES = [
    require('../assets/images/Depressed.png'),
    require('../assets/images/Sad.png'),
    require('../assets/images/Neutral.png'),
    require('../assets/images/Happy.png'),
    require('../assets/images/Overjoyed.png'),
];

export default function ScoreInsightsScreen() {

    // Mock Data for Bar Chart
    // Assuming alternating positive/negative for demo or random
    const barData = Array.from({ length: 14 }).map((_, i) => ({
        h: 40 + Math.random() * 50, // height %
        type: Math.random() > 0.3 ? 'positive' : 'negative'
    }));

    // Mock Data for Mood History
    const weekData = [
        { day: 'Mon', joy: 4 }, // Overjoyed
        { day: 'Tue', joy: 4 },
        { day: 'Wed', joy: 0 }, // Depressed
        { day: 'Thu', joy: 3 }, // Happy
        { day: 'Fri', joy: 1 }, // Sad
        { day: 'Sat', joy: 2 }, // Neutral
        { day: 'Sun', joy: 3 },
    ];

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.circleBtn}>
                    <Ionicons name="chevron-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.circleBtn}>
                    <Ionicons name="help" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Freud Score</Text>
                <Text style={styles.subtitle}>See your mental score insights</Text>

                {/* Chart Card */}
                <View style={styles.chartCard}>
                    <View style={styles.chartHeader}>
                        <View style={styles.legend}>
                            <View style={[styles.dot, { backgroundColor: '#8CAD65' }]} /><Text style={styles.legendText}>Positive</Text>
                            <View style={[styles.dot, { backgroundColor: '#D84315' }]} /><Text style={styles.legendText}>Negative</Text>
                        </View>
                        <TouchableOpacity style={styles.dropdown}>
                            <Ionicons name="calendar-outline" size={14} color="#FFF" style={{ marginRight: 4 }} />
                            <Text style={styles.dropdownText}>Monthly</Text>
                            <Ionicons name="chevron-down" size={14} color="#FFF" />
                        </TouchableOpacity>
                    </View>

                    {/* Bars */}
                    <View style={styles.barsContainer}>
                        {barData.map((d, i) => (
                            <View key={i} style={styles.barTrack}>
                                <View style={[
                                    styles.bar,
                                    { height: `${d.h}%`, backgroundColor: d.type === 'positive' ? '#8CAD65' : '#D84315' },
                                    d.type === 'negative' && { opacity: 0.8 } // Slightly different shade?
                                ]} />
                            </View>
                        ))}
                    </View>
                    <View style={styles.dateRow}>
                        <Text style={styles.dateLabel}>09 Jan</Text>
                        <Text style={styles.dateLabel}>09 Feb</Text>
                    </View>
                </View>

                {/* Mood History */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Mood History</Text>
                    <Ionicons name="ellipsis-horizontal" size={20} color="#8D6E63" />
                </View>

                <View style={styles.moodRow}>
                    {weekData.map((d, i) => (
                        <View key={i} style={styles.dayCol}>
                            <View style={styles.moodCircle}>
                                <Image source={MOOD_IMAGES[d.joy]} style={{ width: 32, height: 32, resizeMode: 'contain' }} />
                            </View>
                            <Text style={styles.dayLabel}>{d.day}</Text>
                        </View>
                    ))}
                </View>

                {/* Recommendations */}
                <TouchableOpacity style={styles.recCard}>
                    <View style={styles.heartBox}>
                        <Ionicons name="heart" size={24} color="#FFF" />
                    </View>
                    <View style={{ flex: 1, paddingHorizontal: 12 }}>
                        <Text style={styles.recTitle}>Recommendations</Text>
                    </View>
                    <Text style={styles.recCount}>78+ </Text>
                    <Ionicons name="chevron-forward" size={20} color="#A1887F" />
                </TouchableOpacity>

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Bottom FAB (Visual only matching image) */}
            <View style={styles.fabContainer}>
                <TouchableOpacity style={styles.fab}>
                    <Ionicons name="add" size={32} color="#FFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F1410',
    },
    header: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        paddingHorizontal: Spacing.l, paddingTop: 60, paddingBottom: 20
    },
    circleBtn: {
        width: 44, height: 44, borderRadius: 22,
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center', justifyContent: 'center'
    },
    content: {
        paddingHorizontal: Spacing.l,
    },
    title: {
        color: '#FFF', fontSize: 24, fontWeight: 'bold', fontFamily: Typography.heading, marginBottom: 4
    },
    subtitle: {
        color: '#AAA', fontSize: 14, marginBottom: 24
    },
    chartCard: {
        backgroundColor: '#2C211B', borderRadius: 24, padding: 20, marginBottom: 24,
    },
    chartHeader: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20
    },
    legend: {
        flexDirection: 'row', gap: 12, alignItems: 'center'
    },
    dot: { width: 8, height: 8, borderRadius: 4 },
    legendText: { color: '#CCC', fontSize: 12, marginLeft: 4 },
    dropdown: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)',
        paddingHorizontal: 10, paddingVertical: 6, borderRadius: 16
    },
    dropdownText: { color: '#FFF', fontSize: 12, marginRight: 4 },
    barsContainer: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 120, marginBottom: 10
    },
    barTrack: {
        width: 12, height: '100%', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 6,
        justifyContent: 'flex-end', overflow: 'hidden'
    },
    bar: {
        width: '100%', borderRadius: 6
    },
    dateRow: {
        flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', paddingTop: 10
    },
    dateLabel: { color: '#AAA', fontSize: 10 },
    sectionHeader: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16
    },
    sectionTitle: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
    moodRow: {
        flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24
    },
    dayCol: { alignItems: 'center', gap: 8 },
    moodCircle: {
        width: 40, height: 40, alignItems: 'center', justifyContent: 'center'
    },
    dayLabel: { color: '#AAA', fontSize: 10, fontWeight: 'bold' },
    recCard: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: '#2C211B', padding: 16, borderRadius: 20
    },
    heartBox: {
        width: 48, height: 48, borderRadius: 16, backgroundColor: '#3E4935', alignItems: 'center', justifyContent: 'center'
    },
    recTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
    recCount: { color: '#AAA', fontSize: 12 },
    fabContainer: {
        position: 'absolute', bottom: 40, width: '100%', alignItems: 'center'
    },
    fab: {
        width: 60, height: 60, borderRadius: 30, backgroundColor: '#8CAD65',
        alignItems: 'center', justifyContent: 'center',
        shadowColor: "#8CAD65", shadowOpacity: 0.4, shadowRadius: 10, shadowOffset: { width: 0, height: 5 }
    }
});
