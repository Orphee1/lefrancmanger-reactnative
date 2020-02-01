import React from "react";
import {
      Dimensions,
      Image,
      Platform,
      StyleSheet,
      Text,
      View
} from "react-native";

import Colors from "../assets/Colors";

import ArrowButton from "./ArrowButton";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function CardProducer({ item }) {
      return (
            <View style={styles.container}>
                  <View>
                        <Image
                              style={styles.image}
                              source={{ uri: item.photos[0].secure_url }}
                        />
                  </View>
                  <View style={styles.textContainer}>
                        <View style={styles.center}>
                              <Text style={styles.textTime}>
                                    {Math.floor(item.distance)} km
                              </Text>
                        </View>
                        <View>
                              <View style={styles.center}>
                                    <Text
                                          style={styles.textProducer}
                                          numberOfLines={0}
                                    >
                                          {item.name}
                                    </Text>
                                    <Text
                                          style={styles.textProduct}
                                          numberOfLines={1}
                                    >
                                          {item.description}
                                    </Text>
                              </View>
                              <View>
                                    <ArrowButton />
                              </View>
                        </View>
                  </View>
            </View>
      );
}

const styles = StyleSheet.create({
      container: {
            flexDirection: "row",
            width: width,
            height: Platform.OS === "ios" ? height / 7.5 : height / 6.5,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.8,
            shadowRadius: 3,
            elevation: 1,
            backgroundColor: Colors.blue
      },
      image: {
            resizeMode: "cover",
            height: Platform.OS === "ios" ? height / 7.5 : height / 6.5,
            width: 200
      },
      textContainer: {
            flex: 1
      },
      center: {
            alignItems: "center"
      },
      textTime: {
            fontSize: 25,
            //   fontFamily: "roboto",
            marginVertical: 5,
            color: Colors.white
      },
      textProducer: {
            fontSize: 15,
            //   fontFamily: "roboto",
            color: Colors.white
      },
      textProduct: {
            width: 100,
            fontSize: 15,
            //   fontFamily: "roboto",
            marginBottom: 10,
            color: Colors.white
      },
      textPriceLabel: {
            fontSize: 15,
            //   fontFamily: "roboto",
            color: Colors.white
      }
});
