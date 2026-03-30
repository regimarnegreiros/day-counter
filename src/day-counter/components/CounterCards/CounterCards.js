import { View, Text, StyleSheet } from "react-native";
import {
  FontAwesome,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export const CounterCards = ({ tipo }) => {
  const isProgressive = tipo === "p";

  return (
    <View
      style={[
        isProgressive
          ? styles.progressiveContainer
          : styles.regressiveContainer,
      ]}
    >
      <View style={styles.title}>
        {/* Icone placeholder */}
        <MaterialCommunityIcons
          name="briefcase"
          size={60}
          color="#6B4226"
          style={styles.icon}
        />
        <View>
          <View>
            {/* Titulo placeholder */}
            <Text style={styles.titleText}>Reunião</Text>
          </View>
          <View style={styles.eventdate}>
            <FontAwesome name="calendar-o" size={16} color="#48484A" />
            {/* Data placeholder */}
            <Text>01 de Janeiro de 2027</Text>
          </View>
        </View>
        <Text style={styles.threePoints}>⋮</Text>
      </View>

      <View
        style={[
          styles.daysmissingContainer,
          isProgressive ? styles.daysContainer : null,
        ]}
      >
        <View style={styles.daysInfo}>
          <Feather name="clock" size={16} color="#1C1C1E" />
          {/* Dias placeholder */}
          <Text>{isProgressive ? "27 dias decorridos" : "Faltam 5 dias"}</Text>
        </View>
      </View>

      {/* Oculta a progressBar se for progressivo */}
      {!isProgressive && (
        <View style={styles.progress}>
          {/* Porcentagem placeholder */}
          <Text style={styles.progressPercent}>50%</Text>
          <View style={styles.progressBarBackgroud}>
            <View style={styles.progressBar}></View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  regressiveContainer: {
    backgroundColor: "#FFE9E9", // Temporario já que o vai receber o valor pelo props
    width: "100%",
    height: 180,
    justifyContent: "space-between",
    elevation: 3,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  progressiveContainer: {
    backgroundColor: "#e9edff", // Temporario já que o vai receber o valor pelo props
    width: "100%",
    height: 180,
    justifyContent: "flex-start",
    elevation: 3,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  eventdate: {
    flexDirection: "row",
    gap: 6,
  },
  threePoints: {
    fontSize: 30,
    color: "#333",
    paddingLeft: 30,
    paddingBottom: 20,
  },
  daysmissingContainer: {
    backgroundColor: "#fa9898", // Temporario já que o vai receber o valor pelo props
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  daysContainer: {
    backgroundColor: "#989efa", // Temporario já que o vai receber o valor pelo props
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 30,
  },
  daysInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  progress: {
    marginTop: -10,
  },
  progressPercent: {
    textAlign: "right",
    marginBottom: 4,
  },
  progressBarBackgroud: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    width: "100%",
    overflow: "hidden",
  },
  progressBar: {
    backgroundColor: "#fc3f3f", // Temporario já que o vai receber o valor pelo props
    borderRadius: 20,
    minHeight: 20,
    width: "50%", // Temporario já que o vai receber o valor pelo props
  },
});
