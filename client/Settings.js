import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Cart from "./screens/Cart";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Product from "./screens/Product";
import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./redux_store/actions";

const Stack = createNativeStackNavigator();

const Settings = ( {navigation} ) => {
  const loggedUser = useSelector((state) => state.users.loggedUser);
  const dispatch = useDispatch()

  const handleLogOut = () => {
    dispatch(logout())
    // navigation.navigate("Login")
  }
  
  const LogoTitle = () => {
    return <Image style={[{marginRight: 10}, {marginBottom: 5}]} source={require("./assets/quickShopLogo.png")} />;
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
          <>
            {loggedUser.email && (
              <View style={[{flexDirection: "row"}]}>
                <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                  <View
                    style={{
                      backgroundColor: "#9F4146",
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      borderRadius: 5,
                    }}
                  >
                    <Text style={{ color: "#fff" }}>Cart</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <View
                    style={{
                      backgroundColor: "#9F4146",
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      borderRadius: 5,
                      marginLeft: 5,
                    }}
                  >
                    <Text style={{ color: "#fff" }}>Log out</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            {!loggedUser.email && (
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
            )}
          </>
        );
      }
    },
  });

  return (
    <NavigationContainer>
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
  );
};

export default Settings;