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

const CounterScreen = (props) => {
  const { activeTab, setActiveTab } = props;
  const [showCreateCount, setShowCreateCount] = useState(false);
  const [data, setData] = useState([]);
  const getData = async () => {
    const response = await fetch("http://192.168.0.118:3000/data", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    setData(json["data"]);
  };
  useEffect(() => {
    getData();
  }, []);

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
