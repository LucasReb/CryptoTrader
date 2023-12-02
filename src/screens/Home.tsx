import React from "react";
import { View, Text } from "react-native";
import globalStyles from "../styles/styles";

export function Home() {
  console.log("A");

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
            marginTop: 8,
          }}
        >
          <Text style={globalStyles.h3}>Saldo na carteira</Text>
          <Text
            style={{
              marginTop: 8,
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
      </View>
    </View>
  );
}
