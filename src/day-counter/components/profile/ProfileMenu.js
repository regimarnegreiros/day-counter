import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ChevronRight, LogOut } from "lucide-react-native";
import profileStyles from "../../screens/profile/profileStyles";

export const ProfileMenu = ({ menuItems, userData, openEditor, logout }) => {
  return (
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
                backgroundColor: userData.notifications ? "#AD46FF" : "#E5E7EB",
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
                  alignSelf: userData.notifications ? "flex-end" : "flex-start",
                }}
              />
            </View>
          ) : (
            <ChevronRight size={24} color="#1F2937" strokeWidth={3} />
          )}
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={profileStyles.logoutMenuItem}
        activeOpacity={0.7}
        onPress={logout}
      >
        <View style={[profileStyles.menuIconContainer, { backgroundColor: "#FEE2E2" }]}>
          <LogOut size={22} color="#EF4444" strokeWidth={2.5} />
        </View>
        <Text style={[profileStyles.menuItemText, { color: "#EF4444" }]}>
          Sair
        </Text>
      </TouchableOpacity>
    </View>
  );
};
