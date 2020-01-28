import React, { useState, useEffect } from "react";
import {
      Dimensions,
      Image,
      ImageBackground,
      StyleSheet,
      Text,
      View
} from "react-native";

// Import Assets and Colors
import Colors from "../assets/Colors";

export default function HomeScreen() {
      return (
            <View style={styles.container}>
                  <Text>Welcome Home Johnny boy!!</Text>
            </View>
      );
}

const styles = StyleSheet.create({
      container: {
            flex: 1,
            position: "relative",
            backgroundColor: Colors.white
      }
});
