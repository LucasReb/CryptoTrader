import { View, Text, Image } from "react-native";
import globalStyles from "../styles/styles";

export function LoadingScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "black", paddingBottom: 0 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../assets/img/cryptoLogo.png")}
          style={globalStyles.imagem}
        />
      </View>
    </View>
  );
}
