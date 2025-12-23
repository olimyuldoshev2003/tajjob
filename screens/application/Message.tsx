import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Audio, AVPlaybackStatus } from "expo-av";
import { useNavigation } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Easing,
  Image,
  KeyboardAvoidingView,
  Modal,
  PanResponder,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  Vibration,
  View,
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

interface MessageType {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  type: "text" | "voice";
  voiceUri?: string;
  duration?: number;
  waveformData?: number[];
}

interface VoiceCallScreenProps {
  onEndCall: () => void;
}

interface VideoCallScreenProps {
  onEndCall: () => void;
}

interface IncomingCallModalProps {
  visible: boolean;
  onAccept: () => void;
  onReject: () => void;
  isVideoCall: boolean;
}

const Message = ({ route }: { route: any }) => {
  const navigation: any = useNavigation();
  const colorScheme = useColorScheme();
  const { width: SCREEN_WIDTH } = Dimensions.get("window");
  const [messageText, setMessageText] = useState<string>("");
  const [messages, setMessages] = useState<MessageType[]>([
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
  const recordingTimerRef: any = useRef<NodeJS.Timeout | null>(null);
  const playbackTimerRef: any = useRef<NodeJS.Timeout | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const waveformUpdateRef: any = useRef<NodeJS.Timeout | null>(null);
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
    appId: "YOUR_APP_ID", // Replace with your actual App ID
    authKey: "YOUR_AUTH_KEY", // Replace with your actual Auth Key
    authSecret: "YOUR_AUTH_SECRET", // Replace with your actual Auth Secret
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
    }

    return () => {
      recordingAnimation.stopAnimation();
      pulseAnimation.stopAnimation();
    };
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

      // Unload sound
      const unloadSound = async () => {
        if (sound) {
          try {
            await sound.unloadAsync();
          } catch (error) {
            console.log("Error unloading sound:", error);
          }
        }
      };
      unloadSound();

      // Stop recording if active
      const stopRecording = async () => {
        if (recordingRef.current) {
          try {
            await recordingRef.current.stopAndUnloadAsync();
          } catch (error) {
            console.log("Error stopping recording:", error);
          }
        }
      };
      stopRecording();

      // Clean up all animations
      animationRefs.current.forEach((animation) => animation.stop());
      animationRefs.current.clear();

      // Reset animations
      progressAnimations.current.forEach((anim) => anim.setValue(0));
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

      // Setup call listeners
      setupCallListeners();

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
      // Clean up any active calls
      if (videoCall || voiceCall) {
        await endCall();
      }

      // Clear call session
      setCallSession(null);
      setIncomingCall(false);
      setIncomingCallData(null);

      console.log("✅ ConnectyCube cleanup completed");
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
      setVoiceCall(false);

      console.log("✅ Video call started (mock)");

      // Simulate incoming call for demo
      setTimeout(() => {
        if (Math.random() > 0.3) {
          // 70% chance of "answering"
          // Simulate answered call
          Alert.alert(
            "Video Call Connected",
            "Video call with Danny H. has started (Demo Mode)",
            [{ text: "OK" }]
          );
        } else {
          // Simulate no answer
          Alert.alert(
            "Call Failed",
            "Danny H. is not answering. Please try again later.",
            [{ text: "OK", onPress: endCall }]
          );
          endCall();
        }
      }, 2000);
    } catch (error) {
      console.error("❌ Failed to start video call:", error);
      Alert.alert(
        "Call Failed",
        "Could not start video call. Please try again."
      );
      endCall();
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
      setVideoCall(false);

      console.log("✅ Voice call started (mock)");

      // Simulate incoming call for demo
      setTimeout(() => {
        if (Math.random() > 0.3) {
          // 70% chance of "answering"
          // Simulate answered call
          Alert.alert(
            "Voice Call Connected",
            "Voice call with Danny H. has started (Demo Mode)",
            [{ text: "OK" }]
          );
        } else {
          // Simulate no answer
          Alert.alert(
            "Call Failed",
            "Danny H. is not answering. Please try again later.",
            [{ text: "OK", onPress: endCall }]
          );
          endCall();
        }
      }, 2000);
    } catch (error) {
      console.error("❌ Failed to start voice call:", error);
      Alert.alert(
        "Call Failed",
        "Could not start voice call. Please try again."
      );
      endCall();
    }
  };

  // Accept Incoming Call (Mock implementation)
  const acceptCall = async () => {
    if (!incomingCallData) return;

    try {
      console.log("✅ Accepting incoming call...");

      setIncomingCall(false);

      const isVideoCall = incomingCallData.extension?.callType === 1;
      setVideoCall(isVideoCall);
      setVoiceCall(!isVideoCall);

      console.log("✅ Call accepted successfully (mock)");

      // Show success message
      Alert.alert(
        "Call Connected",
        `You are now in a ${
          isVideoCall ? "video" : "voice"
        } call with Danny H.`,
        [{ text: "OK" }]
      );
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
      // Show rejection feedback
      Vibration.vibrate(100);
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

      // Unload sound if playing
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
      }

      // Show call ended message
      Alert.alert("Call Ended", "The call has been ended.", [{ text: "OK" }]);
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
        try {
          await recordingRef.current.stopAndUnloadAsync();
        } catch (error) {
          console.log("Error stopping previous recording:", error);
        }
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
          // Auto-stop at 60 seconds
          if (newTime >= 60) {
            stopRecording();
            return 60;
          }
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
        const newVoiceMessage: MessageType = {
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
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
      } catch (error) {
        console.log("Error resetting audio mode:", error);
      }
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
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
      } catch (error) {
        console.log("Error resetting audio mode:", error);
      }
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
  const playVoiceMessage = async (message: MessageType) => {
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
            if (playbackTimerRef.current) {
              clearInterval(playbackTimerRef.current);
              playbackTimerRef.current = null;
            }
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
  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded && status.didJustFinish) {
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
  const seekToPosition = async (message: MessageType, position: number) => {
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
              if (playbackTimerRef.current) {
                clearInterval(playbackTimerRef.current);
                playbackTimerRef.current = null;
              }
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
    const trimmedText = messageText.trim();
    if (trimmedText) {
      const newMessage: MessageType = {
        id: Date.now().toString(),
        text: trimmedText,
        isUser: true,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: "text",
      };

      setMessages((prev) => [...prev, newMessage]);
      setMessageText("");

      // Simulate reply after 1 second
      setTimeout(() => {
        const replyMessage: MessageType = {
          id: (Date.now() + 1).toString(),
          text: "Thanks for your message!",
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          type: "text",
        };
        setMessages((prev) => [...prev, replyMessage]);

        // Scroll to bottom
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }, 1000);

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

  const dynamicStyles = StyleSheet.create({
    messageComponent: {
      flex: 1,
      backgroundColor: colorScheme === "dark" ? "#121212" : "#fff",
    },
    headerMessagesComponentBlock: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: 50,
      paddingHorizontal: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
      backgroundColor: colorScheme === "dark" ? "#121212" : "#fff",
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: colorScheme === "dark" ? "#e2e2e2" : "#f0f0f0",
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
      borderWidth: 2,
      borderColor: "#2623D2",
    },
    fullnameAndStatusBlockHeaderBlock1: {
      gap: 2,
    },
    HRFullname: {
      fontSize: 23,
      fontWeight: "600",
      color: colorScheme === "dark" ? "#f0f0f0" : "#333",
    },
    HRStatus: {
      color: "#4CD964",
      fontSize: 14,
      fontWeight: "500",
    },
    headerBlock2: {
      flexDirection: "row",
      gap: 15,
      alignItems: "center",
    },
    sectionAndFooterMessagesComponentBlock: {
      flex: 1,
      paddingBottom: 42,
    },
    sectionMessagesComponentBlock: {
      flex: 1,
    },
    scrollViewContent: {
      flexGrow: 1,
      paddingBottom: 20,
    },
    messagesContainer: {
      flex: 1,
    },
    messagesSentDay: {
      alignSelf: "center",
      color: colorScheme === "dark" ? "#e4e4e4" : "#9E9E9E",
      fontSize: 16,
      fontWeight: "500",
      marginTop: 15,
      marginBottom: 10,
      backgroundColor: colorScheme === "dark" ? "#333" : "#f8f8f8",
      paddingVertical: 6,
      paddingHorizontal: 15,
      borderRadius: 15,
    },
    messagesBlockOfThisDay: {
      gap: 12,
      paddingVertical: 10,
      paddingHorizontal: 10,
    },
    messageOfUserMainBlock: {
      flexDirection: "row",
      justifyContent: "flex-end",
      marginBottom: 5,
    },
    messageOfUserBlock: {
      maxWidth: "75%",
      backgroundColor: colorScheme === "dark" ? "#333" : "#fff",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
      padding: 12,
      borderRadius: 18,
      borderBottomRightRadius: 4,
      borderWidth: 1,
      borderColor: colorScheme === "dark" ? "#000000" : "#f0f0f0",
    },
    messageOfUser: {
      fontSize: 16,
      fontWeight: "400",
      color: colorScheme === "dark" ? "#fff" : "#333",
      lineHeight: 22,
    },
    messageOfHRMainBlock: {
      flexDirection: "row",
      justifyContent: "flex-start",
      marginBottom: 5,
    },
    messageOfHRBlock: {
      maxWidth: "75%",
      backgroundColor: colorScheme === "dark" ? "#00c3ffc1" : "#2623D2",
      padding: 12,
      borderRadius: 18,
      borderBottomLeftRadius: 4,
      shadowColor: "#2623D2",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 3,
    },
    messageOfHR: {
      fontSize: 16,
      fontWeight: "400",
      color: "#fff",
      lineHeight: 22,
    },
    // Voice message dynamicStyles
    voiceMessageOfUserBlock: {
      maxWidth: "75%",
      backgroundColor: colorScheme === "dark" ? "#dbdbdb" : "#fff",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
      padding: 12,
      borderRadius: 18,
      borderBottomRightRadius: 4,
      borderWidth: 1,
      borderColor: colorScheme === "dark" ? "#000000" : "#f0f0f0",
    },
    voiceMessageOfHRBlock: {
      maxWidth: "75%",
      backgroundColor: colorScheme === "dark" ? "#00c3ffc1" : "#2623D2",
      padding: 12,
      borderRadius: 18,
      borderBottomLeftRadius: 4,
      shadowColor: "#2623D2",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 3,
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
      borderWidth: 1,
      borderColor: "rgba(38, 35, 210, 0.2)",
    },
    playingButton: {
      backgroundColor: "rgba(255, 59, 48, 0.1)",
      borderColor: "rgba(255, 59, 48, 0.2)",
    },
    // Waveform dynamicStyles
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
      paddingHorizontal: 2,
    },
    waveformBar: {
      alignSelf: "flex-end",
    },
    waveformProgressOverlay: {
      position: "absolute",
      height: "100%",
      borderRadius: 8,
      left: 0,
      top: 0,
    },
    seekIndicator: {
      position: "absolute",
      top: -2,
      width: 3,
      height: "120%",
      borderRadius: 1.5,
      zIndex: 10,
    },
    // Recording waveform dynamicStyles
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
      paddingHorizontal: 5,
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
      marginTop: 6,
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
    messageSeenIcon: {
      marginLeft: 2,
    },
    footerMessagesComponentBlock: {
      paddingHorizontal: 10,
      paddingBottom: 10,
      paddingTop: 10,
      backgroundColor: colorScheme === "dark" ? "#121212" : "#fff",
      borderTopWidth: 1,
      borderTopColor: colorScheme === "dark" ? "#e2e2e2" : "#f0f0f0",
    },
    inputMessageAndIconBlock: {
      position: "relative",
    },
    inputMessage: {
      backgroundColor: colorScheme === "dark" ? "#333" : "#fff",
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
      color: colorScheme === "dark" ? "#f0f0f0" : "#000",
    },
    iconStckersFooter: {
      position: "absolute",
      top: 6.5,
      left: 9,
      zIndex: 1,
      padding: 5,
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
    // Recording dynamicStyles
    recordingContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: colorScheme === "dark" ? "#333" : "#fff",
      borderRadius: 25,
      paddingHorizontal: 15,
      paddingVertical: 10,
      position: "relative",
      borderWidth: 1,
      borderColor: "#ff3b30",
      shadowColor: "#ff3b30",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    recordingIndicator: {
      alignItems: "center",
      justifyContent: "center",
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: "rgba(255, 59, 48, 0.1)",
      borderWidth: 1,
      borderColor: "rgba(255, 59, 48, 0.3)",
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
      borderWidth: 1,
      borderColor: "rgba(255, 59, 48, 0.2)",
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
    // Swipe to cancel dynamicStyles
    cancelIndicator: {
      position: "absolute",
      left: -110,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "rgba(255, 59, 48, 0.1)",
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "rgba(255, 59, 48, 0.2)",
    },
    cancelText: {
      color: "#ff3b30",
      fontSize: 11,
      fontWeight: "600",
      marginLeft: 4,
    },

    // Video Off Overlay
    videoOffOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.7)",
      justifyContent: "center",
      alignItems: "center",
    },

    // Video Call dynamicStyles
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

    // Voice Call dynamicStyles
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
      color: "#4CD964",
      fontWeight: "500",
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

    // Incoming Call dynamicStyles
    incomingCallContainer: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.9)",
      justifyContent: "center",
      alignItems: "center",
    },
    incomingCallContent: {
      backgroundColor: "#fff",
      borderRadius: 20,
      padding: 30,
      alignItems: "center",
      margin: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.3,
      shadowRadius: 20,
      elevation: 10,
    },
    incomingCallAvatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 20,
      borderWidth: 3,
      borderColor: "#2623D2",
    },
    incomingCallTitle: {
      fontSize: 22,
      fontWeight: "600",
      marginBottom: 10,
      textAlign: "center",
      color: "#333",
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
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 3,
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

  // Enhanced Voice Waveform Component
  const VoiceWaveform = ({
    message,
    isPlaying,
    progress,
    onSeek,
  }: {
    message: MessageType;
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
        style={[dynamicStyles.waveformContainer]}
        ref={waveformRef}
        onLayout={handleWaveformLayout}
      >
        <TouchableOpacity
          style={dynamicStyles.waveformTouchArea}
          onPress={handleWaveformPress}
          activeOpacity={0.8}
        >
          <View style={dynamicStyles.waveformBarsContainer}>
            {waveformData.slice(0, barCount).map((amplitude, index) => {
              const barProgress = index / barCount;
              const isActive = barProgress <= progressPercent;
              const maxHeight = 24;
              const height = Math.max(4, amplitude * maxHeight);

              return (
                <View
                  key={index}
                  style={[
                    dynamicStyles.waveformBar,
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
                  dynamicStyles.waveformProgressOverlay,
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
                  dynamicStyles.seekIndicator,
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
      <View style={dynamicStyles.recordingWaveformContainer}>
        <View style={dynamicStyles.recordingWaveformBars}>
          {data.slice(0, 15).map((amplitude, index) => {
            const height = Math.max(6, amplitude * 20);
            const isRecent = index >= data.length - 3;

            return (
              <Animated.View
                key={index}
                style={[
                  dynamicStyles.recordingWaveformBar,
                  {
                    width: 2,
                    height: height,
                    marginHorizontal: 1,
                    backgroundColor: isRecent ? "#ff3b30" : "#ff6b6b",
                    borderRadius: 1,
                    opacity: isRecent ? 1 : 0.7,
                    transform: [
                      {
                        scaleY: pulseAnimation.interpolate({
                          inputRange: [1, 1.2],
                          outputRange: [1, 1.1],
                        }),
                      },
                    ],
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
  const renderMessage = (message: MessageType) => {
    if (message.type === "voice") {
      const isPlaying = currentPlayingVoice === message.id;
      const currentProgress = isPlaying ? playbackPosition : 0;
      const duration = message.duration || 1;

      return (
        <View
          style={
            message.isUser
              ? dynamicStyles.messageOfUserMainBlock
              : dynamicStyles.messageOfHRMainBlock
          }
          key={message.id}
        >
          <View
            style={
              message.isUser
                ? dynamicStyles.voiceMessageOfUserBlock
                : dynamicStyles.voiceMessageOfHRBlock
            }
          >
            <View style={dynamicStyles.voiceMessageContainer}>
              <TouchableOpacity
                style={dynamicStyles.playButtonContainer}
                onPress={() => playVoiceMessage(message)}
                activeOpacity={0.7}
              >
                <Animated.View
                  style={[
                    dynamicStyles.playButton,
                    isPlaying && dynamicStyles.playingButton,
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
                  dynamicStyles.voiceDuration,
                  message.isUser
                    ? dynamicStyles.voiceDurationUser
                    : dynamicStyles.voiceDurationHR,
                  isPlaying && dynamicStyles.playingDuration,
                ]}
              >
                {formatTime(isPlaying ? currentProgress : duration)}
              </Text>
            </View>

            <View style={dynamicStyles.messageSentTimeAndSeenBlock}>
              <Text
                style={
                  message.isUser
                    ? dynamicStyles.messageSentTimeUser
                    : dynamicStyles.messageSentTimeHR
                }
              >
                {message.timestamp}
              </Text>
              {message.isUser && (
                <MaterialCommunityIcons
                  name="check-all"
                  size={16}
                  color="#00b7ff"
                  style={dynamicStyles.messageSeenIcon}
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
            ? dynamicStyles.messageOfUserMainBlock
            : dynamicStyles.messageOfHRMainBlock
        }
        key={message.id}
      >
        <View
          style={
            message.isUser
              ? dynamicStyles.messageOfUserBlock
              : dynamicStyles.messageOfHRBlock
          }
        >
          <Text
            style={
              message.isUser
                ? dynamicStyles.messageOfUser
                : dynamicStyles.messageOfHR
            }
          >
            {message.text}
          </Text>
          <View style={dynamicStyles.messageSentTimeAndSeenBlock}>
            <Text
              style={
                message.isUser
                  ? dynamicStyles.messageSentTimeUser
                  : dynamicStyles.messageSentTimeHR
              }
            >
              {message.timestamp}
            </Text>
            {message.isUser && (
              <MaterialCommunityIcons
                name="check-all"
                size={16}
                color="#00b7ff"
                style={dynamicStyles.messageSeenIcon}
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

  // Video Call Screen Component
  const VideoCallScreen: React.FC<VideoCallScreenProps> = ({ onEndCall }) => {
    const [callDuration, setCallDuration] = useState<number>(0);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [isVideoOn, setIsVideoOn] = useState<boolean>(true);
    const [isSpeakerOn, setIsSpeakerOn] = useState<boolean>(true);

    useEffect(() => {
      const timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);

      return () => clearInterval(timer);
    }, []);

    const formatCallDuration = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    };

    return (
      <View style={dynamicStyles.videoCallContainer}>
        {/* Background with garden image */}
        <Image
          source={require("../../assets/tajjob/messages/garden-bg.png")}
          style={dynamicStyles.videoCallBackground}
          blurRadius={2}
        />

        {/* Remote Video Stream - Mock */}
        <View style={dynamicStyles.remoteVideoContainer}>
          <View style={dynamicStyles.remoteVideo}>
            <Ionicons name="videocam" size={60} color="#fff" />
            <Text style={dynamicStyles.mockVideoText}>Danny H.</Text>
            <Text style={dynamicStyles.mockVideoSubtext}>Video Call</Text>
          </View>
        </View>

        {/* Local Video Stream - Mock */}
        <View style={dynamicStyles.localVideoContainer}>
          <View style={dynamicStyles.localVideo}>
            <Ionicons name="person" size={30} color="#fff" />
            <Text style={dynamicStyles.mockLocalVideoText}>You</Text>
            {!isVideoOn && (
              <View style={dynamicStyles.videoOffOverlay}>
                <Ionicons name="videocam-off" size={20} color="#fff" />
              </View>
            )}
          </View>
        </View>

        {/* Call Info */}
        <View style={dynamicStyles.callInfo}>
          <Text style={dynamicStyles.callInfoText}>
            Video Call with Danny H.
          </Text>
          <Text style={dynamicStyles.callDuration}>
            {formatCallDuration(callDuration)}
          </Text>
        </View>

        {/* Call Controls */}
        <View style={dynamicStyles.callControls}>
          <TouchableOpacity
            style={dynamicStyles.callButton}
            onPress={() => setIsSpeakerOn(!isSpeakerOn)}
          >
            <View
              style={[
                dynamicStyles.callButtonIcon,
                {
                  backgroundColor: isSpeakerOn ? "#4CD964" : "#666",
                },
              ]}
            >
              <Ionicons name="volume-high" size={24} color="#fff" />
            </View>
            <Text style={dynamicStyles.callButtonText}>
              {isSpeakerOn ? "Speaker" : "Phone"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={dynamicStyles.callButton}
            onPress={() => setIsMuted(!isMuted)}
          >
            <View
              style={[
                dynamicStyles.callButtonIcon,
                {
                  backgroundColor: isMuted ? "#ff3b30" : "#666",
                },
              ]}
            >
              <Ionicons
                name={isMuted ? "mic-off" : "mic"}
                size={24}
                color="#fff"
              />
            </View>
            <Text style={dynamicStyles.callButtonText}>
              {isMuted ? "Muted" : "Mute"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={dynamicStyles.callButton}
            onPress={() => setIsVideoOn(!isVideoOn)}
          >
            <View
              style={[
                dynamicStyles.callButtonIcon,
                {
                  backgroundColor: isVideoOn ? "#007AFF" : "#666",
                },
              ]}
            >
              <Ionicons
                name={isVideoOn ? "videocam" : "videocam-off"}
                size={24}
                color="#fff"
              />
            </View>
            <Text style={dynamicStyles.callButtonText}>
              {isVideoOn ? "Video" : "Off"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={dynamicStyles.callButton}
            onPress={onEndCall}
          >
            <View
              style={[
                dynamicStyles.callButtonIcon,
                { backgroundColor: "#ff3b30" },
              ]}
            >
              <Ionicons name="call" size={24} color="#fff" />
            </View>
            <Text style={dynamicStyles.callButtonText}>End</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Voice Call Screen Component
  const VoiceCallScreen: React.FC<VoiceCallScreenProps> = ({ onEndCall }) => {
    const [callDuration, setCallDuration] = useState<number>(0);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [isSpeakerOn, setIsSpeakerOn] = useState<boolean>(true);

    useEffect(() => {
      const timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);

      return () => clearInterval(timer);
    }, []);

    const formatCallDuration = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    };

    return (
      <View style={dynamicStyles.voiceCallContainer}>
        {/* Background with man image */}
        <Image
          source={require("../../assets/tajjob/messages/man-bg.png")}
          style={dynamicStyles.voiceCallBackground}
          blurRadius={2}
        />

        <View style={dynamicStyles.voiceCallContent}>
          <View style={dynamicStyles.voiceCallAvatar}>
            <Image
              source={require("../../assets/tajjob/messages/hr.jpg")}
              style={dynamicStyles.callAvatar}
            />
            <Text style={dynamicStyles.callUserName}>Danny H.</Text>
            <Text style={dynamicStyles.callStatus}>Connected</Text>
          </View>

          {/* Call Info */}
          <View style={dynamicStyles.callInfo}>
            <Text style={dynamicStyles.callInfoText}>
              Voice Call with Danny H.
            </Text>
            <Text style={dynamicStyles.callDuration}>
              {formatCallDuration(callDuration)}
            </Text>
          </View>

          {/* Call Controls */}
          <View style={dynamicStyles.callControls}>
            <TouchableOpacity
              style={dynamicStyles.callButton}
              onPress={() => setIsSpeakerOn(!isSpeakerOn)}
            >
              <View
                style={[
                  dynamicStyles.callButtonIcon,
                  {
                    backgroundColor: isSpeakerOn ? "#4CD964" : "#666",
                  },
                ]}
              >
                <Ionicons name="volume-high" size={24} color="#fff" />
              </View>
              <Text style={dynamicStyles.callButtonText}>
                {isSpeakerOn ? "Speaker" : "Phone"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={dynamicStyles.callButton}
              onPress={() => setIsMuted(!isMuted)}
            >
              <View
                style={[
                  dynamicStyles.callButtonIcon,
                  {
                    backgroundColor: isMuted ? "#ff3b30" : "#666",
                  },
                ]}
              >
                <Ionicons
                  name={isMuted ? "mic-off" : "mic"}
                  size={24}
                  color="#fff"
                />
              </View>
              <Text style={dynamicStyles.callButtonText}>
                {isMuted ? "Muted" : "Mute"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={dynamicStyles.callButton}
              onPress={onEndCall}
            >
              <View
                style={[
                  dynamicStyles.callButtonIcon,
                  { backgroundColor: "#ff3b30" },
                ]}
              >
                <Ionicons name="call" size={24} color="#fff" />
              </View>
              <Text style={dynamicStyles.callButtonText}>End</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  // Incoming Call Modal Component
  const IncomingCallModal: React.FC<IncomingCallModalProps> = ({
    visible,
    onAccept,
    onReject,
    isVideoCall,
  }) => {
    return (
      <Modal visible={visible} transparent={true} animationType="slide">
        <View style={dynamicStyles.incomingCallContainer}>
          <View style={dynamicStyles.incomingCallContent}>
            <Image
              source={require("../../assets/tajjob/messages/hr.jpg")}
              style={dynamicStyles.incomingCallAvatar}
            />
            <Text style={dynamicStyles.incomingCallTitle}>
              Incoming {isVideoCall ? "Video" : "Voice"} Call
            </Text>
            <Text style={dynamicStyles.incomingCallSubtitle}>Danny H.</Text>

            <View style={dynamicStyles.incomingCallButtons}>
              <TouchableOpacity
                style={[
                  dynamicStyles.incomingCallButton,
                  dynamicStyles.rejectButton,
                ]}
                onPress={onReject}
              >
                <Ionicons name="call" size={24} color="#fff" />
                <Text style={dynamicStyles.rejectButtonText}>Decline</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  dynamicStyles.incomingCallButton,
                  dynamicStyles.acceptButton,
                ]}
                onPress={onAccept}
              >
                <Ionicons name="call" size={24} color="#fff" />
                <Text style={dynamicStyles.acceptButtonText}>Accept</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <KeyboardAvoidingView
      style={dynamicStyles.messageComponent}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : -60}
    >
      {/* Show call screens when in call */}
      {videoCall && <VideoCallScreen onEndCall={endCall} />}
      {voiceCall && !videoCall && <VoiceCallScreen onEndCall={endCall} />}

      {/* Show chat when not in call */}
      {!videoCall && !voiceCall && (
        <>
          <View style={dynamicStyles.headerMessagesComponentBlock}>
            <View style={dynamicStyles.headerBlock1}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                  name="arrow-back-sharp"
                  size={31}
                  color={colorScheme === "dark" ? "#fff" : "black"}
                />
              </TouchableOpacity>
              <Image
                source={require("../../assets/tajjob/messages/hr.jpg")}
                style={dynamicStyles.HRImg}
              />
              <View style={dynamicStyles.fullnameAndStatusBlockHeaderBlock1}>
                <Text style={dynamicStyles.HRFullname}>Danny H.</Text>
                <Text style={dynamicStyles.HRStatus}>
                  {isConnected ? "Online" : "Connecting..."}
                </Text>
              </View>
            </View>
            <View style={dynamicStyles.headerBlock2}>
              <TouchableOpacity onPress={handleVoiceCall}>
                <FontAwesome5
                  name="phone-alt"
                  size={31}
                  color={colorScheme === "dark" ? "#fff" : "black"}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleVideoCall}>
                <FontAwesome
                  name="video-camera"
                  size={31}
                  color={colorScheme === "dark" ? "#fff" : "black"}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Entypo
                  name="dots-three-vertical"
                  size={31}
                  color={colorScheme === "dark" ? "#fff" : "black"}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={dynamicStyles.sectionAndFooterMessagesComponentBlock}>
            <ScrollView
              ref={scrollViewRef}
              style={dynamicStyles.sectionMessagesComponentBlock}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={dynamicStyles.scrollViewContent}
              onContentSizeChange={() =>
                scrollViewRef.current?.scrollToEnd({ animated: true })
              }
            >
              <View style={dynamicStyles.messagesContainer}>
                <Text style={dynamicStyles.messagesSentDay}>Today</Text>
                <View style={dynamicStyles.messagesBlockOfThisDay}>
                  {messages.map(renderMessage)}
                </View>
              </View>
            </ScrollView>

            {/* Message input footer */}
            <View style={dynamicStyles.footerMessagesComponentBlock}>
              {isRecording ? (
                <View style={dynamicStyles.recordingContainer}>
                  {/* Swipe to Cancel Indicator */}
                  {slideToCancelVisible && (
                    <View style={dynamicStyles.cancelIndicator}>
                      <Ionicons name="close-circle" size={20} color="#ff3b30" />
                      <Text style={dynamicStyles.cancelText}>
                        Release to cancel
                      </Text>
                    </View>
                  )}

                  <Animated.View
                    style={[
                      dynamicStyles.recordingIndicator,
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

                  <Text style={dynamicStyles.recordingTime}>
                    {formatTime(recordingTime)}
                  </Text>

                  {/* Cancel Button */}
                  <TouchableOpacity
                    style={dynamicStyles.cancelRecordingButton}
                    onPress={cancelRecording}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="close" size={20} color="#ff3b30" />
                  </TouchableOpacity>

                  {/* Stop/Send Button */}
                  <TouchableOpacity
                    style={dynamicStyles.stopRecordingButton}
                    onPress={stopRecording}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="send" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
              ) : (
                // Normal input
                <View style={dynamicStyles.inputMessageAndIconBlock}>
                  <TextInput
                    style={dynamicStyles.inputMessage}
                    placeholder="Message"
                    placeholderTextColor={
                      colorScheme === "dark" ? "#e4e4e4" : "#9E9E9E"
                    }
                    value={messageText}
                    onChangeText={setMessageText}
                    multiline
                    onSubmitEditing={sendTextMessage}
                    returnKeyType="send"
                    blurOnSubmit={false}
                  />
                  <TouchableOpacity style={dynamicStyles.iconStckersFooter}>
                    <FontAwesome5
                      name="smile"
                      size={22}
                      color={colorScheme === "dark" ? "#fff" : "black"}
                    />
                  </TouchableOpacity>

                  {messageText.trim() ? (
                    <TouchableOpacity
                      style={dynamicStyles.sendButton}
                      onPress={sendTextMessage}
                      activeOpacity={0.7}
                    >
                      <Ionicons
                        name="send"
                        size={20}
                        color={colorScheme === "dark" ? "#00c3ffc1" : "#2623D2"}
                      />
                    </TouchableOpacity>
                  ) : (
                    // Voice button
                    <TouchableOpacity
                      style={dynamicStyles.btnVoiceToText}
                      onPress={() => {
                        resetRecordingTime();
                        handleVoiceButtonPress();
                      }}
                      activeOpacity={0.7}
                    >
                      <Ionicons
                        name="mic"
                        size={22}
                        color={colorScheme === "dark" ? "#00c3ffc1" : "#2623D2"}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          </View>
        </>
      )}

      {/* Incoming Call Modal */}
      <IncomingCallModal
        visible={incomingCall}
        onAccept={acceptCall}
        onReject={rejectCall}
        isVideoCall={incomingCallData?.extension?.callType === 1}
      />
    </KeyboardAvoidingView>
  );
};

export default Message;
