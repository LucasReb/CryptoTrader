import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  text: {
    color: "white",
    fontFamily: "SourceSansPro_400Regular",
  },
  label: {
    color: "white",
    marginLeft: 8,
    fontFamily: "SourceSansPro_700Bold",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 62,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 42,
  },
  formContainer: {
    marginTop: 0,
    marginBottom: 0,
  },
  h1: {
    color: "#FFFF",
    fontSize: 36,
    fontFamily: "SourceSansPro_700Bold",
  },
  mainButtonText: {
    fontSize: 16,
    fontFamily: "SourceSansPro_600SemiBold",
  },
  h3: {
    color: "#FFFF",
    fontSize: 18,
    fontFamily: "SourceSansPro_400Regular",
    marginTop: 15,
  },
  imagem: {
    width: 140,
    height: 140,
  },
  yellowText: {
    color: "#FFCC00",
  },
  container: {
    marginHorizontal: 10,
    marginVertical: 90,
    flex: 1,
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#363636",
    color: "#B9B9B9",

    borderRadius: 100,
    paddingLeft: 15,
    marginBottom: 16,
  },
  centerContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  mainButton: {
    backgroundColor: "#FFCC00",
    height: 48,
    marginTop: 15,
    marginBottom: 25,
    borderRadius: 100,
    color: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default globalStyles;
