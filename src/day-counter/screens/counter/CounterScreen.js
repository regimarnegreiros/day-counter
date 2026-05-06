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

let DATA = {
  data: [
    {
      id: 0,
      titulo: "Férias",
      icone: "🏖️",
      tipo: "r",
      data_inicial: "2026-01-01",
      data_alvo: "2026-07-15",
      hue: 200,
      descricao: "Contagem regressiva para minhas férias",
      notificacao: "s",
    },
    {
      id: 1,
      titulo: "Academia",
      icone: "💪",
      tipo: "p",
      data_inicial: "2026-03-01",
      data_alvo: "2026-09-01",
      hue: 120,
      descricao: "Projeto de 6 meses focado em treino",
      notificacao: "d",
    },
    {
      id: 2,
      titulo: "Aniversário",
      icone: "🎂",
      tipo: "r",
      data_inicial: "2026-01-01",
      data_alvo: "2026-05-20",
      hue: 340,
      descricao: "Contagem para meu aniversário 🎉",
      notificacao: "m",
    },
    {
      id: 3,
      titulo: "Sem açúcar",
      icone: "🍬",
      tipo: "p",
      data_inicial: "2026-04-10",
      data_alvo: "2026-06-10",
      hue: 30,
      descricao: "Desafio pessoal sem açúcar",
      notificacao: "d",
    },
    {
      id: 4,
      titulo: "Entrega do Projeto",
      icone: "📦",
      tipo: "r",
      data_inicial: "2026-04-01",
      data_alvo: "2026-04-30",
      hue: 10,
      descricao: "Deadline final do projeto da empresa",
      notificacao: "s",
    },
    {
      id: 5,
      titulo: "Leitura",
      icone: "📚",
      tipo: "p",
      data_inicial: "2026-04-01",
      data_alvo: "2026-06-01",
      hue: 260,
      descricao: "Ler 5 livros em 2 meses",
      notificacao: "s",
    },
    {
      id: 6,
      titulo: "Viagem Internacional",
      icone: "✈️",
      tipo: "r",
      data_inicial: "2026-01-01",
      data_alvo: "2026-12-10",
      hue: 180,
      descricao: "Primeira viagem internacional 🌍",
      notificacao: "m",
    },
  ],
};

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
          contentContainerStyle={{ padding: 16, gap:16 }}
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
