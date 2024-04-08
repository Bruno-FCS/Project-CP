import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux_store/actions";

const Login = ({ navigation }) => {
  const [icon, setIcon] = useState("eye-off");
  const [passVisibility, setPassVisibility] = useState(true);

  const dispatch = useDispatch();
  const errorMsg = useSelector((state) => state.users.errorMessage);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayError, setDisplayError] = useState(false);

  const handlePassVisibility = () => {
    if (icon == "eye-off") {
      setIcon("eye");
      setPassVisibility(!passVisibility);
    } else if (icon == "eye") {
      setIcon("eye-off");
      setPassVisibility(!passVisibility);
    }
  };

  const actionHandler = () => {
    setDisplayError(false);
    let user = { email, password };
    dispatch(login(user));

    if (errorMsg == "Default") {
      setDisplayError(false);
    } else if (errorMsg != "") {
      setDisplayError(true);
    } else {
      setDisplayError(false);
      navigation.navigate("Home");
    }
  };

  return (
    <ScrollView style={styles.scrollViewBox}>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Image
            style={[{ marginTop: 15 }]}
            source={require("../assets/blackWhiteLogo.png")}
          />

          <Text style={styles.heading}>Log in</Text>

          <View>
            <Text style={styles.text}>Enter your email address:</Text>
            <TextInput
              style={styles.inputFields}
              value={email}
              onChangeText={setEmail}
              textContentType="emailAddress"
              keyboardType="email-address"
            />
          </View>
          <View>
            <View style={[{ flexDirection: "row" }, styles.text]}>
              <Text>Enter your password:</Text>

              <Pressable
                onPress={handlePassVisibility}
                style={[{ alignSelf: "center" }]}
              >
                <MaterialCommunityIcons name={icon} size={22} color="#9F4146" />
              </Pressable>
            </View>

            <TextInput
              style={styles.inputFields}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={passVisibility}
              autoComplete="off"
              textContentType="password"
              autoCapitalize="none"
            />
          </View>

          {displayError && <Text style={styles.error}>{errorMsg}</Text>}

          <TouchableOpacity onPress={actionHandler}>
            <View style={[styles.button, { backgroundColor: "#C1666B" }]}>
              <Text style={[{ color: "#fff" }]}>Log in</Text>
            </View>
          </TouchableOpacity>

          <Text style={[{ marginTop: 5 }]}>
            Haven't registered? Register here!
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <View style={[styles.button, { backgroundColor: "#9F4146" }]}>
              <Text style={[{ color: "#fff" }]}>Create an account</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  scrollViewBox: {
    backgroundColor: "#F3E2E3",
  },
  container: {
    flex: 1,
    backgroundColor: "#F3E2E3",
    alignItems: "center",
    justifyContent: "center",
  },
  subContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#fff",
    borderColor: "#C1666B",
    borderWidth: 2,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    width: 384,
    paddingBottom: 20,
  },

  inputFields: {
    width: 250,
    height: 34,
    backgroundColor: "#F3E2E3",
    borderWidth: 2,
    borderColor: "#C1666B",
    borderRadius: 5,
    paddingLeft: 5,
  },
  button: {
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 10,
    padding: 10,
    alignItems: "center",
    width: 200,
  },
  text: {
    marginTop: 10,
    marginBottom: 5,
  },
  heading: {
    fontSize: 30,
    marginTop: 5,
    marginBottom: 5,
  },
  error: {
    color: "red",
    marginTop: 5,
    marginBottom: 5,
    fontWeight: "bold",
  },
});
