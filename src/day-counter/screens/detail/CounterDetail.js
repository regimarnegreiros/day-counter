import { View, StyleSheet, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";

import DatailsCard from "../../components/detail/DetailsCard";
import ProgressBar from "../../components/detail/ProgressBar";
import CircleButton from "../../components/detail/CircleButton";
import ModalExclusao from "../../components/detail/ModalExclusao";
import { calcularDiferencaDias } from "../../utils/calcularDiferencaDias.js";

export default function CounterDetail(props) {
  const [modalEdicao, setModalEdicao] = useState(false);
  const [modalExclusao, setModalExclusao] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();
  const dados = route.params;
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[styles.screenBackgroud, { backgroundColor: dados.corBadge }]}
      >
        <ModalExclusao
          visible={modalExclusao}
          onClose={() => {
            setModalExclusao(false);
          }}
        />
        <View style={styles.row}>
          <CircleButton
            iconName="arrow-left"
            onPress={() => navigation.goBack()}
          />
          <View style={styles.rowButton}>
            <CircleButton
              iconName="edit"
              onPress={() => setModalEdicao(true)}
            />
            <CircleButton
              iconName="trash-2"
              onPress={() => setModalExclusao(true)}
            />
          </View>
        </View>
        <View style={styles.header}>
          <Text style={styles.icon}>{dados.icone}</Text>
          <Text style={styles.days}>{dados.dias}</Text>
          <Text style={styles.subtitle}>
            {dados.tipo === "r" ? "Dias restantes" : "Dias se passaram"}
          </Text>
        </View>
        {dados.tipo === "r" && (
          <ProgressBar
            data_alvo={dados.data_alvo}
            data_inicial={dados.data_inicial}
            corBarra={dados.corBarra}
            style="detail"
          />
        )}
        <DatailsCard
          tipo={dados.tipo}
          titulo={dados.titulo}
          descricao={dados.descricao}
          data_alvo={dados.data_alvo}
          data_inicial={dados.data_inicial}
          notificacao={dados.notificacao}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screenBackgroud: {
    flex: 1,
  },
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 40,
    marginBottom: 10,
  },
  days: {
    fontSize: 40,
    color: "#FFF",
    fontWeight: "500",
  },
  subtitle: {
    fontSize: 28,
    color: "#FFF",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  rowButton: {
    flexDirection: "row",
    gap: 6,
  },
});
