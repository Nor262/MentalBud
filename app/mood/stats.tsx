import { Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

// Mock Data matching the screenshot
const chartData = [
    { day: 'Mon', height: 60, color: '#5D4037', icon: 'sad' }, // Brown, low
    { day: 'Tue', height: 80, color: '#5D4037', icon: 'sad' },
    { day: 'Wed', height: 160, color: '#FDD835', icon: 'happy' }, // Yellow, high
    { day: 'Thu', height: 200, color: '#8CAD65', icon: 'happy' }, // Green, highest
    { day: 'Fri', height: 120, color: '#FF8C60', icon: 'sad' }, // Orange, medium
    { day: 'Sat', height: 50, color: '#5D4037', icon: 'sad' },
    { day: 'Sun', height: 90, color: '#5D4037', icon: 'sad' },
];

export default function MoodStatsScreen() {
    return (
        <View style={styles.container}>
            {/* Header with Wavy Background */}
            <View style={styles.header}>
                <Svg height="300" width={width} style={StyleSheet.absoluteFillObject}>
                    {/* concentric curves for background pattern */}
                    <Path d={`M${width / 2},150 Q${width},100 ${width},0 L0,0 L0,150 Q0,100 ${width / 2},150`} fill="#3E2D23" />
                    <Path d={`M${width / 2},300 Q${width},250 ${width},0 L0,0 L0,300 Q0,250 ${width / 2},300`} fill="#3E2D23" opacity={0.3} />
                    <Path d={`M0,0 L${width},0 L${width},450 Q${width / 2},550 0,450 Z`} fill="#3E2D23" opacity={0.5} />
                </Svg>

                <View style={styles.navBar}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.circleBtn}>
                        <Ionicons name="chevron-back" size={24} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Mood</Text>
                    <View style={styles.levelBadge}><Text style={styles.levelText}>LEVEL 3</Text></View>
                </View>

                <View style={styles.heroContent}>
                    <Text style={styles.heroSub}>Your mood is</Text>
                    <Text style={styles.heroTitle}>Neutral</Text>

                    <View style={styles.faceContainer}>
                        <Ionicons name="chevron-back" size={24} color="#AAA" />
                        <View style={styles.hugeFace}>
                            <Ionicons name="remove" size={80} color="#3E2D23" />
                        </View>
                        <Ionicons name="chevron-forward" size={24} color="#AAA" />
                    </View>
                </View>
            </View>

            <View style={styles.statsSection}>
                <View style={styles.statsHeader}>
                    <Text style={styles.statsTitle}>Mood Statistics</Text>
                    <Ionicons name="ellipsis-vertical" size={20} color="#666" />
                </View>

                {/* Bar Chart */}
                <View style={styles.chartArea}>
                    {/* Dashed Lines */}
                    <View style={styles.gridLines}>
                        <View style={styles.dashLine} />
                        <View style={styles.dashLine} />
                        <View style={styles.dashLine} />
                        <View style={styles.dashLine} />
                    </View>

                    <View style={styles.barsRow}>
                        {chartData.map((item, index) => (
                            <View key={index} style={styles.barCol}>
                                <View style={[styles.bar, { height: item.height, backgroundColor: item.color }]}>
                                    <View style={styles.barIcon}>
                                        <Ionicons name={item.icon as any} size={14} color="rgba(0,0,0,0.5)" />
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Floating Add Button overlapping the bottom nav area */}
                <TouchableOpacity style={styles.fab} onPress={() => router.push('/mood/new')}>
                    <Ionicons name="add" size={32} color="#FFF" />
                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F1610',
    },
    header: {
        height: '55%',
        backgroundColor: '#3E2D23',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        position: 'relative',
        overflow: 'hidden',
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Spacing.l,
        paddingTop: 60,
        zIndex: 10,
    },
    circleBtn: {
        width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)', alignItems: 'center', justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18, color: '#FFF', fontWeight: 'bold',
    },
    levelBadge: {
        paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#8D6E63', borderRadius: 20,
    },
    levelText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
    heroContent: {
        alignItems: 'center', marginTop: 40, zIndex: 10,
    },
    heroSub: { color: '#FFF', fontSize: 16 },
    heroTitle: { fontSize: 48, fontWeight: 'bold', color: '#FFF', fontFamily: Typography.heading, marginVertical: 10 },
    faceContainer: {
        flexDirection: 'row', alignItems: 'center', gap: 20, marginTop: 20,
    },
    hugeFace: {
        width: 120, height: 120, borderRadius: 60, backgroundColor: '#C8A087', alignItems: 'center', justifyContent: 'center',
    },
    statsSection: {
        flex: 1,
        padding: Spacing.l,
        backgroundColor: '#1F1610',
    },
    statsHeader: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20,
    },
    statsTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    chartArea: {
        height: 250,
        justifyContent: 'flex-end',
        position: 'relative',
    },
    gridLines: {
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'space-between',
    },
    dashLine: {
        height: 1, backgroundColor: 'rgba(255,255,255,0.1)', width: '100%', borderStyle: 'dashed', borderRadius: 1,
    },
    barsRow: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: '100%',
    },
    barCol: {
        width: 30, alignItems: 'center', justifyContent: 'flex-end', height: '100%',
    },
    bar: {
        width: 30, borderTopLeftRadius: 15, borderTopRightRadius: 15, alignItems: 'center', paddingTop: 8,
    },
    barIcon: {
        width: 20, height: 20, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.3)', alignItems: 'center', justifyContent: 'center'
    },
    fab: {
        position: 'absolute', bottom: -10, alignSelf: 'center',
        width: 70, height: 70, borderRadius: 35, backgroundColor: '#8CAD65',
        alignItems: 'center', justifyContent: 'center',
        shadowColor: "#000", shadowOpacity: 0.3, shadowRadius: 4, elevation: 5,
        borderWidth: 4, borderColor: '#2f2723'
    }
});
