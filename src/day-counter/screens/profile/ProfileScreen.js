import React, { useState, useContext, useCallback } from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { User, Mail, Lock, Bell } from "lucide-react-native";
import profileStyles from "./profileStyles";
import layoutStyles from "../../components/layout/layoutStyles";
import { AppHeader } from "../../components/layout/Layout";
import { AuthContext } from "../../contexts/AuthContext";
import { cardService } from "../../services/cardService";
import { useFocusEffect } from "@react-navigation/native";

import { ProfileHeader } from "../../components/profile/ProfileHeader";
import { ProfileMenu } from "../../components/profile/ProfileMenu";
import { ProfileEditModal } from "../../components/profile/ProfileEditModal";

const ProfileScreen = (props) => {
  const { user, logout } = useContext(AuthContext);
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

  const saveChanges = (field, newValue, currentValue) => {
    // Para simplificar, atualizamos o estado local.
    // Futuramente, pode validar currentValue antes de enviar à API.
    setUserData((prev) => ({ ...prev, [field]: newValue }));
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
