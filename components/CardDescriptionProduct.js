import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Colors from "../assets/Colors";

export default function CardDescriptionProduct({ product }) {
      return (
            <View style={styles.card}>
                  <View style={styles.center}>
                        <Text style={styles.title}>{product.name}</Text>
                  </View>
                  <View style={styles.center}>
                        <Text style={styles.text}>
                              Ingrédients : {product.ingredient}
                        </Text>
                        <Text style={[styles.text, styles.marginBottom15]}>
                              Poids net : {product.weight}
                        </Text>
                  </View>

                  <View>
                        {product.description[0] ? (
                              <Text
                                    style={[styles.text, styles.marginBottom15]}
                              >
                                    DLUO : {product.description[0]}
                              </Text>
                        ) : (
                              <Text></Text>
                        )}
                  </View>
                  <View>
                        {product.description[1] ? (
                              <Text
                                    style={[styles.text, styles.marginBottom15]}
                              >
                                    Conservation : {product.description[1]}
                              </Text>
                        ) : (
                              <Text></Text>
                        )}
                  </View>
                  <View>
                        {product.description[2] ? (
                              <Text
                                    style={[styles.text, styles.marginBottom15]}
                              >
                                    Utilisation : {product.description[2]}
                              </Text>
                        ) : (
                              <Text></Text>
                        )}
                        {product.description[3] ? (
                              <Text
                                    style={[styles.text, styles.marginBottom15]}
                              >
                                    Conseils : {product.description[3]}
                              </Text>
                        ) : (
                              <Text></Text>
                        )}
                  </View>
            </View>
      );
}

const styles = StyleSheet.create({
      card: {
            width: 350,
            height: "auto",
            paddingHorizontal: 25,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.8,
            shadowRadius: 3,
            elevation: 1,
            backgroundColor: Colors.white
      },
      center: {
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20
      },
      title: {
            fontSize: 20,
            fontWeight: "400",
            // fontFamily: "roboto",
            color: Colors.orange
      },
      text: {
            fontSize: 15,
            // fontFamily: "roboto",
            color: Colors.blue
      },
      marginBottom15: {
            marginBottom: 15
      }
});
