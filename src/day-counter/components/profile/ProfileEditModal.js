import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, TextInput } from "react-native";
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

  useEffect(() => {
    if (modalVisible) {
      if (editingField === "name") {
        setTempValue(userData.name);
      } else {
        setTempValue("");
      }
      setCurrentValue("");
    }
  }, [modalVisible, editingField, userData]);

  const saveChanges = () => {
    // Aqui você pode adicionar lógica para verificar se o currentValue
    // está correto antes de salvar, etc.
    if (editingField === "email" || editingField === "password") {
      onSave(editingField, tempValue, currentValue);
    } else {
      onSave(editingField, tempValue);
    }
    setModalVisible(false);
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
      <View style={profileStyles.modalOverlay}>
        <View style={profileStyles.modalContent}>
          <TouchableOpacity
            style={profileStyles.modalCloseButton}
            onPress={() => setModalVisible(false)}
          >
            <X size={20} color="white" strokeWidth={3} />
          </TouchableOpacity>

          <Text style={profileStyles.modalTitle}>{getModalTitle()}</Text>

          {isDualField && (
            <TextInput
              style={profileStyles.modalInput}
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
            style={profileStyles.modalInput}
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
    </Modal>
  );
};
