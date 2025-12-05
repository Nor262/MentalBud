import { Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const ChatMessage = ({ msg }: any) => {
    const isUser = msg.sender === 'user';

    return (
        <View style={[styles.msgContainer, isUser ? styles.msgRight : styles.msgLeft]}>
            {/* Avatar */}
            {!isUser && (
                <View style={styles.botAvatar}>
                    <Ionicons name="medical" size={20} color="#FF8C60" />
                </View>
            )}

            <View style={{ maxWidth: '80%' }}>
                {/* Emotion Badge */}
                {msg.emotion && (
                    <View style={[styles.emotionBadge, { backgroundColor: msg.emotionColor || '#FF8C60' }]}>
                        <Ionicons name={msg.emotionIcon || 'sad'} size={14} color="#FFF" />
                        <Text style={styles.emotionText}>{msg.emotion}</Text>
                    </View>
                )}

                {/* Text Bubble */}
                {msg.text && (
                    <View style={[styles.bubble, isUser ? styles.bubbleRight : styles.bubbleLeft]}>
                        <Text style={[styles.msgText, isUser && { color: '#2E3B28' }]}>{msg.text}</Text>
                    </View>
                )}

                {/* User Avatar (Right) */}
                {isUser && (
                    <View style={styles.userAvatar}>
                        <Ionicons name="person" size={16} color="#FFF" />
                    </View>
                )}

                {/* Rich Content: Video */}
                {msg.video && (
                    <View style={styles.videoCard}>
                        <View style={styles.videoPlaceholder}>
                            <Ionicons name="play-circle" size={48} color="#FFF" />
                        </View>
                        <Text style={styles.videoTitle}>{msg.video.title}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.videoDur}>25:00</Text>
                            <Ionicons name="scan-outline" size={16} color="#FFF" />
                        </View>
                    </View>
                )}

                {/* Rich Content: Doctor Recommendation */}
                {msg.doctors && msg.doctors.map((doc: any, i: number) => (
                    <View key={i} style={styles.docCard}>
                        <View style={styles.docAvatar}>
                            <Ionicons name="person" size={24} color="#FFF" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.docName}>{doc.name}</Text>
                            <Text style={styles.docRole}>{doc.role}</Text>
                        </View>
                        <View style={styles.ratingBadge}>
                            <Ionicons name="star" size={12} color="#FFF" />
                            <Text style={{ color: '#FFF', fontSize: 12, marginLeft: 4 }}>{doc.rating}</Text>
                        </View>
                    </View>
                ))}

                {/* Stats Card */}
                {msg.stats && (
                    <View style={styles.statsCard}>
                        <View style={styles.statBox}>
                            <Text style={styles.statTitle}>+55% Happy</Text>
                            <View style={styles.miniChart}>
                                <View style={[styles.bar, { height: 10 }]} />
                                <View style={[styles.bar, { height: 15 }]} />
                                <View style={[styles.bar, { height: 25 }]} />
                                <View style={[styles.bar, { height: 20 }]} />
                            </View>
                        </View>
                        <TouchableOpacity style={styles.downBtn}>
                            <Ionicons name="arrow-down" size={20} color="#FFF" />
                            <Text style={{ color: '#FFF', fontSize: 10 }}>PDF</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

        </View>
    );
};

export default function ActiveChatScreen() {
    const { id } = useLocalSearchParams();

    // Mock Conversation Flow based on Screenshots
    const messages = [
        { id: '1', sender: 'user', text: "I hate my school teacher. I hate that stupid b**** , I don't want to go to school anymore!" },
        {
            id: '2', sender: 'bot', text: "Shinomiya, Teachers are a great profession! they teach the future of our generation.\n\nMay I suggest a few resources from Dr. Hanibal Lector to control your anger?",
            video: { title: "Mindfulness Course #1" }
        },
        { id: '3', sender: 'user', text: "Thanks doc I just did 25 minute breathing session like you say. I love my teachers now." },
        { id: '4', sender: 'bot', text: "Dr. Freud is thinking...", isTyping: true },
        // Uncomment to test other states:
        /*
        { id: '5', sender: 'user', text: "Doc, I don't think this app is working. I want to fu****g die." },
        { id: '6', sender: 'bot', emotion: 'Emotion: Suicidal. Crisis Support Active', emotionColor: '#7C4DFF', emotionIcon: 'alert-circle' },
        { id: '7', sender: 'bot', text: "I'm really sorry to hear that... I recommend Dr. Hannibal Lector.", 
          doctors: [
              { name: 'Dr. Hannibal Lector', role: 'Certified Therapist', rating: 4.7 },
              { name: 'Prof. Johann Liebert', role: 'Amateur Therapist', rating: 3.2 }
          ] 
        }
        */
    ];

    const scrollViewRef = React.useRef<ScrollView>(null);

    React.useEffect(() => {
        // Scroll to bottom on mount
        setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: false });
        }, 100);

        // Scroll to bottom when keyboard opens
        const keyboardDidShowListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            () => {
                setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
            }
        );

        return () => {
            keyboardDidShowListener.remove();
        };
    }, []);

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 80}
        >
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
                    <Ionicons name="chevron-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Doctor Freud.AI</Text>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <TouchableOpacity style={styles.iconBtn}><Ionicons name="search" size={20} color="#FFF" /></TouchableOpacity>
                    <TouchableOpacity style={styles.iconBtn}><Ionicons name="grid-outline" size={20} color="#FFF" /></TouchableOpacity>
                </View>
            </View>

            <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={styles.content}
                onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
            >
                {messages.map(msg => <ChatMessage key={msg.id} msg={msg} />)}
            </ScrollView>

            {/* Input Area */}
            <View style={styles.inputArea}>
                <TouchableOpacity style={styles.radioBtn}>
                    <View style={styles.radioInner} />
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    placeholder="Type to start chatting..."
                    placeholderTextColor="#AAA"
                />
                <TouchableOpacity style={styles.sendBtn}>
                    <Ionicons name="return-down-back" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
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
        backgroundColor: '#2C211B',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        zIndex: 10,
    },
    iconBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#1F1410',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    headerTitle: {
        fontSize: 18,
        color: '#FFF',
        fontFamily: Typography.heading,
    },
    content: {
        padding: Spacing.l,
        paddingBottom: 20, // Reduced padding as InputArea is no longer absolute
    },
    msgContainer: {
        marginBottom: Spacing.l,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    msgLeft: {
        alignSelf: 'flex-start',
    },
    msgRight: {
        alignSelf: 'flex-end',
        flexDirection: 'row-reverse',
    },
    botAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#2C211B',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12, // Increased spacing
    },
    userAvatar: {
        position: 'absolute',
        right: -38, // Moved further right
        bottom: 0,
        width: 28, // Slightly larger
        height: 28,
        borderRadius: 14,
        backgroundColor: '#44352D',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bubble: {
        padding: 16,
        borderRadius: 20,
        marginBottom: 4,
    },
    bubbleLeft: {
        backgroundColor: '#2C211B',
        borderRadius: 24,
        borderBottomLeftRadius: 4,
    },
    bubbleRight: {
        backgroundColor: '#C8A087', // Light brownish/skin tone from design
        borderRadius: 24,
        borderBottomRightRadius: 4,
    },
    msgText: {
        color: '#FFF',
        lineHeight: 22,
    },
    emotionBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 16,
        marginBottom: 8,
        alignSelf: 'flex-start',
        gap: 6,
    },
    emotionText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 12,
    },
    videoCard: {
        marginTop: 8,
        backgroundColor: '#C8A087',
        borderRadius: 16,
        padding: 12,
        width: 220,
    },
    videoPlaceholder: {
        height: 100,
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    videoTitle: {
        color: '#FFF',
        fontWeight: 'bold',
        marginBottom: 4,
    },
    videoDur: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
    },
    docCard: {
        marginTop: 8,
        backgroundColor: '#2C211B',
        borderRadius: 16,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#44352D',
    },
    docAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#4CAF50', // Green
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    docName: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 13,
    },
    docRole: {
        color: '#AAA',
        fontSize: 11,
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statsCard: {
        flexDirection: 'row',
        marginTop: 8,
        gap: 8,
    },
    statBox: {
        backgroundColor: '#2C211B',
        padding: 12,
        borderRadius: 16,
        flex: 1,
    },
    statTitle: {
        color: '#FFF',
        fontSize: 12, marginBottom: 8
    },
    miniChart: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 4,
        height: 30,
    },
    bar: {
        width: 6,
        backgroundColor: '#8CAD65',
        borderRadius: 2,
    },
    downBtn: {
        backgroundColor: '#2C211B',
        padding: 12,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputArea: {
        // Positioned statically at bottom via Flexbox
        marginBottom: 20,
        marginHorizontal: 20,
        backgroundColor: '#2C211B',
        borderRadius: 30,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    radioBtn: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
    },
    radioInner: {
        width: 12, height: 12, borderRadius: 6, backgroundColor: 'transparent'
    },
    input: {
        flex: 1,
        color: '#FFF',
        marginLeft: 12,
    },
    sendBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#8CAD65',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 4,
    }
});
