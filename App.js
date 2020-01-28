// Import React and others modules
import React, { useState, useEffect } from "react";
import { NavigationNativeContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "react-native";

// Import routes
import HomeScreen from "./containers/HomeScreen";
import SplashScreen from "./containers/SplashScreen";

const Stack = createStackNavigator();

export default function App() {
      const [isloading, setIsloading] = useState(true);
      return (
            <>
                  {isloading === true ? (
                        <SplashScreen />
                  ) : (
                        <>
                              <NavigationNativeContainer>
                                    <Stack.Navigator>
                                          <Stack.Screen name="home">
                                                {() => <HomeScreen />}
                                          </Stack.Screen>
                                    </Stack.Navigator>
                              </NavigationNativeContainer>
                        </>
                  )}
            </>
      );
}
