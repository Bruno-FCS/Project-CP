import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { insertIntoCart } from "../redux_store/actions";

const Product = ({ navigation, route }) => {
  const { item } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [displayNone, setDisplayNone] = useState(true);

  const vector = useRef(new Animated.Value(800)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => state.users.loggedUser);

  const showMessage = () => {
    setDisplayNone(false);
    Animated.timing(vector, {
      easing: Easing.ease,
      toValue: 200,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const dismissMessage = () => {
    Animated.timing(vector, {
      toValue: 800,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(opacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setTimeout(() => setDisplayNone(true), 500);
  };

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
    } else {
      showMessage();
    }
  };

  const goToLogin = () => {
    dismissMessage();
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          position: "absolute",
          top: vector,
          width: 350,
          height: 200,
          paddingHorizontal: 25,
          backgroundColor: "#333",
          borderColor: "#000",
          borderWidth: 1,
          borderRadius: 5,
          zIndex: 2,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Text style={{ fontSize: 18, color: "yellow", textAlign: "center" }}>
          Sorry, you need to be logged to add products to cart.
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TouchableOpacity style={styles.button} onPress={dismissMessage}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={goToLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      <Animated.View
        style={{
          display: displayNone ? "none" : "flex",
          position: "absolute",
          height: "100%",
          width: "100%",
          backgroundColor: opacity.interpolate({
            inputRange: [0, 1],
            outputRange: ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.5)"],
          }),
          zIndex: 1,
        }}
      ></Animated.View>
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
