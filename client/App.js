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
import { Button, Image } from "react-native";

const Stack = createNativeStackNavigator();

const App = () => {
  const LogoTitle = () => {
    return <Image style={{}} source={require("./assets/e-Shop-s.png")} />;
  };

  const headerOptions = ({ navigation, route }) => ({
    headerStyle: { backgroundColor: "#39b575" },
    headerTintColor: "white",
    headerTitleAlign: "center",
    headerTitle: () => <LogoTitle />,
    headerRight: () => {
      return (
        <Button title="Loging" onPress={() => navigation.navigate("Login")} />
      );
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
