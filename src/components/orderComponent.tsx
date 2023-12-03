import { View, Text, TouchableOpacity, TextInput } from "react-native";
import globalStyles from "../styles/styles";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";

const OrderComponent = ({ onClose, saldoCarteira }) => {
  const [selectedCurrency, setSelectedCurrency] = useState("bitcoin");
  const [orderType, setOrderType] = useState("compra");
  const [quantity, setQuantity] = useState("");

  const CurrencyPicker = ({ selectedCurrency, onValueChange }) => {
    return (
      <View
        style={{
          width: "100%",
        }}
      >
        <Text style={globalStyles.formText2}>Moeda:</Text>
        <View
          style={{
            width: "100%",
            borderRadius: 100,
            overflow: "hidden",
            marginTop: 8,
            height: 42,
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Picker
            selectedValue={selectedCurrency}
            onValueChange={onValueChange}
            style={{
              color: "#FFFF",
              backgroundColor: "#282828",
              borderRadius: 100,
            }}
            dropdownIconColor="white"
          >
            <Picker.Item label="Bitcoin" value="bitcoin" />
            <Picker.Item label="Ethereum" value="ethereum" />
          </Picker>
        </View>
      </View>
    );
  };

  const OrderTypePicker = ({ selectedOrderType, onValueChange }) => {
    return (
      <View style={{ width: "100%" }}>
        <Text style={globalStyles.formText2}>Ordem:</Text>
        <View
          style={{
            width: "100%",
            borderRadius: 100,
            overflow: "hidden",
            marginTop: 8,
            height: 42,
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Picker
            selectedValue={selectedOrderType}
            onValueChange={onValueChange}
            style={{
              color: "#FFFF",
              backgroundColor: "#282828",
              borderRadius: 100,
            }}
            dropdownIconColor="white"
          >
            <Picker.Item label="Compra" value="compra" />
            <Picker.Item label="Venda" value="venda" />
          </Picker>
        </View>
      </View>
    );
  };

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
          top: 50,
          width: 50,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          left: 10,
          borderRadius: 100,
          backgroundColor: "white",
        }}
        onPress={onClose}
      >
        <MaterialIcons name="keyboard-arrow-left" size={28} color="black" />
      </TouchableOpacity>
      <View
        style={{
          position: "absolute",
          top: 65,
          right: 10,
        }}
      >
        <View style={globalStyles.centerContainer}>
          <Text style={globalStyles.text1}>Saldo na carteira: </Text>
          <Text style={globalStyles.yellowText}>
            {saldoCarteira.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
        </View>
      </View>
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
        {/* Botão de fechar no canto superior esquerdo */}
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 50,
            width: 50,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            left: 10,
            borderRadius: 100,
            backgroundColor: "white",
          }}
          onPress={onClose}
        >
          <MaterialIcons name="keyboard-arrow-left" size={28} color="black" />
        </TouchableOpacity>
        {/* Informações de saldo na parte superior direita */}
        <View
          style={{
            position: "absolute",
            top: 65,
            right: 10,
          }}
        >
          <View style={globalStyles.centerContainer}>
            <Text style={globalStyles.text1}>Saldo na carteira: </Text>
            <Text style={globalStyles.yellowText}>
              {saldoCarteira.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          </View>
        </View>
        <View style={{ position: "absolute", top: 130, width: "100%" }}>
          {/* Seletor de moeda */}
          <CurrencyPicker
            selectedCurrency={selectedCurrency}
            onValueChange={(value) => setSelectedCurrency(value)}
          />
          {/* Seletor de tipo de ordem */}
          <OrderTypePicker
            selectedOrderType={orderType}
            onValueChange={(value) => setOrderType(value)}
          />
          {/* Entrada de quantidade */}
          <View style={{ width: "100%" }}>
            <Text style={globalStyles.formText2}>Quantidade:</Text>
            <TextInput
              style={globalStyles.input}
              keyboardType="numeric"
              value={quantity}
              placeholderTextColor="#dddddd"
              placeholder="Valor em BRL"
              autoCapitalize="none"
              onChangeText={(text) => setQuantity(text)}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default OrderComponent;
