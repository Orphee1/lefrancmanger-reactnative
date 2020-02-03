import React, { useEffect, useState } from "react";
import {
      Dimensions,
      Image,
      ImageBackground,
      ScrollView,
      StyleSheet,
      Text,
      TouchableOpacity,
      View
} from "react-native";
import Constants from "expo-constants";
import { useRoute } from "@react-navigation/core";
import { useNavigation } from "@react-navigation/core";
import Axios from "axios";

import Colors from "../assets/Colors";

// Get device's screen dimensions
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const scrollViewHeight = height - Constants.statusBarHeight - 45;

// import Loader from "../assets/ProductLoader";

// Compos import
import CardDescriptionProducer from "../components/CardDescriptionProducer";
import GoToProduct from "../components/GoToProduct";
import MapButton from "../components/MapButton";

export default function ProducerScreen() {
      const [isLoading, setIsLoading] = useState(true);
      const [producer, setProducer] = useState();

      // const route = useRoute();
      // const producerId = route.params.producerId;
      const { params } = useRoute();
      const producerId = params.producerId;
      const navigation = useNavigation();

      const fetchData = async () => {
            try {
                  const response = await Axios.post(
                        "https://le-franc-manger.herokuapp.com/producer?id=" +
                              // producerId
                              params.producerId
                  );

                  console.log(response.data);
                  setProducer(response.data);
                  setTimeout(() => {
                        setIsLoading(false);
                  }, 500);
            } catch (error) {
                  alert(error.message);
                  console.log(error);
            }
      };

      useEffect(() => {
            fetchData();
      }, []);

      return (
            <>
                  {isLoading === true ? (
                        // <Loader />
                        <Text>Chargement en cours ...</Text>
                  ) : (
                        <ImageBackground
                              source={require("../assets/images/pattern_orange.png")}
                              style={styles.imageBackground}
                        >
                              <View style={styles.scrollViewContainer}>
                                    <ScrollView
                                          contentContainerStyle={{
                                                minHeight: scrollViewHeight
                                          }}
                                    >
                                          <Image
                                                style={[
                                                      styles.image,
                                                      { width: width }
                                                ]}
                                                source={
                                                      !producer.photos
                                                            ? require("../assets/images/logo_LFM.png")
                                                            : {
                                                                    uri:
                                                                          producer
                                                                                .photos[0]
                                                                                .secure_url
                                                              }
                                                }
                                          />
                                          <View style={styles.containerTitle}>
                                                <Text style={styles.textTitle}>
                                                      {producer.name}
                                                </Text>
                                                <Text style={styles.textTitle}>
                                                      {producer.address.city}
                                                </Text>
                                          </View>
                                          <View>
                                                <View>
                                                      <CardDescriptionProducer
                                                            producer={producer}
                                                      />
                                                </View>
                                                <View
                                                      style={
                                                            styles.buttonWrapper
                                                      }
                                                >
                                                      <View
                                                            style={
                                                                  styles.buttonContainer
                                                            }
                                                      >
                                                            <MapButton
                                                                  producer={
                                                                        producer
                                                                  }
                                                            />
                                                            <TouchableOpacity
                                                                  onPress={() => {
                                                                        navigation.navigate(
                                                                              "Product",
                                                                              {
                                                                                    products:
                                                                                          producer.products
                                                                              }
                                                                        );
                                                                  }}
                                                            >
                                                                  <GoToProduct />
                                                            </TouchableOpacity>
                                                      </View>
                                                </View>
                                          </View>
                                    </ScrollView>
                              </View>
                        </ImageBackground>
                  )}
            </>
      );
}

const styles = StyleSheet.create({
      imageBackground: {
            alignItems: "center",
            width: "100%",
            height: "100%"
      },
      image: {
            height: 240
      },
      containerTitle: {
            alignItems: "center",
            marginTop: 30,
            marginBottom: 15
      },
      textTitle: {
            fontSize: 20,
            // fontFamily: "roboto",
            color: Colors.orange
      },
      ScrollViewContainer: {
            flex: 1
      },
      container: {
            flex: 1,
            justifyContent: "space-between"
      },
      center: {
            alignItems: "center"
      },
      buttonWrapper: {
            marginHorizontal: 30,
            flex: 1,
            justifyContent: "flex-end"
      },
      buttonContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 30
      }
});
