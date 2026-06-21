import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePicker from "@react-native-community/datetimepicker";
import { cardService } from "../../services/card.service";

import { Check } from "lucide-react-native";

import { TextArea, Input } from "./inputfield";

function isSingleEmoji(str) {
  if (!str) return false;
  const emojiRegex =
    /^(?:\p{Extended_Pictographic}|\p{Emoji_Presentation})(?:\p{Emoji_Modifier}|\uFE0F|\u200D(?:\p{Extended_Pictographic}|\p{Emoji_Presentation}))*$/u;

  return emojiRegex.test(str);
}

export const InsertForm = ({ showForm }) => {
  const [icon, setIcon] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [typeCounter, setTypeCounter] = useState("p");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 1)),
  );
  const [notifyInterval, setNotifyInterval] = useState("d");
  const [color, setColor] = useState("hsl(0, 100%, 64%)");
  const [loading, setLoading] = useState(false);

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("Algo deu errado");

  const showAlertMessage = (text) => {
    setAlertMessage(text);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  const colorsOptions = [
    "hsl(0, 100%, 64%)",
    "hsl(39, 100%, 64%)",
    "hsl(126, 100%, 64%)",
    "hsl(207, 100%, 64%)",
    "hsl(240, 100%, 64%)",
    "hsl(296, 100%, 64%)",
    "hsl(273, 100%, 64%)",
  ];
  const ButtonColor = (props) => (
    <TouchableOpacity
      style={styles.colorButtonBox}
      onPress={() => {
        setColor(props.color);
      }}
    >
      <View style={[styles.colorView, { backgroundColor: props.color }]}>
        {props.selected ? <Check /> : null}
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
    >
      <View style={styles.overlay}>
        <Modal
          visible={showAlert}
          transparent={true}
          animationType="none"
          statusBarTranslucent={true}
        >
          <View style={[styles.overlay]}>
            <View style={styles.alertBox}>
              <Text style={{ color: "#FB2C36" }}>{alertMessage}</Text>
              <TouchableOpacity
                style={styles.alertButton}
                onPress={() => {
                  setShowAlert(false);
                }}
              >
                <Text>Fechar Aviso</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <KeyboardAwareScrollView
          style={{ flex: 1, width: "100%" }}
          contentContainerStyle={{
            marginVertical: "auto",
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 20,
          }}
          extraScrollHeight={120}
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.InputFormBox}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 24 }}>Nova Contagem</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => showForm(false)}
              >
                <Text>X</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text>
                Ícone <Text style={{ color: "#FB2C36" }}>*</Text>
              </Text>
              <TextInput
                style={styles.inputField}
                placeholder="Insira seu emoji"
                maxLength={2}
                value={icon}
                onChangeText={(text) => {
                  if (!isSingleEmoji(text)) {
                    showAlertMessage("Este campo só aceita emojis");
                    setIcon("");
                  } else {
                    setIcon(text);
                  }
                }}
              />
            </View>
            <Input
              title="Título"
              placeholder="Insira o título do contador"
              text={title}
              set={setTitle}
              required={true}
              maxLength={50}
            />
            <View>
              <Text>Tipo</Text>
              <View style={styles.selectConteiner}>
                <Picker
                  style={styles.selectField}
                  selectedValue="p"
                  onValueChange={(val) => setTypeCounter(val)}
                >
                  <Picker.Item label="Progressivo" value="p" />
                  <Picker.Item label="Regressivo" value="r" />
                </Picker>
              </View>
            </View>
            <View>
              <Text>Data Início</Text>
              <Pressable
                onPress={() => {
                  setShowStartDatePicker(true);
                }}
                style={styles.inputField}
              >
                <Text>{startDate.toLocaleDateString("pt-BR")}</Text>
              </Pressable>
              {showStartDatePicker && (
                <DateTimePicker
                  value={startDate}
                  mode="date"
                  display="default"
                  onChange={(e, selectedValue) => {
                    setShowStartDatePicker(false);
                    const selectedDate = new Date(selectedValue);
                    if (typeCounter === "r") {
                      if (endDate - selectedDate >= 0) {
                        setStartDate(selectedValue);
                      } else {
                        showAlertMessage(
                          "Data fim não pode ser menor que a data início",
                        );
                      }
                    } else {
                      setStartDate(selectedValue);
                      setEndDate(
                        new Date(
                          new Date().setDate(selectedDate.getDate() + 1),
                        ),
                      );
                    }
                  }}
                />
              )}
            </View>
            {typeCounter === "r" ? (
              <View>
                <Text>Data Fim</Text>
                <Pressable
                  onPress={() => {
                    setShowEndDatePicker(true);
                  }}
                  style={styles.inputField}
                >
                  <Text>{endDate.toLocaleDateString("pt-BR")}</Text>
                </Pressable>
                {showEndDatePicker && (
                  <DateTimePicker
                    value={endDate}
                    mode="date"
                    display="default"
                    onChange={(e, selectedValue) => {
                      setShowEndDatePicker(false);
                      if (new Date(selectedValue) - startDate >= 0) {
                        setEndDate(selectedValue);
                      } else {
                        showAlertMessage(
                          "Data fim não pode ser menor que a data início",
                        );
                      }
                    }}
                  />
                )}
              </View>
            ) : null}
            <View>
              <Text>Intervalo notificação</Text>
              <View style={styles.selectConteiner}>
                <Picker
                  style={styles.selectField}
                  selectedValue="d"
                  onValueChange={(val) => setNotifyInterval(val)}
                >
                  <Picker.Item label="Diário" value="d" />
                  <Picker.Item label="Semanal" value="s" />
                  <Picker.Item label="Mensal" value="m" />
                  <Picker.Item label="Anual" value="a" />
                </Picker>
              </View>
            </View>
            <View>
              <Text>Cor</Text>
              <View style={styles.colorButtonBox}>
                {colorsOptions.map((op, index) => {
                  let selected;
                  if (color.toUpperCase() === op.toUpperCase()) {
                    selected = true;
                  } else {
                    selected = false;
                  }
                  return (
                    <ButtonColor key={index} color={op} selected={selected} />
                  );
                })}
              </View>
            </View>
            <TextArea
              title="Descrição"
              placeholder="Insira a descrição do contador"
              text={description}
              set={setDescription}
              required={false}
            />
            <TouchableOpacity
              style={[styles.saveButton, loading && { opacity: 0.7 }]}
              disabled={loading}
              onPress={async () => {
                if (title === "") {
                  showAlertMessage("Insira o título do contador");
                  return;
                }
                if (icon === "") {
                  showAlertMessage("O ícone não pode ser nulo");
                  return;
                }

                try {
                  setLoading(true);
                  // O toISOString pode gerar timezone issues dependo de onde o usuário está
                  // Formatar manualmente com locale ajuda
                  const formatYMD = (d) => {
                    const offset = d.getTimezoneOffset();
                    const adjustedDate = new Date(d.getTime() - (offset*60*1000));
                    return adjustedDate.toISOString().split('T')[0];
                  }

                  const newCount = {
                    title: title,
                    icon: icon,
                    type: typeCounter,
                    start_date: formatYMD(startDate),
                    hue: Number.parseInt(color.split("(")[1].split(",")[0]),
                    description: description,
                    notify_interval: notifyInterval,
                  };

                  if (typeCounter === "r") {
                    newCount.end_date = formatYMD(endDate);
                  }

                  await cardService.createCard(newCount);
                  showForm(false);
                } catch (error) {
                  showAlertMessage("Erro ao criar contador.");
                  console.error(error);
                } finally {
                  setLoading(false);
                }
              }}
            >
              <Text style={{ color: "#fff" }}>
                {loading ? "Criando..." : "Criar Contagem"}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </Modal>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    backgroundColor: "#B5B5B599",
    height: "100%",
    width: "100%",
    flex: 1,
  },
  InputFormBox: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    maxWidth: "90%",
    overflow: "hidden",
    borderColor: "#5a5050",
    borderRadius: 200,
    borderStyle: "solid",
    borderRadius: 20,
    margin: "auto",
    padding: 15,
    columnGap: 5,
    zIndex: 1,
    gap: 10,
  },
  selectConteiner: {
    borderColor: "#61616194",
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "solid",
    justifyContent: "center",
    overflow: "hidden",
    height: 40,
  },
  selectField: {
    borderColor: "#61616194",
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "solid",
    height: 55,
  },
  closeButton: {
    color: "#FB2C36",
    backgroundColor: "#FB2C36",
    width: 75,
    height: 35,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  colorView: {
    height: 30,
    width: 30,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  colorButtonBox: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
    padding: 2,
    alignItems: "center",
  },
  inputField: {
    borderColor: "#61616194",
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "solid",
    height: 40,
    justifyContent: "center",
    paddingLeft: 7,
  },
  saveButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#AF52DE",
    padding: 10,
    borderRadius: 12,
  },
  alertBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    paddingHorizontal: 10,
    paddingVertical: 30,
    backgroundColor: "#fff",
    borderRadius: 12,
    gap: 10,
    borderWidth: 1,
  },
  alertButton: {
    backgroundColor: "#61616194",
    padding: 5,
    borderRadius: 12,
  },
});
