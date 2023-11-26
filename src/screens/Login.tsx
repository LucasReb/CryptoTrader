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

import { signInWithEmailAndPassword } from "firebase/auth";

import globalStyles from "../styles/styles";

import Toast from "react-native-toast-message";

// Icons
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  // Methods
  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      Toast.show({
        type: "success",
        text1: "Sucesso!",
        text2: "Login realizado com sucesso!",
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Erro!",
        text2: "Credenciais inválidas!",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCadastroPress = () => {
    navigation.navigate("Register");
  };

  // View
  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.logoContainer}>
        <Image
          source={require("../assets/img/cryptoLogo.png")}
          style={globalStyles.imagem}
        />
      </View>

      <View style={globalStyles.textContainer}>
        <Text style={globalStyles.h1}>CryptoTrader</Text>
        <Text style={globalStyles.h3}>
          Crie uma conta para começar a operar
        </Text>
      </View>

      <KeyboardAvoidingView behavior="padding">
        <View style={globalStyles.formContainer}>
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

          {loading ? (
            <ActivityIndicator size="large" color="#ffff" />
          ) : (
            <>
              <Pressable style={globalStyles.mainButton} onPress={signIn}>
                <Text style={globalStyles.mainButtonText}>Login</Text>
              </Pressable>
            </>
          )}

          <View style={globalStyles.centerContainer}>
            <Text style={globalStyles.text}>
              Não possui uma conta? Realize o{" "}
            </Text>
            <TouchableOpacity onPress={handleCadastroPress}>
              <Text style={globalStyles.yellowText}>cadastro</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
