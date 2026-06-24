import { StatusBar } from "expo-status-bar";
import {
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Plus } from "lucide-react-native";
import layoutStyle from "../../components/layout/layoutStyles";

import {
  AppHeader,
  MenuSelector,
} from "../../components/layout/Layout";
import { InsertForm } from "../../components/counter/CreateCounter";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { CounterCards } from "../../components/counter/CounterCards";
import { CounterFilter } from "../../components/counter/CounterFilter";
import { CounterSort } from "../../components/counter/CounterSort";
import { cardService } from "../../services/cardService";
import { calcularDiferencaDias } from "../../utils/calcularDiferencaDias";

const CounterScreen = () => {
  const [showCreateCount, setShowCreateCount] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");

  const fetchCards = async () => {
    try {
      setLoading(true);
      const response = await cardService.getCards();
      const cards = response.data || [];
      const mappedData = cards.map(c => ({
        id: c.cardID,
        titulo: c.title,
        icone: c.icon,
        tipo: c.type,
        data_inicial: c.start_date,
        data_alvo: c.end_date,
        hue: c.hue,
        descricao: c.description,
        notificacao: c.notify_interval,
      }));
      setData(mappedData);
    } catch (e) {
      console.log("Erro ao buscar cards:", e);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCards();
    }, [])
  );

  const filteredData = data.filter(item => {
    if (filter === "all") return true;
    return item.tipo === filter;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortOrder === "default") return 0;
    
    const diasA = calcularDiferencaDias(a.data_alvo, a.data_inicial, a.tipo);
    const diasB = calcularDiferencaDias(b.data_alvo, b.data_inicial, b.tipo);
    
    if (sortOrder === "closest") {
      return diasA - diasB;
    } else { 
      return diasB - diasA;
    }
  });

  return (
    <SafeAreaView
      style={layoutStyle.container}
      edges={["top", "left", "right"]}
    >
      <StatusBar style="dark" />

      <AppHeader title="Contagem de Dias" />

      <CounterFilter 
        currentFilter={filter} 
        onSelectFilter={setFilter} 
      />

      <CounterSort
        currentSort={sortOrder}
        onSelectSort={setSortOrder}
      />

      <View style={{ flex: 1 }}>
        {showCreateCount ? (
          <InsertForm showForm={setShowCreateCount} onSuccess={fetchCards} />
        ) : null}
        <FlatList
          contentContainerStyle={{ padding: 16, gap:16 }}
          data={sortedData}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={fetchCards} />
          }
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
