import { useState, useEffect } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePicker from "@react-native-community/datetimepicker";

import { AlignCenter, Check } from "lucide-react-native";

import { TextArea, Input, Select } from "../create_counter/inputfield";

import { styles } from '../create_counter/createCounter'

function isSingleEmoji(str) {
  if (!str) return false;
  const emojiRegex =
    /^(?:\p{Extended_Pictographic}|\p{Emoji_Presentation})(?:\p{Emoji_Modifier}|\uFE0F|\u200D(?:\p{Extended_Pictographic}|\p{Emoji_Presentation}))*$/u;

  return emojiRegex.test(str);
}

export const EditCounter = (props) => {
  const [icon, setIcon] = useState(props.icon);
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const typeCounter = props.typeCounter;
  const [startDate, setStartDate] = useState(new Date(props.startDate));
  const [endDate, setEndDate] = useState(new Date(props.endDate));
  const [notifyInterval, setNotifyInterval] = useState(props.notifyInterval);
  const [color, setColor] = useState(`hsl(${props.hue}, 100%, 64%)`);

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("Algo deu errado");

  const showAlertMessage = (text) => {
    setAlertMessage(text);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  // const updateData = async (updatedCount) => {
  //   await fetch(process.env.EXPO_PUBLIC_API_URL +"/data", {
  //     method: "put",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       data: updatedCount,
  //     }),
  //   });
  // };

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
      visible={props.showEditCounter}
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
              <Text style={{ fontSize: 24 }}>Editar Contagem</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => props.setShowEditCounter(false)}
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
              style={styles.saveButton}
              onPress={() => {
                if (title === "") {
                  showAlertMessage("Insira o título do contador");
                  return;
                }
                if (icon === "") {
                  showAlertMessage("O ícone não pode ser nulo");
                  return;
                }

                //     const updateCount = {
                //       id: props.id,
                //       titulo: title,
                //       icone: icon,
                //       tipo: typeCounter,
                //       data_inicial: startDate,
                //       hue: Number.parseInt(color.split("(")[1].split(",")[0]),
                //       descricao: description,
                //       notificacao: notifyInterval,
                //     };
                //     if (typeCounter === "r") {
                //       updateCount["data_alvo"] = endDate;
                //     }
                //     updateData(updateCount);
                    props.setShowEditCounter(false);
              }}
            >
              <Text style={{ color: "#fff" }}>Salvar Contagem</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </Modal>
  );
};