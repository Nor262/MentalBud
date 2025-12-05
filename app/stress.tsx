import { Spacing } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, Defs, Line, LinearGradient, Path, Stop } from 'react-native-svg';

const { width } = Dimensions.get('window');

// Mock Data for Stress Chart (Last 7 Days)
const data = [4, 6, 3, 7, 5, 4, 3]; // Scale 1-10
const maxVal = 10;
const chartHeight = 180;
const chartWidth = width - 80; // adjusted for padding
const stepX = chartWidth / (data.length - 1);

// Generate Path String
const getPath = () => {
    let d = `M0,${chartHeight - (data[0] / maxVal) * chartHeight}`;
    data.forEach((val, i) => {
        const x = i * stepX;
        const y = chartHeight - (val / maxVal) * chartHeight;
        if (i === 0) return;
        // Bezier curve for smoothness
        const prevX = (i - 1) * stepX;
        const prevY = chartHeight - (data[i - 1] / maxVal) * chartHeight;
        const cp1x = prevX + (stepX / 2);
        const cp1y = prevY;
        const cp2x = x - (stepX / 2);
        const cp2y = y;
        d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${x},${y}`;
    });
    return d;
};

const getFillPath = () => {
    return `${getPath()} L${chartWidth},${chartHeight} L0,${chartHeight} Z`;
};

export default function StressScreen() {
    return (
        <View style={styles.container}>
            {/* Header Area - Deep Brown Base with Yellow/Orange Waves */}
            <View style={styles.header}>
                <Svg height="100%" width={width} style={StyleSheet.absoluteFillObject}>
                    <Path d={`M0,0 L${width},0 L${width},250 Q${width / 2},350 0,250 Z`} fill="#2C211B" />
                    {/* Decorative Wave */}
                    <Path d={`M0,200 Q${width / 2},300 ${width},200`} stroke="#FBC02D" strokeWidth="2" fill="none" opacity={0.3} />
                </Svg>

                <View style={styles.navBar}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.circleBtn}>
                        <Ionicons name="chevron-back" size={24} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Stress Level</Text>
                    <View style={styles.badge}><Text style={styles.badgeText}>WEEKLY</Text></View>
                </View>

                {/* Hero Circular Gauge */}
                <View style={styles.heroContent}>
                    <View style={styles.gaugeContainer}>
                        <Svg width="180" height="180">
                            {/* Background Circle */}
                            <Circle cx="90" cy="90" r="80" stroke="#3E2D23" strokeWidth="15" />
                            {/* Progress (3/10 = 30%) */}
                            <Circle
                                cx="90" cy="90" r="80"
                                stroke="#FBC02D" // Yellow Gold
                                strokeWidth="15"
                                strokeDasharray={`${2 * Math.PI * 80 * 0.3} ${2 * Math.PI * 80}`}
                                strokeLinecap="round"
                                transform="rotate(-90 90 90)"
                            />
                        </Svg>
                        <View style={styles.gaugeInner}>
                            <Ionicons name="flash" size={32} color="#FBC02D" />
                            <Text style={styles.gaugeVal}>3</Text>
                            <Text style={styles.gaugeLabel}>Normal</Text>
                        </View>
                    </View>
                    <Text style={styles.heroSub}>You're handling it well!</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Chart Section */}
                <View style={styles.chartCard}>
                    <Text style={styles.chartTitle}>Stress Overview</Text>
                    <View style={styles.chartContainer}>
                        <Svg width={chartWidth} height={chartHeight + 20}>
                            <Defs>
                                <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                                    <Stop offset="0" stopColor="#FBC02D" stopOpacity="0.5" />
                                    <Stop offset="1" stopColor="#FBC02D" stopOpacity="0" />
                                </LinearGradient>
                            </Defs>
                            {/* Grid Lines */}
                            <Line x1="0" y1="0" x2={chartWidth} y2="0" stroke="rgba(255,255,255,0.1)" strokeDasharray="4 4" />
                            <Line x1="0" y1={chartHeight / 2} x2={chartWidth} y2={chartHeight / 2} stroke="rgba(255,255,255,0.1)" strokeDasharray="4 4" />
                            <Line x1="0" y1={chartHeight} x2={chartWidth} y2={chartHeight} stroke="rgba(255,255,255,0.1)" />

                            {/* Chart Area Fill */}
                            <Path d={getFillPath()} fill="url(#grad)" />
                            {/* Chart Line */}
                            <Path d={getPath()} stroke="#FBC02D" strokeWidth="3" fill="none" />

                            {/* Dots */}
                            {data.map((val, i) => (
                                <Circle
                                    key={i}
                                    cx={i * stepX}
                                    cy={chartHeight - (val / maxVal) * chartHeight}
                                    r="5"
                                    fill="#1F1610" // Dark center
                                    stroke="#FBC02D"
                                    strokeWidth="2"
                                />
                            ))}
                        </Svg>
                    </View>
                    <View style={styles.xAxis}>
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => (
                            <Text key={i} style={styles.dayLabel}>{d}</Text>
                        ))}
                    </View>
                </View>

                {/* Analysis Cards */}
                <Text style={styles.sectionTitle}>Analysis</Text>

                <View style={styles.analysisRow}>
                    <View style={[styles.miniCard, { marginRight: 12, backgroundColor: '#3E2723' }]}>
                        <View style={[styles.miniIcon, { backgroundColor: 'rgba(251, 192, 45, 0.2)' }]}>
                            <Ionicons name="warning" size={20} color="#FBC02D" />
                        </View>
                        <Text style={styles.miniTitle}>Peak</Text>
                        <Text style={styles.miniVal}>Thu 14:00</Text>
                    </View>
                    <View style={[styles.miniCard, { backgroundColor: '#2E3B28' }]}>
                        <View style={[styles.miniIcon, { backgroundColor: 'rgba(140, 173, 101, 0.2)' }]}>
                            <Ionicons name="leaf" size={20} color="#8CAD65" />
                        </View>
                        <Text style={styles.miniTitle}>Lowest</Text>
                        <Text style={styles.miniVal}>Sat 09:00</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.cardIconFn}><Ionicons name="flash-outline" size={20} color="#FFF" /></View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.cardTitle}>Main Stressor</Text>
                        <Text style={styles.cardSub}>Work deadline on Thursday caused a spike.</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#AAA" />
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F1410',
    },
    header: {
        height: 380,
        position: 'relative',
        paddingTop: 60,
    },
    navBar: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        paddingHorizontal: Spacing.l,
    },
    circleBtn: {
        width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center'
    },
    headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    badge: { backgroundColor: '#3E2D23', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: '#FBC02D' },
    badgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },

    heroContent: { alignItems: 'center', marginTop: 30 },
    gaugeContainer: { alignItems: 'center', justifyContent: 'center', width: 180, height: 180 },
    gaugeInner: { position: 'absolute', alignItems: 'center' },
    gaugeVal: { fontSize: 48, fontWeight: 'bold', color: '#FFF', lineHeight: 56 },
    gaugeLabel: { color: '#AAA', fontSize: 12, textTransform: 'uppercase' },
    heroSub: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginTop: 20 },

    scrollContent: {
        padding: Spacing.l,
    },
    chartCard: {
        backgroundColor: '#332419',
        borderRadius: 24,
        padding: 24,
        marginBottom: 24,
    },
    chartTitle: { color: '#AAA', fontWeight: 'bold', marginBottom: 20, fontSize: 12, textTransform: 'uppercase' },
    chartContainer: { alignItems: 'center' },
    xAxis: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16, width: '100%' },
    dayLabel: { color: '#AAA', fontSize: 10, width: 30, textAlign: 'center' },

    sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginBottom: 16 },

    analysisRow: { flexDirection: 'row', marginBottom: 16 },
    miniCard: { flex: 1, padding: 16, borderRadius: 20, alignItems: 'center' },
    miniIcon: { width: 40, height: 40, borderRadius: 20, marginBottom: 8, alignItems: 'center', justifyContent: 'center' },
    miniTitle: { color: '#AAA', fontSize: 12, marginBottom: 4 },
    miniVal: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },

    card: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: '#332419', padding: 16, borderRadius: 20, marginBottom: 12,
    },
    cardIconFn: {
        width: 40, height: 40, borderRadius: 20, backgroundColor: '#FBC02D',
        alignItems: 'center', justifyContent: 'center', marginRight: 16,
    },
    cardTitle: { color: '#FFF', fontWeight: 'bold', marginBottom: 4 },
    cardSub: { color: '#AAA', fontSize: 13, lineHeight: 18 },
});
