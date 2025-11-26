import React from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";

const Language = () => {
  return (
    <View style={styles.languageComponent}>
      <View style={styles.blockTitleAndDescriptionOfLanguageComponent}>
        <Text style={styles.titleOfLanguageComponent}>Choose Language</Text>
        <Text style={styles.descriptionOfLanguageComponent}>
          Choose your preferred language
        </Text>
      </View>
      <View style={styles.blockChosenLanguage}>
        <Text style={styles.chosenLanguageTitle}>Your chosen language</Text>
        <View style={styles.blockInfoChosenLanguage}>
          <Image style={styles.chosenLanguageFlag} />
          <Text style={styles.chosenLanguageName}>English</Text>
        </View>
      </View>
      <View style={styles.blockSearchLanguageAndAllLanguages}>
        <Text style={styles.allLanguagesTitle}>Your chosen language</Text>
        <TextInput style={styles.searchInputAllLanguages} />
        <View style={styles.allLanguagesBlock}>
          {/* 1st Language */}
          <View style={styles.blockLanguage}>
            <Image style={styles.languageFlag} />
            <Text style={styles.languageName}>English</Text>
          </View>
          
          {/* 2nd Language */}
          <View style={styles.blockLanguage}>
            <Image style={styles.languageFlag} />
            <Text style={styles.languageName}>Russian</Text>
          </View>

          {/* 3rd Language */}
          <View style={styles.blockLanguage}>
            <Image style={styles.languageFlag} />
            <Text style={styles.languageName}>Tajik</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Language;

const styles = StyleSheet.create({
  languageComponent: {},
  blockTitleAndDescriptionOfLanguageComponent: {},
  titleOfLanguageComponent: {},
  descriptionOfLanguageComponent: {},

  blockChosenLanguage: {},
  chosenLanguageTitle: {},
  blockInfoChosenLanguage: {},
  chosenLanguageFlag: {},
  chosenLanguageName: {},

  blockSearchLanguageAndAllLanguages: {},
  allLanguagesTitle: {},
  searchInputAllLanguages: {},
  allLanguagesBlock: {},
  blockLanguage: {},
  languageFlag: {},
  languageName: {},
});
