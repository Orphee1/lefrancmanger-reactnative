// Import React and others modules
import React, { useCallback, useState, useEffect } from "react";
import BottomDrawer from "rn-bottom-drawer";
// Import React Natives Items
import {
      ActivityIndicator,
      Dimensions,
      FlatList,
      Image,
      Platform,
      StyleSheet,
      Text,
      TouchableOpacity,
      View
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { ScrollView } from "react-native-gesture-handler";

//Axios import
import Axios from "axios";

// Import Map permissions for Location and map module

import MapView from "react-native-maps";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

// Import Assets and Colors
import Colors from "../assets/Colors";

// Compos import
import CardProducer from "../components/CardProducer";
import CustomCalloutView from "../components/CustomCalloutView";
import SearchBar from "../components/SearchBar";

// Get device's screen dimensions
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
      const navigation = useNavigation();

      // States managed in this page :
      // 1 handle user'sposition
      const [location, setLocation] = useState(null);
      // const [location, setLocation] = useState({coords : {
      //       latitude: 48.866667,
      //                   longitude: 2.333333,

      // }, latitudeDelta:0.4, longitudeDelta: 0.4});
      // 2 monitor if the the drawer is open or closed
      const [drawerOpen, setDrawerOpen] = useState(false);
      // 3 - Monitor if the data is loaded or note --> Prevents from crash at the loading
      const [isLoading, setIsLoading] = useState(true);
      // 4 - Handle the region of the map display --> object with : latitude, longitude, latitudeDelta , longitudeDelta
      const [region, setIsRegion] = useState({});
      // 5 - State producers
      const [producers, setProducers] = useState([]);
      // 6 - State for radius
      const [radiusCalculated, setRadiusCalculated] = useState(20000);

      // console.log(producers);

      // Ask permission to the client

      const askPermission = async () => {
            const { status } = await Permissions.askAsync(Permissions.LOCATION);
            if (status === "granted") {
                  // Permission allowed, get user's position
                  const userLocation = await Location.getCurrentPositionAsync(
                        {}
                  );
                  // Set up user's position and map's region
                  setLocation(userLocation);
                  console.log(userLocation);
                  setIsRegion({
                        latitude: userLocation.coords.latitude,
                        longitude: userLocation.coords.longitude,
                        latitudeDelta: 0.4,
                        longitudeDelta: 0.4
                  });
                  setIsLoading(false);
            } else {
                  console.log("here we are");
                  setLocation({
                        coords: {
                              latitude: 48.866667,
                              longitude: 2.333333
                        }
                  });
                  console.log(location);

                  setIsRegion({
                        latitude: 48.866667,
                        longitude: 2.333333,
                        latitudeDelta: 0.4,
                        longitudeDelta: 0.4
                  });
                  setIsLoading(false);
            }
      };

      const refreshData = async (
            region,
            calculatedRadius,
            categoryPreferences
      ) => {
            if (!categoryPreferences) {
                  try {
                        const response = await Axios.post(
                              "https://le-franc-manger.herokuapp.com/producers",
                              {
                                    longitude: region.longitude,
                                    latitude: region.latitude,
                                    radius: calculatedRadius,
                                    user_Lat: location.coords.latitude,
                                    user_Long: location.coords.longitude
                              }
                        );
                        // console.log(response.data);

                        setProducers(response.data);
                        console.log(response.data.length);
                  } catch (error) {
                        console.log(error.message);
                  }
            }
      };

      const radiusCalculatedWithDelta = region => {
            const earthCircumference = 40075;
            const longitudeDelta = region.longitudeDelta;
            const latitude = region.latitude;
            const circle = 360;

            const radius =
                  (1.2 *
                        (((longitudeDelta *
                              earthCircumference *
                              Math.cos(latitude * ((2 * Math.PI) / circle))) /
                              360) *
                              1000)) /
                  2;

            setRadiusCalculated(radius);
      };

      // Ask permission at the 1rst load
      useEffect(() => {
            askPermission();
            // removeUselessData();
      }, []);

      // Refresh producers data when map's region is modified
      useEffect(() => {
            radiusCalculatedWithDelta(region);
            refreshData(region, radiusCalculated);
      }, [region]);

      return (
            <>
                  {isLoading ? (
                        <View>
                              <ActivityIndicator />
                        </View>
                  ) : (
                        <>
                              <ScrollView
                                    behavior={
                                          Platform.OS === "ios"
                                                ? "padding"
                                                : null
                                    }
                                    style={{ flex: 1 }}
                              >
                                    <MapView
                                          style={{
                                                height: height / 1.15,
                                                width: width
                                          }}
                                          showsUserLocation={true}
                                          showsMyLocationButton={true}
                                          initialRegion={{
                                                latitude:
                                                      location.coords.latitude,
                                                longitude:
                                                      location.coords.longitude,
                                                // latitude: 48.866667,
                                                // longitude: 2.333333,
                                                latitudeDelta: 0.4,
                                                longitudeDelta: 0.4
                                          }}
                                          region={region && region}
                                          onRegionChangeComplete={region => {
                                                setIsRegion(region);
                                          }}
                                    >
                                          {producers.map((producer, index) => {
                                                return (
                                                      <MapView.Marker
                                                            key={index}
                                                            onPress={() => {
                                                                  navigation.navigate(
                                                                        "Producer",
                                                                        {
                                                                              producerId:
                                                                                    producer._id
                                                                        }
                                                                  );
                                                            }}
                                                            coordinate={{
                                                                  latitude:
                                                                        producer
                                                                              .loc
                                                                              .latitude,
                                                                  longitude:
                                                                        producer
                                                                              .loc
                                                                              .longitude
                                                            }}
                                                      >
                                                            <View
                                                                  style={
                                                                        styles.mapMarkerBackground
                                                                  }
                                                            >
                                                                  <Image
                                                                        source={require("../assets/pictogramsCustomMarkers/multi-produits.png")}
                                                                        style={
                                                                              styles.mapMarker
                                                                        }
                                                                  />
                                                                  <CustomCalloutView
                                                                        producer={
                                                                              producer
                                                                        }
                                                                  />
                                                            </View>
                                                      </MapView.Marker>
                                                );
                                          })}
                                    </MapView>
                                    <SearchBar
                                          setRadiusCalculated={
                                                setRadiusCalculated
                                          }
                                          radiusCalculated={radiusCalculated}
                                          setIsRegion={setIsRegion}
                                          region={region}
                                    />
                                    <BottomDrawer
                                          containerHeight={350}
                                          shadow={false}
                                          startUp={false}
                                          backgroundColor={Colors.blue}
                                          onExpanded={() => {
                                                setDrawerOpen(true);
                                          }}
                                          onCollapsed={() => {
                                                setDrawerOpen(false);
                                          }}
                                    >
                                          <View style={styles.drawer}>
                                                {drawerOpen === true ? (
                                                      <View
                                                            style={
                                                                  styles.drawerContainer
                                                            }
                                                      >
                                                            <Ionicons
                                                                  name="ios-arrow-down"
                                                                  color={
                                                                        Colors.orange
                                                                  }
                                                                  size={
                                                                        height /
                                                                        40
                                                                  }
                                                            />
                                                            <Text
                                                                  style={
                                                                        styles.drawerText
                                                                  }
                                                            >
                                                                  Glissez vers
                                                                  le bas
                                                            </Text>
                                                      </View>
                                                ) : (
                                                      <View
                                                            style={
                                                                  styles.drawerContainer
                                                            }
                                                      >
                                                            <Ionicons
                                                                  name="ios-arrow-up"
                                                                  color={
                                                                        Colors.orange
                                                                  }
                                                                  size={
                                                                        height /
                                                                        40
                                                                  }
                                                            />
                                                            <Text
                                                                  style={
                                                                        styles.drawerText
                                                                  }
                                                            >
                                                                  Glissez vers
                                                                  le haut
                                                            </Text>
                                                      </View>
                                                )}
                                          </View>
                                          <FlatList
                                                data={producers}
                                                keyExtractor={item =>
                                                      String(item._id)
                                                }
                                                renderItem={({ item }) => {
                                                      return (
                                                            <TouchableOpacity
                                                            // onPress={() => {
                                                            //       navigation.navigate("Producer", {
                                                            //         producerId: item._id
                                                            //       });
                                                            //     }}
                                                            >
                                                                  <CardProducer
                                                                        item={
                                                                              item
                                                                        }
                                                                  />
                                                            </TouchableOpacity>
                                                      );
                                                }}
                                          ></FlatList>
                                    </BottomDrawer>
                              </ScrollView>
                        </>
                  )}
            </>
      );
}

const styles = StyleSheet.create({
      container: {
            flex: 1,
            position: "relative",
            backgroundColor: Colors.white
      },
      drawer: {
            height: height / 20,
            backgroundColor: Colors.blue,
            borderTopWidth: 1.5,
            borderTopColor: Colors.orange,
            alignItems: "center"
      },
      drawerContainer: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
      },
      drawerText: {
            color: Colors.orange,
            paddingBottom: 10
      },
      mapMarkerBackground: {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Colors.blue,
            height: 35,
            width: 35,
            borderRadius: 17.5
      },
      mapMarker: {
            height: 35,
            width: 35,
            resizeMode: "contain"
      }
});
