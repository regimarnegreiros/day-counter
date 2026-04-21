import { View, StyleSheet, Text, TouchableOpacity, Modal } from "react-native";

export default function ModalExclusao(props) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text>Tem certeza que deseja excluir esse contador?</Text>
          <View style={styles.modalExclusaoBotoes}>
            <TouchableOpacity
              style={styles.cancelarButton}
              onPress={props.onClose}
            >
              <Text style={styles.cancelarText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.excluirButton}>
              <Text style={styles.excluirText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "#00000080",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#FFF",
    width: "90%",
    maxHeight: "80%",
    padding: 24,
    borderRadius: 20,
    alignItems: "center",
  },
  modalExclusaoBotoes: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: 10,
  },
  cancelarButton: {
    width: 120,
    backgroundColor: "#EEEEEE",
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: "center",
  },
  cancelarText: {},
  excluirButton: {
    width: 120,
    backgroundColor: "#FF000C",
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: "center",
  },
  excluirText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});
