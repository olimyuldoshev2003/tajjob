import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Audio } from "expo-av";
import { useNavigation } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  type: "text" | "voice";
  voiceUri?: string;
  duration?: number;
}

const Message = ({ route }: { route: any }) => {
  const navigation: any = useNavigation();

  const [messageText, setMessageText] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello",
      isUser: true,
      timestamp: "13:47",
      type: "text",
    },
    {
      id: "2",
      text: "Hi",
      isUser: false,
      timestamp: "13:47",
      type: "text",
    },
  ]);

  // Voice recording states
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [currentPlayingVoice, setCurrentPlayingVoice] = useState<string | null>(
    null
  );
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [recordingAnimation] = useState(new Animated.Value(0));
  const [playbackProgress, setPlaybackProgress] = useState<number>(0);
  const [playbackPosition, setPlaybackPosition] = useState<number>(0);

  const recordingRef = useRef<Audio.Recording | null>(null);
  const recordingTimerRef = useRef<any>(null);
  const playbackTimerRef = useRef<any>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  // Recording animation
  useEffect(() => {
    if (isRecording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(recordingAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(recordingAnimation, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      recordingAnimation.setValue(0);
      Animated.timing(recordingAnimation, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }).stop();
    }
  }, [isRecording]);

  // Audio permissions and setup
  useEffect(() => {
    const setupAudio = async () => {
      try {
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== "granted") {
          alert("Audio permissions are required for voice messages");
          return;
        }

        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
      } catch (error) {
        console.log("Audio setup error:", error);
      }
    };
    setupAudio();

    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
      if (playbackTimerRef.current) {
        clearInterval(playbackTimerRef.current);
      }
      if (sound) {
        sound.unloadAsync();
      }
      if (recordingRef.current) {
        recordingRef.current.stopAndUnloadAsync();
      }
    };
  }, []);

  // Start recording - FIXED VERSION
  const startRecording = async () => {
    try {
      console.log("Starting recording...");

      // Stop any existing recording
      if (recordingRef.current) {
        await recordingRef.current.stopAndUnloadAsync();
        recordingRef.current = null;
      }

      // Configure audio for recording
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      // Create and start new recording
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      await recording.startAsync();

      recordingRef.current = recording;
      setIsRecording(true);
      setRecordingTime(0);

      // Start recording timer
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);

      console.log("Recording started successfully");
    } catch (error) {
      console.error("Failed to start recording:", error);
      setIsRecording(false);
    }
  };

  // Stop recording and send - FIXED VERSION
  const stopRecording = async () => {
    try {
      console.log("Stopping recording...");

      if (!recordingRef.current) {
        console.log("No recording in progress");
        return;
      }

      // Clear timer
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }

      // Stop and get recording
      await recordingRef.current.stopAndUnloadAsync();
      const uri = recordingRef.current.getURI();

      console.log("Recording stopped, URI:", uri);
      console.log("Recording duration:", recordingTime);

      if (uri && recordingTime >= 1) {
        // Create voice message
        const newVoiceMessage: Message = {
          id: Date.now().toString(),
          text: "Voice message",
          isUser: true,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          type: "voice",
          voiceUri: uri,
          duration: recordingTime,
        };

        setMessages((prev) => [...prev, newVoiceMessage]);
        console.log("Voice message sent successfully");

        // Scroll to bottom
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
      } else {
        console.log("Recording too short or no URI");
      }
    } catch (error) {
      console.error("Failed to stop recording:", error);
    } finally {
      // Reset states
      setIsRecording(false);
      recordingRef.current = null;
      setRecordingTime(0);

      // Reset audio mode for playback
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    }
  };

  // Play voice message - FIXED VERSION
  const playVoiceMessage = async (message: Message) => {
    try {
      console.log("Playing voice message:", message.id);

      // If already playing this message, pause it
      if (currentPlayingVoice === message.id) {
        if (sound) {
          await sound.pauseAsync();
          setCurrentPlayingVoice(null);
          if (playbackTimerRef.current) {
            clearInterval(playbackTimerRef.current);
            playbackTimerRef.current = null;
          }
        }
        return;
      }

      // Stop any currently playing sound
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
      }

      if (!message.voiceUri) {
        console.log("No voice URI found");
        return;
      }

      // Set current playing message
      setCurrentPlayingVoice(message.id);
      setPlaybackProgress(0);
      setPlaybackPosition(0);

      // Configure audio for playback
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      // Load and play the sound
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: message.voiceUri },
        { shouldPlay: true },
        onPlaybackStatusUpdate
      );

      setSound(newSound);

      // Start progress timer
      playbackTimerRef.current = setInterval(() => {
        setPlaybackProgress((prev) => {
          const newProgress = prev + 1;
          if (newProgress >= (message.duration || 1)) {
            clearInterval(playbackTimerRef.current!);
            playbackTimerRef.current = null;
            setCurrentPlayingVoice(null);
            return message.duration || 1;
          }
          return newProgress;
        });
      }, 1000);
    } catch (error) {
      console.error("Error playing voice message:", error);
      setCurrentPlayingVoice(null);
      setPlaybackProgress(0);
    }
  };

  // Playback status update
  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setPlaybackPosition(status.positionMillis);

      if (status.didJustFinish) {
        // Playback finished
        setCurrentPlayingVoice(null);
        setPlaybackProgress(0);
        setPlaybackPosition(0);
        if (playbackTimerRef.current) {
          clearInterval(playbackTimerRef.current);
          playbackTimerRef.current = null;
        }
      }
    }
  };

  // Stop all playback
  const stopPlayingVoice = async () => {
    try {
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
      }
      setCurrentPlayingVoice(null);
      setPlaybackProgress(0);
      setPlaybackPosition(0);

      if (playbackTimerRef.current) {
        clearInterval(playbackTimerRef.current);
        playbackTimerRef.current = null;
      }
    } catch (error) {
      console.error("Error stopping voice message:", error);
    }
  };

  // Send text message
  const sendTextMessage = () => {
    if (messageText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: messageText,
        isUser: true,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: "text",
      };

      setMessages((prev) => [...prev, newMessage]);
      setMessageText("");

      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  // Format time for display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Waveform Component - SIMPLIFIED AND WORKING
  const VoiceWaveform = ({
    duration,
    progress,
    isPlaying,
    isUser,
  }: {
    duration: number;
    progress: number;
    isPlaying: boolean;
    isUser: boolean;
  }) => {
    const bars = 20;
    const progressPercent = progress / duration;

    return (
      <View style={[styles.waveformContainer, { width: 120, height: 30 }]}>
        {Array.from({ length: bars }).map((_, index) => {
          const barProgress = index / bars;
          const isActive = barProgress <= progressPercent;

          // Varying heights for visual effect
          const height = Math.max(6, (Math.sin(index * 0.5) * 0.5 + 0.7) * 25);

          return (
            <View
              key={index}
              style={[
                styles.waveformBar,
                {
                  height,
                  backgroundColor: isActive
                    ? isUser
                      ? "#ff3b30"
                      : "#ffd700"
                    : isUser
                    ? "#2623D2"
                    : "#ffffff",
                  opacity: isActive ? 1 : 0.6,
                },
              ]}
            />
          );
        })}

        {/* Progress line */}
        {isPlaying && (
          <View
            style={[
              styles.progressIndicator,
              {
                left: `${progressPercent * 100}%`,
                backgroundColor: isUser ? "#ff3b30" : "#ffd700",
              },
            ]}
          />
        )}
      </View>
    );
  };

  const renderMessage = (message: Message) => {
    if (message.type === "voice") {
      const isPlaying = currentPlayingVoice === message.id;
      const currentProgress = isPlaying ? playbackProgress : 0;
      const duration = message.duration || 1;

      return (
        <View
          style={
            message.isUser
              ? styles.messageOfUserMainBlock
              : styles.messageOfHRMainBlock
          }
          key={message.id}
        >
          <View
            style={
              message.isUser
                ? styles.voiceMessageOfUserBlock
                : styles.voiceMessageOfHRBlock
            }
          >
            <TouchableOpacity
              style={styles.voiceMessageContainer}
              onPress={() => playVoiceMessage(message)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={isPlaying ? "pause" : "play"}
                size={24}
                color={message.isUser ? "#2623D2" : "#fff"}
              />

              <VoiceWaveform
                duration={duration}
                progress={currentProgress}
                isPlaying={isPlaying}
                isUser={message.isUser}
              />

              <Text
                style={[
                  styles.voiceDuration,
                  message.isUser
                    ? styles.voiceDurationUser
                    : styles.voiceDurationHR,
                ]}
              >
                {formatTime(isPlaying ? currentProgress : duration)}
              </Text>
            </TouchableOpacity>

            <View style={styles.messageSentTimeAndSeenBlock}>
              <Text
                style={
                  message.isUser
                    ? styles.messageSentTimeUser
                    : styles.messageSentTimeHR
                }
              >
                {message.timestamp}
              </Text>
              {message.isUser && (
                <MaterialCommunityIcons
                  name="check-all"
                  size={20}
                  color="#00b7ff"
                  style={styles.messageSeenIcon}
                />
              )}
            </View>
          </View>
        </View>
      );
    }

    // Text message rendering remains the same
    return (
      <View
        style={
          message.isUser
            ? styles.messageOfUserMainBlock
            : styles.messageOfHRMainBlock
        }
        key={message.id}
      >
        <View
          style={
            message.isUser ? styles.messageOfUserBlock : styles.messageOfHRBlock
          }
        >
          <Text
            style={message.isUser ? styles.messageOfUser : styles.messageOfHR}
          >
            {message.text}
          </Text>
          <View style={styles.messageSentTimeAndSeenBlock}>
            <Text
              style={
                message.isUser
                  ? styles.messageSentTimeUser
                  : styles.messageSentTimeHR
              }
            >
              {message.timestamp}
            </Text>
            {message.isUser && (
              <MaterialCommunityIcons
                name="check-all"
                size={20}
                color="#00b7ff"
                style={styles.messageSeenIcon}
              />
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.messageComponent}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View style={styles.headerMessagesComponentBlock}>
        <View style={styles.headerBlock1}>
          <Ionicons
            name="arrow-back-sharp"
            size={31}
            color="black"
            onPress={() => navigation.goBack()}
          />
          <Image
            source={require("../../assets/tajjob/messages/hr.jpg")}
            style={styles.HRImg}
          />
          <View style={styles.fullnameAndStatusBlockHeaderBlock1}>
            <Text style={styles.HRFullname}>Danny H.</Text>
            <Text style={styles.HRStatus}>Online</Text>
          </View>
        </View>
        <View style={styles.headerBlock2}>
          <FontAwesome5 name="phone-alt" size={31} color="black" />
          <FontAwesome name="video-camera" size={31} color="black" />
          <Entypo name="dots-three-vertical" size={31} color="black" />
        </View>
      </View>

      <View style={styles.sectionAndFooterMessagesComponentBlock}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.sectionMessagesComponentBlock}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
          <View style={styles.messagesContainer}>
            <Text style={styles.messagesSentDay}>Today</Text>
            <View style={styles.messagesBlockOfThisDay}>
              {messages.map(renderMessage)}
            </View>
          </View>
        </ScrollView>

        <View style={styles.footerMessagesComponentBlock}>
          {isRecording ? (
            <View style={styles.recordingContainer}>
              <Animated.View
                style={[
                  styles.recordingIndicator,
                  {
                    transform: [
                      {
                        scale: recordingAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 1.3],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <Ionicons name="mic" size={30} color="#ff3b30" />
              </Animated.View>
              <Text style={styles.recordingTime}>
                {formatTime(recordingTime)}
              </Text>
              <TouchableOpacity
                style={styles.stopRecordingButton}
                onPress={stopRecording}
                activeOpacity={0.7}
              >
                <Ionicons name="send" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.inputMessageAndIconBlock}>
              <TextInput
                style={styles.inputMessage}
                placeholder="Message"
                placeholderTextColor={"#9E9E9E"}
                value={messageText}
                onChangeText={setMessageText}
                multiline
                onSubmitEditing={sendTextMessage}
                returnKeyType="send"
              />
              <FontAwesome5
                name="smile"
                size={25}
                color="black"
                style={styles.iconStckersFooter}
              />

              {messageText.trim() ? (
                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={sendTextMessage}
                  activeOpacity={0.7}
                >
                  <Ionicons name="send" size={22} color="#2623D2" />
                </TouchableOpacity>
              ) : (
                <Pressable
                  style={styles.btnVoiceToText}
                  onPressIn={startRecording}
                  onPressOut={stopRecording}
                  delayLongPress={0}
                >
                  <Ionicons name="mic" size={25} color="#2623D2" />
                </Pressable>
              )}
            </View>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Message;

const styles = StyleSheet.create({
  messageComponent: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerMessagesComponentBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
    backgroundColor: "#fff",
    paddingBottom: 10,
  },
  headerBlock1: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  HRImg: {
    width: 55,
    height: 55,
    borderRadius: 50,
  },
  fullnameAndStatusBlockHeaderBlock1: {},
  HRFullname: {
    fontSize: 23,
    fontWeight: "500",
  },
  HRStatus: {
    color: "#A2A2A2",
    fontSize: 16,
    fontWeight: "400",
  },
  headerBlock2: {
    flexDirection: "row",
    gap: 10,
  },
  sectionAndFooterMessagesComponentBlock: {
    flex: 1,
  },
  sectionMessagesComponentBlock: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesSentDay: {
    alignSelf: "center",
    color: "#9E9E9E",
    fontSize: 20,
    fontWeight: "500",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "#fff",
    paddingVertical: 1,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  messagesBlockOfThisDay: {
    gap: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  messageOfUserMainBlock: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  messageOfUserBlock: {
    maxWidth: "70%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    padding: 12,
    borderRadius: 15,
    borderBottomRightRadius: 5,
  },
  messageOfUser: {
    fontSize: 16,
    fontWeight: "400",
    color: "#000",
  },
  messageOfHRMainBlock: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  messageOfHRBlock: {
    maxWidth: "70%",
    backgroundColor: "#2623D2",
    padding: 12,
    borderRadius: 15,
    borderBottomLeftRadius: 5,
  },
  messageOfHR: {
    fontSize: 16,
    fontWeight: "400",
    color: "#fff",
  },
  // Voice message styles
  voiceMessageOfUserBlock: {
    maxWidth: "70%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    padding: 12,
    borderRadius: 15,
    borderBottomRightRadius: 5,
  },
  voiceMessageOfHRBlock: {
    maxWidth: "70%",
    backgroundColor: "#2623D2",
    padding: 12,
    borderRadius: 15,
    borderBottomLeftRadius: 5,
  },
  voiceMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  waveformContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    position: "relative",
  },
  waveformBar: {
    width: 4,
    borderRadius: 2,
    marginHorizontal: 1,
  },
  progressIndicator: {
    position: "absolute",
    top: 0,
    width: 2,
    height: "100%",
  },
  voiceDuration: {
    fontSize: 14,
    fontWeight: "500",
    minWidth: 40,
  },
  voiceDurationUser: {
    color: "#2623D2",
  },
  voiceDurationHR: {
    color: "#fff",
  },
  messageSentTimeAndSeenBlock: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 5,
    marginTop: 5,
  },
  messageSentTimeUser: {
    color: "#9E9E9E",
    fontSize: 12,
    fontWeight: "400",
  },
  messageSentTimeHR: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    fontWeight: "400",
  },
  messageSeenIcon: {},
  footerMessagesComponentBlock: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: "#fff",
  },
  inputMessageAndIconBlock: {
    position: "relative",
  },
  inputMessage: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    fontSize: 16,
    fontWeight: "400",
    borderRadius: 25,
    paddingLeft: 50,
    paddingRight: 50,
    paddingVertical: 12,
    maxHeight: 100,
  },
  iconStckersFooter: {
    position: "absolute",
    top: 10.5,
    left: 12,
    zIndex: 1,
  },
  sendButton: {
    position: "absolute",
    top: 6,
    right: 12,
    padding: 5,
  },
  btnVoiceToText: {
    position: "absolute",
    top: 6,
    right: 8,
    padding: 5,
  },
  // Recording styles
  recordingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  recordingIndicator: {
    alignItems: "center",
    justifyContent: "center",
  },
  recordingTime: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ff3b30",
  },
  stopRecordingButton: {
    backgroundColor: "#ff3b30",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
