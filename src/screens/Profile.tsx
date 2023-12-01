import { View, Pressable, Text } from "react-native";
import globalStyles from "../styles/styles";

import { FIREBASE_AUTH } from "../hooks/useAuth";

export function Profile() {
  const auth = FIREBASE_AUTH;

  return (
    <>
      <View style={{ flex: 1, backgroundColor: "black", paddingBottom: 0 }}>
        <Pressable
          style={globalStyles.mainButton}
          onPress={() => auth.signOut()}
        >
          <Text style={globalStyles.mainButtonText}>Logout</Text>
        </Pressable>
      </View>
    </>
  );
}
