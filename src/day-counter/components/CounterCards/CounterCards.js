import { View, Text, StyleSheet, Pressable } from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import ProgressBar from "../detail/ProgressBar";
import { calcularDiferencaDias } from "../../utils/calcularDiferencaDias";
import { gerarPaletaCores } from "../../utils/gerarPaletaCores";

export const CounterCards = (props) => {
  const { corFundo, corBadge, corBarra } = gerarPaletaCores(props.hue);
  const data_inicial = new Date(props.data_inicial);
  const data_alvo = new Date(props.data_alvo);
  const dateFormat = new Intl.DateTimeFormat('pt-BR', {year:'numeric',month:'2-digit',day:'2-digit'})
  const dias = calcularDiferencaDias(
    props.data_alvo,
    props.data_inicial,
    props.tipo,
  );
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
              {props.tipo === "p" ? dateFormat.format(data_inicial) : dateFormat.format(data_alvo)}
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
            ? `${dias} dias decorridos`
            : `Faltam ${dias} dias`}
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
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  icon: {
    fontSize: 48,
    marginRight: 16,
  },
  headerText: {
    flex: 1,
  },
  detailButton: {
    fontSize: 30,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  eventdate: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dateText: {
    fontSize: 16,
    color: "#1C1C1E",
  },
  badgeBase: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 24,
    marginTop: 10,
    backgroundColor: "#ffa9b1", // Fundo laranja/amarelo
  },
  regressiveBadge: {
    alignSelf: "flex-start",
  },
  progressiveBadge: {
    justifyContent: "center",
  },
  badgeText: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "400",
  },
});
