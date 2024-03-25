import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

const Register = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Register page</Text>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: { fontWeight: "bold", fontSize: 20 },
});
