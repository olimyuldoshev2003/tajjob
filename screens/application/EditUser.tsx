import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
// import * as FileSystem from "expo-file-system";

// Icons
import { Feather } from "@expo/vector-icons";

const EditUser = () => {
  const [userImage, setUserImage] = useState<string | null>(
    require("../../assets/tajjob/profile/profileIcon.jpg")
  );
  console.log(userImage);

  const [isLoading, setIsLoading] = useState(false);

  const pickImage = async () => {
    try {
      setIsLoading(true);

      // Request permissions
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Sorry, we need camera roll permissions to change your profile picture!"
        );
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        allowsMultipleSelection: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];

        // Validate file type
        const fileExtension = selectedImage.uri.split(".").pop()?.toLowerCase();
        const allowedTypes = ["jpg", "jpeg", "png", "heic", "heif"];

        if (!fileExtension || !allowedTypes.includes(fileExtension)) {
          Alert.alert(
            "Invalid File Type",
            "Please select only JPG or PNG images."
          );
          return;
        }

        // Validate file size (max 10MB)
        if (
          selectedImage.fileSize &&
          selectedImage.fileSize > 10 * 1024 * 1024
        ) {
          Alert.alert(
            "File Too Large",
            "Please select an image smaller than 10MB."
          );
          return;
        }

        // Set the new image
        setUserImage(selectedImage.uri);

        Alert.alert("Success", "Profile picture updated successfully!", [
          { text: "OK" },
        ]);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to select image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const takePhoto = async () => {
    try {
      setIsLoading(true);

      // Request camera permissions
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Sorry, we need camera permissions to take a photo!"
        );
        return;
      }

      // Launch camera
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const takenPhoto = result.assets[0];
        setUserImage(takenPhoto.uri);

        Alert.alert("Success", "Profile picture updated successfully!", [
          { text: "OK" },
        ]);
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      Alert.alert("Error", "Failed to take photo. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const showImagePickerOptions = () => {
    Alert.alert("Change Profile Picture", "Choose an option", [
      {
        text: "Choose from Gallery",
        onPress: pickImage,
      },
      {
        text: "Take Photo",
        onPress: takePhoto,
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  const removeImage = () => {
    if (userImage && typeof userImage === "string") {
      Alert.alert(
        "Remove Profile Picture",
        "Are you sure you want to remove your profile picture?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Remove",
            style: "destructive",
            onPress: () => {
              setUserImage(
                require("../../assets/tajjob/profile/profileIcon.jpg")
              );
              Alert.alert("Success", "Profile picture removed!");
            },
          },
        ]
      );
    }
  };

  return (
    <View style={styles.editUserComponent}>
      <View style={styles.headerEditUserComponentBlock}>
        <View style={styles.imageContainer}>
          <Image
            source={
              userImage
                ? typeof userImage === "string"
                  ? { uri: userImage }
                  : userImage
                : require("../../assets/tajjob/profile/profileIcon.jpg")
            }
            style={styles.userImg}
            onError={() => {
              Alert.alert("Error", "Failed to load image");
              setUserImage(
                require("../../assets/tajjob/profile/profileIcon.jpg")
              );
            }}
          />
          {isLoading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#2623D2" />
            </View>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.btnImgUserChange, isLoading && styles.btnDisabled]}
            onPress={showImagePickerOptions}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.btnTextImgUserChange}>
                Change Profile Picture
              </Text>
            )}
          </Pressable>

          {userImage && typeof userImage === "string" && (
            <Pressable
              style={[styles.btnRemoveImage, isLoading && styles.btnDisabled]}
              onPress={removeImage}
              disabled={isLoading}
            >
              <Text style={styles.btnTextRemoveImage}>Remove</Text>
            </Pressable>
          )}
        </View>
      </View>

      <View style={styles.sectionEditUserComponentBlock}>
        <View style={styles.formEditUserlabelsAndInputs}>
          <View style={[styles.labelAndInpBlock, styles.nameUserBlock]}>
            <Text style={styles.label}>Name</Text>
            <View style={styles.inpBlock}>
              <TextInput style={styles.input} />
              <Feather
                name="check-circle"
                size={28}
                color="black"
                style={styles.checkIcon}
              />
            </View>
          </View>
          {/* <View style={[styles.labelAndInpBlock, styles.surNameUserBlock]}></View>
          <View style={[styles.labelAndInpBlock, styles.birthdayDateBlock]}></View>
          <View style={[styles.labelAndInpBlock, styles.numberPhoneBlock]}></View>
          <View style={[styles.labelAndInpBlock, styles.emailBlock]}></View>
          <View style={[styles.labelAndInpBlock, styles.locationBlock]}></View> */}
        </View>
      </View>
    </View>
  );
};

export default EditUser;

const styles = StyleSheet.create({
  editUserComponent: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
  },
  headerEditUserComponentBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
  },
  imageContainer: {
    position: "relative",
  },
  userImg: {
    width: 117,
    height: 117,
    borderRadius: 100,
    borderWidth: 3,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    // flex: 1,
    gap: 12,
  },
  btnImgUserChange: {
    backgroundColor: "#FBF9F9",
    padding: 10,
    elevation: 8,
    borderRadius: 20,
  },
  btnRemoveImage: {
    backgroundColor: "#FF3B30",
    paddingVertical: 10,
    paddingHorizontal: 16,
    elevation: 4,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 40,
  },
  btnDisabled: {
    opacity: 0.6,
  },
  btnTextImgUserChange: {
    fontSize: 16,
    fontWeight: "600",
  },
  btnTextRemoveImage: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  sectionEditUserComponentBlock: {
    marginTop: 20,
  },
  formEditUserlabelsAndInputs: {},
  nameUserBlock: {},
  surNameUserBlock: {},
  birthdayDateBlock: {},
  numberPhoneBlock: {},
  emailBlock: {},
  locationBlock: {},

  // Blocks with the same styles
  labelAndInpBlock: {
    gap: 7
  },
  label: {},
  inpBlock: {
    position: "relative",
  },
  input: {
    backgroundColor: "#FBF9F9",
    
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },  
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,

    paddingHorizontal: 10
    ,fontSize: 17,
  },
  checkIcon: {
    position: "absolute",
    right: 10,
    top: 9,
  },
});
