import { View, Text, StyleSheet } from "react-native";

export default function ProgressBar(props) {
  const progresso = (data_alvo, data_inicial) => {
    const hoje = new Date();
    const alvoFormatado = new Date(data_alvo);
    const criacaoFormatado = new Date(data_inicial);
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
    <View
      style={[
        props.style === "card"
          ? styles.progressContainerCard
          : styles.progressContainerDetail,
      ]}
    >
      <View
        style={[
          props.style === "card"
            ? styles.progressLabelCard
            : styles.progressLabelDetail,
        ]}
      >
        {props.style === "detail" && (
          <Text style={[styles.progressTextDetail]}>Progresso</Text>
        )}
        <Text
          style={[
            props.style === "card"
              ? styles.progressTextCard
              : styles.progressTextDetail,
          ]}
        >
          {porcentagem}%
        </Text>
      </View>
      <View style={styles.progressBarBackgroud}>
        <View
          style={[
            styles.progressBar,
            { width: `${porcentagem}%`, backgroundColor: props.corBarra },
          ]}
        ></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressContainerDetail: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  progressContainerCard: {
    paddingHorizontal: 0,
    marginTop: -15,
  },
  progressLabelDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  progressLabelCard: {
    flexDirection: "row-reverse",
    marginBottom: 5,
  },
  progressTextDetail: {
    color: "#FFF",
    fontSize: 16,
  },
  progressTextCard: {
    color: "#000",
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
    borderRadius: 20,
    minHeight: 20,
  },
});
