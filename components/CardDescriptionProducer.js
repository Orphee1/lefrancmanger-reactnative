import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../assets/Colors";
import Schedule from "./Schedule";
import { Ionicons } from "@expo/vector-icons";

export default function CardDescriptionProducer({ producer }) {
      const [isTextExpend, setIsTextExpend] = useState(false);
      const [isScheduleExpend, setIsScheduleExpend] = useState(false);

      return (
            <TouchableOpacity
                  onPress={() => {
                        setIsTextExpend(!isTextExpend);
                  }}
            >
                  <View style={styles.card}>
                        <View style={styles.marginBottom15}>
                              <Text style={[styles.text, styles.marginBottom3]}>
                                    Email : {producer.email}
                              </Text>
                              <TouchableOpacity
                                    onPress={() => {
                                          setIsScheduleExpend(
                                                !isScheduleExpend
                                          );
                                    }}
                              >
                                    {isScheduleExpend === false ? (
                                          <Text
                                                style={[
                                                      styles.text,
                                                      styles.marginBottom3
                                                ]}
                                          >
                                                Horaire{" "}
                                                <Ionicons name="ios-arrow-down" />{" "}
                                          </Text>
                                    ) : (
                                          <Schedule producer={producer} />
                                    )}
                              </TouchableOpacity>
                              <Text style={styles.text}>
                                    Tel : {producer.phone}
                              </Text>
                              <View
                                    style={[
                                          styles.center,
                                          styles.marginBottom15
                                    ]}
                              >
                                    <Text
                                          style={styles.text}
                                          numberOfLines={
                                                isTextExpend === false
                                                      ? 10
                                                      : null
                                          }
                                    >
                                          {producer.description}
                                    </Text>
                              </View>
                        </View>
                  </View>
            </TouchableOpacity>
      );
}

const styles = StyleSheet.create({
      center: {
            alignItems: "center"
      },
      card: {
            marginHorizontal: 30,
            height: "auto",
            padding: 25,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 1,
            backgroundColor: Colors.white
      },
      text: {
            fontFamily: "roboto",
            fontSize: 15,
            color: Colors.blue
      },
      marginBottom15: {
            marginBottom: 15
      },
      marginBottom3: {
            marginBottom: 5
      }
});
