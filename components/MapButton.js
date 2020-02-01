import React from "react";
import { Image, Platform, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../assets/Colors";
import { Linking } from "expo";

export default function MapButton({ producer }) {
      const scheme = Platform.select({
            ios: "maps:0,0?q=",
            android: "geo:0,0?q="
      });
      const latLng = `${producer.loc.latitude},${producer.loc.longitude}`;
      const label = `${producer.name}`;
      const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
      });

      return (
            <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                        Linking.openURL(url);
                  }}
            >
                  <Image source={require("../assets/images/roadx1.png")} />
            </TouchableOpacity>
      );
}

const styles = StyleSheet.create({
      button: {
            justifyContent: "center",
            alignItems: "center",
            width: 125,
            height: 44,
            borderRadius: 22,
            backgroundColor: Colors.blue
      },
      buttonText: {
            fontSize: 15,
            // fontFamily: "roboto",
            color: Colors.white
      }
});
