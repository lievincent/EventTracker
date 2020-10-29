import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Dimensions, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import FlatButton from "./Button";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";

const screenWidth = Dimensions.get("window").width;

export default class Detail extends Component {
  constructor(props) {
    super(props);
  }

  storeData = async (
    valueIdBaru,
    valueGambar,
    valueNamaEvent,
    valuePlace,
    valueEntry,
    valueMore
  ) => {
    let nama = "";
    let tambahanArray = [];
    let count = 0;
    try {
      const jsonValue = await AsyncStorage.getItem("user");
      if (jsonValue != null) {
        const tampung = JSON.parse(jsonValue);
        console.log(tampung);
        nama = tampung.namaUser;
        tambahanArray = tampung.favoriteIdArr;

        for (let i = 0; i < tambahanArray.length; i++) {
          if (tambahanArray[i].ID === valueIdBaru) {
            count += 1;
            break;
          }
        }

        if (count === 0) {
          tambahanArray.push({
            ID: valueIdBaru,
            EventName: valueNamaEvent,
            Place: valuePlace,
            Entry: valueEntry,
            ImageSRC: valueGambar,
            moreInfo: valueMore,
          });

          let newjsonObject = { namaUser: nama, favoriteIdArr: tambahanArray };
          const jsonValueSet = JSON.stringify(newjsonObject);
          await AsyncStorage.setItem("user", jsonValueSet);

          Alert.alert(
            "Event Favorite",
            "Success",
            [{ text: "OK", onPress: () => console.log(tambahanArray) }],
            { cancelable: false }
          );
        } else {
          Alert.alert(
            "Event Favorite",
            "Event is already on your favorite list",
            [{ text: "OK", onPress: () => console.log(tambahanArray) }],
            { cancelable: false }
          );
        }
      }
    } catch (e) {
      // saving error
    }
  };

  render() {
    const {
      imageParam,
      eventNameParam,
      placeParam,
      entryParam,
      moreInfoParam,
      idParam,
    } = this.props.route.params;
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />

        <ScrollView>
          <Image
            source={imageParam}
            style={{ width: screenWidth, height: 300 }}
          ></Image>

          <View style={{ backgroundColor: "white", padding: 10 }}>
            <View>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "black" }}
              >
                {eventNameParam}
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <FontAwesome name="map-marker" size={18} />
              <Text style={styles.text}>{placeParam}</Text>
            </View>
            <View
              style={{ flexDirection: "row", marginTop: 5, marginBottom: 5 }}
            >
              <FontAwesome name="dollar" size={18} />
              <Text style={styles.text}>{entryParam}</Text>
            </View>
          </View>

          <View
            style={{
              marginTop: 5,
              padding: 10,
              backgroundColor: "white",
              marginBottom: 100,
            }}
          >
            <Text
              style={{
                marginBottom: 10,
                color: "black",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              More info :
            </Text>
            <Text style={styles.text}>{moreInfoParam}</Text>
          </View>
        </ScrollView>

        <FlatButton
          text="Favorite"
          style={styles.favoriteButton}
          onPress={() => {
            this.storeData(
              idParam,
              imageParam,
              eventNameParam,
              placeParam,
              entryParam,
              moreInfoParam
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    position: "relative",
  },
  favoriteButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
    color: "black",
  },
});
