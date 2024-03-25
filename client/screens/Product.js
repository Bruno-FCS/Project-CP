import { useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Product = ({ navigation, route }) => {
  const { item } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{ uri: item.image }}
            style={{ width: 125, height: 180 }}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={{ ...styles.text, color: "#aaa" }}>
          {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
        </Text>
        <Text style={styles.text}>Rating: {item.rating.rate}/5</Text>
        <Text style={{ ...styles.text, fontWeight: "bold" }}>
          ${item.price.toFixed(2)}
        </Text>
        <TouchableOpacity>
          <View style={styles.button}>
            <Text style={{ color: "#fff" }}>Add to Cart</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.text}>{item.description}</Text>
      </View>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3E2E3",
    alignItems: "center",
    justifyContent: "center",
  },
  subContainer: {
    marginVertical: 10,
    backgroundColor: "#fff",
    borderColor: "#C1666B",
    borderWidth: 2,
    borderRadius: 10,
    width: 384,
    padding: 20,
  },
  title: { fontSize: 18, textAlign: "justify" },
  text: { fontSize: 16, textAlign: "justify", marginTop: 5 },
  button: {
    padding: 5,
    borderRadius: 20,
    width: 100,
    alignItems: "center",
    marginTop: 5,
    backgroundColor: "#C1666B",
  },
});
