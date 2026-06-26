import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CounterScreen from "../screens/counter/CounterScreen";
import ProfileScreen from "../screens/profile/ProfileScreen"
import { MenuSelector } from "../components/layout/Layout";
import { Clock, User } from "lucide-react-native";

const Tab = createBottomTabNavigator();

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
