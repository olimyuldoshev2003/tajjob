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

  const [pickerVisible, setPickerVisible] = useState<boolean>(false);
  const [finalImage, setFinalImage] = useState<any>(null);
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
    {
      id: "3",
      text: "How can I help you?",
      isUser: false,
      timestamp: "13:47",
      type: "text",
    },
    {
      id: "4",
      text: "I sent a request to your company in marketing area.",
      isUser: true,
      timestamp: "13:47",
      type: "text",
    },
    {
      id: "5",
      text: "Ok. So, our specialists will message you.",
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
  const [playbackDuration, setPlaybackDuration] = useState<number>(0);

  const recordingRef = useRef<Audio.Recording | null>(null);
  const recordingTimerRef = useRef<any>(null);
  const playbackTimerRef = useRef<any>(null);
  const isRecordingActiveRef = useRef<boolean>(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // Custom Waveform Component with real audio-based visualization
  const CustomWaveform = ({
    duration,
    progress,
    width,
    height,
    waveColor,
    progressColor,
    isPlaying,
  }: {
    duration: number;
    progress: number;
    width: number;
    height: number;
    waveColor: string;
    progressColor: string;
    isPlaying: boolean;
  }) => {
    const bars = 20;
    const progressWidth = (progress / duration) * width;

    // Generate waveform bars with more variation for realism
    const generateBars = () => {
      const barData = [];
      for (let i = 0; i < bars; i++) {
        // Create a more dynamic waveform pattern
        const position = i / bars;
        const baseHeight =
          Math.sin(position * Math.PI * 4) * 0.4 +
          Math.cos(position * Math.PI * 2) * 0.3 +
          0.5;
        const variation = Math.random() * 0.3 + 0.1;
        const finalHeight = Math.max(0.2, Math.min(1, baseHeight + variation));
        barData.push(finalHeight);
      }
      return barData;
    };

    const barData = generateBars();

    return (
      <View style={[styles.waveformContainer, { width, height }]}>
        {/* Background waveform */}
        <View style={styles.waveformBackground}>
          {barData.map((amplitude, index) => {
            const barPosition = (index / bars) * width;
            const isActive = barPosition <= progressWidth;

            return (
              <View
                key={index}
                style={[
                  styles.waveformBar,
                  {
                    height: Math.max(6, amplitude * height * 0.9),
                    backgroundColor: isActive ? progressColor : waveColor,
                    marginRight: 2,
                    opacity: isActive ? 1 : 0.7,
                  },
                ]}
              />
            );
          })}
        </View>

        {/* Progress indicator line */}
        {isPlaying && (
          <View
            style={[
              styles.progressIndicator,
              {
                left: progressWidth,
                backgroundColor: progressColor,
              },
            ]}
          />
        )}
      </View>
    );
  };

  // Voice recording animation
  useEffect(() => {
    if (isRecording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(recordingAnimation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(recordingAnimation, {
            toValue: 0,
            duration: 500,
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

  // Request permissions and setup audio
  useEffect(() => {
    const setupAudio = async () => {
      try {
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== "granted") {
          console.log("Audio permissions not granted");
          return;
        }

        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
        console.log("Audio setup completed");
      } catch (error) {
        console.log("Audio setup error:", error);
      }
    };
    setupAudio();

    return () => {
      // Cleanup on unmount
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
      if (playbackTimerRef.current) {
        clearInterval(playbackTimerRef.current);
      }
      if (sound) {
        sound.unloadAsync().catch(console.error);
      }
      if (recordingRef.current && isRecordingActiveRef.current) {
        recordingRef.current.stopAndUnloadAsync().catch(console.error);
      }
    };
  }, []);

  // Start recording voice message
  const startRecording = async () => {
    if (isRecordingActiveRef.current) {
      console.log("Recording already in progress");
      return;
    }

    try {
      isRecordingActiveRef.current = true;

      // Reset any previous recording
      if (recordingRef.current) {
        try {
          await recordingRef.current.stopAndUnloadAsync();
        } catch (error) {
          console.log("Error stopping previous recording:", error);
        }
        recordingRef.current = null;
      }

      // Configure audio mode for recording
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      console.log("Starting recording...");

      // Create new recording instance with better configuration
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      recordingRef.current = recording;
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);

      console.log("Recording started successfully");
    } catch (error) {
      console.error("Failed to start recording:", error);
      isRecordingActiveRef.current = false;
      setIsRecording(false);
    }
  };

  // Stop recording and send voice message
  const stopRecording = async () => {
    if (!isRecordingActiveRef.current) {
      return;
    }

    console.log("Stopping recording...");

    // Clear timer first
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }

    setIsRecording(false);
    isRecordingActiveRef.current = false;

    try {
      const currentRecording = recordingRef.current;
      if (currentRecording) {
        console.log("Stopping and unloading recording...");
        await currentRecording.stopAndUnloadAsync();

        const uri = currentRecording.getURI();
        console.log("Recording URI:", uri);

        if (uri && recordingTime >= 1) {
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

          // Scroll to bottom when new message is added
          setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
          }, 100);
        } else if (recordingTime < 1) {
          console.log("Recording too short");
        }
      }
    } catch (error) {
      console.error("Failed to stop recording:", error);
    } finally {
      recordingRef.current = null;
      setRecordingTime(0);

      // Reset audio mode for playback
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
      } catch (error) {
        console.log("Audio mode reset error:", error);
      }
    }
  };

  // Play voice message with proper progress tracking
  const playVoiceMessage = async (message: Message) => {
    try {
      // Stop currently playing sound
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
        setCurrentPlayingVoice(null);
        setPlaybackProgress(0);

        if (playbackTimerRef.current) {
          clearInterval(playbackTimerRef.current);
          playbackTimerRef.current = null;
        }
      }

      if (currentPlayingVoice === message.id) {
        setCurrentPlayingVoice(null);
        setPlaybackProgress(0);
        return;
      }

      if (!message.voiceUri) {
        console.log("No voice URI found");
        return;
      }

      console.log("Playing voice message:", message.voiceUri);

      // Set audio mode for playback
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: message.voiceUri },
        { shouldPlay: true },
        onPlaybackStatusUpdate
      );

      setSound(newSound);
      setCurrentPlayingVoice(message.id);
      setPlaybackProgress(0);
      setPlaybackDuration(message.duration || 0);

      // Start progress timer
      playbackTimerRef.current = setInterval(() => {
        setPlaybackProgress((prev) => {
          const newProgress = prev + 1;
          if (newProgress >= (message.duration || 0)) {
            if (playbackTimerRef.current) {
              clearInterval(playbackTimerRef.current);
              playbackTimerRef.current = null;
            }
            return message.duration || 0;
          }
          return newProgress;
        });
      }, 1000);

      console.log("Voice message playback started");
    } catch (error) {
      console.error("Error playing voice message:", error);
      setCurrentPlayingVoice(null);
      setPlaybackProgress(0);
    }
  };

  // Playback status update callback
  const onPlaybackStatusUpdate = (status: any) => {
    if (status.didJustFinish) {
      // Playback finished
      setCurrentPlayingVoice(null);
      setPlaybackProgress(0);
      if (playbackTimerRef.current) {
        clearInterval(playbackTimerRef.current);
        playbackTimerRef.current = null;
      }
      if (sound) {
        sound.unloadAsync();
        setSound(null);
      }
    }
  };

  // Stop playing voice message
  const stopPlayingVoice = async () => {
    try {
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
      }
      setCurrentPlayingVoice(null);
      setPlaybackProgress(0);

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

      // Scroll to bottom when new message is added
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
              onPress={() =>
                isPlaying ? stopPlayingVoice() : playVoiceMessage(message)
              }
              activeOpacity={0.7}
            >
              <Ionicons
                name={isPlaying ? "pause-circle" : "play-circle"}
                size={28}
                color={message.isUser ? "#2623D2" : "#fff"}
              />

              {/* Custom Waveform Component with real progress */}
              <CustomWaveform
                duration={duration}
                progress={currentProgress}
                width={120}
                height={30}
                waveColor={message.isUser ? "#2623D2" : "#ffffff"}
                progressColor={message.isUser ? "#ff3b30" : "#ffd700"}
                isPlaying={isPlaying}
              />

              <Text
                style={[
                  styles.voiceDuration,
                  message.isUser
                    ? styles.voiceDurationUser
                    : styles.voiceDurationHR,
                ]}
              >
                {isPlaying ? formatTime(currentProgress) : formatTime(duration)}
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
            onPress={() => {
              navigation.goBack();
            }}
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
            <Text style={styles.messagesSentDay}>Yesterday</Text>
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
                          outputRange: [1, 1.2],
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
                <Ionicons name="stop" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.inputMessageAndIconBlock}>
              <TextInput
                style={styles.inputMessage}
                placeholder="Messages"
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
                onPress={() => setPickerVisible(true)}
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
    position: "relative",
    overflow: "hidden",
    justifyContent: "center",
  },
  waveformBackground: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: "100%",
  },
  waveformBar: {
    width: 3,
    borderRadius: 1.5,
  },
  progressIndicator: {
    position: "absolute",
    top: 0,
    width: 2,
    height: "100%",
    zIndex: 10,
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
