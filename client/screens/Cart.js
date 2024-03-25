import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

const Cart = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cart page</Text>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: { fontWeight: "bold", fontSize: 20 },
});
