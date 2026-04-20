import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CounterScreen from "../screens/counter/CounterScreen";
import ProfileScreen from "../screens/userProfile/ProfileScreen"
import { MenuSelector } from "../components/layout/layoutComponent";
import { Clock, Calendar, User } from "lucide-react-native";

const Tab = createBottomTabNavigator();

// Telas temporárias apenas para teste
const Placeholder = ({ route }) => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Tela {route.name} em desenvolvimento...</Text>
  </View>
);

export default function AppRoutes() {
  return (
    <Tab.Navigator
      tabBar={(props) => <MenuSelector {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Contadores"
        component={CounterScreen}
        options={{ tabBarIcon: Clock }}
      />

      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{ tabBarIcon: User }}
      />
    </Tab.Navigator>
  );
}
