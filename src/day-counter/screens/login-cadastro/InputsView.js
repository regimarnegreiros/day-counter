import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  Pressable,
  Platform,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const colors = {
  mainViolet: "#ad46ff",
  white: "#ffffff",
  borderGrey: "#bfbfbf",
  labelGrey: "#444444",
  linkBlue: "#315ee9",
  errorRed: "#e53935",
  placeholderGrey: "#aaaaaa",
};

const numerics = {
  viewBorder: 32,
  inputBorder: 8,
};

const initialErrMsgs = {
  email: "",
  pass: "",
  confirmPass: "",
  name: "",
};

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function EntryScreen({ screen, onNavigate, onLogin }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [name, setName] = useState("");
  const [err, setErr] = useState(initialErrMsgs);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const isSignin = screen === "signin";

  function handleSubmit() {
    const newErr = { ...initialErrMsgs };
    let valid = true;

    if (!isSignin && name.trim() === "") {
      newErr.name = "Nome é obrigatório.";
      valid = false;
    }
    if (!validateEmail(email)) {
      newErr.email = "E-mail inválido.";
      valid = false;
    }
    if (pass.length < 6) {
      newErr.pass = "Senha deve ter ao menos 6 caracteres.";
      valid = false;
    }
    if (!isSignin && pass !== confirmPass) {
      newErr.confirmPass = "As senhas não coincidem.";
      valid = false;
    }

    setErr(newErr);
    if (valid) {
      onLogin?.();
    }
  }

  const renderInput = ({
    label,
    iconName,
    value,
    onChangeText,
    placeholder,
    inputMode,
    secureTextEntry,
    errMsg,
    rightElement,
  }) => (
    <View style={styles.inputGroup} key={label}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          errMsg ? styles.inputContainerError : null,
        ]}
      >
        <Feather
          name={iconName}
          size={16}
          color={colors.mainViolet}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholderGrey}
          inputMode={inputMode || "text"}
          secureTextEntry={secureTextEntry || false}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {rightElement || null}
      </View>
      {errMsg ? <Text style={styles.errMsg}>{errMsg}</Text> : null}
    </View>
  );

  const eyeButton = (visible, onPress) => (
    <Pressable onPress={onPress} style={styles.eyeButton}>
      <Feather
        name={visible ? "eye-off" : "eye"}
        size={16}
        color={colors.borderGrey}
      />
    </Pressable>
  );

  return (
    <View style={styles.card}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={
          isSignin ? { marginTop: "30%" } : { marginTop: "10%" }
        }
      >
        {!isSignin &&
          renderInput({
            label: "Nome",
            iconName: "user",
            value: name,
            onChangeText: setName,
            placeholder: "Nome",
            errMsg: err.name,
          })}

        {renderInput({
          label: "E-mail",
          iconName: "mail",
          value: email,
          onChangeText: setEmail,
          placeholder: "email@provedor",
          inputMode: "email",
          errMsg: err.email,
        })}

        {renderInput({
          label: "Senha",
          iconName: "lock",
          value: pass,
          onChangeText: setPass,
          placeholder: "••••••••",
          secureTextEntry: !showPass,
          errMsg: err.pass,
          rightElement: eyeButton(showPass, () => setShowPass((v) => !v)),
        })}

        {!isSignin &&
          renderInput({
            label: "Confirmar senha",
            iconName: "lock",
            value: confirmPass,
            onChangeText: setConfirmPass,
            placeholder: "••••••••",
            secureTextEntry: !showConfirmPass,
            errMsg: err.confirmPass,
            rightElement: eyeButton(showConfirmPass, () =>
              setShowConfirmPass((v) => !v),
            ),
          })}

        {isSignin && (
          <Pressable style={styles.forgotContainer}>
            <Text style={styles.forgotText}>Esqueci minha senha</Text>
          </Pressable>
        )}

        <View style={isSignin ? { marginTop: "32%" } : { marginTop: "20%" }} />

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleSubmit}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryButtonText}>
            {isSignin ? "Login" : "Cadastrar"}
          </Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Ou</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={onNavigate}
          activeOpacity={0.85}
        >
          <Text style={styles.secondaryButtonText}>
            {isSignin ? "Criar nova conta" : "Já tem conta? Entrar"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default function InputsView({ screenType, navigation, onLogin }) {
  const isSignin = screenType === "signin";

  const handleNavigate = () =>
    navigation.navigate(isSignin ? "Signup" : "Signin");

  if (screenType !== "signin" && screenType !== "signup") return <View />;

  return (
    <SafeAreaView style={styles.wrapper} edges={["bottom"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Contador de Dias</Text>
      </View>

      <View
        style={[
          styles.cardWrapper,
          isSignin ? styles.cardRoundedLeft : styles.cardRoundedRight,
        ]}
      >
        <EntryScreen
          screen={screenType}
          onNavigate={handleNavigate}
          onLogin={onLogin}
        />
      </View>

      <View
        style={[
          styles.bottomStrip,
          isSignin ? styles.bottomRoundedLeft : styles.bottomRoundedRight,
        ]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.mainViolet,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.white,
    letterSpacing: 0.5,
  },
  cardWrapper: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 12,
  },
  cardRoundedLeft: {
    borderTopLeftRadius: numerics.viewBorder,
  },
  cardRoundedRight: {
    borderTopRightRadius: numerics.viewBorder,
  },
  card: {
    flex: 1,
  },
  bottomStrip: {
    height: 48,
    backgroundColor: colors.white,
    marginTop: -40,
  },
  bottomRoundedLeft: {
    borderTopLeftRadius: numerics.viewBorder,
    backgroundColor: colors.mainViolet,
  },
  bottomRoundedRight: {
    borderTopRightRadius: numerics.viewBorder,
    backgroundColor: colors.mainViolet,
  },

  /* Input */
  inputGroup: {
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.labelGrey,
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.borderGrey,
    borderRadius: 50,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === "ios" ? 12 : 8,
    backgroundColor: colors.white,
  },
  inputContainerError: {
    borderColor: colors.errorRed,
  },
  inputIcon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: "#222",
    padding: 0,
  },
  eyeButton: {
    paddingLeft: 8,
  },
  errMsg: {
    fontSize: 11,
    color: colors.errorRed,
    marginTop: 4,
    marginLeft: 14,
  },

  /* Forgot */
  forgotContainer: {
    alignSelf: "flex-end",
    marginBottom: 20,
    marginTop: 4,
  },
  forgotText: {
    fontSize: 13,
    color: colors.linkBlue,
    textDecorationLine: "underline",
  },

  /* Buttons */
  primaryButton: {
    backgroundColor: colors.mainViolet,
    borderRadius: 50,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 20,
    shadowColor: colors.mainViolet,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  secondaryButton: {
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: colors.borderGrey,
    paddingVertical: 13,
    alignItems: "center",
    marginBottom: 16,
  },
  secondaryButtonText: {
    color: colors.labelGrey,
    fontSize: 14,
    fontWeight: "500",
  },

  /* Divider */
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.borderGrey,
  },
  dividerText: {
    marginHorizontal: 10,
    color: colors.borderGrey,
    fontSize: 13,
  },
});
