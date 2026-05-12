import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  User,
  Mail,
  Lock,
  Bell,
  LogOut,
  ChevronRight,
  X,
  UserCircle,
  Clock,
  CalendarDays,
} from "lucide-react-native";
import profileStyles from "./profileStyle";
import layoutStyles from "../../components/layout/layoutStyles";
import {
  AppHeader,
  MenuSelector,
} from "../../components/layout/layoutComponent";

const ProfileScreen = (props) => {
  const { activeTab, setActiveTab } = props;

  const [userData, setUserData] = useState({
    name: "Pedro Oliveira",
    email: "pedro.oliveira@email.com",
    password: "••••••••",
    notifications: true,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [editingField, setEditingField] = useState(null); // 'name', 'email', 'password'
  const [tempValue, setTempValue] = useState("");

  const menuItems = [
    { id: "name", label: "Editar nome", icon: User },
    { id: "email", label: "Alterar email", icon: Mail },
    { id: "password", label: "Alterar senha", icon: Lock },
    { id: "notifications", label: "Notificações", icon: Bell },
  ];

  const stats = [
    { label: "Total de Contadores", value: 4 },
    // { label: "Total de Ofensivas", value: 12 },
  ];

  const openEditor = (field) => {
    if (field === "notifications") {
      setUserData((prev) => ({ ...prev, notifications: !prev.notifications }));
      return;
    }
    setEditingField(field);
    setTempValue(userData[field]);
    setModalVisible(true);
  };

  const saveChanges = () => {
    setUserData((prev) => ({ ...prev, [editingField]: tempValue }));
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

  return (
    <SafeAreaView style={layoutStyles.container}>
      <AppHeader title="Perfil" />

      <ScrollView
        style={profileStyles.scrollView}
        contentContainerStyle={profileStyles.content}
      >
        <View style={profileStyles.userCard}>
          <Text style={profileStyles.userName}>{userData.name}</Text>
          <Text style={profileStyles.userEmail}>{userData.email}</Text>
        </View>

        <View style={profileStyles.divider} />

        <View style={profileStyles.statsContainer}>
          {stats.map((stat) => (
            <View key={stat.label} style={profileStyles.statCard}>
              <Text style={profileStyles.statValue}>{stat.value}</Text>
              <Text style={profileStyles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={profileStyles.divider} />

        <View style={profileStyles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={profileStyles.menuItem}
              activeOpacity={0.7}
              onPress={() => openEditor(item.id)}
            >
              <View style={profileStyles.menuIconContainer}>
                <item.icon
                  size={22}
                  color={
                    item.id === "notifications" && !userData.notifications
                      ? "#9CA3AF"
                      : "#A855F7"
                  }
                  strokeWidth={2.5}
                />
              </View>
              <Text
                style={[
                  profileStyles.menuItemText,
                  item.id === "notifications" &&
                    !userData.notifications && { color: "#9CA3AF" },
                ]}
              >
                {item.label}
              </Text>
              {item.id === "notifications" ? (
                <View
                  style={{
                    width: 44,
                    height: 24,
                    backgroundColor: userData.notifications
                      ? "#AD46FF"
                      : "#E5E7EB",
                    borderRadius: 12,
                    justifyContent: "center",
                    paddingHorizontal: 2,
                  }}
                >
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: "white",
                      borderRadius: 10,
                      alignSelf: userData.notifications
                        ? "flex-end"
                        : "flex-start",
                    }}
                  />
                </View>
              ) : (
                <ChevronRight size={24} color="#1F2937" strokeWidth={3} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

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

            <TextInput
              style={profileStyles.modalInput}
              value={tempValue}
              onChangeText={setTempValue}
              autoFocus={true}
              secureTextEntry={editingField === "password"}
              autoCapitalize={editingField === "email" ? "none" : "words"}
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

      <View style={profileStyles.logoutContainer}>
        <TouchableOpacity
          style={profileStyles.logoutButton}
          activeOpacity={0.8}
        >
          <LogOut
            size={32}
            color="#FFFFFF"
            strokeWidth={2.5}
            style={{ marginLeft: 4 }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
