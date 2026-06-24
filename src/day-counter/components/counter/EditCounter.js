import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePicker from "@react-native-community/datetimepicker";
import EmojiPicker from "rn-emoji-keyboard";
import { cardService } from "../../services/cardService";
import { Calendar } from "lucide-react-native";

import { styles } from '../counter/CreateCounter'

import { converterParaDataLocal } from "../../utils/converterParaDataLocal";

export const EditCounter = (props) => {
  const [icon, setIcon] = useState(props.icon);
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const typeCounter = props.typeCounter;
  const [startDate, setStartDate] = useState(converterParaDataLocal(props.startDate));
  const [endDate, setEndDate] = useState(converterParaDataLocal(props.endDate));
  const [notifyInterval, setNotifyInterval] = useState(props.notifyInterval);
  const [color, setColor] = useState(`hsl(${props.hue}, 80%, 64%)`);
  const [loading, setLoading] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorFields, setErrorFields] = useState([]);

  const handleError = (msg, fields = []) => {
    setErrorMessage(msg);
    setErrorFields(fields);
  };

  const colorsOptions = [
    "hsl(0, 80%, 64%)",
    "hsl(39, 80%, 64%)",
    "hsl(126, 80%, 64%)",
    "hsl(207, 80%, 64%)",
    "hsl(240, 80%, 64%)",
    "hsl(296, 80%, 64%)",
    "hsl(273, 80%, 64%)",
  ];

  return (
    <Modal visible={props.showEditCounter} transparent={true} animationType="fade" statusBarTranslucent={true}>
      <View style={styles.overlay}>
        <EmojiPicker
          onEmojiSelected={(emojiObject) => {
            setIcon(emojiObject.emoji);
            setIsEmojiPickerOpen(false);
          }}
          open={isEmojiPickerOpen}
          onClose={() => setIsEmojiPickerOpen(false)}
        />

        <KeyboardAwareScrollView
          style={{ flex: 1, width: "100%" }}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 10,
          }}
          extraScrollHeight={150}
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.modalContent}>
            <View style={styles.headerRow}>
              <Text style={styles.headerTitle}>Editar contador</Text>
              <TouchableOpacity style={styles.closeButton} onPress={() => props.setShowEditCounter(false)}>
                <Text style={styles.closeIcon}>{">>"}</Text>
              </TouchableOpacity>
            </View>

            {errorMessage ? (
              <Text style={{ color: "#FB2C36", textAlign: "center", fontWeight: "500", marginTop: -4 }}>
                {errorMessage}
              </Text>
            ) : null}

            <View style={styles.iconTitleRow}>
              <TouchableOpacity
                style={[styles.emojiButton, errorFields.includes('icon') && { borderColor: '#FB2C36', borderWidth: 1 }]}
                onPress={() => { setIsEmojiPickerOpen(true); setErrorMessage(""); setErrorFields([]); }}
              >
                <Text style={styles.emojiText}>{icon || "✈️"}</Text>
              </TouchableOpacity>
              <TextInput
                style={[styles.titleInput, errorFields.includes('title') && { borderColor: '#FB2C36', borderWidth: 1 }]}
                placeholder="Título (ex: Viagem)"
                placeholderTextColor="#A0A0A0"
                value={title}
                onChangeText={(text) => { setTitle(text); setErrorMessage(""); setErrorFields([]); }}
                maxLength={50}
              />
            </View>

            <View style={styles.fieldSection}>
              <Text style={styles.fieldLabel}>Tipo de contagem</Text>
              <View style={styles.segmentedControl}>
                <View
                  style={[
                    styles.segmentButton,
                    typeCounter === "p" && { backgroundColor: "#FFF", borderColor: color, borderWidth: 1 }
                  ]}
                >
                  <Text style={[styles.segmentText, typeCounter === "p" && { color: color }]}>
                    Progressiva
                  </Text>
                </View>
                <View
                  style={[
                    styles.segmentButton,
                    typeCounter === "r" && { backgroundColor: "#FFF", borderColor: color, borderWidth: 1 }
                  ]}
                >
                  <Text style={[styles.segmentText, typeCounter === "r" && { color: color }]}>
                    Regressiva
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.datesRow}>
              <View style={styles.dateField}>
                <Text style={styles.fieldLabel}>Data inicial</Text>
                <Pressable
                  style={[styles.dateInput, errorFields.includes('startDate') && { borderColor: '#FB2C36', borderWidth: 1 }]}
                  onPress={() => setShowStartDatePicker(true)}
                >
                  <Text style={styles.dateText}>{startDate.toLocaleDateString("pt-BR")}</Text>
                  <Calendar color="#555" size={18} />
                </Pressable>
                {showStartDatePicker && (
                  <DateTimePicker
                    value={startDate}
                    mode="date"
                    display="default"
                    onChange={(e, selectedValue) => {
                      setShowStartDatePicker(false);
                      if (selectedValue) {
                        const selectedDate = new Date(selectedValue);
                        if (typeCounter === "r") {
                          if (endDate - selectedDate >= 0) {
                            setStartDate(selectedValue);
                            setErrorMessage(""); setErrorFields([]);
                          } else {
                            handleError("Data fim não pode ser menor que a data início", ["startDate", "endDate"]);
                          }
                        } else {
                          setStartDate(selectedValue);
                          setEndDate(new Date(new Date().setDate(selectedDate.getDate() + 1)));
                          setErrorMessage(""); setErrorFields([]);
                        }
                      }
                    }}
                  />
                )}
              </View>
              <View style={styles.dateField}>
                <Text style={styles.fieldLabel}>Data final</Text>
                <Pressable
                  style={[styles.dateInput, typeCounter === "p" && { opacity: 0.5 }, errorFields.includes('endDate') && { borderColor: '#FB2C36', borderWidth: 1 }]}
                  onPress={() => {
                    if (typeCounter === "r") setShowEndDatePicker(true);
                  }}
                  disabled={typeCounter === "p"}
                >
                  <Text style={styles.dateText}>
                    {typeCounter === "r" ? endDate.toLocaleDateString("pt-BR") : "dd/mm/aaaa"}
                  </Text>
                  <Calendar color="#555" size={18} />
                </Pressable>
                {showEndDatePicker && typeCounter === "r" && (
                  <DateTimePicker
                    value={endDate}
                    mode="date"
                    display="default"
                    onChange={(e, selectedValue) => {
                      setShowEndDatePicker(false);
                      if (selectedValue) {
                        if (new Date(selectedValue) - startDate >= 0) {
                          setEndDate(selectedValue);
                          setErrorMessage(""); setErrorFields([]);
                        } else {
                          handleError("Data fim não pode ser menor que a data início", ["endDate", "startDate"]);
                        }
                      }
                    }}
                  />
                )}
              </View>
            </View>

            <View style={styles.fieldSection}>
              <Text style={styles.fieldLabel}>Notificações</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  style={styles.pickerStyle}
                  selectedValue={notifyInterval}
                  onValueChange={(val) => setNotifyInterval(val)}
                >
                  <Picker.Item label="Nenhuma" value="n" />
                  <Picker.Item label="Diariamente" value="d" />
                  <Picker.Item label="Semanalmente" value="s" />
                  <Picker.Item label="Mensalmente" value="m" />
                  <Picker.Item label="Anualmente" value="a" />
                </Picker>
              </View>
            </View>

            <View style={styles.fieldSection}>
              <Text style={styles.fieldLabel}>Cor do tema</Text>
              <View style={styles.colorsRow}>
                {colorsOptions.map((op, index) => {
                  const selected = color.toUpperCase() === op.toUpperCase();
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.colorCircleWrapper,
                        selected && { borderColor: op, borderWidth: 2 }
                      ]}
                      onPress={() => setColor(op)}
                    >
                      <View style={[styles.colorCircle, { backgroundColor: op }]} />
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View style={styles.fieldSection}>
              <Text style={styles.fieldLabel}>Descrição (Opcional)</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Adicione notas ou detalhes sobre este contador"
                placeholderTextColor="#A0A0A0"
                multiline={true}
                numberOfLines={3}
                value={description}
                onChangeText={setDescription}
                textAlignVertical="top"
              />
            </View>

            <TouchableOpacity
              style={[styles.mainButton, { backgroundColor: color }, loading && { opacity: 0.7 }]}
              disabled={loading}
              onPress={async () => {
                if (title === "") {
                  handleError("Insira o título do contador", ["title"]);
                  return;
                }
                if (icon === "") {
                  handleError("Selecione um ícone", ["icon"]);
                  return;
                }

                try {
                  setLoading(true);
                  const formatYMD = (d) => {
                    const offset = d.getTimezoneOffset();
                    const adjustedDate = new Date(d.getTime() - offset * 60 * 1000);
                    return adjustedDate.toISOString().split("T")[0];
                  };

                  let extractedHue = 0;
                  const match = color.match(/hsl\((\d+)/);
                  if (match) {
                    extractedHue = Number.parseInt(match[1]);
                  }

                  const updateCount = {
                    title: title,
                    icon: icon,
                    type: typeCounter,
                    start_date: formatYMD(startDate),
                    hue: extractedHue,
                    description: description,
                    notify_interval: notifyInterval,
                  };

                  if (typeCounter === "r") {
                    updateCount.end_date = formatYMD(endDate);
                  }

                  await cardService.updateCard(props.id, updateCount);
                  props.setShowEditCounter(false);
                  if (props.onSuccess) props.onSuccess();
                } catch (error) {
                  handleError("Erro ao editar contador");
                  console.error(error);
                } finally {
                  setLoading(false);
                }
              }}
            >
              <Text style={styles.mainButtonText}>
                {loading ? "Salvando..." : "Salvar alterações"}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </Modal>
  );
};