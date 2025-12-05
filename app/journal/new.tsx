import { Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Moods config to match the App's theme
const MOODS = [
    { label: 'Depressed', color: '#7E57C2', faceColor: '#9575CD', img: require('../../assets/images/Depressed.png') },
    { label: 'Sad', color: '#FF7043', faceColor: '#FF8A65', img: require('../../assets/images/Sad.png') },
    { label: 'Neutral', color: '#8D6E63', faceColor: '#A1887F', img: require('../../assets/images/Neutral.png') },
    { label: 'Happy', color: '#FDD835', faceColor: '#FFF176', img: require('../../assets/images/Happy.png') },
    { label: 'Overjoyed', color: '#81C784', faceColor: '#A5D6A7', img: require('../../assets/images/Overjoyed.png') },
];

const FaceIcon = ({ index, isSelected }: { index: number, isSelected: boolean }) => {
    return <Image source={MOODS[index].img} style={{ width: 40, height: 40, resizeMode: 'contain' }} />;
};

export default function NewJournalEntryScreen() {
    const [selectedEmotion, setSelectedEmotion] = useState(2);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.circleBtn}>
                    <Ionicons name="chevron-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>New Journal Entry</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>

                <Text style={styles.label}>Journal Title</Text>
                <View style={styles.inputContainer}>
                    <Ionicons name="document-text-outline" size={20} color="#FFF" style={{ marginRight: 10 }} />
                    <TextInput
                        style={styles.inputTitle}
                        defaultValue="Feeling Bad Again"
                        placeholderTextColor="#666"
                    />
                    <Ionicons name="pencil-outline" size={20} color="#BBB" />
                </View>

                <Text style={styles.label}>Select Your Emotion</Text>
                <View style={styles.emotionRow}>
                    {MOODS.map((m, i) => {
                        const isSelected = selectedEmotion === i;
                        return (
                            <TouchableOpacity
                                key={i}
                                style={[
                                    styles.emotionBtn,
                                    { backgroundColor: m.faceColor },
                                    isSelected && styles.emotionBtnSelected
                                ]}
                                onPress={() => setSelectedEmotion(i)}
                            >
                                <FaceIcon index={i} isSelected={isSelected} />
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <Text style={styles.label}>Write Your Entry</Text>
                <View style={styles.textAreaContainer}>
                    <TextInput
                        style={styles.textArea}
                        multiline
                        placeholder="Write your thoughts..."
                        placeholderTextColor="#5D4037"
                        defaultValue="I had a bad day today, at school... It’s fine I guess..."
                    />

                    {/* Toolbar */}
                    <View style={styles.toolbar}>
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <TouchableOpacity style={styles.toolBtn}>
                                <Ionicons name="arrow-undo" size={18} color="#FFF" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.toolBtn}>
                                <Ionicons name="arrow-redo" size={18} color="#FFF" />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.addPhotoBtn}>
                            <Ionicons name="camera-outline" size={16} color="#FFF" />
                            <Text style={styles.toolText}>Add Photo</Text>
                        </TouchableOpacity>

                        <Text style={styles.counterText}>75/300</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.createBtn} onPress={() => router.back()}>
                    <Text style={styles.createBtnText}>Create Journal</Text>
                    <Ionicons name="checkmark" size={24} color="#FFF" />
                </TouchableOpacity>

                <View style={{ height: 50 }} />
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
    circleBtn: {
        width: 44, height: 44, borderRadius: 22,
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)',
        alignItems: 'center', justifyContent: 'center'
    },
    headerTitle: {
        fontSize: 18, color: '#FFF', fontWeight: 'bold', fontFamily: Typography.heading,
    },
    content: {
        paddingHorizontal: Spacing.l,
    },
    label: {
        color: '#FFF', fontSize: 14, fontWeight: 'bold', marginTop: 24, marginBottom: 12,
    },
    inputContainer: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: '#2C211B', borderRadius: 24,
        paddingHorizontal: 20, height: 56,
    },
    inputTitle: {
        flex: 1, color: '#FFF', fontWeight: 'bold', fontSize: 16,
    },
    emotionRow: {
        flexDirection: 'row', justifyContent: 'space-between',
    },
    emotionBtn: {
        width: 56, height: 56, borderRadius: 28,
        alignItems: 'center', justifyContent: 'center',
        opacity: 0.5,
    },
    emotionBtnSelected: {
        opacity: 1,
        borderWidth: 2, borderColor: '#FFF', transform: [{ scale: 1.1 }]
    },
    textAreaContainer: {
        backgroundColor: '#2C211B',
        borderRadius: 24,
        padding: 20,
        height: 250,
        borderWidth: 1, borderColor: '#4E342E',
    },
    textArea: {
        flex: 1, color: '#AAA', fontSize: 16, lineHeight: 24, textAlignVertical: 'top',
        fontFamily: Typography.body,
    },
    toolbar: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        marginTop: 10,
    },
    toolBtn: {
        width: 36, height: 36, borderRadius: 12, backgroundColor: '#3E2723', alignItems: 'center', justifyContent: 'center',
    },
    addPhotoBtn: {
        flexDirection: 'row', alignItems: 'center', gap: 6,
    },
    toolText: {
        color: '#FFF', fontSize: 12, fontWeight: 'bold'
    },
    counterText: {
        color: '#666', fontSize: 12,
    },
    createBtn: {
        marginTop: 40,
        backgroundColor: '#8D6E63', // Brown
        height: 60, borderRadius: 30,
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    },
    createBtnText: {
        color: '#FFF', fontSize: 18, fontWeight: 'bold'
    }
});
