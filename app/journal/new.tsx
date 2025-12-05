import { Layout, Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const emotions = [
    { label: 'Happy', icon: 'happy', color: '#8CAD65' },
    { label: 'Sad', icon: 'sad', color: '#5C6BC0' },
    { label: 'Angry', icon: 'flame', color: '#FF8C60' },
    { label: 'Calm', icon: 'leaf', color: '#26A69A' },
    { label: 'Tired', icon: 'moon', color: '#8D6E63' },
];

export default function NewJournalEntryScreen() {
    const [selectedEmotion, setSelectedEmotion] = useState(0);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
                    <Ionicons name="close" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>New Entry</Text>
                <TouchableOpacity style={styles.saveBtn} onPress={() => router.back()}>
                    <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.question}>How are you feeling?</Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.emotionRow}>
                    {emotions.map((e, i) => (
                        <TouchableOpacity
                            key={i}
                            style={[
                                styles.emotionBtn,
                                selectedEmotion === i && { backgroundColor: e.color, borderColor: e.color }
                            ]}
                            onPress={() => setSelectedEmotion(i)}
                        >
                            <Ionicons name={e.icon as any} size={28} color={selectedEmotion === i ? '#FFF' : e.color} />
                            <Text style={[styles.emotionLabel, selectedEmotion === i && { color: '#FFF' }]}>{e.label}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <View style={styles.inputCard}>
                    <Text style={styles.dateText}>Today, Dec 5, 2025</Text>
                    <TextInput
                        style={styles.input}
                        multiline
                        placeholder="Write your thoughts here..."
                        placeholderTextColor="#666"
                    />
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.l,
        paddingTop: 60,
        paddingBottom: Spacing.m,
    },
    closeBtn: {
        padding: 8,
        backgroundColor: '#2C211B',
        borderRadius: 12,
    },
    saveBtn: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#8CAD65',
        borderRadius: 20,
    },
    saveText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    headerTitle: {
        fontSize: 18,
        color: '#FFF',
        fontFamily: Typography.heading,
    },
    content: {
        padding: Spacing.l,
    },
    question: {
        fontSize: 24,
        color: '#FFF',
        fontFamily: Typography.heading,
        marginBottom: Spacing.l,
        textAlign: 'center',
    },
    emotionRow: {
        flexDirection: 'row',
        marginBottom: Spacing.xl,
        maxHeight: 100,
    },
    emotionBtn: {
        width: 70,
        height: 90,
        borderRadius: 35,
        borderWidth: 1,
        borderColor: '#44352D',
        backgroundColor: '#2C211B',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.m,
    },
    emotionLabel: {
        marginTop: 8,
        fontSize: 12,
        color: '#8B7D76',
        fontWeight: '600',
    },
    inputCard: {
        backgroundColor: '#2C211B',
        borderRadius: Layout.radius.xl,
        padding: Spacing.l,
        height: 400,
    },
    dateText: {
        color: '#8B7D76',
        fontSize: 14,
        marginBottom: Spacing.m,
    },
    input: {
        flex: 1,
        color: '#FFF',
        fontSize: 16,
        lineHeight: 24,
        textAlignVertical: 'top',
    }
});
