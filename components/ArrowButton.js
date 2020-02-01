import React from "react";
import { StyleSheet, View } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import Colors from "../assets/Colors";

export default function ArrowButton() {
      return (
            <View style={styles.buttonContainer}>
                  <View style={styles.button}>
                        <AntDesign name="arrowright" size={15} color="white" />
                  </View>
            </View>
      );
}

const styles = StyleSheet.create({
      buttonContainer: {
            alignItems: "center",
            justifyContent: "center"
      },
      button: {
            justifyContent: "center",
            alignItems: "center",
            width: 25,
            height: 25,
            borderRadius: 12.5,
            backgroundColor: Colors.orange
      }
});
