// Routes
import { Routes } from "./src/routes/router";

// Toasts
import Toast from "react-native-toast-message";

// Fonts
import {
  useFonts,
  SourceSansPro_900Black,
  SourceSansPro_400Regular,
  SourceSansPro_600SemiBold,
  SourceSansPro_700Bold,
} from "@expo-google-fonts/source-sans-pro";

export default function App() {
  const [fontLoaded] = useFonts({
    SourceSansPro_400Regular,
    SourceSansPro_600SemiBold,
    SourceSansPro_700Bold,
    SourceSansPro_900Black,
  });

  if (!fontLoaded) {
    return null;
  }

  return (
    <>
      <Routes />
      <Toast />
    </>
  );
}
