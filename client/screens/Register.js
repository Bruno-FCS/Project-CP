import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, Pressable } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'
// import {TextInput} from 'react-native-paper'
const Register = ({ navigation }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPass, setConfirmPass] = useState("")
  const [passError, setPassError] = useState(false)
  const [icon, setIcon] = useState("eye-off");
  const [passVisibility, setPassVisibility] = useState(true);

  const handlePassVisibility = () => {
    if (icon == "eye-off"){
        setIcon("eye");
        setPassVisibility(!passVisibility);
    }else if (icon == "eye"){
        setIcon("eye-off");
        setPassVisibility(!passVisibility);
    }
  }

  const registerHandler = () => {

    navigation.navigate("Home")
  }
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>

        <Text style={styles.heading}>Register</Text>

        <View style={styles.grouping}>
          <Text style={styles.text}>
            Your name:
          </Text>
            <TextInput
              style={styles.inputFields}
              value={name}
              onChangeText={setName}
              textContentType="name"
            />
        </View>
        <View style={styles.grouping}>
          <Text>
            Your email address:
          </Text>
          <TextInput
            style={styles.inputFields}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            textContentType="emailAddress"
          />
        </View>

        <View style={styles.grouping}>
          <View style={[{flexDirection: "row"}]}>

            <Text>
              Your password:
            </Text>
            <Pressable onPress={handlePassVisibility}>
              <MaterialCommunityIcons name={icon} size={22} color="#9F4146"/>
            </Pressable>

          </View>
            <TextInput
              style={styles.inputFields}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={passVisibility}
              autoComplete="off"
              textContentType="password"
              autoCapitalize="off"
            />
          
        </View>

        <View style={styles.grouping}>
          <Text>
            Confirm password:
          </Text>
          <TextInput
            style={styles.inputFields}
          
          />
        </View>

        <TouchableOpacity onPress={registerHandler}>
          
          <View style={[styles.button, { backgroundColor: "#9F4146"}]}>
            <Text style={[{color: "#fff",}]}>Register</Text>
          </View>

        </TouchableOpacity>
      </View>
      
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
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
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    width: 384,
  },
  logo: {
    width: 210,
    height: 70
  },
  inputFields: {
    width: 250,
    height: 34,
    backgroundColor: "#F3E2E3",
    borderWidth: 2,
    borderColor: "#C1666B",
    borderRadius: 5,
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
    marginBottom: 5 
  },
  heading: {
    fontSize: 30,
  }
});
