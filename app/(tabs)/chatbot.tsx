import { Colors, Layout, Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Message {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
}

export default function ChatbotScreen() {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: "Hello! I'm Freud AI. How are you feeling today?", isUser: false, timestamp: new Date() }
    ]);
    const [inputText, setInputText] = useState('');
    const flatListRef = useRef<FlatList>(null);

    const sendMessage = () => {
        if (!inputText.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: inputText,
            isUser: true,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMsg]);
        setInputText('');

        setTimeout(() => {
            const responses = [
                "I hear you. Tell me more about that.",
                "That sounds challenging. How does it make you feel physically?",
                "It's okay to feel that way. I'm here to listen.",
                "What do you think triggered this feeling?",
                "Have you taken a deep breath recently? Let's try one together."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: randomResponse,
                isUser: false,
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, aiMsg]);
        }, 1000);
    };

    useEffect(() => {
        setTimeout(() => flatListRef.current?.scrollToEnd(), 100);
    }, [messages]);

    const renderItem = ({ item }: { item: Message }) => {
        const isUser = item.isUser;
        return (
            <View style={[
                styles.messageContainer,
                isUser ? styles.userMessageContainer : styles.aiMessageContainer
            ]}>
                {!isUser && (
                    <View style={styles.avatar}>
                        <LinearGradient
                            colors={Colors.dark.primaryGradient as any}
                            style={styles.avatarGradient}
                        >
                            <Ionicons name="sparkles" size={12} color="#FFF" />
                        </LinearGradient>
                    </View>
                )}
                <View style={[
                    styles.bubble,
                    isUser ? styles.userBubble : styles.aiBubble
                ]}>
                    <Text style={[styles.messageText, isUser && styles.userMessageText]}>
                        {item.text}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Freud AI</Text>
                    <View style={styles.onlineBadge}>
                        <View style={styles.dot} />
                        <Text style={styles.headerSubtitle}>Online</Text>
                    </View>
                </View>

                <FlatList
                    ref={flatListRef}
                    data={messages}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    style={styles.list}
                />

                <View style={styles.inputArea}>
                    <TextInput
                        style={styles.input}
                        placeholder="Type a message..."
                        value={inputText}
                        onChangeText={setInputText}
                        placeholderTextColor={Colors.dark.textSecondary}
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                        <LinearGradient
                            colors={Colors.dark.primaryGradient as any}
                            style={styles.sendGradient}
                        >
                            <Ionicons name="arrow-up" size={20} color="#FFF" />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.dark.background,
    },
    header: {
        paddingTop: Spacing.xl * 1.5,
        paddingBottom: Spacing.m,
        paddingHorizontal: Spacing.l,
        backgroundColor: Colors.dark.surface,
        borderBottomWidth: 1,
        borderBottomColor: Colors.dark.border,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.dark.text,
        fontFamily: Typography.heading,
    },
    onlineBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: Colors.dark.primary,
        marginRight: 6,
    },
    headerSubtitle: {
        fontSize: 12,
        color: Colors.dark.textSecondary,
        fontWeight: '500',
    },
    list: {
        flex: 1,
    },
    listContent: {
        padding: Spacing.m,
        paddingBottom: 20,
    },
    messageContainer: {
        flexDirection: 'row',
        marginBottom: Spacing.m,
        alignItems: 'flex-end',
    },
    userMessageContainer: {
        justifyContent: 'flex-end',
    },
    aiMessageContainer: {
        justifyContent: 'flex-start',
    },
    avatar: {
        marginRight: Spacing.s,
    },
    avatarGradient: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bubble: {
        maxWidth: '75%',
        padding: Spacing.m,
        borderRadius: Layout.radius.l,
    },
    userBubble: {
        backgroundColor: Colors.dark.primary,
        borderBottomRightRadius: 4,
    },
    aiBubble: {
        backgroundColor: Colors.dark.surface,
        borderBottomLeftRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    messageText: {
        fontSize: 16,
        color: Colors.dark.text,
        lineHeight: 22,
        fontFamily: Typography.body,
    },
    userMessageText: {
        color: '#FFF',
    },
    inputArea: {
        flexDirection: 'row',
        padding: Spacing.m,
        paddingBottom: Platform.OS === 'ios' ? 40 : Spacing.m, // Adjust for bottom tab safe area if needed
        backgroundColor: Colors.dark.surface,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: Colors.dark.border,
    },
    input: {
        flex: 1,
        backgroundColor: Colors.dark.background,
        borderRadius: 25,
        paddingHorizontal: Spacing.m,
        paddingVertical: Spacing.s,
        marginRight: Spacing.m,
        fontSize: 16,
        color: Colors.dark.text,
        height: 50,
    },
    sendButton: {

    },
    sendGradient: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
