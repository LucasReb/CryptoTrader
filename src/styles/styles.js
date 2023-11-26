import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  text: {
    color: "white",
  },
  imagem: {
    width: 50,
    height: 50,
  },
  yellowText: {
    color: "#FFCC00",
  },
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "center",
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  centerContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  mainButton: {
    backgroundColor: "#FFCC00",
    height: 30,
    color: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default globalStyles;
