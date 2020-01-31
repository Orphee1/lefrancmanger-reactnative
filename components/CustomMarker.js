import React from "react";
import { Image, StyleSheet, View } from "react-native";
import Colors from "../assets/Colors";

export default function CustomMarker() {
      return (
            <>
                  <View style={styles.container}>
                        <Image
                              style={styles.image}
                              source={require("../assets/pictogramsCustomMarkers/multi-produits.png")}
                        />
                  </View>
            </>
      );
}

const styles = StyleSheet.create({
      callout: {
            backgroundColor: "red"
      },
      container: {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Colors.blue,
            height: 35,
            width: 35,
            borderRadius: 17.5
      },
      title: {
            backgroundColor: Colors.blue,
            color: Colors.orange,
            borderStyle: "solid",
            width: 100,
            borderWidth: 1,
            fontFamily: "roboto",
            fontSize: 10,
            textAlign: "center",
            fontWeight: "400",
            borderRadius: 10,
            padding: 5
      },
      image: {
            height: 35,
            width: 35
      }
});
