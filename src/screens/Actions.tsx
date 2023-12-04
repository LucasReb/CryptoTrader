// React components
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";

// Style
import globalStyles from "../styles/styles";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

// API
import api from "../services/apiService";

// AUTH
import { FIREBASE_AUTH } from "../hooks/useAuth";

// Storage
import AsyncStorage from "@react-native-async-storage/async-storage";
import OrderComponent from "../components/orderComponent";

export function Actions({ navigation }) {
  const [showOrders, setShowOrders] = useState(false);
  const [bitcoin, setBitcoin] = useState(null);
  const [ethereum, setEthereum] = useState(null);
  const [tether, setTether] = useState(null);
  const [loading, setLoading] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [selectedSection, setSelectedSection] = useState("carteiraScreen");

  async function getUserData(userId) {
    try {
      userDataString = null;
      while (userDataString == null) {
        var userDataString = await AsyncStorage.getItem(userId);
      }

      if (userDataString) {
        const userData = JSON.parse(userDataString);
        return userData;
      } else {
        console.warn(`Nenhum dado encontrado para o usuário com ID ${userId}`);
      }
    } catch (error) {
      console.error(
        `Erro ao recuperar os dados do usuário com ID ${userId}:`,
        error
      );
    }
  }

  async function getPrices() {
    try {
      const response = await api.get(
        "/coins/markets?vs_currency=usd&order=market_cap_desc"
      );

      // Access the response data
      const responseData = response.data;

      if (Array.isArray(responseData)) {
        const bitcoinData = responseData[0];
        const ethereumData = responseData[1];
        const tetherData = responseData[2];

        setBitcoin(bitcoinData);
        setEthereum(ethereumData);
        setTether(tetherData);

        // console.log(
        //   "First Cryptocurrency Name:",
        //   bitcoinData.price_change_percentage_24h
        // );
        // console.log(
        //   "Second Cryptocurrency Name:",
        //   ethereumData.price_change_percentage_24h
        // );
        // console.log(
        //   "Second Cryptocurrency Name:",
        //   tetherData.price_change_percentage_24h
        // );
      }
    } catch (error) {
      console.log("ERRO NO CONSUMO DE API!", error);
    }
  }

  async function atualizarSaldoCarteira(novoSaldo) {
    try {
      const usuario = FIREBASE_AUTH.currentUser;

      if (usuario) {
        const userId = usuario.uid.toString();

        // Recupera os dados do usuário existentes no AsyncStorage
        const dadosUsuarioString = await AsyncStorage.getItem(userId);

        if (dadosUsuarioString) {
          const dadosUsuario = JSON.parse(dadosUsuarioString);

          // Atualiza o saldo da carteira nos dados do usuário
          dadosUsuario.SALDO_CARTEIRA = novoSaldo;

          // Salva os dados do usuário atualizados de volta no AsyncStorage
          await AsyncStorage.setItem(userId, JSON.stringify(dadosUsuario));

          console.log("Saldo da carteira atualizado:", novoSaldo);

          // Atualiza o estado para refletir a mudança no componente
          setUserData(dadosUsuario);
        } else {
          console.warn(
            `Nenhum dado encontrado para o usuário com ID ${userId}`
          );
        }
      } else {
        console.warn("Usuário não autenticado.");
      }
    } catch (error) {
      console.error("Erro ao atualizar o saldo da carteira:", error);
    }
  }

  async function fetchData() {
    try {
      setLoading(true);

      const user = FIREBASE_AUTH.currentUser;

      if (user) {
        const userId = user.uid.toString();
        setUserId(userId);

        const userData = await getUserData(userId);

        if (userData) {
          console.log("Dados do usuário recuperados:", userData);
          setUserData(userData);
        } else {
          console.warn("Nenhum dado de usuário encontrado ou ocorreu um erro.");
        }
      } else {
        console.warn("Usuário não autenticado.");
      }
    } catch (error) {
      console.error("Erro em fetchData:", error);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      // Coloque aqui o código que você deseja executar quando a tela receber foco
      fetchData();
      getPrices();
    }, [])
  );

  const handlePress = () => {
    atualizarSaldoCarteira(24500.0);
  };

  const handleOrderButtonClick = () => {
    setShowOrders(true);
  };

  const handleCLose = () => {
    setShowOrders(false);

    fetchData();
    getPrices();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "black", paddingBottom: 0 }}>
      <View style={globalStyles.container1}>
        <View
          style={{
            backgroundColor: "#FFCC00",
            marginTop: 60,
            height: 180,
            position: "relative",
            borderRadius: 24,
          }}
        >
          <Text
            style={{
              color: "black",
              position: "absolute",
              left: 16,
              top: 22,
              fontSize: 25,
              fontFamily: "SourceSansPro_400Regular",
            }}
          >
            Saldo na carteira
          </Text>
          {userData && (
            <Text
              style={{
                color: "black",
                fontSize: 38,
                fontFamily: "SourceSansPro_400Regular",
                position: "absolute",
                right: 12,
                bottom: 12,
              }}
            >
              Total:{" "}
              {userData.SALDO_CARTEIRA.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </Text>
          )}
        </View>
        <Text
          style={{
            marginTop: 22,
            fontSize: 24,
            color: "white",
            alignItems: "center",
            fontFamily: "SourceSansPro_600SemiBold",
          }}
        >
          Transações
        </Text>

        {/* <Pressable
          style={{
            marginTop: 20,
            padding: 15,
            backgroundColor: "#FFCC00",
            borderRadius: 8,
            alignItems: "center",
          }}
          onPress={handlePress}
        >
          <Text
            style={{
              color: "black",
              fontSize: 18,
              fontFamily: "SourceSansPro_700Bold",
            }}
          >
            Alterar Saldo
          </Text>
        </Pressable> */}

        <TouchableOpacity
          onPress={handleOrderButtonClick}
          style={{
            marginTop: 20,
            padding: 15,
            backgroundColor: "#FFCC00",
            alignItems: "center",
            justifyContent: "center",
            width: 48,
            height: 48,
            borderRadius: 100,
            position: "absolute",
            right: 8,
            bottom: 16,
          }}
        >
          <AntDesign name="plus" size={18} color="black" />
        </TouchableOpacity>
        {showOrders && (
          <OrderComponent
            onClose={() => handleCLose()}
            saldoCarteira={userData.SALDO_CARTEIRA}
            bitcoin={bitcoin}
            ethereum={ethereum}
          />
        )}
      </View>
    </View>
  );
}
