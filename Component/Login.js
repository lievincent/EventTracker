import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import FlatButton from "./Button";
import { TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";

const screenWidth = Dimensions.get("window").width;

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Name: "",
    };
  }

  storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("user", jsonValue);
    } catch (e) {
      // saving error
      console.log("storeData error");
    }
  };

  checkUser = async (param) => {
    try {
      const jsonValue = await AsyncStorage.getItem("user");
      if (jsonValue != null) {
        let parsedItem = JSON.parse(jsonValue);
        if (parsedItem.namaUser != param) {
          let value = { namaUser: param, favoriteIdArr: [] };
          this.storeData(value);
        }
      } else {
        let value = { namaUser: param, favoriteIdArr: [] };
        this.storeData(value);
      }
    } catch (e) {
      console.log("checkUser error");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <FontAwesome
              name="calendar"
              size={(screenWidth * 40) / 100}
              color="white"
              style={{ marginTop: 40 }}
            ></FontAwesome>
            <Text style={styles.headerText}>Welcome to Event Tracker!</Text>
          </View>

          <View>
            <Text style={styles.text}>Please input your Full Name :</Text>
            <TextInput
              underlineColor="transparent"
              style={{ marginHorizontal: 20, fontSize: 20 }}
              onChangeText={(Name) => this.setState({ Name })}
            ></TextInput>
          </View>
        </View>
        <FlatButton
          text="NEXT"
          style={styles.favoriteButton}
          onPress={() => {
            this.checkUser(this.state.Name);
            this.props.navigation.navigate("Home", {
              nameParam: this.state.Name,
            });
          }}
        ></FlatButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  favoriteButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  header: {
    backgroundColor: "black",
    justifyContent: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 18,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
    fontWeight: "bold",
  },
  text: {
    color: "black",
    fontSize: 18,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
    fontWeight: "bold",
  },
});
