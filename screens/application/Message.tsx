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

// Import ConnectyCube
import ConnectyCube from "react-native-connectycube";

// Types for ConnectyCube
interface ConnectyCubeUser {
  id: number;
  login?: string;
  full_name?: string;
  email?: string;
}

interface CallSession {
  id: string;
  opponentsIds: number[];
  callerId: number;
  state: string;
}

const Message = ({ route }: { route: any }) => {
  interface Message {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: string;
    type: "text" | "voice";
    voiceUri?: string;
    duration?: number;
    waveformData?: number[];
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

  // ConnectyCube States
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<ConnectyCubeUser | null>(null);
  const [opponentUser, setOpponentUser] = useState<ConnectyCubeUser | null>(
    null
  );
  const [callSession, setCallSession] = useState<CallSession | null>(null);
  const [localStream, setLocalStream] = useState<any>(null);
  const [remoteStream, setRemoteStream] = useState<any>(null);

  // Call States
  const [videoCall, setVideoCall] = useState<boolean>(false);
  const [voiceCall, setVoiceCall] = useState<boolean>(false);
  const [incomingCall, setIncomingCall] = useState<boolean>(false);
  const [incomingCallData, setIncomingCallData] = useState<any>(null);

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

  // ConnectyCube Configuration
  const CONFIG = {
    appId: "YOUR_APP_ID",
    authKey: "YOUR_AUTH_KEY",
    authSecret: "YOUR_AUTH_SECRET",
  };

  // Initialize ConnectyCube
  useEffect(() => {
    initializeConnectyCube();

    return () => {
      cleanupConnectyCube();
    };
  }, []);

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
      // Cleanup
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

  const initializeConnectyCube = async () => {
    try {
      console.log("🔄 Initializing ConnectyCube...");

      // Initialize SDK
      await ConnectyCube.init(CONFIG);
      console.log("✅ ConnectyCube SDK initialized");

      // Setup demo users
      await setupDemoUsers();

      console.log("✅ ConnectyCube setup completed successfully");
    } catch (error) {
      console.error("❌ ConnectyCube initialization failed:", error);
      // Continue in offline mode
      await setupDemoUsersOffline();
    }
  };

  const setupDemoUsers = async () => {
    try {
      console.log("🔄 Setting up demo users...");

      // For demo purposes, create mock users without API calls
      const mockCurrentUser: ConnectyCubeUser = {
        id: 12345,
        login: "user1_demo",
        full_name: "Current User",
        email: "user1@demo.com",
      };

      const mockOpponentUser: ConnectyCubeUser = {
        id: 67890,
        login: "hr_demo",
        full_name: "Danny H.",
        email: "hr@demo.com",
      };

      setCurrentUser(mockCurrentUser);
      setOpponentUser(mockOpponentUser);
      setIsConnected(true);

      console.log("✅ Demo users setup completed");
    } catch (error) {
      console.error("❌ User setup failed:", error);
      // Fallback to offline mode
      await setupDemoUsersOffline();
    }
  };

  const setupDemoUsersOffline = async () => {
    console.log("🔄 Setting up offline demo users...");

    const mockCurrentUser: ConnectyCubeUser = {
      id: 12345,
      login: "user1_demo",
      full_name: "Current User",
      email: "user1@demo.com",
    };

    const mockOpponentUser: ConnectyCubeUser = {
      id: 67890,
      login: "hr_demo",
      full_name: "Danny H.",
      email: "hr@demo.com",
    };

    setCurrentUser(mockCurrentUser);
    setOpponentUser(mockOpponentUser);
    setIsConnected(true);

    console.log("✅ Offline demo users setup completed");
  };

  // Safe call listener setup
  const setupCallListeners = () => {
    if (!ConnectyCube.videochat) {
      console.warn("⚠️ ConnectyCube videochat module not available");
      return;
    }

    try {
      // Use the correct event listener names for the current ConnectyCube version
      if (ConnectyCube.videochat.onCall) {
        ConnectyCube.videochat.onCall = (session: any, extension: any) => {
          console.log("📞 Incoming call:", session);
          setIncomingCall(true);
          setIncomingCallData({ session, extension });
          setCallSession(session);
        };
      }

      if (ConnectyCube.videochat.onAcceptCall) {
        ConnectyCube.videochat.onAcceptCall = (
          session: any,
          extension: any
        ) => {
          console.log("✅ Call accepted:", session);
          setCallSession(session);
        };
      }

      if (ConnectyCube.videochat.onRejectCall) {
        ConnectyCube.videochat.onRejectCall = (
          session: any,
          extension: any
        ) => {
          console.log("❌ Call rejected:", session);
          endCall();
        };
      }

      if (ConnectyCube.videochat.onStopCall) {
        ConnectyCube.videochat.onStopCall = (session: any, extension: any) => {
          console.log("📞 Call ended:", session);
          endCall();
        };
      }

      if (ConnectyCube.videochat.onRemoteStream) {
        ConnectyCube.videochat.onRemoteStream = (
          session: any,
          userID: number,
          stream: any
        ) => {
          console.log("📹 Remote stream received:", stream);
          setRemoteStream(stream);
        };
      }

      if (ConnectyCube.videochat.onUserNotAnswer) {
        ConnectyCube.videochat.onUserNotAnswer = (
          session: any,
          userID: number
        ) => {
          console.log("❌ User not answering:", userID);
          Alert.alert("Call Failed", "The user is not answering.");
          endCall();
        };
      }

      console.log("✅ Call listeners setup completed");
    } catch (error) {
      console.error("❌ Error setting up call listeners:", error);
    }
  };

  const cleanupConnectyCube = async () => {
    try {
      // Use session destruction instead of stopCall
      if (callSession) {
        // Clean up call session properly
        setCallSession(null);
      }
    } catch (error) {
      console.error("Error during cleanup:", error);
    }
  };

  // Start Video Call (Enhanced Mock implementation)
  const startVideoCall = async () => {
    if (!opponentUser || !currentUser) {
      Alert.alert("Error", "User not ready for calling");
      return;
    }

    try {
      console.log("🎥 Starting video call...");

      // Mock call session
      const mockSession: CallSession = {
        id: "mock_session_" + Date.now(),
        opponentsIds: [opponentUser.id],
        callerId: currentUser.id,
        state: "active",
      };

      setCallSession(mockSession);
      setVideoCall(true);

      console.log("✅ Video call started (mock)");

      // Show call interface directly since we're in mock mode
      // Alert.alert(
      //   "Video Call Started",
      //   "Video call with Danny H. has started (Demo Mode)",
      //   [{ text: "OK" }]
      // );
    } catch (error) {
      console.error("❌ Failed to start video call:", error);
      Alert.alert(
        "Call Failed",
        "Could not start video call. Please try again."
      );
    }
  };

  // Start Voice Call (Enhanced Mock implementation)
  const startVoiceCall = async () => {
    if (!opponentUser || !currentUser) {
      Alert.alert("Error", "User not ready for calling");
      return;
    }

    try {
      console.log("🎙️ Starting voice call...");

      // Mock call session
      const mockSession: CallSession = {
        id: "mock_session_" + Date.now(),
        opponentsIds: [opponentUser.id],
        callerId: currentUser.id,
        state: "active",
      };

      setCallSession(mockSession);
      setVoiceCall(true);

      console.log("✅ Voice call started (mock)");

      // Show call interface directly since we're in mock mode
      // Alert.alert(
      //   "Voice Call Started",
      //   "Voice call with Danny H. has started (Demo Mode)",
      //   [{ text: "OK" }]
      // );
    } catch (error) {
      console.error("❌ Failed to start voice call:", error);
      Alert.alert(
        "Call Failed",
        "Could not start voice call. Please try again."
      );
    }
  };

  // Accept Incoming Call (Mock implementation)
  const acceptCall = async () => {
    if (!incomingCallData) return;

    try {
      console.log("✅ Accepting incoming call...");

      setIncomingCall(false);

      const isVideoCall = incomingCallData.extension.callType === 1;
      setVideoCall(isVideoCall);
      setVoiceCall(!isVideoCall);

      console.log("✅ Call accepted successfully (mock)");
    } catch (error) {
      console.error("❌ Failed to accept call:", error);
      Alert.alert("Call Failed", "Could not accept the call.");
      endCall();
    }
  };

  // Reject Incoming Call (Mock implementation)
  const rejectCall = async () => {
    try {
      console.log("❌ Call rejected");
    } catch (error) {
      console.error("❌ Failed to reject call:", error);
    } finally {
      setIncomingCall(false);
      setIncomingCallData(null);
      setCallSession(null);
    }
  };

  // End Current Call
  const endCall = async () => {
    try {
      console.log("📞 Call ended");

      // Clean up any active call sessions
      if (callSession) {
        console.log("Cleaning up call session:", callSession.id);
      }
    } catch (error) {
      console.error("❌ Error ending call:", error);
    } finally {
      setVideoCall(false);
      setVoiceCall(false);
      setIncomingCall(false);
      setIncomingCallData(null);
      setCallSession(null);
      setLocalStream(null);
      setRemoteStream(null);
    }
  };

  // Generate realistic waveform data based on voice amplitude
  const generateWaveformData = (
    duration: number,
    complexity: number = 50
  ): number[] => {
    const data: number[] = [];
    const segments = Math.min(complexity, duration * 10);

    for (let i = 0; i < segments; i++) {
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

  // Start recording
  const startRecording = async () => {
    try {
      console.log("🟢 Starting recording...");

      // Clean up any existing recording
      if (recordingRef.current) {
        await recordingRef.current.stopAndUnloadAsync();
        recordingRef.current = null;
      }

      // Clear any existing timer
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

      // Start recording timer
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          const newTime = prev + 1;
          console.log(newTime);
          return newTime;
          
        });
      }, 1000);

      console.log("✅ Recording started successfully");
    } catch (error) {
      console.error("❌ Failed to start recording:", error);
      setIsRecording(false);
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

  // Stop recording and send
  const stopRecording = async () => {
    try {
      console.log("🟢 Stopping recording...");

      if (!recordingRef.current) {
        console.log("No recording in progress");
        return;
      }

      // Stop timer
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

  // Cancel recording (swipe to cancel)
  const cancelRecording = async () => {
    try {
      console.log("🟡 Canceling recording...");

      if (!recordingRef.current) {
        console.log("No recording in progress");
        return;
      }

      // Stop timer
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
      setRecordingTime(0);
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

  // Reset recording time when not recording
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
        duration: duration * 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      });

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

      animationRefs.current.forEach((animation) => {
        animation.stop();
      });
      animationRefs.current.clear();

      progressAnimations.current.forEach((anim) => {
        anim.setValue(0);
      });
    } catch (error) {
      console.error("Error stopping voice message:", error);
    }
  };

  // Seek to position in voice message
  const seekToPosition = async (message: Message, position: number) => {
    try {
      if (!sound || !message.duration) return;

      const newPosition = Math.max(0, Math.min(position, message.duration));
      console.log("🎯 Seeking to:", newPosition, "seconds");

      if (playbackTimerRef.current) {
        clearInterval(playbackTimerRef.current);
        playbackTimerRef.current = null;
      }

      stopProgressAnimation(message.id);

      await sound.setPositionAsync(newPosition * 1000);

      setPlaybackProgress(newPosition);
      setPlaybackPosition(newPosition);

      const remainingTime = (message.duration! - newPosition) * 1000;
      const newProgressValue = newPosition / message.duration!;

      const progressAnim = getProgressAnimation(message.id);
      progressAnim.setValue(newProgressValue);

      if (currentPlayingVoice === message.id && remainingTime > 0) {
        const animation = Animated.timing(progressAnim, {
          toValue: 1,
          duration: remainingTime,
          easing: Easing.linear,
          useNativeDriver: false,
        });

        animationRefs.current.set(message.id, animation);
        animation.start();

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

  // Format time for display
  const formatTime = (seconds: number) => {
    if (seconds < 0) return "0:00";

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Enhanced Voice Waveform Component
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
    const barCount = Math.min(waveformData.length, 25);

    const waveformRef = useRef<View>(null);
    const [layoutWidth, setLayoutWidth] = useState(140);

    const progressAnim = getProgressAnimation(message.id);

    const handleWaveformPress = (event: any) => {
      if (!waveformRef.current) return;

      const touchX = event.nativeEvent.locationX;
      const progressPercentage = Math.max(0, Math.min(1, touchX / layoutWidth));
      const newPosition = Math.floor(progressPercentage * duration);

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
        : Array(15).fill(0.3);

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

  // Render message function
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

  // Call handlers
  const handleVoiceCall = () => {
    if (!isConnected) {
      Alert.alert(
        "Not Connected",
        "Please wait while we connect to the call service."
      );
      return;
    }
    startVoiceCall();
  };

  const handleVideoCall = () => {
    if (!isConnected) {
      Alert.alert(
        "Not Connected",
        "Please wait while we connect to the call service."
      );
      return;
    }
    startVideoCall();
  };

  // Render Video Call Screen
  const renderVideoCallScreen = () => {
    return (
      <View style={styles.videoCallContainer}>
        {/* Background with garden image */}
        <Image
          source={require("../../assets/tajjob/messages/garden-bg.png")}
          style={styles.videoCallBackground}
          blurRadius={2}
        />

        {/* Remote Video Stream - Mock */}
        <View style={styles.remoteVideoContainer}>
          <View style={styles.remoteVideo}>
            <Ionicons name="videocam" size={60} color="#fff" />
            <Text style={styles.mockVideoText}>Danny H.</Text>
            <Text style={styles.mockVideoSubtext}>Video Call</Text>
          </View>
        </View>

        {/* Local Video Stream - Mock */}
        <View style={styles.localVideoContainer}>
          <View style={styles.localVideo}>
            <Ionicons name="person" size={30} color="#fff" />
            <Text style={styles.mockLocalVideoText}>You</Text>
          </View>
        </View>

        {/* Call Info */}
        <View style={styles.callInfo}>
          <Text style={styles.callInfoText}>Video Call with Danny H.</Text>
          <Text style={styles.callDuration}>00:00</Text>
        </View>

        {/* Call Controls */}
        <View style={styles.callControls}>
          <TouchableOpacity style={styles.callButton}>
            <View style={[styles.callButtonIcon, { backgroundColor: "#666" }]}>
              <Ionicons name="volume-high" size={24} color="#fff" />
            </View>
            <Text style={styles.callButtonText}>Speaker</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.callButton}>
            <View style={[styles.callButtonIcon, { backgroundColor: "#666" }]}>
              <Ionicons name="mic" size={24} color="#fff" />
            </View>
            <Text style={styles.callButtonText}>Mute</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.callButton}>
            <View style={[styles.callButtonIcon, { backgroundColor: "#666" }]}>
              <Ionicons name="videocam" size={24} color="#fff" />
            </View>
            <Text style={styles.callButtonText}>Video</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.callButton} onPress={endCall}>
            <View
              style={[styles.callButtonIcon, { backgroundColor: "#ff3b30" }]}
            >
              <Ionicons name="call" size={24} color="#fff" />
            </View>
            <Text style={styles.callButtonText}>End</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Render Voice Call Screen
  const renderVoiceCallScreen = () => {
    return (
      <View style={styles.voiceCallContainer}>
        {/* Background with man image */}
        <Image
          source={require("../../assets/tajjob/messages/man-bg.png")}
          style={styles.voiceCallBackground}
          blurRadius={2}
        />

        <View style={styles.voiceCallContent}>
          <View style={styles.voiceCallAvatar}>
            <Image
              source={require("../../assets/tajjob/messages/hr.jpg")}
              style={styles.callAvatar}
            />
            <Text style={styles.callUserName}>Danny H.</Text>
            <Text style={styles.callStatus}>Calling...</Text>
          </View>

          {/* Call Info */}
          <View style={styles.callInfo}>
            <Text style={styles.callInfoText}>Voice Call with Danny H.</Text>
            <Text style={styles.callDuration}>00:00</Text>
          </View>

          {/* Call Controls */}
          <View style={styles.callControls}>
            <TouchableOpacity style={styles.callButton}>
              <View
                style={[styles.callButtonIcon, { backgroundColor: "#666" }]}
              >
                <Ionicons name="volume-high" size={24} color="#fff" />
              </View>
              <Text style={styles.callButtonText}>Speaker</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.callButton}>
              <View
                style={[styles.callButtonIcon, { backgroundColor: "#666" }]}
              >
                <Ionicons name="mic" size={24} color="#fff" />
              </View>
              <Text style={styles.callButtonText}>Mute</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.callButton} onPress={endCall}>
              <View
                style={[styles.callButtonIcon, { backgroundColor: "#ff3b30" }]}
              >
                <Ionicons name="call" size={24} color="#fff" />
              </View>
              <Text style={styles.callButtonText}>End</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  // Render Incoming Call Modal
  const renderIncomingCallModal = () => {
    if (!incomingCall) return null;

    const isVideoCall = incomingCallData?.extension?.callType === 1;

    return (
      <Modal visible={incomingCall} transparent={true} animationType="slide">
        <View style={styles.incomingCallContainer}>
          <View style={styles.incomingCallContent}>
            <Image
              source={require("../../assets/tajjob/messages/hr.jpg")}
              style={styles.incomingCallAvatar}
            />
            <Text style={styles.incomingCallTitle}>
              Incoming {isVideoCall ? "Video" : "Voice"} Call
            </Text>
            <Text style={styles.incomingCallSubtitle}>Danny H.</Text>

            <View style={styles.incomingCallButtons}>
              <TouchableOpacity
                style={[styles.incomingCallButton, styles.rejectButton]}
                onPress={rejectCall}
              >
                <Ionicons name="call" size={24} color="#fff" />
                <Text style={styles.rejectButtonText}>Decline</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.incomingCallButton, styles.acceptButton]}
                onPress={acceptCall}
              >
                <Ionicons name="call" size={24} color="#fff" />
                <Text style={styles.acceptButtonText}>Accept</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.messageComponent}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      {/* Show call screens when in call */}
      {videoCall && renderVideoCallScreen()}
      {voiceCall && !videoCall && renderVoiceCallScreen()}

      {/* Show chat when not in call */}
      {!videoCall && !voiceCall && (
        <>
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
                <Text style={styles.HRStatus}>
                  {isConnected ? "Online" : "Connecting..."}
                </Text>
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

            {/* Message input footer */}
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
                    // Voice button
                    <TouchableOpacity
                      style={styles.btnVoiceToText}
                      onPress={() => {
                        resetRecordingTime();
                        handleVoiceButtonPress();
                      }}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="mic" size={22} color="#2623D2" />
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          </View>
        </>
      )}

      {/* Incoming Call Modal */}
      {renderIncomingCallModal()}
    </KeyboardAvoidingView>
  );
};

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
    gap: 8,
    minHeight: 32,
  },
  playButtonContainer: {},
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
  // Waveform styles
  waveformContainer: {
    width: 140,
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
    width: 3,
    height: "120%",
    borderRadius: 1.5,
    zIndex: 10,
  },
  // Recording waveform styles
  recordingWaveformContainer: {
    width: 100,
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

  // Video Call Styles
  videoCallContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  videoCallBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  remoteVideoContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  remoteVideo: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  localVideoContainer: {
    position: "absolute",
    top: 50,
    right: 20,
    width: 120,
    height: 160,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  localVideo: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  mockVideoText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginTop: 10,
    fontWeight: "600",
  },
  mockVideoSubtext: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
  },
  mockLocalVideoText: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
    marginTop: 5,
  },

  // Voice Call Styles
  voiceCallContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  voiceCallBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  voiceCallContent: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "space-between",
    paddingVertical: 80,
  },
  voiceCallAvatar: {
    alignItems: "center",
    marginTop: 40,
  },
  callAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#fff",
  },
  callUserName: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 8,
  },
  callStatus: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
  },

  // Call Controls
  callControls: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  callButton: {
    alignItems: "center",
  },
  callButtonIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  callButtonText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 5,
    fontWeight: "500",
  },

  // Call Info
  callInfo: {
    alignItems: "center",
    marginTop: 20,
  },
  callInfoText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
  callDuration: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 16,
    marginTop: 5,
  },

  // Incoming Call Styles
  incomingCallContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  incomingCallContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    margin: 20,
  },
  incomingCallAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  incomingCallTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
  },
  incomingCallSubtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 30,
  },
  incomingCallButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  incomingCallButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 10,
  },
  rejectButton: {
    backgroundColor: "#ff3b30",
  },
  acceptButton: {
    backgroundColor: "#4CD964",
  },
  rejectButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 5,
  },
  acceptButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 5,
  },
});

export default Message;
