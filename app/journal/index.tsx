import { Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

// Mock Data for Circular Heatmap
const journalGrid = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    status: Math.random() > 0.6 ? 'active' : Math.random() > 0.5 ? 'neutral' : 'none',
    color: Math.random() > 0.6 ? '#8CAD65' : '#FF8C60' // Green or Orange
}));

export default function JournalHistoryScreen() {
    return (
        <View style={styles.container}>
            {/* Curved Header bg */}
            <View style={styles.headerCurve}>
                <View style={styles.navBar}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
                        <Ionicons name="chevron-back" size={24} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Health Journal</Text>
                    <View style={{ width: 40 }} />
                </View>

                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <Text style={styles.heroStart}>34/365</Text>
                    <Text style={styles.heroSub}>Journals this year. Keep it Up!</Text>
                </View>

                {/* Floating Add Button */}
                <TouchableOpacity style={styles.addBtn} onPress={() => router.push('/journal/new')}>
                    <Ionicons name="add" size={32} color="#FFF" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={{ height: 50 }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.m }}>
                    <Text style={styles.sectionTitle}>Journal History</Text>
                    <Ionicons name="ellipsis-vertical" size={16} color="#AAA" />
                </View>

                {/* Circular Grid */}
                <View style={styles.gridContainer}>
                    {journalGrid.map((item, index) => (
                        <View
                            key={index}
                            style={[
                                styles.gridCircle,
                                item.status !== 'none' && { backgroundColor: item.color }
                            ]}
                        />
                    ))}
                </View>

                <View style={styles.legend}>
                    <View style={styles.legItem}><View style={[styles.dot, { backgroundColor: '#FF8C60' }]} /><Text style={styles.legText}>Negative</Text></View>
                    <View style={styles.legItem}><View style={[styles.dot, { backgroundColor: '#A1887F' }]} /><Text style={styles.legText}>Neutral</Text></View>
                    <View style={styles.legItem}><View style={[styles.dot, { backgroundColor: '#8CAD65' }]} /><Text style={styles.legText}>Positive</Text></View>
                </View>

                <Text style={[styles.sectionTitle, { marginTop: 30 }]}>AI Mood Predictions</Text>
                <View style={styles.predictionCard}>
                    <View style={styles.filterRow}>
                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Mood Forecast</Text>
                        <View style={styles.datesChip}><Ionicons name="calendar" size={12} color="#FFF" /><Text style={{ color: '#FFF', fontSize: 10, marginLeft: 4 }}>Next 1w</Text></View>
                    </View>
                    <View style={styles.daysRow}>
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => (
                            <View key={i} style={styles.predDay}>
                                <Ionicons name={i % 2 == 0 ? "happy" : "sad"} size={24} color={i % 2 == 0 ? "#8CAD65" : "#FF8C60"} />
                                <Text style={styles.predText}>{d}</Text>
                            </View>
                        ))}
                    </View>
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F1410',
    },
    headerCurve: {
        height: 300,
        backgroundColor: '#3E2D23', // Lighter brown header
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0, // Using standard rect for now, could add SVG curve below
        position: 'relative',
        overflow: 'visible'
    },
    navBar: {
        flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: Spacing.l, paddingTop: 60, alignItems: 'center'
    },
    iconBtn: {
        width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: '#666', alignItems: 'center', justifyContent: 'center'
    },
    headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    heroStart: { fontSize: 60, color: '#FFF', fontWeight: 'bold', fontFamily: Typography.heading },
    heroSub: { color: '#FFF', fontSize: 16 },
    addBtn: {
        position: 'absolute', bottom: -30, alignSelf: 'center', width: 70, height: 70, borderRadius: 35, backgroundColor: '#8D6E63', alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: '#1F1410', zIndex: 10,
    },
    content: {
        padding: Spacing.l,
    },
    sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    gridContainer: {
        flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center'
    },
    gridCircle: {
        width: 44, height: 44, borderRadius: 22, backgroundColor: '#2C211B', borderWidth: 1, borderColor: '#3E342F'
    },
    legend: {
        flexDirection: 'row', justifyContent: 'center', marginTop: Spacing.l, gap: 16, backgroundColor: '#2C211B', padding: 12, borderRadius: 20,
    },
    legItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    dot: { width: 8, height: 8, borderRadius: 4 },
    legText: { color: '#FFF', fontSize: 12 },
    predictionCard: {
        backgroundColor: '#2C211B', padding: Spacing.m, borderRadius: 24, marginTop: Spacing.m
    },
    filterRow: {
        flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.m
    },
    datesChip: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: '#3E342F', padding: 6, borderRadius: 12
    },
    daysRow: {
        flexDirection: 'row', justifyContent: 'space-between'
    },
    predDay: {
        alignItems: 'center', gap: 6, width: 30, backgroundColor: '#3E342F', paddingVertical: 8, borderRadius: 15
    },
    predText: { color: '#AAA', fontSize: 10 }
});
