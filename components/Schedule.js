import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../assets/Colors";

const Schedule = ({ producer }) => {
      return (
            <View>
                  <View>
                        {producer.timeSlot[0].Monday.availability ? (
                              <Text style={styles.text}>
                                    Lundi :{" "}
                                    {producer.timeSlot[0].Monday.availability}
                              </Text>
                        ) : (
                              <Text style={styles.text}>Lundi : fermé</Text>
                        )}
                  </View>
                  <View>
                        {producer.timeSlot[1].Tuesday.availability ? (
                              <Text style={styles.text}>
                                    Mardi :{" "}
                                    {producer.timeSlot[1].Tuesday.availability}
                              </Text>
                        ) : (
                              <Text style={styles.text}>Mardi : fermé</Text>
                        )}
                  </View>
                  <View>
                        {producer.timeSlot[2].Wednesday.availability ? (
                              <Text style={styles.text}>
                                    Mercredi :{" "}
                                    {
                                          producer.timeSlot[2].Wednesday
                                                .availability
                                    }
                              </Text>
                        ) : (
                              <Text style={styles.text}>Mercredi : fermé</Text>
                        )}
                  </View>
                  <View>
                        {producer.timeSlot[3].Thursday.availability ? (
                              <Text style={styles.text}>
                                    Jeudi :{" "}
                                    {producer.timeSlot[3].Thursday.availability}
                              </Text>
                        ) : (
                              <Text style={styles.text}>Jeudi : fermé</Text>
                        )}
                  </View>
                  <View>
                        {producer.timeSlot[4].Friday.availability ? (
                              <Text style={styles.text}>
                                    Vendredi :{" "}
                                    {producer.timeSlot[4].Friday.availability}
                              </Text>
                        ) : (
                              <Text style={styles.text}>Vendredi : fermé</Text>
                        )}
                  </View>
                  <View>
                        {producer.timeSlot[5].Saturday.availability ? (
                              <Text style={styles.text}>
                                    Samedi :{" "}
                                    {producer.timeSlot[5].Saturday.availability}
                              </Text>
                        ) : (
                              <Text style={styles.text}>Samedi : fermé</Text>
                        )}
                  </View>
                  <View>
                        {producer.timeSlot[6].Sunday.availability ? (
                              <Text style={[styles.text, styles.marginBottom]}>
                                    Dimanche :{" "}
                                    {producer.timeSlot[6].Sunday.availability}
                              </Text>
                        ) : (
                              <Text style={[styles.text, styles.marginBottom]}>
                                    Dimanche : fermé
                              </Text>
                        )}
                  </View>
            </View>
      );
};

const styles = StyleSheet.create({
      text: {
            fontSize: 15,
            // fontFamily: "roboto",
            color: Colors.blue
      },
      marginBottom: {
            marginBottom: 5
      }
});

export default Schedule;
