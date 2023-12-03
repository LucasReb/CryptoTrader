import { View, Pressable, Text, Image } from "react-native";
import globalStyles from "../styles/styles";

import { FIREBASE_AUTH } from "../hooks/useAuth";

import { Ionicons } from "@expo/vector-icons";

import Toast from "react-native-toast-message";

export function Profile() {
  const auth = FIREBASE_AUTH;
  const user = auth.currentUser;

  function formatCreationDate(creationTime) {
    const dateObject = new Date(creationTime);
    const day = String(dateObject.getDate()).padStart(2, "0");
    const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Mês é base 0
    const year = dateObject.getFullYear();

    return `${day}/${month}/${year}`;
  }

  const handleLogout = async () => {
    try {
      FIREBASE_AUTH.signOut();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro!",
        text2: "Erro ao realizar logout:" + error,
      });
    }
  };

  const formattedCreationDate = formatCreationDate(user.metadata.creationTime);

  return (
    <>
      <View style={{ flex: 1, backgroundColor: "black", paddingBottom: 0 }}>
        <View style={globalStyles.container1}>
          <Pressable
            style={globalStyles.exitBtn}
            onPress={() => handleLogout()}
          >
            <Ionicons name="ios-exit" size={28} color="white" />
          </Pressable>
          <View style={globalStyles.centerContainer}>
            <Image
              source={require("../assets/img/profilePic.jpg")}
              style={globalStyles.profilePic}
            />
            <Image
              source={require("../assets/img/crown.png")}
              style={globalStyles.crown}
            />
          </View>
          <View style={globalStyles.profileHolder}>
            <Text style={globalStyles.profileText1}>Detalhes do perfil</Text>
            <Text style={globalStyles.profileText2}>Usuário premium</Text>
          </View>
          <View style={globalStyles.profileFormHolder}>
            <View style={globalStyles.profileFormChild}>
              <Text style={globalStyles.formText}>Email</Text>
              <Text style={globalStyles.formText1}>{user.email}</Text>
            </View>
            <View style={globalStyles.hr}></View>
            <View style={globalStyles.profileFormChild}>
              <Text style={globalStyles.formText}>Nome</Text>
              <Text style={globalStyles.formText1}>{user.displayName}</Text>
            </View>
            <View style={globalStyles.hr}></View>
            <View style={globalStyles.profileFormChild}>
              <Text style={globalStyles.formText}>Inicio</Text>
              <Text style={globalStyles.formText1}>
                {formattedCreationDate}
              </Text>
            </View>
            <View style={globalStyles.hr}></View>
          </View>
        </View>
      </View>
    </>
  );
}
