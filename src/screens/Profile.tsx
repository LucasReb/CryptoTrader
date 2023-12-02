import { View, Pressable, Text } from "react-native";
import globalStyles from "../styles/styles";

import { FIREBASE_AUTH } from "../hooks/useAuth";

import { Ionicons } from "@expo/vector-icons";

export function Profile() {
  const auth = FIREBASE_AUTH;
  const user = auth.currentUser;

  if (user) {
    console.log("Usuário logado", user);
  } else {
    console.log("Usuário não logado");
  }

  function formatCreationDate(creationTime) {
    const dateObject = new Date(creationTime);
    const day = String(dateObject.getDate()).padStart(2, "0");
    const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Mês é base 0
    const year = dateObject.getFullYear();

    return `${day}/${month}/${year}`;
  }

  const formattedCreationDate = formatCreationDate(user.metadata.creationTime);

  return (
    <>
      <View style={{ flex: 1, backgroundColor: "black", paddingBottom: 0 }}>
        <Text>
          Bem-vindo, {user && user.displayName}! {formattedCreationDate}
        </Text>

        <Pressable style={globalStyles.exitBtn} onPress={() => auth.signOut()}>
          <Ionicons name="exit-outline" size={24} color="white" />
        </Pressable>
      </View>
    </>
  );
}
