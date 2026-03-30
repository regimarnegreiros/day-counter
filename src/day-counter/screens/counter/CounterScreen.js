import { StatusBar } from "expo-status-bar";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Plus } from "lucide-react-native";
import layoutStyle from "../../components/layout/layoutStyles";

import {
  AppHeader,
  MenuSelector,
} from "../../components/layout/layoutComponent";

import { CounterCards } from "../../components/CounterCards/CounterCards";

export default function CounterScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={layoutStyle.container}>
        <StatusBar style="dark" />

        <AppHeader title="Contagem de Dias" />

        <View style={{ flex: 1 }}>
          <ScrollView style={{ paddingHorizontal: 20 }}>
            <CounterCards tipo={"r"} />
            <CounterCards tipo={"p"} />
            <CounterCards tipo={"r"} />
            <CounterCards tipo={"p"} />
            <CounterCards tipo={"r"} />
            <CounterCards tipo={"p"} />
            <CounterCards tipo={"r"} />
          </ScrollView>
        </View>

        <TouchableOpacity style={layoutStyle.fab}>
          <Plus color="white" size={30} />
        </TouchableOpacity>

        <MenuSelector />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
