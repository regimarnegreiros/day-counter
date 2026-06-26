import React, { useState, useContext, useCallback } from "react";
import { ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { User, Mail, Lock, Bell } from "lucide-react-native";
import profileStyles from "./profileStyles";
import layoutStyles from "../../components/layout/layoutStyles";
import { AppHeader } from "../../components/layout/Layout";
import { AuthContext } from "../../contexts/AuthContext";
import { cardService } from "../../services/cardService";
import { userService } from "../../services/userService";
import { useFocusEffect } from "@react-navigation/native";

import { ProfileHeader } from "../../components/profile/ProfileHeader";
import { ProfileMenu } from "../../components/profile/ProfileMenu";
import { ProfileEditModal } from "../../components/profile/ProfileEditModal";

const ProfileScreen = (props) => {
  const { user, logout, updateUserData } = useContext(AuthContext);
  const { activeTab, setActiveTab } = props;

  const [userData, setUserData] = useState({
    name: user?.name || "Carregando...",
    email: user?.email || "carregando@email.com",
    password: "••••••••",
    notifications: true,
  });

  const [counterCount, setCounterCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setUserData(prev => ({
        ...prev,
        name: user?.name || prev.name,
        email: user?.email || prev.email,
      }));

      cardService.getCards()
        .then(response => setCounterCount(response.data?.length || 0))
        .catch(err => console.log("Erro ao buscar total:", err));
    }, [user])
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [editingField, setEditingField] = useState(null); 

  const menuItems = [
    { id: "name", label: "Editar nome", icon: User },
    { id: "email", label: "Alterar email", icon: Mail },
    { id: "password", label: "Alterar senha", icon: Lock },
    { id: "notifications", label: "Notificações", icon: Bell },
  ];

  const stats = [
    { label: "Total de Contadores", value: counterCount },
  ];

  const openEditor = (field) => {
    if (field === "notifications") {
      setUserData((prev) => ({ ...prev, notifications: !prev.notifications }));
      return;
    }
    setEditingField(field);
    setModalVisible(true);
  };

  const saveChanges = async (field, newValue, currentValue) => {
    try {
      if (field === 'name') {
        if (!newValue || !newValue.trim()) {
          throw { message: "O nome não pode estar vazio.", field: "tempValue" };
        }
        if (newValue.trim().length < 3) {
          throw { message: "O nome deve ter pelo menos 3 caracteres.", field: "tempValue" };
        }
        await userService.updateName(newValue.trim());
        updateUserData({ name: newValue.trim() });
        setUserData((prev) => ({ ...prev, name: newValue.trim() }));
        Alert.alert("Sucesso", "Nome atualizado com sucesso!");
      } else if (field === 'email') {
        if (!currentValue) {
          throw { message: "O e-mail atual é obrigatório.", field: "currentValue" };
        }
        if (currentValue.trim().toLowerCase() !== user.email.toLowerCase()) {
          throw { message: "O e-mail atual não confere.", field: "currentValue" };
        }
        if (!newValue || !newValue.trim()) {
          throw { message: "O novo e-mail é obrigatório.", field: "tempValue" };
        }
        if (newValue.trim().toLowerCase() === user.email.toLowerCase()) {
          throw { message: "O novo e-mail não pode ser igual ao atual.", field: "tempValue" };
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newValue.trim())) {
          throw { message: "Formato de e-mail inválido.", field: "tempValue" };
        }
        await userService.updateEmail(newValue.trim());
        updateUserData({ email: newValue.trim() });
        setUserData((prev) => ({ ...prev, email: newValue.trim() }));
        Alert.alert("Sucesso", "E-mail atualizado com sucesso!");
      } else if (field === 'password') {
        if (!currentValue) {
          throw { message: "A senha atual é obrigatória.", field: "currentValue" };
        }
        if (!newValue) {
          throw { message: "A nova senha é obrigatória.", field: "tempValue" };
        }
        if (newValue.length < 6) {
          throw { message: "A senha não pode ter menos que 6 caracteres", field: "tempValue" };
        }
        try {
          await userService.updatePassword(currentValue, newValue);
        } catch (apiError) {
          const msg = apiError.error || apiError.message || "Erro desconhecido";
          if (msg.includes("não coincide") || msg.includes("senha atual")) {
            throw { message: msg, field: "currentValue" };
          } else if (msg.includes("menos que 6")) {
            throw { message: msg, field: "tempValue" };
          } else {
            throw { message: msg, field: "general" };
          }
        }
        Alert.alert("Sucesso", "Senha alterada com sucesso!");
      } else if (field === 'notifications') {
        setUserData((prev) => ({ ...prev, notifications: !prev.notifications }));
      }
    } catch (error) {
      if (error.field) {
        throw error;
      }
      const errorMessage = error.error || error.message || "Ocorreu um erro ao salvar as alterações.";
      throw { message: errorMessage, field: "general" };
    }
  };


  return (
    <SafeAreaView style={layoutStyles.container} edges={["top", "left", "right"]}>
      <AppHeader title="Perfil" />

      <ScrollView
        style={profileStyles.scrollView}
        contentContainerStyle={[profileStyles.content, { flexGrow: 1 }]}
      >
        <ProfileHeader userData={userData} stats={stats} />

        <ProfileMenu
          menuItems={menuItems}
          userData={userData}
          openEditor={openEditor}
          logout={logout}
        />
      </ScrollView>

      <ProfileEditModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        editingField={editingField}
        userData={userData}
        onSave={saveChanges}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;
