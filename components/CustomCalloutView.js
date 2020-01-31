import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Callout } from "react-native-maps";
import { useNavigation } from "@react-navigation/core";

import Colors from "../assets/Colors";

export default function CustomCalloutView({ producer }) {
      // get round distance
      const distance = Math.round(producer.distance);
      const navigation = useNavigation();
      return (
            <>
                  <Callout
                        style={styles.callout}
                        onPress={() => {
                              alert("On Press OK");
                              navigation.navigate("Producer", {
                                    producerId: producer._id
                              });
                        }}
                  >
                        <Image
                              style={styles.cardImg}
                              source={
                                    !producer.photos
                                          ? require("../assets/images/logo_LFM.png")
                                          : {
                                                  uri:
                                                        producer.photos[0]
                                                              .secure_url
                                            }
                              }
                        />
                        <View style={styles.callOutTextContainer}>
                              <Text style={styles.callOutText}>
                                    {producer.name}
                              </Text>
                              <Text style={styles.callOutText}>
                                    {distance} km
                              </Text>
                        </View>
                  </Callout>
            </>
      );
}

const styles = StyleSheet.create({
      callout: {
            height: 75,
            width: 250,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderWidth: 1,
            borderRadius: 5,
            borderColor: Colors.blue
      },
      cardImg: {
            width: "40%",
            height: "90%",
            borderRadius: 10,
            resizeMode: "contain"
      },
      callOutTextContainer: {
            alignItems: "center",
            justifyContent: "center"
      },
      callOutText: {
            color: Colors.blue
      }
});
