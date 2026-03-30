import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

export default function CounterDetail() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screenBackgroud}>
        {/* Botões */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.circleButton}>
            <Feather name="arrow-left" size={20} color="#000" />
          </TouchableOpacity>
          <View style={styles.rowButton}>
            <TouchableOpacity style={styles.circleButton}>
              <Feather name="edit" size={20} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.circleButton}>
              <Feather name="trash-2" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.icon}>⛱️</Text>
          <Text style={styles.days}>286</Text>
          <Text style={styles.subtitle}>Dias restantes</Text>
        </View>

        {/* Barra de progresso */}
        <View style={styles.progressContainer}>
          <View style={styles.progressLabel}>
            <Text style={styles.progressText}>Progresso</Text>
            <Text style={styles.progressText}>40%</Text>
          </View>
          <View style={styles.progressBarBackgroud}>
            <View style={styles.progressBar}></View>
          </View>
        </View>

        {/* Bloco de detalhes */}
        {/* Todos os valores vão s*/}
        <View style={styles.detailsContainer}>
          <View style={styles.section}>
            <Text style={styles.labelText}>TITULO</Text>
            <Text style={styles.valueText}>Férias de Verão</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.labelText}>DESCRIÇÃO</Text>
            <Text style={styles.valueText}>
              Viagem planejada com a família para a praia. Hotel e passagens já
              estão compradas
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.labelText}>DATA ALVO</Text>
              <Text style={styles.valueText}>20/12/2026</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.labelText}>TIPO</Text>
              <Text style={styles.valueText}>Regressivo</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.labelText}>CONTAGEM POR</Text>
              <Text style={styles.valueText}>Dia</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.labelText}>NOTIFICAÇÃO</Text>
              <Text style={styles.valueText}>Mensal</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screenBackgroud: {
    flex: 1,
    backgroundColor: "#FFA500",
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
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
  progressContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  progressLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  progressText: {
    color: "#FFF",
    fontSize: 16,
  },

  progressBarBackgroud: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    height: 20,
    width: "100%",
    overflow: "hidden",
  },
  progressBar: {
    backgroundColor: "#fce03f", // Temporario já que o vai receber o valor pelo props
    borderRadius: 20,
    minHeight: 20,
    width: "40%", // Temporario já que o vai receber o valor pelo props
  },
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

  rowButton: {
    flexDirection: "row",
    gap: 6,
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
