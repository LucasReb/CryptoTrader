import React, { useState } from "react";

import { View, Text, TouchableOpacity } from "react-native";
import globalStyles from "../styles/styles";

import { getFirestore, doc, getDoc } from "firebase/firestore";

import { FIREBASE_APP } from "../hooks/useAuth";

import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export function Home() {
  const [selectedSection, setSelectedSection] = useState("carteiraScreen");

  const getCarteira = async (userId) => {
    try {
      const userDocRef = doc(getFirestore(FIREBASE_APP), "users", userId);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const carteira = userDocSnap.data().carteira;
        return carteira;
      } else {
        console.error("Documento do usuário não encontrado no Firestore.");
        return null;
      }
    } catch (error) {
      console.error("Erro ao obter a variável 'carteira' do Firestore:", error);
      return null;
    }
  };

  const userId = "ID_DO_SEU_USUARIO"; // Substitua pelo ID real do usuário
  const carteira = getCarteira(userId);

  if (carteira !== null) {
    console.log("Variável 'carteira' do usuário:", carteira);
  } else {
    console.log("Erro ao obter a variável 'carteira'.");
  }

  const renderContent = () => {
    if (selectedSection === "carteiraScreen") {
      return (
        <View>
          <Text style={globalStyles.p}>Saldo na carteira</Text>
          <Text
            style={{
              color: "#FFFF",
              fontSize: 38,
              fontFamily: "SourceSansPro_700Bold",
            }}
          >
            R$20.000,00
          </Text>
          <Text
            style={{
              marginTop: 20,
              color: "#FFFF",
              fontSize: 20,
              fontFamily: "SourceSansPro_700Bold",
            }}
          >
            Trending crypto
          </Text>
        </View>
      );
    } else if (selectedSection === "investimentos") {
      return (
        <View>
          <Text style={globalStyles.p}>Valor investido</Text>
          <Text
            style={{
              color: "#FFFF",
              fontSize: 38,
              fontFamily: "SourceSansPro_700Bold",
            }}
          >
            R$20.000,00
          </Text>
          <Text
            style={{
              marginTop: 20,
              color: "#FFFF",
              fontSize: 20,
              fontFamily: "SourceSansPro_700Bold",
            }}
          >
            Trending crypto
          </Text>
        </View>
      );
    }

    // Adicione mais condições conforme necessário para outras seções

    return null;
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        paddingBottom: 0,
      }}
    >
      <View style={globalStyles.container1}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 40,
            marginTop: 55,
          }}
        >
          <Text style={globalStyles.h2}>CryptoTrader</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: 18,
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity
            style={{
              padding: 20,
              backgroundColor:
                selectedSection === "carteiraScreen" ? "#FFCC00" : "#282828",
              borderRadius: 8,
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() => setSelectedSection("carteiraScreen")}
          >
            <Entypo
              name="wallet"
              size={22}
              color={selectedSection === "carteiraScreen" ? "#282828" : "white"}
            />
            <Text
              style={{
                color: selectedSection === "carteiraScreen" ? "black" : "white",
                marginLeft: 8,
              }}
            >
              Minha carteira
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              padding: 20,
              backgroundColor:
                selectedSection === "investimentos" ? "#FFCC00" : "#282828",
              borderRadius: 8,
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() => setSelectedSection("investimentos")}
          >
            <Entypo
              name="area-graph"
              size={20}
              color={selectedSection === "investimentos" ? "#282828" : "white"}
            />
            <Text
              style={{
                color: selectedSection === "investimentos" ? "black" : "white",
                marginLeft: 8,
              }}
            >
              Meus Investimentos
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: 8,
          }}
        >
          {renderContent()}
        </View>
      </View>
    </View>
  );
}
