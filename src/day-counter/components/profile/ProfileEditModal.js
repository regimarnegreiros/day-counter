import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { X } from "lucide-react-native";
import profileStyles from "../../screens/profile/profileStyles";

export const ProfileEditModal = ({
  modalVisible,
  setModalVisible,
  editingField,
  userData,
  onSave,
}) => {
  const [tempValue, setTempValue] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [errorField, setErrorField] = useState(null);
  const [hasAttemptedSave, setHasAttemptedSave] = useState(false);

  useEffect(() => {
    if (modalVisible) {
      if (editingField === "name") {
        setTempValue(userData.name);
      } else {
        setTempValue("");
      }
      setCurrentValue("");
      setErrorMsg("");
      setErrorField(null);
      setHasAttemptedSave(false);
    }
  }, [modalVisible, editingField, userData]);

  useEffect(() => {
    if (errorMsg) {
      const timer = setTimeout(() => {
        setErrorMsg("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMsg]);

  const saveChanges = async () => {
    setHasAttemptedSave(true);
    setErrorMsg("");
    setErrorField(null);
    try {
      if (editingField === "email" || editingField === "password") {
        await onSave(editingField, tempValue, currentValue);
      } else {
        await onSave(editingField, tempValue);
      }
      setModalVisible(false);
    } catch (err) {
      setErrorMsg(err.message || "Ocorreu um erro.");
      setErrorField(err.field || null);
    }
  };

  const getModalTitle = () => {
    switch (editingField) {
      case "name":
        return "Editar nome";
      case "email":
        return "Alterar email";
      case "password":
        return "Alterar senha";
      default:
        return "";
    }
  };

  const isDualField = editingField === "email" || editingField === "password";

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={profileStyles.modalOverlay}>
        <View style={profileStyles.modalContent}>
          <TouchableOpacity
            style={profileStyles.modalCloseButton}
            onPress={() => setModalVisible(false)}
          >
            <X size={20} color="white" strokeWidth={3} />
          </TouchableOpacity>

          <Text style={profileStyles.modalTitle}>{getModalTitle()}</Text>

          {errorMsg ? (
            <Text style={{ color: '#EF4444', marginBottom: 10, fontWeight: '500', textAlign: 'center', width: '100%' }}>
              {errorMsg}
            </Text>
          ) : null}

          {isDualField && (
            <TextInput
              style={[
                profileStyles.modalInput,
                (hasAttemptedSave && !currentValue) || errorField === "currentValue" ? { borderColor: '#EF4444', borderWidth: 1 } : {}
              ]}
              placeholder={
                editingField === "email" ? "Email atual" : "Senha atual"
              }
              value={currentValue}
              onChangeText={setCurrentValue}
              secureTextEntry={editingField === "password"}
              autoCapitalize="none"
              placeholderTextColor="#9CA3AF"
            />
          )}

          <TextInput
            style={[
              profileStyles.modalInput,
              (hasAttemptedSave && !tempValue) || errorField === "tempValue" ? { borderColor: '#EF4444', borderWidth: 1 } : {}
            ]}
            placeholder={
              editingField === "email"
                ? "Novo email"
                : editingField === "password"
                ? "Nova senha"
                : "Seu nome"
            }
            value={tempValue}
            onChangeText={setTempValue}
            autoFocus={!isDualField}
            secureTextEntry={editingField === "password"}
            autoCapitalize={editingField === "email" ? "none" : "words"}
            placeholderTextColor="#9CA3AF"
          />

          <TouchableOpacity
            style={profileStyles.modalSaveButton}
            onPress={saveChanges}
          >
            <Text style={profileStyles.modalSaveButtonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
