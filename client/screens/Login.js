import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from "react-native";

const Login = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>

        <Image style={styles.logo} source={require("../assets/placeholder.jpg")}/>

        <Text style={styles.heading}>Sign in</Text>

        <View>
          <Text style={styles.text}>
            Enter your email address:
          </Text>
            <TextInput
              style={styles.inputFields}
            />
        </View>
        <View>
          <Text>
            Enter your password:
          </Text>
          <TextInput
            style={styles.inputFields}
          
          />
        </View>
      
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          
          <View style={[styles.button, {backgroundColor:"#C1666B"}]}>
            <Text style={[{color: "#fff",}]}>Sign in</Text>
          </View>

        </TouchableOpacity>
          

        <Text style={[{marginTop: 5}]}>
          Haven't registered? Register here!
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          
          <View style={[styles.button, { backgroundColor: "#9F4146"}]}>
            <Text style={[{color: "#fff",}]}>Create an account</Text>
          </View>

        </TouchableOpacity>
          
      </View>
    </View>
  );
};

export default Login;

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
