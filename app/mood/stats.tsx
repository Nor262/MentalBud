import { Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const MOOD_IMAGES = [
    require('../../assets/images/Depressed.png'),
    require('../../assets/images/Sad.png'),
    require('../../assets/images/Neutral.png'),
    require('../../assets/images/Happy.png'),
    require('../../assets/images/Overjoyed.png'),
];

export default function MoodStatsScreen() {
    const [sliderVal, setSliderVal] = useState(0.5); // 0.5 = Neutral

    // Helper to get image index from slider (0 to 1)
    const getImageIndex = (val: number) => {
        if (val <= 0.1) return 0;
        if (val <= 0.35) return 1;
        if (val <= 0.6) return 2;
        if (val <= 0.85) return 3;
        return 4;
    };

    // Labels mapping
    const LABELS = ['Depressed', 'Sad', 'Neutral', 'Happy', 'Overjoyed'];
    const idx = getImageIndex(sliderVal);
    const currentLabel = LABELS[idx];

    return (
        <View style={styles.container}>
            {/* Header Area with Curved Background */}
            <View style={styles.headerContainer}>
                <Svg height="100%" width={width} style={StyleSheet.absoluteFillObject}>
                    <Defs>
                        <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                            <Stop offset="0" stopColor="#4E342E" stopOpacity="1" />
                            <Stop offset="1" stopColor="#3E2723" stopOpacity="1" />
                        </LinearGradient>
                    </Defs>
                    {/* Background Fill */}
                    <Path d={`M0,0 L${width},0 L${width},420 Q${width / 2},500 0,420 Z`} fill="url(#grad)" />

                    {/* Pattern Lines (Wood Grain / Ripples) */}
                    <Circle cx={width / 2} cy="0" r="100" stroke="rgba(255,255,255,0.03)" strokeWidth="20" fill="none" />
                    <Circle cx={width / 2} cy="0" r="200" stroke="rgba(255,255,255,0.03)" strokeWidth="20" fill="none" />
                    <Circle cx={width / 2} cy="0" r="300" stroke="rgba(255,255,255,0.03)" strokeWidth="20" fill="none" />
                    <Circle cx={width / 2} cy="0" r="400" stroke="rgba(255,255,255,0.03)" strokeWidth="20" fill="none" />
                    <Circle cx={width / 2} cy="0" r="500" stroke="rgba(255,255,255,0.03)" strokeWidth="20" fill="none" />
                </Svg>

                <View style={styles.navBar}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.circleBtn}>
                        <Ionicons name="chevron-back" size={24} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Mood</Text>
                    <View style={styles.badge}><Text style={styles.badgeText}>LEVEL 3</Text></View>
                </View>

                {/* Hero Content */}
                <View style={styles.heroContent}>
                    <Text style={styles.heroSub}>Your mood is</Text>
                    <Text style={styles.heroTitle}>{currentLabel}</Text>

                    {/* Face Display */}
                    <View style={styles.faceContainer}>
                        {/* Left Arrow */}
                        <TouchableOpacity onPress={() => setSliderVal(Math.max(0, sliderVal - 0.25))}>
                            <Ionicons name="chevron-back" size={24} color="rgba(255,255,255,0.5)" />
                        </TouchableOpacity>

                        <View style={styles.faceCircle}>
                            {/* Image with Fade support if possible, but for now direct switch */}
                            <Image
                                source={MOOD_IMAGES[idx]}
                                style={{ width: 120, height: 120, resizeMode: 'contain' }}
                            />
                        </View>

                        {/* Right Arrow */}
                        <TouchableOpacity onPress={() => setSliderVal(Math.min(1, sliderVal + 0.25))}>
                            <Ionicons name="chevron-forward" size={24} color="rgba(255,255,255,0.5)" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Statistics Section */}
            <View style={styles.statsSection}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Mood Statistics</Text>
                    <Ionicons name="ellipsis-vertical" size={20} color="#8D6E63" />
                </View>

                {/* Chart */}
                <View style={styles.chartContainer}>
                    {/* Dashed Grid Lines */}
                    {[1, 2, 3].map((_, i) => (
                        <View key={i} style={styles.gridLine} />
                    ))}

                    <View style={styles.barsRow}>
                        {/* Data */}
                        {[
                            { h: 30, c: '#8D6E63', f: 'sad' },   // Brown
                            { h: 20, c: '#5D4037', f: 'sad' },   // Dark Brown
                            { h: 60, c: '#FBC02D', f: 'happy' }, // Yellow
                            { h: 80, c: '#8CAD65', f: 'happy' }, // Green
                            { h: 45, c: '#FF8A65', f: 'sad' },   // Orange
                            { h: 25, c: '#5D4037', f: 'sad' },
                            { h: 35, c: '#8D6E63', f: 'sad' },
                        ].map((item, i) => (
                            <View key={i} style={styles.barWrapper}>
                                <View style={[styles.bar, { height: `${item.h}%`, backgroundColor: item.c }]}>
                                    <View style={styles.barFace}>
                                        {/* Simple face logic */}
                                        <View style={{ flexDirection: 'row', gap: 2 }}>
                                            <View style={styles.tinyEye} />
                                            <View style={styles.tinyEye} />
                                        </View>
                                        <View style={[
                                            styles.tinyMouth,
                                            item.f === 'happy' ? { borderBottomWidth: 1.5, borderTopWidth: 0, borderRadius: 0, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, height: 4 }
                                                : { borderTopWidth: 1.5, borderRadius: 5, height: 4 }
                                        ]} />
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F1410',
    },
    headerContainer: {
        height: 500, // Taller header to accommodate curve
        width: '100%',
        position: 'absolute',
        top: 0,
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Spacing.l,
        marginTop: 60,
    },
    circleBtn: {
        width: 44, height: 44, borderRadius: 22,
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)',
        alignItems: 'center', justifyContent: 'center'
    },
    headerTitle: {
        color: '#FFF', fontSize: 18, fontWeight: 'bold', fontFamily: Typography.heading,
    },
    badge: {
        backgroundColor: '#8D6E63', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
    },
    badgeText: {
        color: '#FFF', fontSize: 10, fontWeight: 'bold', letterSpacing: 1,
    },
    heroContent: {
        alignItems: 'center',
        marginTop: 40,
    },
    heroSub: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 18,
        marginBottom: 8,
    },
    heroTitle: {
        fontSize: 56,
        fontWeight: 'bold',
        color: '#FFF',
        fontFamily: Typography.heading,
        letterSpacing: -1,
    },
    faceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 30,
        marginTop: 30,
    },
    faceCircle: {
        width: 140, height: 140, borderRadius: 70,
        backgroundColor: '#C8A087', // Skin tone
        alignItems: 'center', justifyContent: 'center',
        shadowColor: "#000", shadowOpacity: 0.3, shadowRadius: 20, shadowOffset: { width: 0, height: 10 },
    },
    eye: {
        width: 12, height: 20, backgroundColor: '#4E342E', borderRadius: 6,
    },
    neutralMouth: {
        width: 50, height: 6, backgroundColor: '#4E342E', borderRadius: 3, marginTop: 4,
    },
    statsSection: {
        marginTop: 500, // Push below header
        flex: 1,
        paddingHorizontal: Spacing.l,
    },
    sectionHeader: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30,
    },
    sectionTitle: {
        color: '#FFF', fontSize: 20, fontWeight: 'bold', fontFamily: Typography.heading,
    },
    chartContainer: {
        height: 220,
        justifyContent: 'flex-end',
    },
    gridLine: {
        width: '100%',
        height: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        borderStyle: 'dashed',
        marginBottom: 60,
    },
    barsRow: {
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 10,
    },
    barWrapper: {
        width: 34, height: '100%', justifyContent: 'flex-end', alignItems: 'center',
    },
    bar: {
        width: '100%',
        borderTopLeftRadius: 17,
        borderTopRightRadius: 17,
        alignItems: 'center',
        paddingTop: 10,
    },
    barFace: {
        opacity: 0.6,
        alignItems: 'center',
    },
    tinyEye: {
        width: 3, height: 4, backgroundColor: '#3E2723', borderRadius: 1.5,
    },
    tinyMouth: {
        width: 12, borderColor: '#3E2723', marginTop: 2,
    }
});
