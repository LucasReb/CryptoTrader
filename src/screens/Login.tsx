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
      <View style={globalStyles.centerContainer}>
        <Image
          source={require("../assets/img/cryptoLogo.png")}
          style={globalStyles.imagem}
        />
      </View>

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

        {loading ? (
          <ActivityIndicator size="large" color="#ffff" />
        ) : (
          <>
            <Pressable style={globalStyles.mainButton} onPress={signIn}>
              <Text>Login</Text>
            </Pressable>
          </>
        )}

        <View style={globalStyles.centerContainer}>
          <Text style={globalStyles.text}>Não possui uma conta? </Text>
          <TouchableOpacity onPress={handleCadastroPress}>
            <Text style={globalStyles.yellowText}>
              Realize o cadastro aqui!
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
