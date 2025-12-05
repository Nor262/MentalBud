import { Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

export default function JournalScreen() {
    // Generate Dot Grid Data (7 cols x 5 rows = 35 dots for visual demo)
    // Legend: 0=Empty, 1=Green, 2=Orange, 3=Brown
    const dotGrid = Array(35).fill(0).map((_, i) => {
        if (i === 12) return 2; // Orange
        if (i === 15) return 3; // Brown
        if (i === 16) return 1; // Green
        if (i === 20) return 3;
        if (i === 22) return 1;
        if (i > 25 && i < 30) return 3;
        return 0.2; // Dim
    });

    return (
        <View style={styles.container}>
            {/* Header / Hero */}
            <View style={styles.heroSection}>
                <View style={styles.navBar}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.circleBtn}>
                        <Ionicons name="chevron-back" size={24} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Health Journal</Text>
                    <View style={{ width: 44 }} />
                </View>

                {/* Score Big Text */}
                <View style={styles.scoreContainer}>
                    <Text style={styles.scoreBig}>34/365</Text>
                    <Text style={styles.scoreSub}>Journals this year. Keep it Up!</Text>
                </View>

                {/* Background Circles (Decorative) */}
                <Svg style={StyleSheet.absoluteFillObject} pointerEvents="none">
                    <Path d={`M${width},0 Q${width / 2},100 ${width},200`} stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
                </Svg>

                {/* Floating Add Btn (Part of Hero in design) */}
                <TouchableOpacity style={styles.heroFab} onPress={() => router.push('/journal/new')}>
                    <Ionicons name="add" size={32} color="#FFF" />
                </TouchableOpacity>
            </View>

            {/* Dark Content Area with Curve */}
            <View style={styles.contentSection}>
                <Svg height="60" width={width} style={{ position: 'absolute', top: -40 }}>
                    <Path
                        d={`M0,40 Q${width / 2},-40 ${width},40 L${width},60 L0,60 Z`}
                        fill="#1F1610"
                    />
                </Svg>

                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Journal History</Text>
                        <Ionicons name="ellipsis-vertical" size={16} color="#AAA" />
                    </View>

                    {/* The Dot Grid */}
                    <View style={styles.gridContainer}>
                        {dotGrid.map((val, i) => {
                            let color = '#44352D'; // Empty/Dim
                            if (val === 1) color = '#8CAD65'; // Green
                            if (val === 2) color = '#FF8A65'; // Orange
                            if (val === 3) color = '#8D6E63'; // Brown

                            return <View key={i} style={[styles.dot, { backgroundColor: color }]} />;
                        })}
                    </View>

                    {/* Legend */}
                    <View style={styles.legendRow}>
                        <View style={styles.legendItem}>
                            <View style={[styles.dotSmall, { backgroundColor: '#FF8A65' }]} />
                            <Text style={styles.legendText}>Negative</Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.dotSmall, { backgroundColor: '#8D6E63' }]} />
                            <Text style={styles.legendText}>Neutral</Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.dotSmall, { backgroundColor: '#8CAD65' }]} />
                            <Text style={styles.legendText}>Positive</Text>
                        </View>
                    </View>

                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F1610',
    },
    heroSection: {
        height: '45%',
        backgroundColor: '#3E2D23', // Dark Brown Hero
        paddingTop: 50,
        alignItems: 'center',
    },
    navBar: {
        width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: Spacing.l, alignItems: 'center',
    },
    circleBtn: {
        width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)', alignItems: 'center', justifyContent: 'center'
    },
    headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    scoreContainer: {
        alignItems: 'center', marginTop: 40,
    },
    scoreBig: {
        fontSize: 56, fontWeight: 'bold', color: '#FFF', fontFamily: Typography.heading,
    },
    scoreSub: {
        color: '#FFF', fontSize: 16, marginTop: 10,
    },
    heroFab: {
        position: 'absolute', bottom: -30, // Half sticking out
        width: 70, height: 70, borderRadius: 35, backgroundColor: '#8D6E63',
        alignItems: 'center', justifyContent: 'center',
        borderWidth: 6, borderColor: '#1F1610', zIndex: 10,
    },
    contentSection: {
        flex: 1,
        backgroundColor: '#1F1610',
        paddingHorizontal: Spacing.l,
        paddingTop: 40,
    },
    scrollContent: { paddingBottom: 100 },
    sectionHeader: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20,
    },
    sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    gridContainer: {
        flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginBottom: 30,
    },
    dot: {
        width: 36, height: 36, borderRadius: 18,
    },
    legendRow: {
        flexDirection: 'row', justifyContent: 'center', gap: 20, backgroundColor: '#2C211B', padding: 12, borderRadius: 20,
    },
    legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    dotSmall: { width: 8, height: 8, borderRadius: 4 },
    legendText: { color: '#FFF', fontSize: 12 },
});
