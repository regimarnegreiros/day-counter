import { View, StyleSheet, Text } from "react-native";
import { formatarData } from "../../utils/formatarData";

export default function DatailsCard(props) {
  const data_inicial = new Date(props.data_inicial);
  const data_alvo = new Date(props.data_alvo);
  const notify_convertions = {
    'd': 'Diário',
    's': 'Semanal',
    'm': 'Mensal',
    'a': 'Anual'
  }
  return (
    <View style={styles.detailsContainer}>
      <View style={styles.section}>
        <Text style={styles.labelText}>TITULO</Text>
        <Text style={styles.valueText}>{props.titulo}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.labelText}>DESCRIÇÃO</Text>
        <Text style={styles.valueText}>{props.descricao}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.row}>
        <View>
          <Text style={styles.labelText}>
            {props.tipo === "r" ? "DATA ALVO" : "DATA INICIAL"}
          </Text>
          <Text style={styles.valueText}>
            {props.tipo === "r" ? formatarData(data_alvo) : formatarData(data_inicial)}
          </Text>
        </View>
        <View>
          <Text style={styles.labelText}>TIPO</Text>
          <Text style={styles.valueText}>
            {props.tipo === "r" ? "Regressivo" : "Progressivo"}
          </Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.row}>
        {props.tipo === "r" && (
          <View>
            <Text style={styles.labelText}>DATA INICIAL</Text>
            <Text style={styles.valueText}>{formatarData(data_inicial)}</Text>
          </View>
        )}
        <View>
          <Text style={styles.labelText}>NOTIFICAÇÃO</Text>
          <Text style={styles.valueText}>{notify_convertions[props.notificacao]}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#FFF",
    paddingTop: 10,
    paddingBottom: 30,
  },
  section: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  labelText: {
    color: "#888",
    fontSize: 14,
    marginBottom: 4,
  },
  valueText: {
    fontSize: 18,
    color: "#000000",
  },
  divider: {
    height: 1,
    backgroundColor: "#cccccc",
    marginHorizontal: 20,
  },
});
