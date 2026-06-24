import { useMemo } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import ProgressBar from "../detail/ProgressBar";
import { calcularDiferencaDias } from "../../utils/calcularDiferencaDias";
import { gerarPaletaCores } from "../../utils/gerarPaletaCores";
import { formatarData } from "../../utils/formatarData";

export const CounterCards = (props) => {
  const { corFundo, corBadge, corBarra } = useMemo(
    () => gerarPaletaCores(props.hue),
    [props.hue]
  );
  const { data_inicial, data_alvo, dias } = useMemo(() => {
    return {
      data_inicial: new Date(props.data_inicial),
      data_alvo: new Date(props.data_alvo),
      dias: calcularDiferencaDias(props.data_alvo, props.data_inicial, props.tipo),
    };
  }, [props.data_alvo, props.data_inicial, props.tipo]);
  const navigation = useNavigation();
  const paginaDetalhes = () => {
    navigation.navigate("CounterDetail", {
      ...props,
      corBadge,
      corBarra,
      dias,
    });
  };
  return (
    <Pressable
      onPress={paginaDetalhes}
      style={[styles.cardContainer, { backgroundColor: corFundo }]}
    >
      <View style={styles.header}>
        <Text style={styles.icon}>{props.icone}</Text>
        <View style={styles.headerText}>
          <Text style={styles.titleText}>{props.titulo}</Text>
          <View style={styles.eventdate}>
            <Feather name="calendar" size={16} color="#1C1C1E" />
            <Text style={styles.dateText}>
              {props.tipo === "p" ? formatarData(data_inicial) : formatarData(data_alvo)}
            </Text>
          </View>
        </View>
        <Pressable>
          <Text style={styles.detailButton}>⋮</Text>
        </Pressable>
      </View>

      <View
        style={[
          styles.badgeBase,
          { backgroundColor: corBadge },
          props.tipo === "p" ? styles.progressiveBadge : styles.regressiveBadge,
        ]}
      >
        <Feather name="clock" size={16} color="#1C1C1E" />
        <Text style={styles.badgeText}>
          {props.tipo === "p"
            ? Number(dias) === 1 ? `${dias} dia decorrido` : `${dias} dias decorridos`
            : Number(dias) === 1 ? `${dias} dia restante` : `${dias} dias restantes`}
        </Text>
      </View>

      {props.tipo === "r" && (
        <ProgressBar
          data_alvo={props.data_alvo}
          data_inicial={props.data_inicial}
          corBarra={corBarra}
          style="card"
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  icon: {
    fontSize: 40,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  detailButton: {
    fontSize: 24,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 2,
  },
  eventdate: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  dateText: {
    fontSize: 14,
    color: "#1C1C1E",
  },
  badgeBase: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginTop: 6,
    backgroundColor: "#ffa9b1", // Fundo laranja/amarelo
  },
  regressiveBadge: {
    alignSelf: "flex-start",
  },
  progressiveBadge: {
    justifyContent: "center",
  },
  badgeText: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "400",
  },
});
