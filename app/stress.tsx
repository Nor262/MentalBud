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
const chartHeight = 200;
const chartWidth = width - 40;
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
            {/* Header Area */}
            <View style={styles.orangeHeader}>
                <Svg height="100%" width={width} style={StyleSheet.absoluteFillObject}>
                    {/* Wavy Background Pattern */}
                    <Path d={`M0,150 Q${width / 2},200 ${width},100 L${width},0 L0,0 Z`} fill="#F57F17" opacity={0.8} />
                    <Path d={`M0,100 Q${width / 2},150 ${width},50 L${width},0 L0,0 Z`} fill="#F9A825" opacity={0.6} />
                </Svg>

                <View style={styles.navBar}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.circleBtn}>
                        <Ionicons name="chevron-back" size={24} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Stress Level</Text>
                    <View style={styles.badge}><Text style={styles.badgeText}>WEEKLY</Text></View>
                </View>

                <View style={styles.heroContent}>
                    <View style={styles.levelCircle}>
                        <Text style={styles.levelVal}>3</Text>
                        <Text style={styles.levelLabel}>Normal</Text>
                    </View>
                    <Text style={styles.heroSub}>You're doing great!</Text>
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
                                    r="4"
                                    fill="#FFF"
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

                <View style={styles.card}>
                    <View style={styles.cardIconFn}><Ionicons name="flash" size={20} color="#FBC02D" /></View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.cardTitle}>Main Stressor</Text>
                        <Text style={styles.cardSub}>Work deadline on Thursday caused a spike.</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.cardIconFn}><Ionicons name="fitness" size={20} color="#8CAD65" /></View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.cardTitle}>Relief Method</Text>
                        <Text style={styles.cardSub}>Morning yoga helped reduce levels by 20%.</Text>
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
    orangeHeader: {
        height: 300,
        backgroundColor: '#FBC02D',
        position: 'relative',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        overflow: 'hidden',
    },
    navBar: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        paddingHorizontal: Spacing.l, paddingTop: 60,
    },
    circleBtn: {
        width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)', alignItems: 'center', justifyContent: 'center'
    },
    headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    badge: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
    badgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
    heroContent: { alignItems: 'center', marginTop: 20 },
    levelCircle: {
        width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#FFF',
    },
    levelVal: { fontSize: 32, fontWeight: 'bold', color: '#FFF' },
    levelLabel: { fontSize: 10, color: '#FFF', fontWeight: 'bold' },
    heroSub: { color: '#FFF', marginTop: 10, fontSize: 16, fontWeight: '600' },
    scrollContent: {
        padding: Spacing.l,
    },
    chartCard: {
        backgroundColor: '#332419',
        borderRadius: 24,
        padding: 20,
        marginBottom: 24,
        marginTop: 10,
    },
    chartTitle: { color: '#FFF', fontWeight: 'bold', marginBottom: 16 },
    chartContainer: { alignItems: 'center' },
    xAxis: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
    dayLabel: { color: '#AAA', fontSize: 12, width: 30, textAlign: 'center' },
    sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
    card: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: '#332419', padding: 16, borderRadius: 20, marginBottom: 12,
    },
    cardIconFn: {
        width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.05)',
        alignItems: 'center', justifyContent: 'center', marginRight: 16,
    },
    cardTitle: { color: '#FFF', fontWeight: 'bold', marginBottom: 4 },
    cardSub: { color: '#AAA', fontSize: 13 },
});
