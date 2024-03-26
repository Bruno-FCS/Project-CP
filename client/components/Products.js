import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";

const Products = ({ navigation }) => {
  const productsData = useSelector((state) => state.products.products);

  const renderPrizeItem = ({ item }) => (
    <View style={styles.listItem}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Product", { item })}
        style={{
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <Image
          source={{ uri: item.image }}
          style={{ width: 125, height: 180 }}
          resizeMode="contain"
        />
        <Text style={styles.text}>{item.title}</Text>
        <Text style={styles.text}>Rating: {item.rating.rate}/5</Text>
        <Text style={{ ...styles.text, fontWeight: "bold" }}>
          ${item.price.toFixed(2)}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      numColumns={2}
      style={styles.list}
      data={productsData}
      keyExtractor={(item) => {
        return item.id;
      }}
      renderItem={renderPrizeItem}
    />
  );
};

export default Products;

const styles = StyleSheet.create({
  list: {
    alignContent: "center",
    marginVertical: 10,
    backgroundColor: "#fff",
    borderColor: "#C1666B",
    borderWidth: 2,
    borderRadius: 10,
    width: 384,
  },
  listItem: {
    width: 150,
    margin: 20,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderColor: "#000",
    borderRadius: 5,
    borderWidth: 2,
  },
  text: { fontSize: 16, textAlign: "justify" },
});
