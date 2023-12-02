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
    marginBottom: 28,
  },

  exitBtn: {
    position: "absolute",
    right: 10,
    top: 36,
  },

  profileFormChild: {
    flexDirection: "row",
  },

  profileFormHolder: {
    top: 300,
    width: "100%",
    position: "absolute",
  },

  hr: {
    height: 1,
    width: "100%",
    marginTop: 22,
    marginBottom: 22,
    backgroundColor: "#282828",
  },

  profileHolder: {
    alignItems: "center",
    top: 210,
    position: "relative",
  },

  profilePic: {
    height: 102,
    width: 102,
    borderRadius: 100,
    position: "absolute",
    top: 80,
  },

  crown: {
    height: 38,
    width: 42,
    borderRadius: 100,
    position: "absolute",
    top: 150,
    right: 132,
  },

  iconInput1: {
    position: "absolute",
    right: 17,
    top: 18,
  },

  iconInput2: {
    position: "absolute",
    right: 20,
    top: 18,
  },

  textContainer: {
    alignItems: "center",
    marginBottom: 28,
  },

  formContainer: {
    marginTop: 0,
    marginBottom: 0,
  },

  profileText1: {
    color: "#FFFF",
    fontSize: 22,
    fontFamily: "SourceSansPro_700Bold",
  },
  profileText2: {
    color: "#FFFF",
    fontSize: 18,
    fontFamily: "SourceSansPro_600SemiBold",
  },

  formText: {
    color: "#FFFF",
    fontSize: 18,
    fontFamily: "SourceSansPro_600SemiBold",
  },

  formText1: {
    color: "#FFFF",
    fontSize: 18,
    fontFamily: "SourceSansPro_600SemiBold",
    marginLeft: 54,
  },

  h1: {
    color: "#FFFF",
    fontSize: 36,
    fontFamily: "SourceSansPro_700Bold",
  },
  h2: {
    color: "#FFFF",
    fontSize: 28,
    fontFamily: "SourceSansPro_700Bold",
  },
  h3: {
    color: "#FFFF",
    fontSize: 20,
    fontFamily: "SourceSansPro_600SemiBold",
    marginTop: 15,
  },
  
  p: {
    color: "#FFFF",
    fontSize: 16,
    fontFamily: "SourceSansPro_400Regular",
    marginTop: 15,
  },

  mainButtonText: {
    fontSize: 16,
    fontFamily: "SourceSansPro_600SemiBold",
  },

  imagem: {
    width: 140,
    height: 140,
  },
  yellowText: {
    color: "#FFCC00",
  },
  container: {
    marginHorizontal: 12,
    marginVertical: 90,
    flex: 1,
  },
  container1: {
    marginHorizontal: 12,
    flex: 1,
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#282828",
    color: "#B9B9B9",
    borderRadius: 100,
    paddingLeft: 15,
    marginBottom: 16,
  },

  centerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    position: "relative",
  },

  centerVerticalContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    position: "relative",
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
