import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { insertIntoCart } from "../redux_store/actions";

const Product = ({ navigation, route }) => {
  const { item } = route.params;
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => state.users.loggedUser);

  const handleAddToCart = () => {
    if (loggedUser.email) {
      dispatch(
        insertIntoCart({
          id: item.id,
          title: item.title,
          price: item.price,
          image: item.image,
          quantity,
        })
      );
    }
  };

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
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
        >
          <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
            <View style={{ ...styles.quantityButton, marginRight: 10 }}>
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                +
              </Text>
            </View>
          </TouchableOpacity>
          <Text
            style={{
              marginRight: 10,
            }}
          >
            {quantity}
          </Text>
          <TouchableOpacity
            onPress={() => {
              if (quantity > 1) setQuantity(quantity - 1);
            }}
          >
            <View style={styles.quantityButton}>
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                -
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleAddToCart}>
          <View style={styles.button}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              Add to Cart
            </Text>
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
  quantityButton: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: "#C1666B",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 5,
    borderRadius: 20,
    width: 100,
    alignItems: "center",
    marginTop: 5,
    backgroundColor: "#C1666B",
  },
});
