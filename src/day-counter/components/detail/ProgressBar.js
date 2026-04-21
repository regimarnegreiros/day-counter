import { View, Text, StyleSheet } from "react-native";
import { converterData } from "../../utils/converterData.js";

export default function ProgressBar(props) {
  const progresso = (data_alvo, data_inicial) => {
    const hoje = new Date();
    const alvoFormatado = converterData(data_alvo);
    const criacaoFormatado = converterData(data_inicial);
    hoje.setHours(0, 0, 0, 0);
    alvoFormatado.setHours(0, 0, 0, 0);
    criacaoFormatado.setHours(0, 0, 0, 0);
    if (hoje.getTime() >= alvoFormatado.getTime()) return 100;
    if (hoje.getTime() <= criacaoFormatado.getTime()) return 0;
    const milissegundosTotal =
      alvoFormatado.getTime() - criacaoFormatado.getTime();
    const milissegundosDecorridos = hoje.getTime() - criacaoFormatado.getTime();
    const porcentagem = (milissegundosDecorridos / milissegundosTotal) * 100;
    return Math.floor(porcentagem);
  };

  const porcentagem = progresso(props.data_alvo, props.data_inicial);

  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressLabel}>
        <Text style={styles.progressText}>Progresso</Text>
        <Text style={styles.progressText}>{porcentagem}%</Text>
      </View>
      <View style={styles.progressBarBackgroud}>
        <View style={[styles.progressBar, { width: `${porcentagem}%` }]}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
});
