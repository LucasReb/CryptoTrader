import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";

import { FIREBASE_AUTH } from "../hooks/useAuth";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

import globalStyles from "../styles/styles";

import Toast from "react-native-toast-message";

// Icons
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export function Register({ navigation }) {
  const [name, setName] = useState("");
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
        createUserWithEmailAndPassword(auth, email, password)
          .then((res) => {
            Toast.show({
              type: "success",
              text1: "Sucesso!",
              text2: "Usuário cadastrado com sucesso!",
            });

            const user = res.user;

            updateProfile(user, {
              displayName: name,
            });
          })
          .catch((error) => {
            console.log("ERROR", error);
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
      <View style={globalStyles.logoContainer}>
        <Image
          source={require("../assets/img/cryptoLogo.png")}
          style={globalStyles.imagem}
        />
      </View>

      <View style={globalStyles.textContainer}>
        <Text style={globalStyles.h1}>Criar conta</Text>
      </View>

      <KeyboardAvoidingView behavior="padding">
        <View style={globalStyles.formContainer}>
          <Text style={globalStyles.label}>Nome *</Text>
          <View>
            <TextInput
              value={name}
              style={globalStyles.input}
              placeholderTextColor="#B9B9B9"
              placeholder="Seu nome"
              autoCapitalize="words"
              onChangeText={(text) => setName(text)}
            />
            <FontAwesome
              name="user"
              size={20}
              color="#FFFFFF"
              style={globalStyles.iconInput1}
            />
          </View>

          <Text style={globalStyles.label}>Email *</Text>
          <View>
            <TextInput
              value={email}
              style={globalStyles.input}
              placeholderTextColor="#B9B9B9"
              placeholder="Seu email"
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
            ></TextInput>

            <MaterialIcons
              name="email"
              size={20}
              color="#FFFFFF"
              style={globalStyles.iconInput1}
            />
          </View>

          <Text style={globalStyles.label}>Senha *</Text>
          <View>
            <TextInput
              value={password}
              secureTextEntry={true}
              style={globalStyles.input}
              placeholderTextColor="#B9B9B9"
              placeholder="************"
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
            ></TextInput>

            <FontAwesome
              name="lock"
              size={22}
              color="#FFFFFF"
              style={globalStyles.iconInput2}
            />
          </View>

          <Text style={globalStyles.label}>Confirme a senha *</Text>
          <View>
            <TextInput
              value={confirmPassword}
              secureTextEntry={true}
              placeholderTextColor="#B9B9B9"
              style={globalStyles.input}
              placeholder="************"
              autoCapitalize="none"
              onChangeText={(text) => setConfirmPassword(text)}
            ></TextInput>

            <FontAwesome
              name="lock"
              size={22}
              color="#FFFFFF"
              style={globalStyles.iconInput2}
            />
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#ffff" />
          ) : (
            <>
              <Pressable style={globalStyles.mainButton} onPress={signUp}>
                <Text style={globalStyles.mainButtonText}>Registrar</Text>
              </Pressable>
            </>
          )}
        </View>
      </KeyboardAvoidingView>

      <View style={globalStyles.centerContainer}>
        <Text style={globalStyles.text}>Já possui uma conta? Realize o </Text>
        <TouchableOpacity onPress={handleLoginPress}>
          <Text style={globalStyles.yellowText}>login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
