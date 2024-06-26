import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Products from "../components/Products";
import { saveProducts } from "../redux_store/actions";

const Home = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const fetchAPI = () => {
    const apiURL = "https://fakestoreapi.com/products";
    setIsLoading(true);
    fetch(apiURL)
      .then((resp) => {
        if (resp.ok) {
          console.log("Response OK from server");
          return resp.json();
        } else {
          console.log(
            `Unsuccessful response from server. Status: ${resp.status}`
          );
        }
      })
      .then((data) => {
        if (data !== undefined) {
          dispatch(saveProducts(data));
          setIsLoading(false);
          console.log(`Data received from response`);
        } else {
          console.log(`No data received from response`);
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={"large"} color={"#C1666B"} />
      ) : (
        <Products navigation={navigation} />
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3E2E3",
    alignItems: "center",
    justifyContent: "center",
  },
});
