import React from "react";

// Import relative to react-native
import {
      Dimensions,
      Image,
      ImageBackground,
      StyleSheet,
      Text,
      View
} from "react-native";
import * as Animatable from "react-native-animatable";

// Import Assets and Colors
import Colors from "../assets/Colors";

// Import device dimensions
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function SplashScreen() {
      return (
            <>
                  <View style={styles.container}>
                        <ImageBackground
                              style={styles.imageBackground}
                              source={require("../assets/images/splash_background.jpg")}
                        >
                              <Animatable.View
                                    style={styles.imageBackground}
                                    animation="fadeIn"
                                    duration={3000}
                              >
                                    <Image
                                          source={require("../assets/images/logo_LFM.png")}
                                          style={styles.logo}
                                    />
                                    <Text style={styles.slogan}>
                                          Voyager, déguster, rencontrer
                                    </Text>
                              </Animatable.View>
                        </ImageBackground>
                  </View>
            </>
      );
}

const styles = StyleSheet.create({
      container: {
            flex: 1,
            height: height,
            width: width
      },
      logo: {
            alignItems: "center",
            justifyContent: "center",
            height: 200,
            width: 200
      },
      slogan: {
            color: Colors.blue,
            fontSize: 20,
            marginTop: height / 15
      },
      imageBackground: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
      }
});
