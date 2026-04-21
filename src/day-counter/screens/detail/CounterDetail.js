import { View, StyleSheet, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

import DatailsCard from "../../components/detail/DetailsCard";
import ProgressBar from "../../components/detail/ProgressBar";
import CircleButton from "../../components/detail/CircleButton";
import ModalExclusao from "../../components/detail/ModalExclusao";
import { calcularDiferencaDias } from "../../utils/calcularDiferencaDias.js";

export default function CounterDetail(props) {
  const [modalEdicao, setModalEdicao] = useState(false);
  const [modalExclusao, setModalExclusao] = useState(false);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[styles.screenBackgroud, { backgroundColor: props.cor }]}
      >
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
          <Text style={styles.icon}>{props.icone}</Text>
          <Text style={styles.days}>
            {calcularDiferencaDias(
              props.data_alvo,
              props.data_inicial,
              props.tipo,
            )}
          </Text>
          <Text style={styles.subtitle}>
            {props.tipo === "r" ? "Dias restantes" : "Se passaram"}
          </Text>
        </View>
        {props.tipo === "r" && (
          <ProgressBar
            data_alvo={props.data_alvo}
            data_inicial={props.data_inicial}
            style="detail"
          />
        )}
        <DatailsCard
          tipo={props.tipo}
          titulo={props.titulo}
          descricao={props.descricao}
          data_alvo={props.data_alvo}
          data_inicial={props.data_inicial}
          notificacao={props.notificacao}
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
