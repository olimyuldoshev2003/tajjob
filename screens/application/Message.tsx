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
  Alert,
  Animated,
  Dimensions,
  Easing,
  Image,
  KeyboardAvoidingView,
  PanResponder,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
  View,
  Modal,
} from "react-native";

// // Fixed Agora import - using the correct package
// import AgoraUIKit from "agora-rn-uikit";
import {
  ZegoUIKitPrebuiltCall,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
} from "@zegocloud/zego-uikit-prebuilt-call-rn";

const Message = ({ route }: { route: any }) => {
  interface Message {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: string;
    type: "text" | "voice";
    voiceUri?: string;
    duration?: number;
    waveformData?: number[]; // Array of amplitude values for waveform
  }

  const navigation: any = useNavigation();
  const { width: SCREEN_WIDTH } = Dimensions.get("window");
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
  const [isSeeking, setIsSeeking] = useState<boolean>(false);
  const [seekPosition, setSeekPosition] = useState<number>(0);
  const [recordingWaveformData, setRecordingWaveformData] = useState<number[]>(
    []
  );

  // Cancellation states
  const [slideToCancelVisible, setSlideToCancelVisible] =
    useState<boolean>(false);
  const [swipeTranslate] = useState(new Animated.Value(0));

  const recordingRef = useRef<Audio.Recording | null>(null);
  const recordingTimerRef = useRef<any>(null);
  const playbackTimerRef = useRef<any>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const waveformUpdateRef = useRef<any>(null);
  const recordingStartTimeRef = useRef<number>(0);

  // Video Call State
  const [videoCall, setVideoCall] = useState<boolean>(false);
  const [voiceCall, setVoiceCall] = useState<boolean>(false);

  // Fixed Agora UIKit Props - using correct prop structure
  const [agoraProps, setAgoraProps] = useState({
    connectionData: {
      appId: "e7f6e9aeecf14b2ba10e3f40be9f56e7", // Replace with your Agora App ID
      channel: "test",
      token: null, // Optional: Add your token if using secured channels
    },
    settings: {
      displayUsername: true,
      enableVideo: true, // Enable video for video calls
    },
    styleProps: {
      theme: "#2623D2",
      localBtnContainer: { backgroundColor: "#fff" },
    },
  });

  const callbacks = {
    EndCall: () => {
      setVideoCall(false);
      setVoiceCall(false);
    },
  };

  // Animation values for waveform
  const [waveformAnimations] = useState<Animated.Value[]>([]);
  const pulseAnimation = useRef(new Animated.Value(1)).current;

  // Progress animation for smooth seek indicator movement
  const progressAnimations = useRef<Map<string, Animated.Value>>(new Map());
  const animationRefs = useRef<Map<string, Animated.CompositeAnimation>>(
    new Map()
  );

  // PanResponder for swipe to cancel
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (isRecording) {
          swipeTranslate.setValue(gestureState.dx);

          // Show cancel if swiped left enough
          if (gestureState.dx < -100) {
            setSlideToCancelVisible(true);
          } else {
            setSlideToCancelVisible(false);
          }
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (isRecording) {
          // If swiped left enough, cancel recording
          if (gestureState.dx < -100) {
            cancelRecording();
          } else {
            // If not swiped enough, reset position
            Animated.spring(swipeTranslate, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
            setSlideToCancelVisible(false);
          }
        }
      },
    })
  ).current;

  // Generate realistic waveform data based on voice amplitude
  const generateWaveformData = (
    duration: number,
    complexity: number = 50
  ): number[] => {
    const data: number[] = [];
    const segments = Math.min(complexity, duration * 10); // More segments for longer durations

    for (let i = 0; i < segments; i++) {
      // Create natural-looking waveform with some randomness
      const baseHeight = 0.3 + Math.random() * 0.4;
      const variation = Math.sin(i * 0.5) * 0.3 + Math.cos(i * 0.2) * 0.2;
      const height = Math.max(0.1, Math.min(1, baseHeight + variation));
      data.push(height);
    }

    return data;
  };

  // Get or create progress animation for a message
  const getProgressAnimation = (messageId: string) => {
    if (!progressAnimations.current.has(messageId)) {
      progressAnimations.current.set(messageId, new Animated.Value(0));
    }
    return progressAnimations.current.get(messageId)!;
  };

  // Stop animation for a specific message
  const stopProgressAnimation = (messageId: string) => {
    const animation = animationRefs.current.get(messageId);
    if (animation) {
      animation.stop();
      animationRefs.current.delete(messageId);
    }
  };

  // Recording animation with pulse effect
  useEffect(() => {
    if (isRecording) {
      // Main recording pulse animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(recordingAnimation, {
            toValue: 1,
            duration: 1500,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            useNativeDriver: true,
          }),
          Animated.timing(recordingAnimation, {
            toValue: 0,
            duration: 1500,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Secondary pulse animation for microphone icon
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnimation, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnimation, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      recordingAnimation.setValue(0);
      pulseAnimation.setValue(1);
      Animated.timing(recordingAnimation, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }).stop();
    }
  }, [isRecording]);

  // Simulate waveform updates during recording
  useEffect(() => {
    if (isRecording) {
      // Start generating waveform data
      waveformUpdateRef.current = setInterval(() => {
        setRecordingWaveformData((prev) => {
          const newData = [...prev];
          // Generate random amplitude for waveform visualization
          const amplitude = 0.2 + Math.random() * 0.8;
          newData.push(amplitude);

          // Keep only last 50 data points for performance
          return newData.slice(-50);
        });
      }, 100);
    } else {
      if (waveformUpdateRef.current) {
        clearInterval(waveformUpdateRef.current);
        waveformUpdateRef.current = null;
      }
      setRecordingWaveformData([]);
    }

    return () => {
      if (waveformUpdateRef.current) {
        clearInterval(waveformUpdateRef.current);
      }
    };
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
      // Cleanup - FIXED: Only clear timers if they exist
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }
      if (playbackTimerRef.current) {
        clearInterval(playbackTimerRef.current);
        playbackTimerRef.current = null;
      }
      if (waveformUpdateRef.current) {
        clearInterval(waveformUpdateRef.current);
        waveformUpdateRef.current = null;
      }
      if (sound) {
        sound.unloadAsync();
      }
      if (recordingRef.current) {
        recordingRef.current.stopAndUnloadAsync();
      }

      // Clean up all animations
      animationRefs.current.forEach((animation) => animation.stop());
      animationRefs.current.clear();
    };
  }, []);

  // Start recording - FIXED VERSION
  const startRecording = async () => {
    try {
      console.log("🟢 Starting recording...");

      // Clean up any existing recording
      if (recordingRef.current) {
        await recordingRef.current.stopAndUnloadAsync();
        recordingRef.current = null;
      }

      // Clear any existing timer - FIXED
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }

      // Configure for recording
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      // Create new recording
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      await recording.startAsync();
      recordingStartTimeRef.current = Date.now();

      recordingRef.current = recording;
      setIsRecording(true);
      setRecordingTime(0);
      setRecordingWaveformData([]);
      setSlideToCancelVisible(false);
      swipeTranslate.setValue(0);

      // Start recording timer - FIXED: Use proper interval
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          const newTime = prev + 1;
          console.log("⏱️ Recording time:", newTime); // Debug log
          return newTime;
        });
      }, 1000);

      console.log("✅ Recording started successfully");
    } catch (error) {
      console.error("❌ Failed to start recording:", error);
      setIsRecording(false);
      // Clear timer on error - FIXED
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }
      Alert.alert(
        "Recording Error",
        "Failed to start recording. Please try again."
      );
    }
  };

  // Stop recording and send - FIXED VERSION
  const stopRecording = async () => {
    try {
      console.log("🟢 Stopping recording...");

      if (!recordingRef.current) {
        console.log("No recording in progress");
        return;
      }

      // Stop timer - FIXED: Only clear if it exists
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }

      // Stop recording and get URI
      await recordingRef.current.stopAndUnloadAsync();
      const uri = recordingRef.current.getURI();

      console.log("🎵 Recording URI:", uri);
      console.log("⏱️ Final recording duration:", recordingTime);

      if (uri && recordingTime >= 1) {
        // Generate waveform data for the recording
        const waveformData = generateWaveformData(recordingTime);

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
          waveformData: waveformData,
        };

        setMessages((prev) => [...prev, newVoiceMessage]);
        console.log("✅ Voice message sent successfully");

        // Scroll to bottom
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
      } else {
        console.log("❌ Recording too short or no URI");
        if (recordingTime < 1) {
          Alert.alert(
            "Recording too short",
            "Please record for at least 1 second."
          );
        }
      }
    } catch (error) {
      console.error("❌ Failed to stop recording:", error);
      Alert.alert("Recording Error", "Failed to stop recording.");
    } finally {
      // Reset states
      setIsRecording(false);
      setSlideToCancelVisible(false);
      recordingRef.current = null;

      // Don't reset recordingTime here - we need it for the message duration
      // setRecordingTime(0); // REMOVED: This was causing the issue

      setRecordingWaveformData([]);
      swipeTranslate.setValue(0);

      // Switch back to playback mode
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    }
  };

  // Cancel recording (swipe to cancel) - FIXED VERSION
  const cancelRecording = async () => {
    try {
      console.log("🟡 Canceling recording...");

      if (!recordingRef.current) {
        console.log("No recording in progress");
        return;
      }

      // Stop timer - FIXED
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }

      // Stop and delete recording
      await recordingRef.current.stopAndUnloadAsync();

      console.log("✅ Recording canceled");

      // Show cancel feedback with vibration
      Vibration.vibrate(100);
    } catch (error) {
      console.error("❌ Failed to cancel recording:", error);
    } finally {
      // Reset states
      setIsRecording(false);
      setSlideToCancelVisible(false);
      recordingRef.current = null;
      setRecordingTime(0); // Reset time when canceling
      setRecordingWaveformData([]);
      swipeTranslate.setValue(0);

      // Reset audio mode
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    }
  };

  // Reset recording time when not recording - FIXED: Added this function
  const resetRecordingTime = () => {
    setRecordingTime(0);
  };

  // Voice message handling
  const handleVoiceButtonPress = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // Delete existing voice message
  const deleteVoiceMessage = (messageId: string) => {
    Alert.alert(
      "Delete Voice Message",
      "Are you sure you want to delete this voice message?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
            if (currentPlayingVoice === messageId) {
              stopPlayingVoice();
            }
            // Clean up animation
            progressAnimations.current.delete(messageId);
            stopProgressAnimation(messageId);
          },
        },
      ]
    );
  };

  // Play voice message
  const playVoiceMessage = async (message: Message) => {
    try {
      console.log("🟢 Playing voice message:", message.id);

      // If already playing this message, pause it
      if (currentPlayingVoice === message.id) {
        if (sound) {
          await sound.pauseAsync();
          setCurrentPlayingVoice(null);
          if (playbackTimerRef.current) {
            clearInterval(playbackTimerRef.current);
            playbackTimerRef.current = null;
          }
          // Stop the progress animation when pausing
          stopProgressAnimation(message.id);
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
        console.log("❌ No voice URI found");
        Alert.alert("Playback Error", "Voice message not found.");
        return;
      }

      // Set current playing message
      setCurrentPlayingVoice(message.id);
      setPlaybackProgress(0);
      setPlaybackPosition(0);

      // Reset progress animation
      const progressAnim = getProgressAnimation(message.id);
      progressAnim.setValue(0);

      // Configure audio for playback
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      console.log("🎵 Loading sound from:", message.voiceUri);

      // Load and play the sound
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: message.voiceUri },
        { shouldPlay: true },
        onPlaybackStatusUpdate
      );

      setSound(newSound);

      // Start smooth progress animation
      const duration = message.duration || 1;
      const animation = Animated.timing(progressAnim, {
        toValue: 1,
        duration: duration * 1000, // Convert to milliseconds
        easing: Easing.linear,
        useNativeDriver: false, // We need to use false for left property
      });

      // Store the animation reference so we can stop it later
      animationRefs.current.set(message.id, animation);
      animation.start();

      // Start progress timer
      playbackTimerRef.current = setInterval(() => {
        setPlaybackProgress((prev) => {
          const newProgress = prev + 1;
          if (newProgress >= duration) {
            clearInterval(playbackTimerRef.current!);
            playbackTimerRef.current = null;
            setCurrentPlayingVoice(null);
            setPlaybackPosition(0);
            progressAnim.setValue(0);
            stopProgressAnimation(message.id);
            return duration;
          }
          setPlaybackPosition(newProgress);
          return newProgress;
        });
      }, 1000);

      console.log("✅ Playback started");
    } catch (error) {
      console.error("❌ Error playing voice message:", error);
      Alert.alert(
        "Playback Error",
        "Cannot play voice message. The file might be corrupted."
      );
      setCurrentPlayingVoice(null);
      setPlaybackProgress(0);
      setPlaybackPosition(0);
      const progressAnim = getProgressAnimation(message.id);
      progressAnim.setValue(0);
      stopProgressAnimation(message.id);
    }
  };

  // Playback status update
  const onPlaybackStatusUpdate = (status: any) => {
    if (status.didJustFinish) {
      console.log("🎵 Playback finished");
      // Clean up when finished
      setCurrentPlayingVoice(null);
      setPlaybackProgress(0);
      setPlaybackPosition(0);
      if (playbackTimerRef.current) {
        clearInterval(playbackTimerRef.current);
        playbackTimerRef.current = null;
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

      // Stop all progress animations
      animationRefs.current.forEach((animation) => {
        animation.stop();
      });
      animationRefs.current.clear();

      // Reset all progress values
      progressAnimations.current.forEach((anim) => {
        anim.setValue(0);
      });
    } catch (error) {
      console.error("Error stopping voice message:", error);
    }
  };

  // Seek to position in voice message - FIXED VERSION
  const seekToPosition = async (message: Message, position: number) => {
    try {
      if (!sound || !message.duration) return;

      const newPosition = Math.max(0, Math.min(position, message.duration));
      console.log("🎯 Seeking to:", newPosition, "seconds");

      // Stop the current timer
      if (playbackTimerRef.current) {
        clearInterval(playbackTimerRef.current);
        playbackTimerRef.current = null;
      }

      // Stop current animation
      stopProgressAnimation(message.id);

      // Set the new position
      await sound.setPositionAsync(newPosition * 1000); // Convert to milliseconds

      setPlaybackProgress(newPosition);
      setPlaybackPosition(newPosition);

      // Calculate remaining time and restart animation
      const remainingTime = (message.duration! - newPosition) * 1000;
      const newProgressValue = newPosition / message.duration!;

      const progressAnim = getProgressAnimation(message.id);
      progressAnim.setValue(newProgressValue);

      // Resume smooth animation if still playing
      if (currentPlayingVoice === message.id && remainingTime > 0) {
        const animation = Animated.timing(progressAnim, {
          toValue: 1,
          duration: remainingTime,
          easing: Easing.linear,
          useNativeDriver: false,
        });

        // Store the animation reference
        animationRefs.current.set(message.id, animation);
        animation.start();

        // Resume timer
        playbackTimerRef.current = setInterval(() => {
          setPlaybackProgress((prev) => {
            const newProgress = prev + 1;
            if (newProgress >= message.duration!) {
              clearInterval(playbackTimerRef.current!);
              playbackTimerRef.current = null;
              setCurrentPlayingVoice(null);
              setPlaybackPosition(0);
              progressAnim.setValue(0);
              stopProgressAnimation(message.id);
              return message.duration!;
            }
            setPlaybackPosition(newProgress);
            return newProgress;
          });
        }, 1000);
      }
    } catch (error) {
      console.error("❌ Error seeking:", error);
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

  // Format time for display - FIXED VERSION
  const formatTime = (seconds: number) => {
    if (seconds < 0) return "0:00";

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Enhanced Voice Waveform Component with SMOOTH ANIMATED seek functionality
  const VoiceWaveform = ({
    message,
    isPlaying,
    progress,
    onSeek,
  }: {
    message: Message;
    isPlaying: boolean;
    progress: number;
    onSeek: (position: number) => void;
  }) => {
    const waveformData =
      message.waveformData || generateWaveformData(message.duration || 1);
    const duration = message.duration || 1;
    const progressPercent = progress / duration;
    const barCount = Math.min(waveformData.length, 25); // Limit to 25 bars for better fit

    const waveformRef = useRef<View>(null);
    const [layoutWidth, setLayoutWidth] = useState(140);

    // Get the animated progress value for this message
    const progressAnim = getProgressAnimation(message.id);

    const handleWaveformPress = (event: any) => {
      if (!waveformRef.current) return;

      const touchX = event.nativeEvent.locationX;
      const progressPercentage = Math.max(0, Math.min(1, touchX / layoutWidth));
      const newPosition = Math.floor(progressPercentage * duration);

      console.log(
        "🎯 Waveform pressed at:",
        touchX,
        "progress:",
        progressPercentage,
        "position:",
        newPosition
      );
      onSeek(newPosition);
    };

    const handleWaveformLayout = (event: any) => {
      const { width } = event.nativeEvent.layout;
      setLayoutWidth(width);
    };

    return (
      <View
        style={[styles.waveformContainer]}
        ref={waveformRef}
        onLayout={handleWaveformLayout}
      >
        <TouchableOpacity
          style={styles.waveformTouchArea}
          onPress={handleWaveformPress}
          activeOpacity={1}
        >
          <View style={styles.waveformBarsContainer}>
            {waveformData.slice(0, barCount).map((amplitude, index) => {
              const barProgress = index / barCount;
              const isActive = barProgress <= progressPercent;

              // Calculate bar height based on amplitude
              const maxHeight = 24;
              const height = Math.max(4, amplitude * maxHeight);

              return (
                <View
                  key={index}
                  style={[
                    styles.waveformBar,
                    {
                      width: 3,
                      height: height,
                      marginHorizontal: 1,
                      backgroundColor: isActive
                        ? message.isUser
                          ? "#ff3b30"
                          : "#ffd700"
                        : message.isUser
                        ? "rgba(38, 35, 210, 0.4)"
                        : "rgba(255, 255, 255, 0.4)",
                      borderRadius: 1.5,
                    },
                  ]}
                />
              );
            })}

            {/* Progress overlay - only show when playing */}
            {isPlaying && (
              <Animated.View
                style={[
                  styles.waveformProgressOverlay,
                  {
                    width: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0%", "100%"],
                    }),
                    backgroundColor: message.isUser
                      ? "rgba(255, 59, 48, 0.1)"
                      : "rgba(255, 215, 0, 0.1)",
                  },
                ]}
              />
            )}

            {/* Smooth animated seek indicator - only show when playing */}
            {isPlaying && (
              <Animated.View
                style={[
                  styles.seekIndicator,
                  {
                    left: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0%", "100%"],
                    }),
                    backgroundColor: message.isUser ? "#ff3b30" : "#ffd700",
                  },
                ]}
              />
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  // Live recording waveform component
  const RecordingWaveform = () => {
    const data =
      recordingWaveformData.length > 0
        ? recordingWaveformData
        : Array(15).fill(0.3); // Reduced number of bars

    return (
      <View style={styles.recordingWaveformContainer}>
        <View style={styles.recordingWaveformBars}>
          {data.slice(0, 15).map((amplitude, index) => {
            const height = Math.max(6, amplitude * 20);
            const isRecent = index >= data.length - 3;

            return (
              <View
                key={index}
                style={[
                  styles.recordingWaveformBar,
                  {
                    width: 2,
                    height: height,
                    marginHorizontal: 1,
                    backgroundColor: isRecent ? "#ff3b30" : "#ff6b6b",
                    borderRadius: 1,
                    opacity: isRecent ? 1 : 0.7,
                  },
                ]}
              />
            );
          })}
        </View>
      </View>
    );
  };

  const renderMessage = (message: Message) => {
    if (message.type === "voice") {
      const isPlaying = currentPlayingVoice === message.id;
      const currentProgress = isPlaying ? playbackPosition : 0;
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
            <View style={styles.voiceMessageContainer}>
              <TouchableOpacity
                style={styles.playButtonContainer}
                onPress={() => playVoiceMessage(message)}
                activeOpacity={0.7}
                delayLongPress={500}
              >
                <Animated.View
                  style={[
                    styles.playButton,
                    isPlaying && styles.playingButton,
                    {
                      transform: [{ scale: isPlaying ? pulseAnimation : 1 }],
                    },
                  ]}
                >
                  <Ionicons
                    name={isPlaying ? "pause" : "play"}
                    size={16}
                    color={message.isUser ? "#2623D2" : "#fff"}
                  />
                </Animated.View>
              </TouchableOpacity>

              <VoiceWaveform
                message={message}
                isPlaying={isPlaying}
                progress={currentProgress}
                onSeek={(position) => seekToPosition(message, position)}
              />

              <Text
                style={[
                  styles.voiceDuration,
                  message.isUser
                    ? styles.voiceDurationUser
                    : styles.voiceDurationHR,
                  isPlaying && styles.playingDuration,
                ]}
              >
                {formatTime(isPlaying ? currentProgress : duration)}
              </Text>
            </View>

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
                  size={16}
                  color="#00b7ff"
                  style={styles.messageSeenIcon}
                />
              )}
            </View>
          </View>
        </View>
      );
    }

    // Text message
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
                size={16}
                color="#00b7ff"
                style={styles.messageSeenIcon}
              />
            )}
          </View>
        </View>
      </View>
    );
  };

  // Handle voice call - disable video for voice call
  const handleVoiceCall = () => {
    setAgoraProps((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        enableVideo: false, // Disable video for voice call
      },
    }));
    setVoiceCall(true);
  };

  // Handle video call - enable video for video call
  const handleVideoCall = () => {
    setAgoraProps((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        enableVideo: true, // Enable video for video call
      },
    }));
    setVideoCall(true);
  };

  return (
    <KeyboardAvoidingView
      style={styles.messageComponent}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      {/* Video Call Modal */}
      {/* <Modal
        visible={videoCall}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <View style={styles.videoCallContainer}>
          <AgoraUIKit
            connectionData={agoraProps.connectionData}
            settings={agoraProps.settings}
            styleProps={agoraProps.styleProps}
            rtcCallbacks={callbacks}
          />
        </View>
      </Modal> */}

      {/* Voice Call Modal */}
      {/* <Modal
        visible={voiceCall}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <View style={styles.videoCallContainer}>
          <AgoraUIKit
            connectionData={agoraProps.connectionData}
            settings={agoraProps.settings}
            styleProps={agoraProps.styleProps}
            rtcCallbacks={callbacks}
          />
        </View>
      </Modal> */}

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
          <TouchableOpacity onPress={handleVoiceCall}>
            <FontAwesome5 name="phone-alt" size={31} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleVideoCall}>
            <FontAwesome name="video-camera" size={31} color="black" />
          </TouchableOpacity>
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
              {/* Swipe to Cancel Indicator */}
              {slideToCancelVisible && (
                <View style={styles.cancelIndicator}>
                  <Ionicons name="close-circle" size={20} color="#ff3b30" />
                  <Text style={styles.cancelText}>Release to cancel</Text>
                </View>
              )}

              <Animated.View
                style={[
                  styles.recordingIndicator,
                  {
                    transform: [
                      {
                        scale: pulseAnimation,
                      },
                      { translateX: swipeTranslate },
                    ],
                  },
                ]}
                {...panResponder.panHandlers}
              >
                <Ionicons name="mic" size={20} color="#ff3b30" />
              </Animated.View>

              {/* Live recording waveform */}
              <RecordingWaveform />

              <Text style={styles.recordingTime}>
                {formatTime(recordingTime)}
              </Text>

              {/* Cancel Button */}
              <TouchableOpacity
                style={styles.cancelRecordingButton}
                onPress={cancelRecording}
                activeOpacity={0.7}
              >
                <Ionicons name="close" size={20} color="#ff3b30" />
              </TouchableOpacity>

              {/* Stop/Send Button */}
              <TouchableOpacity
                style={styles.stopRecordingButton}
                onPress={stopRecording}
                activeOpacity={0.7}
              >
                <Ionicons name="send" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          ) : (
            // Normal input
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
                size={22}
                color="black"
                style={styles.iconStckersFooter}
              />

              {messageText.trim() ? (
                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={sendTextMessage}
                  activeOpacity={0.7}
                >
                  <Ionicons name="send" size={20} color="#2623D2" />
                </TouchableOpacity>
              ) : (
                // Voice button - FIXED: Reset recording time when starting new recording
                <TouchableOpacity
                  style={styles.btnVoiceToText}
                  onPress={() => {
                    resetRecordingTime(); // Reset time before starting
                    handleVoiceButtonPress();
                  }}
                  activeOpacity={0.7}
                >
                  <Ionicons name="mic" size={22} color="#2623D2" />
                </TouchableOpacity>
              )}
            </View>
          )}
          <ZegoUIKitPrebuiltCall
            appID={434563306}
            appSign={
              "31f5dbed0175b8703004ba53dd42d83bb23acdba6bcd8872a135e0798b2376d2"
            }
            userID={"1911"} // userID can be something like a phone number or the user id on your own user system.
            userName={"olim_yuldoshev"}
            callID={"1111"} // callID can be any unique string.
            config={{
              // You can also use ONE_ON_ONE_VOICE_CALL_CONFIG/GROUP_VIDEO_CALL_CONFIG/GROUP_VOICE_CALL_CONFIG to make more types of calls.
              ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
              onOnlySelfInRoom: () => {
                navigation.navigate("Message");
              },
              onHangUp: () => {
                navigation.navigate("Message");
              },
            }}
          />
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
  videoCallContainer: {
    flex: 1,
    backgroundColor: "#000",
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
  // Voice message styles - FIXED WIDTH
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
    gap: 8,
    minHeight: 32,
  },
  playButtonContainer: {
    // Separate container for play button to avoid conflict with waveform touch
  },
  playButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(38, 35, 210, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  playingButton: {
    backgroundColor: "rgba(255, 59, 48, 0.1)",
  },
  // Waveform styles - FIXED with proper touch handling
  waveformContainer: {
    width: 140, // Fixed width to fit container
    height: 32,
  },
  waveformTouchArea: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  waveformBarsContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    position: "relative",
  },
  waveformBar: {
    alignSelf: "flex-end",
  },
  waveformProgressOverlay: {
    position: "absolute",
    height: "100%",
    borderRadius: 8,
  },
  seekIndicator: {
    position: "absolute",
    top: -2,
    width: 3, // Slightly wider for better visibility
    height: "120%", // Slightly taller
    borderRadius: 1.5,
    zIndex: 10, // Ensure it's above other elements
  },
  // Recording waveform styles
  recordingWaveformContainer: {
    width: 100, // Reduced width
    height: 32,
    justifyContent: "center",
  },
  recordingWaveformBars: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: "100%",
  },
  recordingWaveformBar: {
    alignSelf: "flex-end",
  },
  voiceDuration: {
    fontSize: 12,
    fontWeight: "500",
    minWidth: 35,
    textAlign: "center",
  },
  voiceDurationUser: {
    color: "#2623D2",
  },
  voiceDurationHR: {
    color: "#fff",
  },
  playingDuration: {
    fontWeight: "700",
  },
  messageSentTimeAndSeenBlock: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 4,
    marginTop: 4,
  },
  messageSentTimeUser: {
    color: "#9E9E9E",
    fontSize: 11,
    fontWeight: "400",
  },
  messageSentTimeHR: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 11,
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
  // Recording styles - UPDATED WITH CANCEL BUTTON
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
    paddingHorizontal: 15,
    paddingVertical: 10,
    position: "relative",
  },
  recordingIndicator: {
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 59, 48, 0.1)",
  },
  recordingTime: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ff3b30",
    minWidth: 40,
    textAlign: "center",
  },
  // ADDED CANCEL BUTTON STYLES
  cancelRecordingButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 59, 48, 0.1)",
    marginRight: 8,
  },
  stopRecordingButton: {
    backgroundColor: "#ff3b30",
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#ff3b30",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  // Swipe to cancel styles
  cancelIndicator: {
    position: "absolute",
    left: -110,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 59, 48, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  cancelText: {
    color: "#ff3b30",
    fontSize: 11,
    fontWeight: "600",
    marginLeft: 4,
  },
});
