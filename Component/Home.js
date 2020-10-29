import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Card } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      EventList: [
        {
          ID: "1",
          EventName: "Metallica Concert",
          Place: "Palace Grounds",
          Entry: "Paid Entry",
          ImageSRC: require("../assets/images/1.jpg"),
          moreInfo:
            "The WorldWired Tour is a concert tour by American heavy metal band Metallica in support of their tenth studio album Hardwired... to Self-Destruct, which was released on November 18, 2016. It is also their first worldwide tour after the World Magnetic Tour six years earlier.",
        },
        {
          ID: "2",
          EventName: "Saree Exhibition",
          Place: "Malleswaram Grounds",
          Entry: "Free Entry",
          ImageSRC: require("../assets/images/2.jpg"),
          moreInfo:
            "The exhibition that ran from March 31 to April 6 featured sarees presented on sculptural wooden frames in the gallery’s spacious interiors. At the show, the sarees were made to fall from the walls or across curved frames to give a sense of movement of the fabric when worn.",
        },
        {
          ID: "3",
          EventName: "Wine tasting",
          Place: "Links Brewery",
          Entry: "Paid Entry",
          ImageSRC: require("../assets/images/3.jpg"),
          moreInfo: "No more info",
        },
        {
          ID: "4",
          EventName: "Startups Meet",
          Place: "Kanteerava Indoor",
          Entry: "Paid Entry",
          ImageSRC: require("../assets/images/4.png"),
          moreInfo: "No more info",
        },
        {
          ID: "5",
          EventName: "Summer Noon Party",
          Place: "Kumara Park",
          Entry: "Paid Entry",
          ImageSRC: require("../assets/images/5.jpg"),
          moreInfo: "No more info",
        },
        {
          ID: "6",
          EventName: "Rock and Roll nights",
          Place: "Sarjapur Road",
          Entry: "Paid Entry",
          ImageSRC: require("../assets/images/6.jpg"),
          moreInfo: "No more info",
        },
        {
          ID: "7",
          EventName: "Barbecue Fridays",
          Place: "Whitefield",
          Entry: "Paid Entry",
          ImageSRC: require("../assets/images/7.jpg"),
          moreInfo: "No more info",
        },
        {
          ID: "8",
          EventName: "Summer workshop",
          Place: "Indiranagar",
          Entry: "Free Entry",
          ImageSRC: require("../assets/images/8.jpg"),
          moreInfo: "No more info",
        },
        {
          ID: "9",
          EventName: "Impressions & Expressions",
          Place: "MG Road",
          Entry: "Free Entry",
          ImageSRC: require("../assets/images/9.jpg"),
          moreInfo: "No more info",
        },
        {
          ID: "10",
          EventName: "Italian carnival",
          Place: "Electronic City",
          Entry: "Free Entry",
          ImageSRC: require("../assets/images/10.jpg"),
          moreInfo: "No more info",
        },
      ],
      viewType: "th-list",
      showList: true,
      sortType: "not",
    };
  }

  toogleViewType() {
    this.setState({
      showList: !this.state.showList,
    });
  }

  sortFunction(type) {
    switch (type) {
      case "asc":
        this.state.EventList.sort(
          (a, b) => a.EventName.toLowerCase() > b.EventName.toLowerCase()
        );
        break;

      case "desc":
        this.state.EventList.sort(
          (a, b) => a.EventName.toLowerCase() < b.EventName.toLowerCase()
        );
        break;

      case "not":
        this.state.EventList.sort((a, b) => a.ID - b.ID);
        break;
    }
  }

  render() {
    const { nameParam } = this.props.route.params;
    return (
      <View style={styles.container}>
        <StatusBar style="light" />

        <View style={styles.header}>
          <Text style={styles.headerText}>Event Tracker</Text>
          <Text style={styles.headerNameText}>Hi, {nameParam}</Text>
          <View style={{ flexDirection: "row-reverse" }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Favorite");
              }}
            >
              <FontAwesome
                name="heart"
                size={(screenHeight * 3) / 100}
                style={{ color: "white", marginBottom: 20, marginRight: 10 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flexDirection: "row-reverse" }}>
          <TouchableOpacity
            onPress={() => {
              let { viewType } = this.state;
              viewType = viewType === "th-list" ? "th-large" : "th-list";
              this.setState({ viewType: viewType });
              this.toogleViewType();
            }}
          >
            <FontAwesome
              name={this.state.viewType}
              size={(screenHeight * 3) / 100}
              style={styles.icon}
            />
          </TouchableOpacity>

          <Picker
            selectedValue={this.state.sortType}
            style={{ height: 50, width: 200, color: "black" }}
            onValueChange={(itemValue) =>
              this.setState(
                { sortType: itemValue },
                this.sortFunction(itemValue)
              )
            }
          >
            <Picker.Item label="Not Sorted" value="not" />
            <Picker.Item label="Sort By Ascending" value="asc" />
            <Picker.Item label="Sort By Descending" value="desc" />
          </Picker>
        </View>

        <View style={styles.viewList}>
          {/* listview */}
          {this.state.showList && (
            <FlatList
              data={this.state.EventList}
              renderItem={({ item }) => (
                <Card
                  style={styles.dataCard}
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
                </Card>
              )}
              keyExtractor={(item) => item.ID}
            />
          )}

          {/* gridview */}
          {!this.state.showList && (
            <FlatList
              data={this.state.EventList}
              numColumns="2"
              renderItem={({ item }) => (
                <Card
                  style={styles.dataCardGrid}
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
                  <View>
                    <Image
                      source={item.ImageSRC}
                      style={styles.thumbnailGrid}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        textAlign: "center",
                        marginTop: 10,
                      }}
                    >
                      {item.EventName}
                    </Text>
                  </View>
                </Card>
              )}
              keyExtractor={(item) => item.ID}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  header: {
    backgroundColor: "black",
    justifyContent: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  headerText: {
    color: "white",
    fontSize: 18,
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    fontWeight: "bold",
  },
  headerNameText: {
    color: "white",
    fontSize: 18,
    paddingLeft: 20,
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
  icon: {
    color: "black",
    marginBottom: 5,
    marginTop: 10,
    marginRight: 10,
  },
  thumbnail: {
    width: 70,
    height: 70,
    marginRight: 20,
    borderRadius: 10,
  },
  dataCardGrid: {
    borderRadius: 10,
    backgroundColor: "white",
    width: screenWidth / 2 - 20,
    paddingBottom: 10,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  thumbnailGrid: {
    width: screenWidth / 2 - 20,
    height: 100,
    borderRadius: 5,
  },
});
