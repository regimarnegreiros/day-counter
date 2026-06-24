import React from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";

const colors = {
  mainViolet: "#ad46ff",
  white: "#ffffff",
  borderGrey: "#bfbfbf",
  labelGrey: "#444444",
  linkBlue: "#315ee9",
  errorRed: "#e53935",
  placeholderGrey: "#aaaaaa",
};

export function AuthInput({
  label,
  iconName,
  value,
  onChangeText,
  placeholder,
  inputMode,
  secureTextEntry,
  errMsg,
  rightElement,
}) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          errMsg ? styles.inputContainerError : null,
        ]}
      >
        <Feather
          name={iconName}
          size={16}
          color={colors.mainViolet}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholderGrey}
          inputMode={inputMode || "text"}
          secureTextEntry={secureTextEntry || false}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {rightElement || null}
      </View>
      {errMsg ? <Text style={styles.errMsg}>{errMsg}</Text> : null}
    </View>
  );
}

export function EyeButton({ visible, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.eyeButton}>
      <Feather
        name={visible ? "eye-off" : "eye"}
        size={16}
        color={colors.borderGrey}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.labelGrey,
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.borderGrey,
    borderRadius: 50,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === "ios" ? 12 : 8,
    backgroundColor: colors.white,
  },
  inputContainerError: {
    borderColor: colors.errorRed,
  },
  inputIcon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: "#222",
    padding: 0,
  },
  eyeButton: {
    paddingLeft: 8,
  },
  errMsg: {
    fontSize: 11,
    color: colors.errorRed,
    marginTop: 4,
    marginLeft: 14,
  },
});
