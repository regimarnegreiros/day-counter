import { StatusBar } from "expo-status-bar";
import { View, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Plus } from "lucide-react-native";
import layoutStyle from "../../components/layout/layoutStyles";

import {
  AppHeader,
  MenuSelector,
} from "../../components/layout/layoutComponent";

export default function CounterScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={layoutStyle.container}>
        <StatusBar style="dark" />
        <AppHeader title="Contagem de Dias" />
        <TouchableOpacity style={layoutStyle.fab}>
          <Plus color="white" size={30} />
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
