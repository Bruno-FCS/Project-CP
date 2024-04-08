import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Pressable,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux_store/actions";

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [icon, setIcon] = useState("eye-off");
  const [icon2, setIcon2] = useState("eye-off");
  const [passVisibility, setPassVisibility] = useState(true);
  const [showConfirmPass, setShowConfirmPass] = useState(true);

  const [passError, setPassError] = useState(false);
  const [emptyField, setEmptyField] = useState(false);
  const [userError, setUserError] = useState(false);

  const dispatch = useDispatch();
  const errorMsg = useSelector((state) => state.users.errorMessage);

  const handlePassVisibility = () => {
    if (icon == "eye-off") {
      setIcon("eye");
      setPassVisibility(!passVisibility);
    } else if (icon == "eye") {
      setIcon("eye-off");
      setPassVisibility(!passVisibility);
    }
  };
  const handleConfirmPass = () => {
    if (icon2 == "eye-off") {
      setIcon2("eye");
      setShowConfirmPass(!showConfirmPass);
    } else if (icon2 == "eye") {
      setIcon2("eye-off");
      setShowConfirmPass(!showConfirmPass);
    }
  };

  const registerHandler = () => {
    if (name == "" || email == "" || password == "" || confirmPass == "") {
      setEmptyField(true);
      setPassError(false);
      setUserError(false);
    } else if (password != confirmPass) {
      setEmptyField(false);
      setUserError(false);
      setPassError(true);
    } else {
      setEmptyField(false);
      setPassError(false);

      let user = { name, email, password };
      dispatch(registerUser(user));

      if (errorMsg != "") {
        setUserError(true);
        setEmptyField(false);
        setPassError(false);
      } else {
        setEmptyField(false);
        setPassError(false);
        setUserError(false);
        Alert.alert("", "Successfully registered!", [
          {
            text: "Head to login",
            onPress: () => navigation.navigate("Login"),
          },
        ]);
      }
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

          <Text style={styles.heading}>Register</Text>

          <View style={styles.grouping}>
            <Text style={styles.text}>Your name:</Text>
            <TextInput
              style={styles.inputFields}
              value={name}
              onChangeText={setName}
              textContentType="name"
            />
          </View>
          <View style={styles.grouping}>
            <Text>Your email address:</Text>
            <TextInput
              style={styles.inputFields}
              keyboardType="email-address"
              value={email}
              onChangeText={(email) => setEmail(email.toLowerCase())}
              textContentType="emailAddress"
            />
          </View>

          <View style={styles.grouping}>
            <View style={[{ flexDirection: "row" }]}>
              <Text>Your password:</Text>
              <Pressable onPress={handlePassVisibility}>
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

          <View style={styles.grouping}>
            <View style={[{ flexDirection: "row" }]}>
              <Text>Confirm password:</Text>
              <Pressable onPress={handleConfirmPass}>
                <MaterialCommunityIcons
                  name={icon2}
                  size={22}
                  color="#9F4146"
                />
              </Pressable>
            </View>
            <TextInput
              style={styles.inputFields}
              autoComplete="off"
              onChangeText={setConfirmPass}
              secureTextEntry={showConfirmPass}
              textContentType="password"
              autoCapitalize="none"
            />
          </View>
          {passError && (
            <Text style={styles.error}> Passwords do not match!</Text>
          )}
          {emptyField && (
            <Text style={styles.error}> All fields must be filled!</Text>
          )}
          {userError && <Text style={styles.error}>{errorMsg}</Text>}
          <TouchableOpacity onPress={registerHandler}>
            <View style={[styles.button, { backgroundColor: "#9F4146" }]}>
              <Text style={[{ color: "#fff" }]}>Complete registration</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Register;

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
  grouping: {
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    alignItems: "center",
    width: 200,
  },

  text: {
    marginTop: 5,
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
