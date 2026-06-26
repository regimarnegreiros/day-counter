import { api } from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const authService = {
  async login(email, password) {
    try {
      const response = await api.post("/api/signin", { email, password });
      const { jwt_token, user } = response.data;

      if (jwt_token) {
        await AsyncStorage.setItem("@auth_token", jwt_token);
        await AsyncStorage.setItem("@user_data", JSON.stringify(user));
      }
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message;
      if (error.code === "ERR_NETWORK")
        throw { message: "Falha ao se conectar com o servidor" };
      if (typeof message === "string") {
        let isError = true;
        try {
          const messageObj = JSON.parse(message);
          if (messageObj[0] === undefined) {
            isError = false;
            throw messageObj;
          } else {
            isError = false;
            throw messageObj[0];
          }
        } catch (response) {
          if (isError) {
            throw { message: message };
          }
          throw response;
        }
      }
    }
  },

  async register(name, email, password, confirmPassword) {
    try {
      const response = await api.post("/api/signup", {
        name,
        email,
        password,
        confirmPassword,
      });
      const { jwt_token, user } = response.data;

      if (jwt_token) {
        await AsyncStorage.setItem("@auth_token", jwt_token);
        await AsyncStorage.setItem("@user_data", JSON.stringify(user));
      }
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message;
      if (error.code === "ERR_NETWORK")
        throw { message: "Falha ao se conectar com o servidor" };
      if (typeof message === "string") {
        let isError = true;
        try {
          const messageObj = JSON.parse(message);
          if (messageObj[0] === undefined) {
            isError = false;
            throw messageObj;
          } else {
            isError = false;
            throw messageObj[0];
          }
        } catch (response) {
          if (isError) {
            throw { message: message };
          }
          throw response;
        }
      }
    }
  },

  async logout() {
    await AsyncStorage.removeItem("@auth_token");
    await AsyncStorage.removeItem("@user_data");
  },

  async getUserData() {
    const data = await AsyncStorage.getItem("@user_data");
    return data ? JSON.parse(data) : null;
  },
};
