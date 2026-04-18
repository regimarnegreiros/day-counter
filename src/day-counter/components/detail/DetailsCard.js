import { View, StyleSheet, Text } from "react-native";

export default function DatailsCard(props) {
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
        <View style={styles.column}>
          <Text style={styles.labelText}>
            {props.tipo === "r" ? "DATA ALVO" : "DATA INCIAL"}
          </Text>
          <Text style={styles.valueText}>
            {props.tipo === "r" ? props.data_alvo : props.data_criacao}
          </Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.labelText}>TIPO</Text>
          <Text style={styles.valueText}>
            {props.tipo === "r" ? "Regressivo" : "Progressivo"}
          </Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.row}>
        {props.tipo === "r" && (
          <View style={styles.column}>
            <Text style={styles.labelText}>DATA INICIAL</Text>
            <Text style={styles.valueText}>{props.data_criacao}</Text>
          </View>
        )}
        <View style={styles.column}>
          <Text style={styles.labelText}>NOTIFICAÇÃO</Text>
          <Text style={styles.valueText}>{props.notificacao}</Text>
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
  },

  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },

  labelText: {
    color: "#888",
    fontSize: 16,
  },

  valueText: {
    fontSize: 16,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  column: {
    width: "30%",
  },

  divider: {
    height: 1,
    backgroundColor: "#CCC",
    marginVertical: 16,
  },
});
