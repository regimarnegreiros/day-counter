import { StatusBar } from "expo-status-bar";
import {
  View,
  TouchableOpacity,
  ScrollView,
  Button,
  Modal,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Plus } from "lucide-react-native";
import layoutStyle from "../../components/layout/layoutStyles";

import {
  AppHeader,
  MenuSelector,
} from "../../components/layout/layoutComponent";
import { InsertForm } from "../../components/create_counter/createCounter";
import { useState } from "react";

import { CounterCards } from "../../components/CounterCards/CounterCards";

const CounterScreen = (props) => {
  const { activeTab, setActiveTab } = props;
  const [showCreateCount, setShowCreateCount] = useState(false);
  return (
    <SafeAreaView style={layoutStyle.container}>
      <StatusBar style="dark" />

      <AppHeader title="Contagem de Dias" />

      <View style={{ flex: 1 }}>
        {showCreateCount ? <InsertForm showForm={setShowCreateCount} /> : null}
        <ScrollView style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <CounterCards
            id={1}
            titulo="Reunião"
            icone="💼"
            tipo="r"
            data_inicial="10/04/2026"
            data_alvo="30/04/2026"
            hue={0}
            descricao={"Reunião sobre o debates da empresa"}
            notificacao={"Mensal"}
          />
          <CounterCards
            id={2}
            titulo="Dias sem fumar"
            icone="💼"
            tipo="p"
            data_inicial="10/04/2026"
            data_alvo="30/04/2026"
            hue={39}
            descricao={"Sem fumar"}
            notificacao={"Mensal"}
          />
          <CounterCards
            id={1}
            titulo="Reunião"
            icone="💼"
            tipo="r"
            data_inicial="10/04/2026"
            data_alvo="30/04/2026"
            hue={126}
            descricao={"Reunião sobre o debates da empresa"}
            notificacao={"Mensal"}
          />
          <CounterCards
            id={2}
            titulo="Dias sem fumar"
            icone="💼"
            tipo="p"
            data_inicial="10/04/2026"
            data_alvo="30/04/2026"
            hue={207}
            descricao={"Sem fumar"}
            notificacao={"Mensal"}
          />
          <CounterCards
            id={1}
            titulo="Reunião"
            icone="💼"
            tipo="r"
            data_inicial="10/04/2026"
            data_alvo="30/04/2026"
            hue={240}
            descricao={"Reunião sobre o debates da empresa"}
            notificacao={"Mensal"}
          />
          <CounterCards
            id={2}
            titulo="Dias sem fumar"
            icone="💼"
            tipo="p"
            data_inicial="10/04/2026"
            data_alvo="30/04/2026"
            hue={296}
            descricao={"Sem fumar"}
            notificacao={"Mensal"}
          />
          <CounterCards
            id={2}
            titulo="Dias sem fumar"
            icone="💼"
            tipo="p"
            data_inicial="10/04/2026"
            data_alvo="30/04/2026"
            hue={273}
            descricao={"Sem fumar"}
            notificacao={"Mensal"}
          />
        </ScrollView>
      </View>

      <TouchableOpacity
        style={layoutStyle.fab}
        onPress={() => setShowCreateCount(!showCreateCount)}
      >
        <Plus color="white" size={30} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CounterScreen;
