import { View, StyleSheet, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

import DatailsCard from "../../components/detail/DetailsCard";
import ProgressBar from "../../components/detail/ProgressBar";
import CircleButton from "../../components/detail/CircleButton";
import ModalExclusao from "../../components/detail/ModalExclusao";
import { converterData } from "../../utils/converterData.js";

{
  /* Depois substituir por props */
}
export default function CounterDetail({
  titulo = "Férias de verão",
  descricao = "Viagem planejada com a família para a praia. Hotel e passagens já estão compradas",
  data_alvo = "30/12/2026",
  data_criacao = "18/04/2026",
  tipo = "r",
  notificacao = "Mensal",
  icone = "⛱️",
  cor = "#ea2500",
}) {
  const [modalEdicao, setModalEdicao] = useState(false);
  const [modalExclusao, setModalExclusao] = useState(false);

  const calcularDiferencaDias = (data_alvo, data_criacao, tipo) => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    let diferencaMilissegundos = 0;
    if (tipo === "r") {
      const dataRef = converterData(data_alvo);
      dataRef.setHours(0, 0, 0, 0);
      diferencaMilissegundos = dataRef.getTime() - hoje.getTime();
    } else {
      const dataRef = converterData(data_criacao);
      dataRef.setHours(0, 0, 0, 0);
      diferencaMilissegundos = hoje.getTime() - dataRef.getTime();
    }
    const dias = Math.floor(diferencaMilissegundos / (1000 * 60 * 60 * 24));
    return dias < 0 ? 0 : dias;
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.screenBackgroud, { backgroundColor: cor }]}>
        <ModalExclusao
          visible={modalExclusao}
          onClose={() => {
            setModalExclusao(false);
          }}
        />
        <View style={styles.row}>
          <CircleButton iconName="arrow-left" />
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
          <Text style={styles.icon}>{icone}</Text>
          <Text style={styles.days}>
            {calcularDiferencaDias(data_alvo, data_criacao, tipo)} dias
          </Text>
          <Text style={styles.subtitle}>
            {tipo === "r" ? "Dias restantes" : "Se passaram"}
          </Text>
        </View>
        {tipo === "r" && (
          <ProgressBar data_alvo={data_alvo} data_criacao={data_criacao} />
        )}
        <DatailsCard
          tipo={tipo}
          titulo={titulo}
          descricao={descricao}
          data_alvo={data_alvo}
          data_criacao={data_criacao}
          notificacao={notificacao}
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
