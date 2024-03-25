import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { store } from "./redux_store/store/index";
import Home from "./screens/Home";
import Cart from "./screens/Cart";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Product from "./screens/Product";
import { Button, Image, Text, TouchableOpacity, View } from "react-native";

const Stack = createNativeStackNavigator();

const App = () => {
  const LogoTitle = () => {
    return <Image style={{}} source={require("./assets/e-Shop-s.png")} />;
  };

  const headerOptions = ({ navigation, route }) => ({
    headerStyle: { backgroundColor: "#C1666B" },
    headerTintColor: "white",
    headerTitleAlign: "center",
    headerTitle: () => <LogoTitle />,
    headerRight: () => {
      if (route.name == "Login" || route.name == "Register") {
        return;
      } else {
        return (
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <View
              style={{
                backgroundColor: "#9F4146",
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: "#fff" }}>Login</Text>
            </View>
          </TouchableOpacity>
        );
      }
    },
  });

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator>
          <Stack.Group screenOptions={headerOptions}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Product" component={Product} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
