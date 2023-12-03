import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import globalStyles from "../styles/styles";

const OrderComponent = ({ onClose, saldoCarteira }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
      }}
    >
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 10,
          left: 10,
        }}
        onPress={onClose}
      >
        <Feather name="arrow-left" size={24} color={"white"} />
      </TouchableOpacity>
      <Text style={[globalStyles.p, { color: "white", fontSize: 24 }]}>
        Saldo da Carteira
      </Text>
      <Text style={[globalStyles.p, { color: "white", fontSize: 18 }]}>
        {saldoCarteira.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </Text>
    </View>
  );
};

export default OrderComponent;
