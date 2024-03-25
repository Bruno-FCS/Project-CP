import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

const Login = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login page</Text>
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: { fontWeight: "bold", fontSize: 20 },
});
