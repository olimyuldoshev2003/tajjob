import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  useColorScheme,
  View,
} from "react-native";

// Checkbox
import BouncyCheckbox from "react-native-bouncy-checkbox";

const Language = () => {
  const colorScheme = useColorScheme();
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [selectedLanguageValue, setSelectedLanguageValue] = useState("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [languages, setLanguages] = useState([
    {
      id: 1,
      name: "English",
      value: "en",
      flag: require("../../assets/tajjob/profile/en-lang.jpg"),
      searchTerms: ["english", "английский", "англисӣ"], // Search terms in all languages
    },
    {
      id: 2,
      name: "Russian",
      value: "ru",
      flag: require("../../assets/tajjob/profile/ru-lang.jpg"),
      searchTerms: ["russian", "русский", "русӣ"],
    },
    {
      id: 3,
      name: "Tajik",
      value: "tj",
      flag: require("../../assets/tajjob/profile/tj-lang.jpg"),
      searchTerms: ["tajik", "таджикский", "тоҷикӣ"],
    },
  ]);

  //for translation
  const { t, i18n } = useTranslation();

  // Update language names when translation changes
  useEffect(() => {
    setLanguages([
      {
        id: 1,
        name: t("language.en"),
        value: "en",
        flag: require("../../assets/tajjob/profile/en-lang.jpg"),
        searchTerms: ["english", "английский", "англисӣ"],
      },
      {
        id: 2,
        name: t("language.ru"),
        value: "ru",
        flag: require("../../assets/tajjob/profile/ru-lang.jpg"),
        searchTerms: ["russian", "русский", "русӣ"],
      },
      {
        id: 3,
        name: t("language.tj"),
        value: "tj",
        flag: require("../../assets/tajjob/profile/tj-lang.jpg"),
        searchTerms: ["tajik", "таджикский", "тоҷикӣ"],
      },
    ]);
  }, [t]);

  // Also update selectedLanguage name when languages change
  useEffect(() => {
    const currentLang = languages.find(
      (lang) => lang.value === selectedLanguageValue
    );
    if (currentLang) {
      setSelectedLanguage(currentLang.name);
    }
  }, [languages, selectedLanguageValue]);

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  // Filter languages based on search query in all languages
  const filteredLanguages = languages.filter((language) => {
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();

    // Search in the current language name
    if (language.name.toLowerCase().includes(query)) {
      return true;
    }

    // Search in all search terms (English, Russian, Tajik)
    if (
      language.searchTerms?.some((term) => term.toLowerCase().includes(query))
    ) {
      return true;
    }

    // Search in language value
    if (language.value.toLowerCase().includes(query)) {
      return true;
    }

    return false;
  });

  const handleLanguageSelect = (
    languageName: string,
    languageValue: string
  ) => {
    setSelectedLanguage(languageName);
    setSelectedLanguageValue(languageValue);
  };

  const handleApply = () => {
    // Get the selected language object to get the updated name
    const selectedLang = languages.find(
      (lang) => lang.value === selectedLanguageValue
    );

    // Store the current language for the alert message
    const languageToApply = selectedLanguageValue;

    // Get language names in all languages for the alert
    const languageNames = {
      en: "English",
      ru: "Russian",
      tj: "Tajik",
    };

    // First change the language
    changeLanguage(selectedLanguageValue);

    // Create alert message manually instead of using t() function
    // This ensures we show the correct language name
    const getAlertMessage = () => {
      const langName =
        languageNames[languageToApply as keyof typeof languageNames];

      switch (languageToApply) {
        case "en":
          return `Language changed to ${langName.toLowerCase()}`;
        case "ru":
          return `Язык изменен на ${
            langName === "Russian"
              ? "русский"
              : langName === "English"
              ? "английский"
              : "таджикский"
          }`;
        case "tj":
          return `Забон ба ${
            langName === "Tajik"
              ? "тоҷикӣ"
              : langName === "English"
              ? "англисӣ"
              : "русӣ"
          } иваз карда шуд`;
        default:
          return `Language changed to ${langName}`;
      }
    };

    // Show alert immediately with the new language message
    Alert.alert(getAlertMessage());

    console.log("Applied language:", selectedLang?.name || selectedLanguage);
    console.log("Applied language value:", selectedLanguageValue);
  };

  const dynamicStyles = StyleSheet.create({
    languageComponent: {
      flex: 1,
      backgroundColor: colorScheme === "dark" ? "#121212" : "#fff",
    },
    languageComponentBlock: {
      paddingVertical: 10,
      paddingHorizontal: 10,
    },
    blockTitleAndDescriptionOfLanguageComponent: {
      marginTop: 10,
      gap: 8,
    },
    titleOfLanguageComponent: {
      fontSize: 22,
      fontWeight: "500",
      color: colorScheme === "dark" ? "#FFFFFF" : "#000000",
    },
    descriptionOfLanguageComponent: {
      fontSize: 16,
      fontWeight: "500",
      color: colorScheme === "dark" ? "#FFFFFF" : "#000000",
    },

    blockChosenLanguage: {
      marginTop: 20,
    },
    chosenLanguageTitle: {
      fontSize: 18,
      fontWeight: "500",
      color: colorScheme === "dark" ? "#FFFFFF" : "#000000",
    },
    blockInfoChosenLanguage: {
      marginTop: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",

      padding: 5,
      borderWidth: 1,
      borderColor: "#00BBCA",
      borderRadius: 50,
    },
    blockFlagIconAndChosenLanguageName: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    chosenLanguageFlag: {
      width: 37,
      height: 37,
      borderRadius: 50,
    },
    chosenLanguageName: {
      fontSize: 16,
      fontWeight: "400",
      color: colorScheme === "dark" ? "#FFFFFF" : "#000000",
    },

    blockSearchLanguageAndAllLanguages: {
      marginTop: 30,
      paddingHorizontal: 5,
    },
    allLanguagesTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: colorScheme === "dark" ? "#FFFFFF" : "#000000",
    },
    blockSearchAndChooseLanguage: {
      marginTop: 10,
      borderWidth: 1,
      borderColor: "#3E3E3A",
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    searchInputAllLanguagesBlock: {
      position: "relative",
    },
    searchIconAllLanguages: {
      position: "absolute",
      top: 8,
      left: 10,
    },
    searchInputAllLanguages: {
      borderBottomWidth: 1,
      borderBottomColor: "#3E3E3A",
      fontSize: 20,
      fontWeight: "600",
      paddingRight: 15,
      paddingLeft: 55,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      color: colorScheme === "dark" ? "#FFFFFF" : "#000000",
    },

    allLanguagesBlockScrollView: {},

    allLanguagesBlock: {
      maxHeight: 250,
    },
    btnSelectLanguage: {
      padding: 10,
    },
    blockLanguage: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    blockFlagIconAndLanguageName: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    languageFlag: {
      width: 37,
      height: 37,
      borderRadius: 50,
    },
    languageName: {
      fontSize: 16,
      fontWeight: "400",
      color: colorScheme === "dark" ? "#FFFFFF" : "#000000",
    },
    blockBtnApply: {
      marginTop: 15,
    },
    btnApply: {
      backgroundColor: "#00BBCA",
      borderRadius: 62,
      paddingVertical: 15,
    },
    btnTextApply: {
      color: "#FFFFFF",
      textAlign: "center",
      fontSize: 25,
      fontWeight: "700",
    },
  });

  return (
    <View style={dynamicStyles.languageComponent}>
      <View style={dynamicStyles.languageComponentBlock}>
        <View style={dynamicStyles.blockTitleAndDescriptionOfLanguageComponent}>
          <Text style={dynamicStyles.titleOfLanguageComponent}>
            {t("language.chooseLanguage")}
          </Text>
          <Text style={dynamicStyles.descriptionOfLanguageComponent}>
            {t("language.choosePreferredLanguage")}
          </Text>
        </View>
        <View style={dynamicStyles.blockChosenLanguage}>
          <Text style={dynamicStyles.chosenLanguageTitle}>
            {t("language.yourChosenLanguage")}
          </Text>
          <View style={dynamicStyles.blockInfoChosenLanguage}>
            <View style={dynamicStyles.blockFlagIconAndChosenLanguageName}>
              <Image
                source={
                  languages.find((lang) => lang.value === selectedLanguageValue)
                    ?.flag
                }
                style={dynamicStyles.chosenLanguageFlag}
              />
              <Text style={dynamicStyles.chosenLanguageName}>
                {selectedLanguage}
              </Text>
            </View>
            <View>
              <BouncyCheckbox
                size={20}
                fillColor="#00BBCA"
                unFillColor="#FFFFFF"
                iconStyle={{ borderColor: "#00BBCA" }}
                innerIconStyle={{ borderWidth: 2 }}
                isChecked={true}
                disabled
              />
            </View>
          </View>
        </View>
        <View style={dynamicStyles.blockSearchLanguageAndAllLanguages}>
          <Text style={dynamicStyles.allLanguagesTitle}>
            {t("language.allLanguages")}
          </Text>
          <View style={dynamicStyles.blockSearchAndChooseLanguage}>
            <View style={dynamicStyles.searchInputAllLanguagesBlock}>
              <Ionicons
                name="search"
                size={31}
                color={colorScheme === "dark" ? "#fff" : "black"}
                style={dynamicStyles.searchIconAllLanguages}
              />
              <TextInput
                style={dynamicStyles.searchInputAllLanguages}
                placeholder={t("language.searchLanguages")}
                placeholderTextColor={
                  colorScheme === "dark" ? "#cecece" : "#414141"
                }
                value={searchQuery}
                onChangeText={(text) => {
                  setSearchQuery(text);
                }}
              />
            </View>
            <ScrollView
              contentContainerStyle={dynamicStyles.allLanguagesBlockScrollView}
              style={dynamicStyles.allLanguagesBlock}
            >
              {filteredLanguages.map((language) => (
                <TouchableHighlight
                  style={dynamicStyles.btnSelectLanguage}
                  key={language.id}
                  underlayColor={colorScheme === "dark" ? "#000" : "#f0f0f0"}
                  onPress={() =>
                    handleLanguageSelect(language.name, language.value)
                  }
                >
                  <View style={dynamicStyles.blockLanguage}>
                    <View style={dynamicStyles.blockFlagIconAndLanguageName}>
                      <Image
                        source={language.flag}
                        style={dynamicStyles.languageFlag}
                      />
                      <Text style={dynamicStyles.languageName}>
                        {language.name}
                      </Text>
                    </View>
                    <BouncyCheckbox
                      size={20}
                      fillColor="#00BBCA"
                      unFillColor="#FFFFFF"
                      iconStyle={{ borderColor: "#00BBCA" }}
                      innerIconStyle={{ borderWidth: 1 }}
                      isChecked={selectedLanguageValue === language.value}
                      onPress={() =>
                        handleLanguageSelect(language.name, language.value)
                      }
                    />
                  </View>
                </TouchableHighlight>
              ))}
            </ScrollView>
          </View>
        </View>
        <View style={dynamicStyles.blockBtnApply}>
          <Pressable style={dynamicStyles.btnApply} onPress={handleApply}>
            <Text style={dynamicStyles.btnTextApply}>
              {t("language.apply")}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Language;
