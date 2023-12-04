import { View, Text, TouchableOpacity, TextInput } from "react-native";
import globalStyles from "../styles/styles";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FIREBASE_AUTH } from "../hooks/useAuth";

import Toast from "react-native-toast-message";

import { Picker } from "@react-native-picker/picker";

const OrderComponent = ({ onClose, saldoCarteira, bitcoin, ethereum }) => {
  const [selectedCurrency, setSelectedCurrency] = useState("bitcoin");
  const [orderType, setOrderType] = useState("compra");
  const [quantity, setQuantity] = useState("");
  const [userData, setUserData] = useState(null);

  async function executarOrdem(moeda, ordem, valorCompra) {
    try {
      const usuario = FIREBASE_AUTH.currentUser;
      valorCompra = parseFloat(valorCompra);

      if (usuario) {
        const userId = usuario.uid.toString();

        // Recupera os dados do usuário existentes no AsyncStorage
        const dadosUsuarioString = await AsyncStorage.getItem(userId);

        if (dadosUsuarioString) {
          const dadosUsuario = JSON.parse(dadosUsuarioString);

          let quantidadeMoedas =
            moeda === "bitcoin"
              ? dadosUsuario.QUANTIDADE_BITCOIN
              : dadosUsuario.QUANTIDADE_ETHEREUM;

          let moedaPrice =
            moeda === "bitcoin"
              ? bitcoin.current_price
              : ethereum.current_price;

          // Lógica para ordem de COMPRA
          if (ordem === "compra") {
            // Calcula a quantidade pelo valor da compra
            const quantidade = valorCompra / moedaPrice / 4.93;

            // Verifica se o saldo da carteira é suficiente para a compra
            if (dadosUsuario.SALDO_CARTEIRA >= valorCompra) {
              // Atualiza a quantidade da moeda
              quantidadeMoedas += quantidade;

              // Remove o valor da compra do saldo da carteira
              dadosUsuario.SALDO_CARTEIRA -= valorCompra;

              // Adiciona o valor da compra ao saldo de investimento
              dadosUsuario.SALDO_INVESTIMENTO += valorCompra;

              console.log("XXX", dadosUsuario);
            } else {
              Toast.show({
                type: "error",
                text1: "Erro!",
                text2: `Saldo insuficiente para realizar a compra.`,
              });
              return;
            }
          }
          // Lógica para ordem de VENDA
          if (ordem === "venda") {
            const quantidade = valorCompra * moedaPrice * 4.93;

            // Verifica se o usuário possui quantidade suficiente da moeda
            if (dadosUsuario[moeda].quantidade >= quantidade) {
              // Calcula o valor total da venda
              const valorVenda = quantidade * dadosUsuario[moeda].precoAtual;

              // Remove a quantidade vendida da moeda
              dadosUsuario[moeda].quantidade -= quantidade;

              // Adiciona o valor da venda ao saldo da carteira
              dadosUsuario.SALDO_CARTEIRA += valorVenda;

              // Remove o valor da venda do saldo de investimento
              dadosUsuario.SALDO_INVESTIMENTO -= valorVenda;
            } else {
              Toast.show({
                type: "error",
                text1: "Erro!",
                text2: `Quantidade insuficiente para realizar a venda.`,
              });
              return;
            }
          }

          // Salva os dados do usuário atualizados de volta no AsyncStorage
          await AsyncStorage.setItem(userId, JSON.stringify(dadosUsuario));

          console.log();

          Toast.show({
            type: "success",
            text1: "Sucesso!",
            text2: "Ordem executada com sucesso:!",
          });

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
      console.error("Erro ao executar a ordem:", error);
    }
  }

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
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 30,
            padding: 15,
            backgroundColor: "#FFCC00",
            borderRadius: 8,
            alignItems: "center",
            width: "100%", // Largura total
          }}
          onPress={() => executarOrdem(selectedCurrency, orderType, quantity)}
        >
          <Text
            style={{
              color: "black",
              fontSize: 18,
              fontFamily: "SourceSansPro_700Bold",
            }}
          >
            Concluir operação
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderComponent;
