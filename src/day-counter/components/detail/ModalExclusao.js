import { View, StyleSheet, Text, TouchableOpacity, Modal } from "react-native";
import { useState } from "react";
import { cardService } from "../../services/card.service";

export default function ModalExclusao(props) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await cardService.deleteCard(props.id);
      if (props.onClose) props.onClose();
      if (props.onSuccess) props.onSuccess();
    } catch (error) {
      console.log("Erro ao deletar", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onClose}
      statusBarTranslucent={true}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Tem certeza que deseja excluir esse contador?</Text>
          <View style={styles.modalExclusaoBotoes}>
            <TouchableOpacity
              style={styles.cancelarButton}
              onPress={props.onClose}
            >
              <Text style={styles.cancelarText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.excluirButton, loading && { opacity: 0.7 }]}
              onPress={handleDelete}
              disabled={loading}
            >
              <Text style={styles.excluirText}>{loading ? "Aguarde..." : "Excluir"}</Text>
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
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
    fontWeight: "500",
  },
  modalExclusaoBotoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelarButton: {
    width: "48%",
    backgroundColor: "#EEEEEE",
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: "center",
  },
  cancelarText: {
    fontSize: 16,
  },
  excluirButton: {
    width: "48%",
    backgroundColor: "#FF000C",
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: "center",
  },
  excluirText: {
    color: "#FFF",
    fontSize: 16,
  },
});