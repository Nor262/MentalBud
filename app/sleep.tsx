import { Spacing } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { LinearGradient, Path, Stop } from 'react-native-svg';

const { width } = Dimensions.get('window');

// Mock Data for Sleep Stages
const sleepStages = [
    { label: 'Awake', hours: 0.5, color: '#FF8C60' },
    { label: 'REM', hours: 1.5, color: '#4FC3F7' },
    { label: 'Light', hours: 4.2, color: '#8CAD65' },
    { label: 'Deep', hours: 1.8, color: '#5D3FD3' }, // Deep Purple
];

const totalHours = 8.0;

export default function SleepScreen() {
    return (
        <View style={styles.container}>
            {/* Header Area - Midnight Blue for Sleep Theme */}
            <View style={styles.header}>
                <Svg height="100%" width={width} style={StyleSheet.absoluteFillObject}>
                    {/* Night Sky / Wavy Background */}
                    <LinearGradient id="nightGrad" x1="0" y1="0" x2="0" y2="1">
                        <Stop offset="0" stopColor="#1A237E" stopOpacity="1" />
                        <Stop offset="1" stopColor="#311B92" stopOpacity="1" />
                    </LinearGradient>
                    <Path d={`M0,0 L${width},0 L${width},250 Q${width / 2},320 0,250 Z`} fill="url(#nightGrad)" />
                    {/* Stars or subtle dots could go here */}
                    <Path d={`M50,50 L52,52 M${width - 50},80 L${width - 48},82`} stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                </Svg>

                <View style={styles.navBar}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.circleBtn}>
                        <Ionicons name="chevron-back" size={24} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Sleep Monitor</Text>
                    <TouchableOpacity style={styles.circleBtn}>
                        <Ionicons name="moon" size={20} color="#FFF" />
                    </TouchableOpacity>
                </View>

                <View style={styles.heroContent}>
                    <View style={styles.scoreRing}>
                        <Text style={styles.scoreVal}>85</Text>
                        <Text style={styles.scoreLabel}>Sleep Score</Text>
                    </View>
                    <Text style={styles.heroSub}>Great sleep quality!</Text>
                    <Text style={styles.heroTime}>7h 42m Total Time</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Alarm / Wake Up Card */}
                <View style={styles.alarmCard}>
                    <View>
                        <Text style={styles.cardTitle}>Wake Up Alarm</Text>
                        <Text style={styles.alarmTime}>07:30 AM</Text>
                    </View>
                    <TouchableOpacity style={styles.toggleBtn}>
                        <View style={styles.toggleKnob} />
                    </TouchableOpacity>
                </View>

                {/* Sleep Stages Chart */}
                <Text style={styles.sectionTitle}>Sleep Stages</Text>
                <View style={styles.chartCard}>
                    <View style={styles.chartContainer}>
                        {sleepStages.map((stage, idx) => (
                            <View key={idx} style={styles.barGroup}>
                                <Text style={styles.barLabel}>{stage.hours}h</Text>
                                <View style={[styles.barTrack, { height: 120 }]}>
                                    <View style={[styles.barFill, { height: (stage.hours / 5) * 100 + '%', backgroundColor: stage.color }]} />
                                </View>
                                <Text style={styles.barTitle}>{stage.label}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Insights */}
                <Text style={styles.sectionTitle}>Insights</Text>
                <View style={styles.card}>
                    <Ionicons name="bulb-outline" size={24} color="#FBC02D" style={{ marginRight: 16 }} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.textTitle}>Deep Sleep Goal</Text>
                        <Text style={styles.textSub}>You reached 22% deep sleep, which is optimal for recovery.</Text>
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
        height: 340,
        position: 'relative',
    },
    navBar: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        paddingHorizontal: Spacing.l, paddingTop: 60,
    },
    circleBtn: {
        width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center'
    },
    headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    heroContent: { alignItems: 'center', marginTop: 30 },
    scoreRing: {
        width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: '#4FC3F7',
        alignItems: 'center', justifyContent: 'center', marginBottom: 12,
        backgroundColor: 'rgba(255,255,255,0.1)'
    },
    scoreVal: { fontSize: 36, fontWeight: 'bold', color: '#FFF' },
    scoreLabel: { fontSize: 9, color: '#AAA', textTransform: 'uppercase', letterSpacing: 1 },
    heroSub: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    heroTime: { color: '#AAA', fontSize: 14, marginTop: 4 },

    scrollContent: {
        padding: Spacing.l,
        marginTop: -40, // Overlap effect
    },
    alarmCard: {
        backgroundColor: '#332419',
        borderRadius: 24,
        padding: 24,
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 24,
        shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5,
    },
    cardTitle: { color: '#AAA', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 4 },
    alarmTime: { color: '#FFF', fontSize: 32, fontWeight: 'bold' },
    toggleBtn: { width: 50, height: 30, borderRadius: 15, backgroundColor: '#8CAD65', padding: 2, justifyContent: 'center' },
    toggleKnob: { width: 26, height: 26, borderRadius: 13, backgroundColor: '#FFF', alignSelf: 'flex-end' },

    sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
    chartCard: {
        backgroundColor: '#332419',
        borderRadius: 24,
        padding: 20,
        marginBottom: 24,
    },
    chartContainer: {
        flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', height: 150,
    },
    barGroup: { alignItems: 'center' },
    barTrack: { width: 12, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 6, justifyContent: 'flex-end', overflow: 'hidden', marginBottom: 8 },
    barFill: { width: '100%', borderRadius: 6 },
    barLabel: { color: '#AAA', fontSize: 10, marginBottom: 4 },
    barTitle: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },

    card: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: '#332419', padding: 20, borderRadius: 20, marginBottom: 12,
    },
    textTitle: { color: '#FFF', fontWeight: 'bold', marginBottom: 4, fontSize: 15 },
    textSub: { color: '#AAA', fontSize: 13, lineHeight: 18 },
});
