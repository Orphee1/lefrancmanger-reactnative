import React, { useState } from "react";
import { useRoute } from "@react-navigation/core";
import {
      Dimensions,
      Image,
      ImageBackground,
      StyleSheet,
      View
} from "react-native";
import Swiper from "react-native-swiper";

import Colors from "../assets/Colors";

// Compos import
import CardDescriptionProduct from "../components/CardDescriptionProduct";

// Get device's screen dimensions
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function ProductScreen() {
      const { params } = useRoute();

      return (
            <Swiper 
            
            dotColor={Colors.blue} 
            activeDot={
                  <View style={{backgroundColor: Colors.orange, width: 12, height: 12, borderRadius: 6, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />

            }	
            horizontal={true}
            showsPagination={true}
            // autoplay={true}
            >
                  {params.products.map((product, index) => {
                        return (
                              <ImageBackground
                                    key={index}
                                    style={styles.imageBackground}
                                    source={require("../assets/images/pattern_orange.png")}
                              >
                                    <View>
                                          <Image
                                                style={[
                                                      styles.image,
                                                      { width: width }
                                                ]}
                                                source={{
                                                      uri:
                                                            product.photos[0]
                                                                  .secure_url
                                                }}
                                          />
                                    </View>
                                    <View style={styles.cardContainer}>
                                          <CardDescriptionProduct
                                                product={product}
                                          />
                                    </View>
                              </ImageBackground>
                        );
                  })}
            </Swiper>
      );
}

const styles = StyleSheet.create({
      image: {
            height: 240
      },
      imageBackground: {
            flex: 1,
            height: height,
            position: "relative",
            backgroundColor: Colors.white
      },
      cardContainer: {
            flex: 1,
            position: "absolute",
            top: 225,
            left: 30
      }
});
