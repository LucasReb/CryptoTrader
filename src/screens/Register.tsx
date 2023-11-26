import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";

import { FIREBASE_AUTH } from "../hooks/useAuth";

import { createUserWithEmailAndPassword } from "firebase/auth";

import globalStyles from "../styles/styles";

import Toast from "react-native-toast-message";

export function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const validateEmail = (email) => {
    // Verifica se o e-mail tem pelo menos um @
    if (email.indexOf("@") === -1) {
      return false;
    }

    // Verifica se o e-mail tem pelo menos um ponto depois do @
    if (email.split("@")[1].indexOf(".") === -1) {
      return false;
    }

    // Se todas as verificações passarem, consideramos o e-mail válido
    return true;
  };

  const signUp = async () => {
    setLoading(true);

    try {
      if (password == confirmPassword && validateEmail(email)) {
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        Toast.show({
          type: "success",
          text1: "Sucesso!",
          text2: "Usuário cadastrado com sucesso!",
        });
      } else {
        if (!validateEmail(email)) {
          Toast.show({
            type: "error",
            text1: "Erro!",
            text2: "Email inserido é inválido!",
          });
        } else {
          if (password != confirmPassword) {
            Toast.show({
              type: "error",
              text1: "Erro!",
              text2: "As senhas não coincidem!",
            });
          }
        }
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Erro!",
        text2: "Falha no cadastro" + error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLoginPress = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={globalStyles.container}>
      <KeyboardAvoidingView behavior="padding">
        <Text style={globalStyles.text}>Email *</Text>
        <TextInput
          value={email}
          style={globalStyles.input}
          placeholder="Seu email"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        ></TextInput>

        <Text style={globalStyles.text}>Senha *</Text>
        <TextInput
          value={password}
          secureTextEntry={true}
          style={globalStyles.input}
          placeholder="************"
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
        ></TextInput>

        <Text style={globalStyles.text}>Confirme a senha *</Text>
        <TextInput
          value={confirmPassword}
          secureTextEntry={true}
          style={globalStyles.input}
          placeholder="************"
          autoCapitalize="none"
          onChangeText={(text) => setConfirmPassword(text)}
        ></TextInput>

        {loading ? (
          <ActivityIndicator size="large" color="#ffff" />
        ) : (
          <>
            <Button title="Registrar" onPress={signUp} />
          </>
        )}
      </KeyboardAvoidingView>

      <View style={globalStyles.centerContainer}>
        <Text style={globalStyles.text}>Já possui uma conta? </Text>
        <TouchableOpacity onPress={handleLoginPress}>
          <Text style={globalStyles.yellowText}>Realize o login aqui!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
