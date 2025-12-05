import { Layout, Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const models = [
    { id: 'gpt4', label: 'GPT-4' },
    { id: 'gpt5', label: 'GPT-5' },
    { id: 'llama', label: 'Llama2' },
    { id: 'baby', label: 'BabyAGI' },
    { id: 'palm', label: 'PaLM3' },
    { id: 'private', label: 'PrivateGPT' },
];

export default function NewChatSettingsScreen() {
    const [selectedModels, setSelectedModels] = useState(['llama', 'gpt5', 'private']);

    const toggleModel = (id: string) => {
        if (selectedModels.includes(id)) {
            setSelectedModels(selectedModels.filter(m => m !== id));
        } else {
            setSelectedModels([...selectedModels, id]);
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>New Conversation</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.label}>Topic Name</Text>
                <View style={styles.inputContainer}>
                    <Ionicons name="document-text-outline" size={20} color="#FFF" style={{ marginRight: 10 }} />
                    <TextInput style={styles.input} defaultValue="Wrong Life Choices, I'm Sad!" placeholderTextColor="#666" />
                    <Ionicons name="pencil-outline" size={20} color="#666" />
                </View>

                <Text style={styles.label}>AI Model</Text>
                <View style={styles.dropdown}>
                    <Ionicons name="happy-outline" size={20} color="#FFF" style={{ marginRight: 10 }} />
                    <Text style={styles.dropdownText}>freud_ai_CORE_v1.1.47</Text>
                    <Ionicons name="chevron-down" size={20} color="#FFF" />
                </View>

                <View style={styles.rowBetween}>
                    <Text style={styles.label}>AI LLM Checkpoints</Text>
                    <Text style={styles.subLabel}>Select up to 3</Text>
                </View>

                <View style={styles.grid}>
                    {models.map(m => {
                        const isSelected = selectedModels.includes(m.id);
                        return (
                            <TouchableOpacity
                                key={m.id}
                                style={[styles.modelChip, isSelected && styles.modelChipActive]}
                                onPress={() => toggleModel(m.id)}
                            >
                                <Text style={[styles.modelText, isSelected && { color: '#2E3B28' }]}>{m.label}</Text>
                                <Ionicons
                                    name={isSelected ? "radio-button-on" : "radio-button-off"}
                                    size={20}
                                    color={isSelected ? "#2E3B28" : "#FFF"}
                                />
                            </TouchableOpacity>
                        )
                    })}
                </View>

                <Text style={styles.label}>Preferred Name</Text>
                <View style={styles.inputContainer}>
                    <Ionicons name="person-outline" size={20} color="#FFF" style={{ marginRight: 10 }} />
                    <TextInput style={styles.input} defaultValue="Shinomiya" />
                    <Ionicons name="pencil-outline" size={20} color="#666" />
                </View>

                <Text style={styles.label}>Communication Style</Text>
                <View style={styles.styleRow}>
                    <TouchableOpacity style={styles.styleBtn}><Ionicons name="chatbox" size={16} color="#FFF" style={{ marginRight: 4 }} /><Text style={{ color: '#FFF' }}>Casual</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.styleBtn, styles.styleBtnActive]}><Ionicons name="beaker" size={16} color="#8CAD65" style={{ marginRight: 4 }} /><Text style={{ color: '#8CAD65' }}>Formal</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.styleBtn}><Ionicons name="happy" size={16} color="#FFF" style={{ marginRight: 4 }} /><Text style={{ color: '#FFF' }}>Fun</Text></TouchableOpacity>
                </View>

                <Text style={styles.label}>Therapy Goals</Text>
                <View style={styles.dropdown}>
                    <Ionicons name="flower-outline" size={20} color="#FFF" style={{ marginRight: 10 }} />
                    <Text style={styles.dropdownText}>Reduce Stress Level</Text>
                    <Ionicons name="chevron-down" size={20} color="#FFF" />
                </View>

                <TouchableOpacity style={styles.createBtn} onPress={() => router.push('/chat/1')}>
                    <Text style={styles.createBtnText}>Create Conversation</Text>
                    <Ionicons name="add-circle-outline" size={24} color="#FFF" />
                </TouchableOpacity>

                < View style={{ height: 50 }} />
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
        paddingHorizontal: Spacing.l,
        paddingTop: 60,
        paddingBottom: Spacing.m,
        backgroundColor: '#2C211B', // Dark header bg for this screen
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    backBtn: {
        padding: 8,
        borderWidth: 1,
        borderColor: '#666',
        borderRadius: 20,
        marginRight: Spacing.m,
    },
    headerTitle: {
        fontSize: 18,
        color: '#FFF',
        fontFamily: Typography.heading,
        fontWeight: 'bold',
    },
    content: {
        padding: Spacing.l,
    },
    label: {
        color: '#FFF',
        fontWeight: 'bold',
        marginTop: Spacing.m,
        marginBottom: Spacing.s,
        fontSize: 14,
    },
    subLabel: {
        color: '#8D6E63', // Bronze
        fontSize: 12,
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: Spacing.m,
        marginBottom: Spacing.s,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2C211B',
        borderRadius: Layout.radius.pill,
        paddingHorizontal: Spacing.l,
        height: 56,
    },
    input: {
        flex: 1,
        color: '#FFF',
        fontWeight: 'bold',
    },
    dropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2C211B',
        borderRadius: Layout.radius.pill,
        paddingHorizontal: Spacing.l,
        height: 56,
        justifyContent: 'space-between',
    },
    dropdownText: {
        flex: 1,
        color: '#FFF',
        fontWeight: 'bold',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.s,
    },
    modelChip: {
        width: '48%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#2C211B',
        padding: Spacing.m,
        borderRadius: Layout.radius.pill,
        borderWidth: 1,
        borderColor: '#44352D',
    },
    modelChipActive: {
        backgroundColor: '#8CAD65', // Sage
        borderColor: '#8CAD65',
    },
    modelText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    styleRow: {
        flexDirection: 'row',
        gap: Spacing.s,
    },
    styleBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2C211B',
        paddingVertical: 12,
        borderRadius: Layout.radius.pill,
    },
    styleBtnActive: {
        borderWidth: 1,
        borderColor: '#8CAD65',
    },
    createBtn: {
        marginTop: Spacing.xl,
        backgroundColor: '#8D6E63',
        height: 60,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    createBtnText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 8,
    }
});
