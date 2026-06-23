import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../contexts/AuthContext";
import { AuthInput, EyeButton } from "../../components/AuthInput";
import { validarEmail } from "../../utils/validarEmail";

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

function EntryScreen({ screen, onNavigate }) {
  const { login, register } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [name, setName] = useState("");
  const [err, setErr] = useState(initialErrMsgs);
  const [globalErr, setGlobalErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const isSignin = screen === "signin";

  async function handleSubmit() {
    const newErr = { ...initialErrMsgs };
    let valid = true;
    setGlobalErr("");

    if (!isSignin && name.trim() === "") {
      newErr.name = "Nome é obrigatório.";
      valid = false;
    }
    if (!validarEmail(email)) {
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
      setLoading(true);
      try {
        if (isSignin) {
          await login(email, pass);
        } else {
          await register(name, email, pass, confirmPass);
        }
      } catch (error) {
        setGlobalErr(error.message || "Erro na autenticação.");
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        {!isSignin && (
          <AuthInput
            label="Nome"
            iconName="user"
            value={name}
            onChangeText={setName}
            placeholder="Nome"
            errMsg={err.name}
          />
        )}

        <AuthInput
          label="E-mail"
          iconName="mail"
          value={email}
          onChangeText={setEmail}
          placeholder="email@provedor"
          inputMode="email"
          errMsg={err.email}
        />

        <AuthInput
          label="Senha"
          iconName="lock"
          value={pass}
          onChangeText={setPass}
          placeholder="••••••••"
          secureTextEntry={!showPass}
          errMsg={err.pass}
          rightElement={
            <EyeButton
              visible={showPass}
              onPress={() => setShowPass((v) => !v)}
            />
          }
        />

        {!isSignin && (
          <AuthInput
            label="Confirmar senha"
            iconName="lock"
            value={confirmPass}
            onChangeText={setConfirmPass}
            placeholder="••••••••"
            secureTextEntry={!showConfirmPass}
            errMsg={err.confirmPass}
            rightElement={
              <EyeButton
                visible={showConfirmPass}
                onPress={() => setShowConfirmPass((v) => !v)}
              />
            }
          />
        )}
        {globalErr ? (
          <Text
            style={[
              styles.errMsg,
              { marginLeft: 0, alignSelf: "center", marginBottom: 10 },
            ]}
          >
            {globalErr}
          </Text>
        ) : null}

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleSubmit}
          activeOpacity={0.85}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.primaryButtonText}>
              {isSignin ? "Login" : "Cadastrar"}
            </Text>
          )}
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
      </View>
    </View>
  );
}

export default function AuthScreen({ screenType, navigation }) {
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
        <EntryScreen screen={screenType} onNavigate={handleNavigate} />
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
  cardContent: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 48,
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
  errMsg: {
    fontSize: 11,
    color: colors.errorRed,
    marginTop: 4,
    marginLeft: 14,
  },
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
