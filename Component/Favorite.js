import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Button, Card } from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default class Favorite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nama: "",
      dataFavorite: [],
    };
  }

  async componentDidMount() {
    try {
      const jsonValue = await AsyncStorage.getItem("user");
      if (jsonValue != null) {
        const tampung = JSON.parse(jsonValue);
        this.setState({
          dataFavorite: tampung.favoriteIdArr,
          nama: tampung.namaUser,
        });
        console.log(this.state.dataFavorite);
        console.log(this.state.nama);
      }
    } catch (e) {
      // error reading value
    }
  }

  storeDataAndDelete = async (idList) => {
    let newArr = [];
    console.log(idList);
    try {
      const jsonValue = await AsyncStorage.getItem("user");
      if (jsonValue != null) {
        const tampung = JSON.parse(jsonValue);
        console.log(tampung);
        newArr = tampung.favoriteIdArr;
        const newObject = {
          namaUser: tampung.namaUser,
          favoriteIdArr: newArr.filter(function (arr) {
            return arr.ID != idList;
          }),
        };
        const jsonStoreValue = JSON.stringify(newObject);
        await AsyncStorage.setItem("user", jsonStoreValue);

        this.setState({
          dataFavorite: newArr.filter(function (arr) {
            return arr.ID != idList;
          }),
        });
      }
    } catch (error) {}
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.viewList}>
          <FlatList
            data={this.state.dataFavorite}
            renderItem={({ item }) => (
              <Card style={styles.dataCard}>
                <View style={{ flexDirection: "row" }}>
                  <View>
                    <Image source={item.ImageSRC} style={styles.thumbnail} />
                  </View>
                  <View>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      {item.EventName}
                    </Text>
                    <View style={{ flexDirection: "row", marginTop: 5 }}>
                      <FontAwesome name="map-marker" size={18} />
                      <Text style={{ fontSize: 16, marginLeft: 10 }}>
                        {item.Place}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 5,
                        marginBottom: 5,
                      }}
                    >
                      <FontAwesome name="dollar" size={18} />
                      <Text style={{ fontSize: 16, marginLeft: 10 }}>
                        {item.Entry}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <Button
                    onPress={() =>
                      this.props.navigation.navigate("Detail", {
                        imageParam: item.ImageSRC,
                        eventNameParam: item.EventName,
                        placeParam: item.Place,
                        entryParam: item.Entry,
                        moreInfoParam: item.moreInfo,
                        idParam: item.ID,
                      })
                    }
                  >
                    Show Detail
                  </Button>
                  <Button
                    onPress={() => {
                      this.storeDataAndDelete(item.ID);
                    }}
                  >
                    Remove Favorite
                  </Button>
                </View>
              </Card>
            )}
            keyExtractor={(item) => item.ID}
          />
        </View>
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
  viewList: {
    flex: 1,
    marginBottom: 5,
  },
  dataCard: {
    marginHorizontal: 10,
    marginVertical: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "white",
  },
  thumbnail: {
    width: 70,
    height: 70,
    marginRight: 20,
    borderRadius: 10,
  },
});
