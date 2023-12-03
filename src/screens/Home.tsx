import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import globalStyles from "../styles/styles";

import { Entypo } from "@expo/vector-icons";

import api from "../services/apiService";

import { FontAwesome5 } from "@expo/vector-icons";
import { FIREBASE_AUTH } from "../hooks/useAuth";

import AsyncStorage from "@react-native-async-storage/async-storage";

export function Home() {
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

      console.log("userDataString", userDataString);

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

        //console.log("First Cryptocurrency Name:", bitcoinData);
        //console.log("Second Cryptocurrency Name:", ethereumData);
        //console.log("Second Cryptocurrency Name:", tetherData);
      }
    } catch (error) {
      console.log("ERRO NO CONSUMO DE API!", error);
    }
  }

  async function fetchData() {
    try {
      setLoading(true);

      const user = FIREBASE_AUTH.currentUser;

      console.log("TA LOGADOOO", user);

      if (user) {
        const userId = user.uid.toString();

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

  useEffect(() => {
    fetchData();
    getPrices();
  }, [userId]);

  const renderContent = () => {
    if (loading) {
      // Mostre um indicador de carregamento ou algum feedback enquanto os dados estão sendo recuperados
      return (
        <ActivityIndicator
          size="large"
          color="#ffffff"
          style={{ marginTop: 15 }}
        />
      );
    }

    if (selectedSection === "carteiraScreen") {
      return (
        <View>
          <Text style={globalStyles.p}>Saldo na carteira</Text>
          {userData && (
            <Text
              style={{
                color: "#FFFF",
                fontSize: 38,
                fontFamily: "SourceSansPro_700Bold",
              }}
            >
              {userData.SALDO_CARTEIRA.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          )}
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
          {/* BITCOIN */}
          {bitcoin && (
            <View style={globalStyles.cryptoBox}>
              <View
                style={{
                  alignItems: "center",
                  height: 75,
                  flexDirection: "row",
                }}
              >
                <Image
                  source={require("../assets/img/dolarIcon.png")}
                  style={{ width: 78, height: 78, marginTop: 1 }}
                />
                <View>
                  <Text style={globalStyles.cryptoBoxH3}>Bitcoin</Text>
                  <Text style={globalStyles.cryptoBoxp}>BTC</Text>
                </View>
              </View>

              <View
                style={{
                  alignItems: "center",
                  height: 75,
                  flexDirection: "row",
                }}
              >
                {bitcoin.price_change_percentage_24h < 0 ? (
                  <FontAwesome5 name="arrow-down" size={18} color="white" />
                ) : (
                  <FontAwesome5 name="arrow-up" size={18} color="white" />
                )}
                <Text
                  style={{
                    marginLeft: 25,
                    fontSize: 17,
                    fontFamily: "SourceSansPro_700Bold",
                    color:
                      bitcoin.price_change_percentage_24h < 0
                        ? "#fb3b30"
                        : "#4cd964",
                  }}
                >
                  {bitcoin.price_change_percentage_24h > 0 ? "+" : " "}
                  {bitcoin.price_change_percentage_24h.toFixed(2) + "%"}
                </Text>
              </View>
            </View>
          )}
          {/* ETHEREUM */}
          {ethereum && (
            <View style={globalStyles.cryptoBox}>
              <View
                style={{
                  alignItems: "center",
                  height: 75,
                  flexDirection: "row",
                }}
              >
                <Image
                  source={require("../assets/img/dolarIcon.png")}
                  style={{ width: 78, height: 78, marginTop: 1 }}
                />
                <View>
                  <Text style={globalStyles.cryptoBoxH3}>Ethereum</Text>
                  <Text style={globalStyles.cryptoBoxp}>ETH</Text>
                </View>
              </View>

              <View
                style={{
                  alignItems: "center",
                  height: 75,
                  flexDirection: "row",
                }}
              >
                {ethereum.price_change_percentage_24h < 0 ? (
                  <FontAwesome5 name="arrow-down" size={18} color="white" />
                ) : (
                  <FontAwesome5 name="arrow-up" size={18} color="white" />
                )}
                <Text
                  style={{
                    marginLeft: 25,
                    fontSize: 17,
                    fontFamily: "SourceSansPro_700Bold",
                    color:
                      ethereum.price_change_percentage_24h < 0
                        ? "#fb3b30"
                        : "#4cd964",
                  }}
                >
                  {ethereum.price_change_percentage_24h > 0 ? "+" : " "}
                  {ethereum.price_change_percentage_24h.toFixed(2) + "%"}
                </Text>
              </View>
            </View>
          )}

          {tether && (
            <View style={globalStyles.cryptoBox}>
              <View
                style={{
                  alignItems: "center",
                  height: 75,
                  flexDirection: "row",
                }}
              >
                <Image
                  source={require("../assets/img/dolarIcon.png")}
                  style={{ width: 78, height: 78, marginTop: 1 }}
                />
                <View>
                  <Text style={globalStyles.cryptoBoxH3}>Tether USDt</Text>
                  <Text style={globalStyles.cryptoBoxp}>USDT</Text>
                </View>
              </View>

              <View
                style={{
                  alignItems: "center",
                  height: 75,
                  flexDirection: "row",
                }}
              >
                {tether.price_change_percentage_24h < 0 ? (
                  <FontAwesome5 name="arrow-down" size={18} color="white" />
                ) : (
                  <FontAwesome5 name="arrow-up" size={18} color="white" />
                )}
                <Text
                  style={{
                    marginLeft: 25,
                    fontSize: 17,
                    fontFamily: "SourceSansPro_700Bold",
                    color:
                      tether.price_change_percentage_24h < 0
                        ? "#fb3b30"
                        : "#4cd964",
                  }}
                >
                  {tether.price_change_percentage_24h > 0 ? "+" : " "}
                  {tether.price_change_percentage_24h.toFixed(2) + "%"}
                </Text>
              </View>
            </View>
          )}
        </View>
      );
    } else if (selectedSection === "investimentos") {
      return (
        <View>
          <Text style={globalStyles.p}>Valor investido</Text>
          {userData && (
            <Text
              style={{
                color: "#FFFF",
                fontSize: 38,
                fontFamily: "SourceSansPro_700Bold",
              }}
            >
              {userData.SALDO_INVESTIMENTO.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          )}

          {userData &&
            userData.QUANTIDADE_BITCOIN > 0 &&
            userData.QUANTIDADE_ETHEREUM > 0 && (
              <Text
                style={{
                  marginTop: 20,
                  color: "#FFFF",
                  fontSize: 20,
                  fontFamily: "SourceSansPro_700Bold",
                }}
              >
                Meus ativos
              </Text>
            )}
        </View>
      );
    }

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
