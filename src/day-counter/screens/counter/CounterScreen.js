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

const CounterScreen = (props) => {
  const { activeTab, setActiveTab } = props;
  return (
    <SafeAreaView style={layoutStyle.container}>
      <StatusBar style="dark" />

      <AppHeader title="Contagem de Dias" />

      <View style={{ flex: 1 }}>
        <ScrollView style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <CounterCards
            id={1}
            titulo="Reunião"
            icone="💼"
            tipo="r"
            data_inicial="10/04/2026"
            data_alvo="30/04/2026"
            hue={90}
          />
          <CounterCards
            id={2}
            titulo="Reunião"
            icone="💼"
            tipo="p"
            data_inicial="10/04/2026"
            data_alvo="30/04/2026"
            hue={0}
          />
        </ScrollView>
      </View>

      <TouchableOpacity style={layoutStyle.fab}>
        <Plus color="white" size={30} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CounterScreen;