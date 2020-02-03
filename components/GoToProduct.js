import React from "react";
import { Image, StyleSheet, View } from "react-native";
import Colors from "../assets/Colors";

export default function GoToProduc() {
      return (
            <View style={styles.button}>
                  <Image
                        style={styles.image}
                        source={require("../assets/images/sarahpanier.gif")}
                  />
            </View>
      );
}

const styles = StyleSheet.create({
      button: {
            justifyContent: "center",
            alignItems: "center",
            width: 125,
            height: 44,
            borderRadius: 22,
            backgroundColor: Colors.orange
      },
      buttonText: {
            fontSize: 15,
            // fontFamily: "roboto",
            color: Colors.white
      },
      image: {
            width: 55,
            height: 55,
            left: 5
      }
});
