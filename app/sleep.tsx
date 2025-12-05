import { Spacing } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

// Mock Data for Sleep Stages
const sleepStages = [
    { label: 'Awake', hours: 0.5, color: '#FF8C60' },
    { label: 'REM', hours: 1.5, color: '#4FC3F7' },
    { label: 'Light', hours: 4.2, color: '#8CAD65' },
    { label: 'Deep', hours: 1.8, color: '#5D3FD3' },
];

export default function SleepScreen() {
    return (
        <View style={styles.container}>
            {/* Header Area */}
            <View style={styles.header}>
                <View style={styles.navBar}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.circleBtn}>
                        <Ionicons name="chevron-back" size={24} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Sleep Quality</Text>
                    <View style={styles.badge}><Text style={styles.badgeText}>INSOMNIAC</Text></View>
                </View>

                {/* Hero Circle Gauge */}
                <View style={styles.heroContent}>
                    <View style={styles.gaugeContainer}>
                        <Svg width="180" height="180">
                            {/* Background Arc */}
                            <Circle cx="90" cy="90" r="80" stroke="#3E2D23" strokeWidth="15" />
                            {/* Progress Arc ~80% */}
                            <Circle
                                cx="90" cy="90" r="80"
                                stroke="#5D3FD3" // Deep Purple
                                strokeWidth="15"
                                strokeDasharray={`${2 * Math.PI * 80 * 0.75} ${2 * Math.PI * 80}`}
                                strokeLinecap="round"
                                transform="rotate(-90 90 90)"
                            />
                        </Svg>
                        <View style={styles.gaugeInner}>
                            <Ionicons name="moon" size={32} color="#FFF" />
                            <Text style={styles.gaugeVal}>85</Text>
                            <Text style={styles.gaugeLabel}>Splendid</Text>
                        </View>
                    </View>
                    <Text style={styles.sleepTime}>7h 42m Total Sleep</Text>
                </View>

                {/* Wavy Cutoff */}
                <Svg height="60" width={width} style={{ position: 'absolute', bottom: 0 }}>
                    <Path d={`M0,60 L${width},60 L${width},20 Q${width / 2},80 0,20 Z`} fill="#1F1610" />
                </Svg>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Alarm Card */}
                <View style={styles.alarmCard}>
                    <View>
                        <Text style={styles.cardTitle}>Wake Up Alarm</Text>
                        <Text style={styles.alarmTime}>07:30 AM</Text>
                    </View>
                    <TouchableOpacity style={[styles.toggleBtn, { backgroundColor: '#8CAD65' }]}>
                        <View style={[styles.toggleCircle, { alignSelf: 'flex-end' }]} />
                    </TouchableOpacity>
                </View>

                {/* Stages Chart */}
                <Text style={styles.sectionTitle}>Sleep Stages</Text>
                <View style={styles.chartCard}>
                    <View style={styles.chartRow}>
                        {sleepStages.map((s, i) => (
                            <View key={i} style={styles.barGroup}>
                                <View style={[styles.bar, { height: s.hours * 25, backgroundColor: s.color }]} />
                                <Text style={styles.barLabel}>{s.label}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Recommendation */}
                <Text style={styles.sectionTitle}>Insights</Text>
                <View style={styles.insightCard}>
                    <View style={styles.iconBox}>
                        <Ionicons name="fitness-outline" size={24} color="#FBC02D" />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.insightTitle}>Deep Sleep Goal</Text>
                        <Text style={styles.insightSub}>You reached 22% deep sleep. Try to avoid caffeine after 4PM.</Text>
                    </View>
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F1610',
    },
    header: {
        height: 380,
        backgroundColor: '#2C211B',
        position: 'relative',
        paddingTop: 60,
    },
    navBar: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.l,
    },
    circleBtn: {
        width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center'
    },
    headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    badge: { backgroundColor: '#3E2D23', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: '#5D3FD3' },
    badgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
    heroContent: { alignItems: 'center', marginTop: 30 },
    gaugeContainer: { alignItems: 'center', justifyContent: 'center', width: 180, height: 180 },
    gaugeInner: { position: 'absolute', alignItems: 'center' },
    gaugeVal: { fontSize: 48, fontWeight: 'bold', color: '#FFF', lineHeight: 56 },
    gaugeLabel: { color: '#AAA', fontSize: 12, textTransform: 'uppercase' },
    sleepTime: { color: '#FFF', fontSize: 20, fontWeight: 'bold', marginTop: 20 },

    scrollContent: { padding: Spacing.l },
    alarmCard: {
        backgroundColor: '#332419', borderRadius: 24, padding: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24,
    },
    cardTitle: { color: '#AAA', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase' },
    alarmTime: { color: '#FFF', fontSize: 32, fontWeight: 'bold' },
    toggleBtn: { width: 50, height: 30, borderRadius: 15, justifyContent: 'center', paddingHorizontal: 2 },
    toggleCircle: { width: 26, height: 26, borderRadius: 13, backgroundColor: '#FFF' },

    sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
    chartCard: { backgroundColor: '#332419', borderRadius: 24, padding: 24, marginBottom: 24 },
    chartRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 150 },
    barGroup: { alignItems: 'center', gap: 8 },
    bar: { width: 40, borderRadius: 10, minHeight: 20 },
    barLabel: { color: '#AAA', fontSize: 12 },

    insightCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#332419', padding: 16, borderRadius: 20, gap: 16 },
    iconBox: { width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(251, 192, 45, 0.1)', alignItems: 'center', justifyContent: 'center' },
    insightTitle: { color: '#FFF', fontWeight: 'bold', marginBottom: 4 },
    insightSub: { color: '#AAA', fontSize: 12, lineHeight: 18 },
});
