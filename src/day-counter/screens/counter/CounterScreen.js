import { StatusBar } from "expo-status-bar";
import {
  View,
  TouchableOpacity,
  ScrollView,
  Button,
  Modal,
  FlatList,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Plus } from "lucide-react-native";
import layoutStyle from "../../components/layout/layoutStyles";

import {
  AppHeader,
  MenuSelector,
} from "../../components/layout/layoutComponent";
import { InsertForm } from "../../components/create_counter/createCounter";
import { useEffect, useState } from "react";

import { CounterCards } from "../../components/CounterCards/CounterCards";

let DATA = {data:[ //esses dados serão puxados da API
  {
    id: 0,
    titulo: "Reunião",
    icone: "💼",
    tipo: "r",
    data_inicial: "2026-04-10",
    data_alvo: "2026-04-30",
    hue: 0,
    descricao: "Reunião sobre o debates da empresa",
    notificacao: "Mensal",
  },
  {
    id: 1,
    titulo: "Dias sem fumar",
    icone: "💼",
    tipo: "p",
    data_inicial: "2026-04-10",
    data_alvo: "2026-04-30",
    hue: 39,
    descricao: "Sem fumar",
    notificacao: "Mensal",
  },
  {
    id: 3,
    titulo: "Reunião",
    icone: "💼",
    tipo: "r",
    data_inicial: "2026-04-10",
    data_alvo: "2026-04-30",
    hue: 126,
    descricao: "Reunião sobre o debates da empresa",
    notificacao: "Mensal",
  },
  {
    id: 4,
    titulo: "Dias sem fumar",
    icone: "💼",
    tipo: "p",
    data_inicial: "2026-04-10",
    data_alvo: "2026-04-30",
    hue: 207,
    descricao: "Sem fumar",
    notificacao: "Mensal",
  },
  {
    id: 5,
    titulo: "Reunião",
    icone: "💼",
    tipo: "r",
    data_inicial: "2026-04-10",
    data_alvo: "2026-04-30",
    hue: 240,
    descricao: "Reunião sobre o debates da empresa",
    notificacao: "Mensal",
  },
  {
    id: 6,
    titulo: "Dias sem fumar",
    icone: "💼",
    tipo: "p",
    data_inicial: "2026-04-10",
    data_alvo: "2026-04-30",
    hue: 296,
    descricao: "Sem fumar",
    notificacao: "Mensal",
  },
  {
    id: 7,
    titulo: "Dias sem fumar",
    icone: "💼",
    tipo: "p",
    data_inicial: "2026-04-10",
    data_alvo: "2026-04-30",
    hue: 273,
    descricao: "Sem fumar",
    notificacao: "Mensal",
  },
]}

const CounterScreen = (props) => {
  const { activeTab, setActiveTab } = props;
  const [showCreateCount, setShowCreateCount] = useState(false);
  const [data, setData] = useState(DATA['data']);
  // const getData = async () => {
  //   const response = await fetch(process.env.EXPO_PUBLIC_API_URL ?? '' +"/data", {
  //     method: "get",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const json = await response.json();
  //   setData(json["data"]);
  // };
  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <SafeAreaView
      style={layoutStyle.container}
      edges={["top", "left", "right"]}
    >
      <StatusBar style="dark" />

      <AppHeader title="Contagem de Dias" />

      <View style={{ flex: 1 }}>
        {showCreateCount ? (
          <InsertForm showForm={setShowCreateCount}/>
        ) : null}
        <FlatList
          style={{ paddingHorizontal: 16, paddingTop: 16 }}
          data={data}
          renderItem={({ item }) => (
            <CounterCards
              id={item.id}
              titulo={item.titulo}
              icone={item.icone}
              tipo={item.tipo}
              data_inicial={item.data_inicial}
              data_alvo={item.data_alvo}
              hue={item.hue}
              descricao={item.descricao}
              notificacao={item.notificacao}
            />
          )}
          keyExtractor={(item) => item.id}
        />
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
