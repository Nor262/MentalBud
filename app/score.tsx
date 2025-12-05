import { Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

// Mock Data for Score History
const scoreHistory = [
    { date: 'SEP 12', label: 'Anxious, Depressed', sub: 'Please do 25m Mindfulness.', score: 48, color: '#D84315' }, // Orange/Red
    { date: 'SEP 11', label: 'Very Happy', sub: 'No Recommendation.', score: 95, color: '#8CAD65' }, // Green
    { date: 'SEP 10', label: 'Neutral', sub: 'Take a short walk.', score: 65, color: '#FBC02D' }, // Yellow
];

// Circular Progress Component
const ScoreCircle = ({ score, color }: { score: number, color: string }) => {
    const r = 18;
    const c = 2 * Math.PI * r;
    const offset = c - (score / 100) * c;
    return (
        <View style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}>
            <Svg width="44" height="44">
                <Circle cx="22" cy="22" r={r} stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
                <Circle
                    cx="22" cy="22" r={r}
                    stroke={color}
                    strokeWidth="4"
                    strokeDasharray={`${c} ${c}`}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform={`rotate(-90 22 22)`}
                />
            </Svg>
            <Text style={{ position: 'absolute', color: '#FFF', fontSize: 10, fontWeight: 'bold' }}>{score}</Text>
        </View>
    )
}

export default function FreudScoreScreen() {
    return (
        <View style={styles.container}>
            {/* Green Header Area */}
            <View style={styles.greenHeader}>
                {/* Contour Lines overlay */}
                <Svg height="100%" width={width} style={StyleSheet.absoluteFillObject}>
                    <Path d={`M0,100 Q${width / 4},50 ${width / 2},150 T${width},100`} stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
                    <Path d={`M0,200 Q${width / 3},150 ${width / 1.5},250 T${width},200`} stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
                    <Path d={`M${width / 2},0 Q${width / 1.5},100 ${width},50`} stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
                </Svg>

                <View style={styles.navBar}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.circleBtn}>
                        <Ionicons name="chevron-back" size={24} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Freud Score</Text>
                    <View style={styles.badge}><Text style={styles.badgeText}>NORMAL</Text></View>
                </View>

                <View style={styles.scoreHero}>
                    <Text style={styles.bigScore}>80</Text>
                    <Text style={styles.congrats}>Congratulations! You are{'\n'}mentally healthy.</Text>
                </View>

                {/* FAB centered on the curve */}
                <View style={styles.fabContainer}>
                    <TouchableOpacity onPress={() => { }} style={styles.brownFab}>
                        <Ionicons name="add" size={32} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Dark Bottom Section */}
            <View style={styles.historySection}>
                {/* SVG Curve for the top of the dark section */}
                <Svg height="60" width={width} style={{ position: 'absolute', top: -40 }}>
                    <Path
                        d={`M0,40 Q${width / 2},-40 ${width},40 L${width},60 L0,60 Z`}
                        fill="#1F1410"
                    />
                </Svg>

                <View style={styles.historyHeader}>
                    <Text style={styles.sectionTitle}>Mental Score History</Text>
                    <Ionicons name="options-outline" size={20} color="#8D6E63" />
                </View>

                <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                    {scoreHistory.map((item, idx) => (
                        <View key={idx} style={styles.historyCard}>
                            <View style={styles.dateBox}>
                                <Text style={styles.month}>{item.date.split(' ')[0]}</Text>
                                <Text style={styles.day}>{item.date.split(' ')[1]}</Text>
                            </View>
                            <View style={{ flex: 1, paddingHorizontal: 12 }}>
                                <Text style={styles.cardTitle}>{item.label}</Text>
                                <Text style={styles.cardSub}>{item.sub}</Text>
                            </View>
                            <ScoreCircle score={item.score} color={item.color} />
                        </View>
                    ))}
                </ScrollView>


            </View>
            {/* The Tab Bar Dock will sit on top of this at the bottom via absolute positioning in the layout, so we need padding in the scrollview */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F1610',
    },
    greenHeader: {
        height: '55%',
        backgroundColor: '#8CAD65', // Sage Green
        position: 'relative',
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
    scoreHero: { alignItems: 'center', justifyContent: 'center', marginTop: 40 },
    bigScore: { fontSize: 96, fontWeight: 'bold', color: '#FFF', fontFamily: Typography.heading },
    congrats: { textAlign: 'center', color: '#FFF', fontSize: 16, opacity: 0.9, lineHeight: 24 },
    fabContainer: {
        position: 'absolute', bottom: -28, width: '100%', alignItems: 'center', zIndex: 20
    },
    brownFab: {
        width: 70, height: 70, borderRadius: 35, backgroundColor: '#5D4037', // Brown
        alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: '#1F1410',
    },
    historySection: {
        flex: 1,
        backgroundColor: '#1F1610',
        paddingHorizontal: Spacing.l,
        paddingTop: 20,
    },
    historyHeader: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20,
    },
    sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    historyCard: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: '#332419', padding: 16, borderRadius: 20, marginBottom: 12,
    },
    dateBox: {
        alignItems: 'center', paddingRight: 12, borderRightWidth: 1, borderRightColor: '#44352D',
    },
    month: { color: '#AAA', fontSize: 10, fontWeight: 'bold' },
    day: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    cardTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 15, marginBottom: 4 },
    cardSub: { color: '#AAA', fontSize: 11 },
});
