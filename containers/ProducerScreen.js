import React, { useEffect, useState } from "react";
import {
      Dimensions,
      Image,
      ImageBackground,
      ScrollView,
      StyleSheet,
      Text,
      TouchableOpacity,
      View
} from "react-native";
import Constants from "expo-constants";
import { useRoute } from "@react-navigation/core";
import { useNavigation } from "@react-navigation/core";
import Axios from "axios";

import Colors from "../assets/Colors";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function ProducerScreen() {
      return (
            <View>
                  <Text style={{ marginTop: 100 }}>
                        Welcome on Producer Screen !!!
                  </Text>
            </View>
      );
}

const styles = StyleSheet.create({
      imageBackground: {
            alignItems: "center",
            width: "100%",
            height: "100%"
      },
      image: {
            height: 240
      },
      containerTitle: {
            alignItems: "center",
            marginTop: 30,
            marginBottom: 15
      },
      textTitle: {
            fontSize: 20,
            fontFamily: "roboto",
            color: Colors.orange
      },
      ScrollViewContainer: {
            flex: 1
      },
      container: {
            flex: 1,
            justifyContent: "space-between"
      },
      center: {
            alignItems: "center"
      },
      buttonWrapper: {
            marginHorizontal: 30,
            flex: 1,
            justifyContent: "flex-end"
      },
      buttonContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 30
      }
});
