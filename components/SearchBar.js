import React, { useState } from "react";
import { Dimensions, StyleSheet, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";

import Axios from "axios";

import Colors from "../assets/Colors";

// Icon import
import { Entypo } from "@expo/vector-icons";

// Get device's screen dimensions
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function SearchBar({
      region,
      setIsRegion,
      radiusCalculated,
      setRadiusCalculated
}) {
      const navigation = useNavigation();

      const [input, setInput] = useState("");

      const fetchData = async (input, region) => {
            // Parsing function to remove spaces and replace them by "%20" --> Aim: prepare the string for the location request
            const toParse = input;
            let newRegion = region;
            const toParseWithoutAccent = toParse
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "");
            const parsed = toParseWithoutAccent.split(" ").join("%20");
            console.log(parsed);

            const response = await Axios.post(
                  "https://le-franc-manger.herokuapp.com/geocoding",
                  {
                        address: parsed
                  }
            );
            newRegion = {
                  latitude: response.data.Latitude,
                  longitude: response.data.Longitude,
                  latitudeDelta: region.latitudeDelta,
                  longitudeDelta: region.longitudeDelta
            };
            console.log(response.data);
            setIsRegion(newRegion);
      };

      return (
            <View style={styles.searchBarContainer}>
                  <View style={styles.magnifyingGlassContainer}>
                        <Entypo
                              name="magnifying-glass"
                              color={Colors.orange}
                              size={height / 22}
                              onPress={event => {
                                    event.preventDefault();
                                    fetchData(input, region);
                              }}
                        />
                  </View>
                  <TextInput
                        style={styles.SearchBarText}
                        placeholder="Entrez une ville"
                        onChangeText={text => {
                              setInput(text);
                        }}
                  />
                  <TouchableOpacity
                        onPress={() => {
                              navigation.navigate("Filters", {
                                    setRadiusCalculated: setRadiusCalculated,
                                    radiusCalculated: radiusCalculated
                              });
                        }}
                  >
                        <Entypo
                              name="dots-three-vertical"
                              color={Colors.orange}
                              size={height / 22}
                        />
                  </TouchableOpacity>
            </View>
      );
}

const styles = StyleSheet.create({
      searchBarContainer: {
            flex: 1,
            position: "absolute",
            top: height / 13,
            left: width / 20,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: height / 13,
            width: width / 1.1,
            backgroundColor: Colors.white,
            borderRadius: 25,
            paddingRight: 15
      },
      magnifyingGlassContainer: {
            height: height / 13,
            width: width / 6,
            alignItems: "center",
            justifyContent: "center",
            marginRight: width / 20,
            backgroundColor: Colors.blue,
            borderBottomLeftRadius: 25,
            borderTopLeftRadius: 25
      },
      SearchBarText: {
            flex: 1,
            width: width / 1.75,
            fontSize: height / 40,
            fontFamily: "roboto",
            color: Colors.blue
      }
});
