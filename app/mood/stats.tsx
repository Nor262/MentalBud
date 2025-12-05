import { Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

const MoodFace = ({ mood }: { mood: number }) => {
    // 0 = Sad, 0.5 = Neutral, 1 = Happy
    let iconName = "happy";
    if (mood < 0.3) iconName = "sad";
    else if (mood < 0.7) iconName = "remove"; // Neutral-ish line

    return <Ionicons name={iconName as any} size={60} color="#5D4037" />;
};

export default function MoodStatsScreen() {
    const [sliderVal, setSliderVal] = useState(0.5);

    return (
        <View style={styles.container}>
            {/* Header Area */}
            <View style={styles.header}>
                <View style={styles.navBar}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.circleBtn}>
                        <Ionicons name="chevron-back" size={24} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Mood</Text>
                    <View style={styles.badge}><Text style={styles.badgeText}>LEVEL 3</Text></View>
                </View>

                {/* Mood Hero */}
                <View style={styles.heroContent}>
                    <Text style={styles.heroSub}>Your mood is</Text>
                    <Text style={styles.heroTitle}>Neutral</Text>

                    {/* Face Slider Display */}
                    <View style={styles.faceCircle}>
                        <MoodFace mood={sliderVal} />
                    </View>

                    {/* Use arrows to simulate the 'slider' visual from current image, or actual slider */}
                    <View style={styles.sliderRow}>
                        <Ionicons name="chevron-back" size={20} color="#AAA" />
                        <View style={{ flex: 1, paddingHorizontal: 20 }}>
                            {/* Dummy indicators */}
                            <View style={{ height: 4, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 2 }} />
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#AAA" />
                    </View>
                </View>

                <Svg height="100%" width={width} style={[StyleSheet.absoluteFillObject, { zIndex: -1 }]}>
                    <Path d={`M0,350 Q${width / 2},450 ${width},350 L${width},0 L0,0 Z`} fill="#3E2D23" />
                </Svg>
            </View>

            {/* Stats Section */}
            <View style={styles.statsSection}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Mood Statistics</Text>
                    <Ionicons name="ellipsis-vertical" size={16} color="#AAA" />
                </View>

                {/* Bar Chart with Faces */}
                <View style={styles.chartContainer}>
                    {/* Grid Lines */}
                    {[1, 2, 3].map((_, i) => (
                        <View key={i} style={styles.gridLine} />
                    ))}

                    <View style={styles.barsRow}>
                        {/* Bars: Height %, Color, FaceType */}
                        {[
                            { h: '40%', c: '#8D6E63', f: 'sad' },
                            { h: '30%', c: '#5D4037', f: 'sad' },
                            { h: '70%', c: '#FBC02D', f: 'happy' }, // Yellow
                            { h: '90%', c: '#8CAD65', f: 'happy' }, // Green
                            { h: '50%', c: '#FF8A65', f: 'sad' }, // Orange
                            { h: '20%', c: '#5D4037', f: 'sad' },
                            { h: '40%', c: '#8D6E63', f: 'sad' },
                        ].map((item, i) => (
                            <View key={i} style={styles.barWrapper}>
                                <View style={[styles.bar, { height: item.h, backgroundColor: item.c }]}>
                                    <View style={styles.barFace}>
                                        <Ionicons
                                            name={item.f === 'happy' ? 'happy' : 'sad'}
                                            size={14}
                                            color={item.h === '90%' || item.h === '70%' ? '#FFF' : 'rgba(255,255,255,0.5)'}
                                        />
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Add Entry FAB */}
                <View style={styles.fabContainer}>
                    <TouchableOpacity onPress={() => router.push('/mood/new')} style={styles.greenFab}>
                        <Ionicons name="add" size={32} color="#FFF" />
                    </TouchableOpacity>
                </View>

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
        position: 'relative',
    },
    navBar: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        paddingHorizontal: Spacing.l, paddingTop: 60, zIndex: 10,
    },
    circleBtn: {
        width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)', alignItems: 'center', justifyContent: 'center'
    },
    headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    badge: { backgroundColor: '#8D6E63', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
    badgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
    heroContent: { alignItems: 'center', marginTop: 20, zIndex: 10 },
    heroSub: { color: '#AAA', fontSize: 16 },
    heroTitle: { fontSize: 48, fontWeight: 'bold', color: '#FFF', fontFamily: Typography.heading, marginVertical: 4 },
    faceCircle: {
        width: 120, height: 120, borderRadius: 60, backgroundColor: '#C8A087',
        alignItems: 'center', justifyContent: 'center',
        marginBottom: 20, marginTop: 10,
    },
    sliderRow: { flexDirection: 'row', alignItems: 'center', width: '60%' },
    statsSection: {
        flex: 1,
        backgroundColor: '#1F1610',
        paddingHorizontal: Spacing.l,
        paddingTop: 20,
    },
    sectionHeader: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20,
    },
    sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    chartContainer: {
        height: 200, justifyContent: 'flex-end', position: 'relative',
    },
    gridLine: {
        width: '100%', height: 1, backgroundColor: 'rgba(255,255,255,0.05)', marginBottom: 50,
    },
    barsRow: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end',
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 200,
    },
    barWrapper: {
        width: 30, height: '100%', justifyContent: 'flex-end', alignItems: 'center',
    },
    bar: {
        width: '100%', borderTopLeftRadius: 15, borderTopRightRadius: 15, alignItems: 'center', paddingTop: 6,
    },
    barFace: {
        width: 20, height: 20, borderRadius: 10, backgroundColor: 'rgba(0,0,0,0.1)', alignItems: 'center', justifyContent: 'center',
    },
    fabContainer: {
        position: 'absolute', bottom: 100, width: '100%', alignItems: 'center',
    },
    greenFab: {
        width: 60, height: 60, borderRadius: 30, backgroundColor: '#8CAD65',
        alignItems: 'center', justifyContent: 'center',
        shadowColor: "#8CAD65", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5, shadowRadius: 10, elevation: 5,
    },
});
