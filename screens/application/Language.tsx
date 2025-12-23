import { Ionicons } from "@expo/vector-icons";
import React, { use, useState } from "react";
import {
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

  // Sample languages data
  const languages = [
    {
      id: 1,
      name: "English",
      value: "en",
      flag: require("../../assets/tajjob/profile/en-lang.jpg"),
    },
    {
      id: 2,
      name: "Russian",
      value: "ru",
      flag: require("../../assets/tajjob/profile/ru-lang.jpg"),
    },
    {
      id: 3,
      name: "Tajik",
      value: "tj",
      flag: require("../../assets/tajjob/profile/tj-lang.jpg"),
    },
  
  ];

  // Filter languages based on search query
  const filteredLanguages = languages.filter((language) =>
    language.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLanguageSelect = (
    languageName: string,
    languageValue: string
  ) => {
    setSelectedLanguage(languageName);
    setSelectedLanguageValue(languageValue);
  };

  const handleApply = () => {
    console.log("Applied language:", selectedLanguage);
    console.log("Applied language value:", selectedLanguageValue);
    // Here you would typically save the selected language to your state management or backend
    alert(`Language set to: ${selectedLanguage}`);
  };

  const dynamicStyles = StyleSheet.create({
    languageComponent: {
      flex: 1,
      backgroundColor: colorScheme === "dark" ?"#121212":"#fff",
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
      // alignItems: "center",
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
      // paddingHorizontal: 20,
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
          <Text style={dynamicStyles.titleOfLanguageComponent}>Choose Language</Text>
          <Text style={dynamicStyles.descriptionOfLanguageComponent}>
            Choose your preferred language
          </Text>
        </View>
        <View style={dynamicStyles.blockChosenLanguage}>
          <Text style={dynamicStyles.chosenLanguageTitle}>Your chosen language</Text>
          <View style={dynamicStyles.blockInfoChosenLanguage}>
            <View style={dynamicStyles.blockFlagIconAndChosenLanguageName}>
              <Image
                source={
                  languages.find((lang) => lang.name === selectedLanguage)?.flag
                }
                style={dynamicStyles.chosenLanguageFlag}
              />
              <Text style={dynamicStyles.chosenLanguageName}>{selectedLanguage}</Text>
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
          <Text style={dynamicStyles.allLanguagesTitle}>All Languages</Text>
          <View style={dynamicStyles.blockSearchAndChooseLanguage}>
            <View style={dynamicStyles.searchInputAllLanguagesBlock}>
              <Ionicons
                name="search"
                size={31}
                color={colorScheme === "dark" ? "#fff":"black"}
                style={dynamicStyles.searchIconAllLanguages}
              />
              <TextInput
                style={dynamicStyles.searchInputAllLanguages}
                placeholder="Search languages..."
                placeholderTextColor={colorScheme === "dark" ? "#cecece" : "#414141"}
                value={searchQuery}
                onChangeText={setSearchQuery}
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
                  underlayColor={colorScheme === "dark" ? "#000":"#f0f0f0"}
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
                      <Text style={dynamicStyles.languageName}>{language.name}</Text>
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
                      disabled
                    />
                  </View>
                </TouchableHighlight>
              ))}
            </ScrollView>
          </View>
        </View>
        <View style={dynamicStyles.blockBtnApply}>
          <Pressable style={dynamicStyles.btnApply} onPress={handleApply}>
            <Text style={dynamicStyles.btnTextApply}>Apply</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Language;

