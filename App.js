// Import React and others modules
import React, { useState, useEffect } from "react";
import { NavigationNativeContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "react-native";
import Axios from "axios";

// Import routes
import HomeScreen from "./containers/HomeScreen";
import ProducerScreen from "./containers/ProducerScreen";
import ProductScreen from "./containers/ProductScreen";
import SplashScreen from "./containers/SplashScreen";

import { Colors } from "react-native/Libraries/NewAppScreen";

const Stack = createStackNavigator();

export default function App() {
      const [isLoading, setIsLoading] = useState(true);
      const [producers, setProducers] = useState();

      useEffect(() => {
            const fetchData = async () => {
                  try {
                        const response = await Axios.get(
                              "https://le-franc-manger.herokuapp.com/producers"
                        );
                        setProducers(response.data);
                        // await Font.loadAsync({
                        //       roboto: require("./assets/fonts/Roboto-Regular.ttf")
                        // });
                        setTimeout(() => {
                              setIsLoading(false);
                        }, 1500);
                  } catch (error) {
                        console.log(error.message);
                  }
            };
            fetchData();
      }, []);

      return (
            <>
                  {isLoading === true ? (
                        <SplashScreen />
                  ) : (
                        <>
                              <NavigationNativeContainer>
                                    <StatusBar backgroundColor={Colors.blue} />
                                    <Stack.Navigator
                                          screenOptions={{
                                                headerStyle: {
                                                      backgroundColor:
                                                            Colors.blue
                                                },
                                                headerTitleStyle: {
                                                      color: Colors.orange
                                                }
                                          }}
                                    >
                                          <Stack.Screen
                                                name="Home"
                                                options={{
                                                      title: "Le Franc Manger",
                                                      header: () => null
                                                }}
                                          >
                                                {() => (
                                                      <HomeScreen
                                                            producers={
                                                                  producers
                                                            }
                                                      />
                                                )}
                                          </Stack.Screen>
                                          <Stack.Screen
                                                name="Producer"
                                                options={{
                                                      title: "Producteurs"
                                                }}
                                          >
                                                {() => <ProducerScreen />}
                                          </Stack.Screen>
                                          <Stack.Screen
                                                name="Product"
                                                options={{ title: "Produits" }}
                                          >
                                                {() => <ProductScreen />}
                                          </Stack.Screen>
                                    </Stack.Navigator>
                              </NavigationNativeContainer>
                        </>
                  )}
            </>
      );
}
