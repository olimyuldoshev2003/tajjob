import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as DocumentPicker from "expo-document-picker";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const ModalApply = ({
  modalApply,
  setModalApply,
}: {
  modalApply: any;
  setModalApply: any;
}) => {
  const [selectedFile, setSelectedFile] =
    useState<DocumentPicker.DocumentPickerResult | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  // Tajik mobile operators and their prefixes
    type Operator = {
      name: string;
      prefixes: string[];
      historical?: string[];
    };
  
    const TAJIK_MOBILE_OPERATORS: Record<string, Operator> = {
      TCEL: {
        name: "Tcell",
        prefixes: ["90", "91", "92", "55"],
        historical: ["550", "918", "917"],
      },
      MEGAFON: {
        name: "Megafon Tajikistan",
        prefixes: ["93", "94"],
        historical: ["933", "934"],
      },
      BABILON: {
        name: "Babilon-Mobile",
        prefixes: ["96", "99"],
      },
      ZET: {
        name: "ZET-Mobile",
        prefixes: ["88", "87"],
      },
      OMOBILE: {
        name: "O-Mobile",
        prefixes: ["77", "78"],
      },
      MVNO: {
        name: "Various MVNOs",
        prefixes: ["44"],
      },
    };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ],
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        // User cancelled the document picker
        return;
      }

      const file = result.assets[0];

      // Check if the file type is valid
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "pdf",
        "doc",
        "docx",
      ];

      const fileExtension = file.name?.split(".").pop()?.toLowerCase();
      const isFileTypeValid =
        allowedTypes.includes(file.mimeType || "") ||
        (fileExtension && allowedTypes.includes(fileExtension));

      if (!isFileTypeValid) {
        Alert.alert(
          "Invalid File Type",
          "Please select only PDF, DOC, or DOCX files."
        );
        return;
      }

      setSelectedFile(result);
      Alert.alert(
        "File Selected",
        `File ${file.name} has been selected successfully.`
      );
    } catch (err) {
      console.error("Error picking document:", err);
      Alert.alert("Error", "Failed to select file. Please try again.");
    }
  };

  // Comprehensive Tajik phone number validation
  const validateTajikPhoneNumber = (
    phoneNumber: string
  ): { isValid: boolean; operator?: string; error?: string } => {
    // Remove all non-digit characters
    const cleanedPhone = phoneNumber.replace(/\D/g, "");

    // Check if it's empty
    if (cleanedPhone.length === 0) {
      return { isValid: false, error: "Phone number is required" };
    }

    // Check for international format (+992)
    if (cleanedPhone.startsWith("992")) {
      const subscriberNumber = cleanedPhone.slice(3); // Remove '992'

      // Check 2-digit prefixes (most common)
      if (subscriberNumber.length === 9) {
        const prefix2 = subscriberNumber.slice(0, 2);
        const operator = getOperatorByPrefix(prefix2);
        if (operator) {
          return { isValid: true, operator: operator.name };
        }
      }

      // Check 3-digit historical prefixes
      if (subscriberNumber.length === 8) {
        const prefix3 = subscriberNumber.slice(0, 3);
        const operator = getOperatorByPrefix(prefix3);
        if (operator) {
          return {
            isValid: true,
            operator: `${operator.name} (Historical)`,
            error:
              "This is a historical prefix. Please verify if still active.",
          };
        }
      }
    }

    // Check for local format (starts with 9 or 0)
    if (cleanedPhone.startsWith("9") || cleanedPhone.startsWith("0")) {
      let localNumber = cleanedPhone;

      // Remove leading 0 if present
      if (localNumber.startsWith("0")) {
        localNumber = localNumber.slice(1);
      }

      // Check 2-digit prefixes
      if (localNumber.length === 9) {
        const prefix2 = localNumber.slice(0, 2);
        const operator = getOperatorByPrefix(prefix2);
        if (operator) {
          return { isValid: true, operator: operator.name };
        }
      }

      // Check 3-digit historical prefixes
      if (localNumber.length === 8) {
        const prefix3 = localNumber.slice(0, 3);
        const operator = getOperatorByPrefix(prefix3);
        if (operator) {
          return {
            isValid: true,
            operator: `${operator.name} (Historical)`,
            error:
              "This is a historical prefix. Please verify if still active.",
          };
        }
      }
    }

    return {
      isValid: false,
      error:
        "Invalid Tajik phone number format. Please use +992 XX XXX XXXX or 9XXXXXXXX",
    };
  };

  // Helper function to get operator by prefix
  const getOperatorByPrefix = (prefix: string) => {
    for (const [key, operator] of Object.entries(TAJIK_MOBILE_OPERATORS)) {
      if (
        operator.prefixes.includes(prefix) ||
        operator.historical?.includes(prefix)
      ) {
        return operator;
      }
    }
    return null;
  };

  // Format phone number as user types
  const formatPhoneNumber = (input: string): string => {
    // Remove all non-digit characters
    const cleaned = input.replace(/\D/g, "");

    // Limit to 12 characters maximum
    const limited = cleaned.slice(0, 12);

    // Format based on length for international format
    if (limited.startsWith("992")) {
      const subscriberNumber = limited.slice(3);
      if (subscriberNumber.length <= 2) {
        return `+992 ${subscriberNumber}`;
      } else if (subscriberNumber.length <= 4) {
        return `+992 ${subscriberNumber.slice(0, 2)} ${subscriberNumber.slice(
          2
        )}`;
      } else if (subscriberNumber.length <= 7) {
        return `+992 ${subscriberNumber.slice(0, 2)} ${subscriberNumber.slice(
          2,
          5
        )} ${subscriberNumber.slice(5)}`;
      } else {
        return `+992 ${subscriberNumber.slice(0, 2)} ${subscriberNumber.slice(
          2,
          5
        )} ${subscriberNumber.slice(5, 7)} ${subscriberNumber.slice(7)}`;
      }
    }

    // Format for local numbers (starting with 9)
    if (limited.startsWith("9")) {
      if (limited.length <= 2) {
        return limited;
      } else if (limited.length <= 5) {
        return `${limited.slice(0, 2)} ${limited.slice(2)}`;
      } else if (limited.length <= 8) {
        return `${limited.slice(0, 2)} ${limited.slice(2, 5)} ${limited.slice(
          5
        )}`;
      } else {
        return `${limited.slice(0, 2)} ${limited.slice(2, 5)} ${limited.slice(
          5,
          7
        )} ${limited.slice(7)}`;
      }
    }

    // Format for local numbers with leading 0
    if (limited.startsWith("0")) {
      const withoutZero = limited.slice(1);
      if (withoutZero.length <= 2) {
        return `0${withoutZero}`;
      } else if (withoutZero.length <= 5) {
        return `0${withoutZero.slice(0, 2)} ${withoutZero.slice(2)}`;
      } else if (withoutZero.length <= 8) {
        return `0${withoutZero.slice(0, 2)} ${withoutZero.slice(
          2,
          5
        )} ${withoutZero.slice(5)}`;
      } else {
        return `0${withoutZero.slice(0, 2)} ${withoutZero.slice(
          2,
          5
        )} ${withoutZero.slice(5, 7)} ${withoutZero.slice(7)}`;
      }
    }

    // Default formatting
    if (limited.length <= 3) {
      return limited;
    } else if (limited.length <= 5) {
      return `(${limited.slice(0, 3)}) ${limited.slice(3)}`;
    } else if (limited.length <= 8) {
      return `(${limited.slice(0, 3)}) ${limited.slice(3, 5)} ${limited.slice(
        5
      )}`;
    } else {
      return `(${limited.slice(0, 3)}) ${limited.slice(3, 5)} ${limited.slice(
        5,
        8
      )} ${limited.slice(8)}`;
    }
  };

  const handlePhoneChange = (text: string) => {
    const formattedPhone = formatPhoneNumber(text);
    setPhone(formattedPhone);

    // Remove formatting for validation
    const cleanedPhone = formattedPhone.replace(/\D/g, "");

    // Validate only if user has entered something
    if (cleanedPhone.length > 0) {
      const validation = validateTajikPhoneNumber(cleanedPhone);

      if (!validation.isValid) {
        setPhoneError(validation.error || "Invalid phone number");
      } else if (validation.error) {
        // Historical prefix warning
        setPhoneError(validation.error);
      } else {
        setPhoneError("");
      }
    } else {
      setPhoneError("");
    }
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!fullName.trim()) {
      Alert.alert("Validation Error", "Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      Alert.alert("Validation Error", "Please enter your email.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Validation Error", "Please enter a valid email address.");
      return;
    }

    if (!phone.trim()) {
      Alert.alert("Validation Error", "Please enter your phone number.");
      return;
    }

    // Final phone validation before submission
    const cleanedPhone = phone.replace(/\D/g, "");
    const validation = validateTajikPhoneNumber(cleanedPhone);

    if (!validation.isValid) {
      setPhoneError(
        validation.error || "Please enter a valid Tajik phone number"
      );
      Alert.alert(
        "Validation Error",
        validation.error || "Please enter a valid Tajik phone number."
      );
      return;
    }

    if (!selectedFile || selectedFile.canceled) {
      Alert.alert("Validation Error", "Please upload your CV.");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call/upload process
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Here you would typically upload the file and form data to your server
      const file = selectedFile.assets[0];
      console.log("Submitting application with:", {
        fullName,
        email,
        phone: cleanedPhone,
        phoneOperator: validation.operator,
        comment,
        fileName: file.name,
        fileUri: file.uri,
        fileSize: file.size,
        fileType: file.mimeType,
      });

      // If all validations pass, submit the application
      Alert.alert(
        "Application Submitted!",
        `Your job application has been submitted successfully!${
          validation.operator
            ? `\n\nDetected operator: ${validation.operator}`
            : ""
        }`,
        [
          {
            text: "OK",
            onPress: () => {
              setModalApply(false);
              // Reset form
              setFullName("");
              setEmail("");
              setPhone("");
              setComment("");
              setSelectedFile(null);
              setIsLoading(false);
              setPhoneError("");
            },
          },
        ]
      );
    } catch (error) {
      console.error("Error submitting application:", error);
      Alert.alert("Error", "Failed to submit application. Please try again.");
      setIsLoading(false);
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
  };

  const isFileSelected = selectedFile && !selectedFile.canceled;

  // Function to truncate long file names
  const truncateFileName = (fileName: string, maxLength: number = 30) => {
    if (fileName.length <= maxLength) return fileName;

    const extension = fileName.split(".").pop();
    const nameWithoutExtension = fileName.slice(0, fileName.lastIndexOf("."));
    const truncatedName = nameWithoutExtension.slice(
      0,
      maxLength - 3 - (extension?.length || 0)
    );

    return `${truncatedName}...${extension}`;
  };

  const getFileName = () => {
    if (!isFileSelected) return "Browse File (PDF, DOC, DOCX)";

    const fileName = selectedFile.assets[0].name;
    return `File Selected: ${truncateFileName(fileName, 25)}`;
  };

  const getFullFileName = () => {
    if (!isFileSelected) return "";
    return selectedFile.assets[0].name;
  };

  return (
    <Modal
      visible={modalApply}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        setModalApply(false);
      }}
    >
      <View style={styles.overlayModalApply}>
        <View style={styles.modalApplyMainBlock}>
          <View style={styles.headerModalApply}>
            <Pressable
              style={styles.closeModalBtn}
              onPress={() => {
                setModalApply(false);
              }}
            >
              <FontAwesome name="close" size={32} color="black" />
            </Pressable>
            <Text style={styles.textHeaderModalApply}>Apply for Job</Text>
          </View>

          <View style={styles.sectionModalApply}>
            <ScrollView
              contentContainerStyle={styles.block1SectionModalApply}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.fullnameBlock}>
                <Text style={styles.fullnameLabel}>Full Name *</Text>
                <View style={styles.fullnameIconAndInput}>
                  <Image
                    source={require("../../assets/tajjob/auth/userLogo.jpg")}
                    style={styles.fullnameImg}
                  />
                  <TextInput
                    placeholder="Enter your full name"
                    style={styles.fullnameInput}
                    value={fullName}
                    onChangeText={setFullName}
                    returnKeyType="next"
                  />
                </View>
              </View>

              <View style={styles.emailBlock}>
                <Text style={styles.emailLabel}>Email *</Text>
                <View style={styles.emailIconAndInput}>
                  <Image
                    source={require("../../assets/tajjob/auth/emailLogo.jpg")}
                    style={styles.emailImg}
                  />
                  <TextInput
                    placeholder="example@gmail.com"
                    style={styles.emailInput}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                    returnKeyType="next"
                  />
                </View>
              </View>

              <View style={styles.phoneBlock}>
                <Text style={styles.phoneLabel}>Phone Number *</Text>
                <View style={styles.phoneIconAndInput}>
                  <Image
                    source={require("../../assets/tajjob/auth/phoneLogo.jpg")}
                    style={styles.phoneImg}
                  />
                  <TextInput
                    placeholder="+992 90 123 4567"
                    style={[
                      styles.phoneInput,
                      phoneError && styles.phoneInputError,
                    ]}
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={handlePhoneChange}
                    returnKeyType="next"
                    maxLength={20} // Allow for formatted number
                  />
                </View>
                {phoneError ? (
                  <Text
                    style={[
                      styles.phoneErrorText,
                      phoneError.includes("Historical") &&
                        styles.phoneWarningText,
                    ]}
                  >
                    {phoneError}
                  </Text>
                ) : (
                  <Text style={styles.phoneHintText}>
                    Format: +992 XX XXX XXXX or 9XXXXXXXX
                    {"\n"}Valid prefixes: 90,91,92,93,94,96,99,88,87,77,78,44,55
                  </Text>
                )}
              </View>

              <View style={styles.uploadCvBlock}>
                <Text style={styles.uploadCVLabel}>Upload CV *</Text>
                <Pressable
                  style={[
                    styles.uploadCVButton,
                    isFileSelected && styles.uploadCVButtonSelected,
                    isFileSelected && styles.uploadCVButtonDisabled,
                  ]}
                  onPress={pickDocument}
                  disabled={isFileSelected}
                >
                  <Image
                    source={require("../../assets/tajjob/job/upload-cv-img.jpg")}
                    style={styles.uploadCVButtonImg}
                  />
                  <Text
                    style={[
                      styles.uploadCVButtonText,
                      isFileSelected && styles.uploadCVButtonTextDisabled,
                    ]}
                    numberOfLines={1}
                    ellipsizeMode="middle"
                  >
                    {getFileName()}
                  </Text>
                </Pressable>

                {isFileSelected && (
                  <View style={styles.fileActions}>
                    <View style={styles.fileNameContainer}>
                      <Text
                        style={styles.fileSelectedText}
                        numberOfLines={1}
                        ellipsizeMode="middle"
                      >
                        Selected: {getFullFileName()}
                      </Text>
                    </View>
                    <Pressable
                      onPress={removeSelectedFile}
                      style={styles.removeFileBtn}
                    >
                      <Text style={styles.removeFileText}>Remove</Text>
                    </Pressable>
                  </View>
                )}

                <Text style={styles.fileHint}>
                  Maximum file size: 5 MB. Supported formats: PDF, DOC, DOCX
                </Text>
              </View>

              <View style={styles.commentApplyBlock}>
                <Text style={styles.commentApplyLabel}>
                  Additional Comments
                </Text>
                <TextInput
                  placeholder="Enter any additional information here..."
                  style={styles.commentInput}
                  multiline
                  numberOfLines={5}
                  value={comment}
                  onChangeText={setComment}
                  textAlignVertical="top"
                />
              </View>

              <Pressable
                style={[styles.btnApply, isLoading && styles.btnApplyDisabled]}
                onPress={handleSubmit}
                disabled={isLoading}
              >
                <Text style={styles.btnTextApply}>
                  {isLoading ? "Submitting..." : "Submit"}
                </Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalApplyComponent: {},
  overlayModalApply: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalApplyMainBlock: {
    position: "absolute",
    inset: 0,
    backgroundColor: "#fff",
  },
  headerModalApply: {
    flexDirection: "row",
    alignItems: "center",
    gap: 41,
    padding: 20,
  },
  closeModalBtn: {
    backgroundColor: "#dddddd",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  textHeaderModalApply: {
    color: "#3E3D3D",
    fontSize: 25,
    fontWeight: "600",
  },
  sectionModalApply: {},
  block1SectionModalApply: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    gap: 20,
  },
  fullnameBlock: {
    gap: 10,
  },
  fullnameLabel: {
    color: "#4C4ADA",
    fontSize: 25,
    fontWeight: "500",
  },
  fullnameIconAndInput: {},
  fullnameImg: { width: 38, height: 38, position: "absolute", top: 6, left: 6 },
  fullnameInput: {
    borderWidth: 1,
    borderColor: "#fff",
    paddingHorizontal: 15,
    paddingLeft: 53,
    paddingVertical: 12,
    borderRadius: 20,
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.6)",
    fontSize: 20,
    width: `100%`,
  },
  emailBlock: {
    gap: 10,
  },
  emailLabel: {
    color: "#4C4ADA",
    fontSize: 25,
    fontWeight: "500",
  },
  emailIconAndInput: {},
  emailImg: {
    width: 38,
    height: 38,
    position: "absolute",
    top: 6,
    left: 6,
  },
  emailInput: {
    borderWidth: 1,
    borderColor: "#fff",
    paddingHorizontal: 15,
    paddingLeft: 53,
    paddingVertical: 12,
    borderRadius: 20,
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.6)",
    fontSize: 20,
    width: `100%`,
  },
  phoneBlock: {
    gap: 10,
  },
  phoneLabel: {
    color: "#4C4ADA",
    fontSize: 25,
    fontWeight: "500",
  },
  phoneIconAndInput: {},
  phoneImg: {
    width: 31,
    height: 31,
    position: "absolute",
    top: 11,
    left: 11,
  },
  phoneInput: {
    borderWidth: 1,
    borderColor: "#fff",
    paddingHorizontal: 15,
    paddingLeft: 53,
    paddingVertical: 12,
    borderRadius: 20,
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.6)",
    fontSize: 20,
    width: `100%`,
  },
  phoneInputError: {
    borderColor: "#d32f2f",
    borderWidth: 2,
  },
  phoneErrorText: {
    color: "#d32f2f",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 5,
  },
  phoneWarningText: {
    color: "#ff9800", // Orange color for warnings
  },
  phoneHintText: {
    color: "#666",
    fontSize: 12,
    fontStyle: "italic",
    marginTop: 5,
    lineHeight: 16,
  },
  uploadCvBlock: {
    gap: 10,
  },
  uploadCVLabel: {
    color: "#4C4ADA",
    fontSize: 25,
    fontWeight: "500",
  },
  uploadCVButton: {
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.6)",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 15,
    alignItems: "center",
    gap: 2,
    minHeight: 60,
    justifyContent: "center",
  },
  uploadCVButtonSelected: {
    borderColor: "#4C4ADA",
    backgroundColor: "#f0f4ff",
  },
  uploadCVButtonDisabled: {
    opacity: 0.6,
  },
  uploadCVButtonImg: {},
  uploadCVButtonText: {
    color: "#A2A2A2",
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
    flex: 1,
  },
  uploadCVButtonTextDisabled: {
    color: "#666",
  },
  fileActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    gap: 10,
  },
  fileNameContainer: {
    flex: 1,
    marginRight: 10,
  },
  fileSelectedText: {
    color: "#4C4ADA",
    fontSize: 14,
    fontWeight: "500",
  },
  removeFileBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#ffebee",
    borderRadius: 8,
    flexShrink: 0,
  },
  removeFileText: {
    color: "#d32f2f",
    fontSize: 12,
    fontWeight: "500",
  },
  fileHint: {
    color: "#666",
    fontSize: 12,
    fontStyle: "italic",
    marginTop: 4,
  },
  commentApplyBlock: {
    gap: 10,
  },
  commentApplyLabel: {
    color: "#4C4ADA",
    fontSize: 25,
    fontWeight: "500",
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 20,
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.6)",
    fontSize: 20,
    width: `100%`,
    height: 190,
    textAlignVertical: "top",
  },
  btnApply: {
    backgroundColor: "#2623D2",
    paddingVertical: 15,
    borderRadius: 20,
    marginTop: 30,
  },
  btnApplyDisabled: {
    backgroundColor: "#999",
    opacity: 0.7,
  },
  btnTextApply: {
    color: "#fff",
    textAlign: "center",
    fontSize: 25,
    fontWeight: "700",
  },
});

export default ModalApply;
