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

// Variables to store width and height of the user phone
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
      const navigation = useNavigation();

      // States managed in this page :
      // 1 handle user'sposition
      const [location, setLocation] = useState(null);
      const [errorMessage, setErrorMessage] = useState(null);
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

      // Ask permission to the client

      const askPermission = useCallback(async () => {
            alert("here we are");
            // const obj = await Permissions.askAsync(Permissions.LOCATION);
            const { status } = await Permissions.askAsync(Permissions.LOCATION);
            if (status !== "granted") {
                  setErrorMessage("Permission refusée");
                  alert(errorMessage);
                  // ne faudrait-il pas faire un setLocation ici aussi au cas où le user refuse sa geoloc??, sans quoi location n'est pas défini
                  // ajout HL
                  setLocation({
                        latitude: 48.866667,
                        longitude: 2.333333,
                        latitudeDelta: 0.4,
                        longitudeDelta: 0.4
                  });
                  // fin ajout HL
                  setIsRegion({
                        latitude: 48.866667,
                        longitude: 2.333333,
                        latitudeDelta: 0.4,
                        longitudeDelta: 0.4
                  });
                  setIsLoading(false);
            } else {
                  // if (obj.status === "granted") {
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
            }
      });

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
      // useEffect(() => {
      //       radiusCalculatedWithDelta(region);
      //       refreshData(region, radiusCalculated);
      // }, [region]);

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
                                                latitudeDelta: 0.4,
                                                longitudeDelta: 0.4
                                          }}
                                          region={region && region}
                                          onRegionChangeComplete={region => {
                                                setIsRegion(region);
                                          }}
                                    >
                                          <View
                                                style={
                                                      styles.mapMarkerBackground
                                                }
                                          >
                                                <Image
                                                      source={require("../assets/pictogramsCustomMarkers/multi-produits.png")}
                                                      style={styles.mapMarker}
                                                />
                                          </View>
                                          <MapView.Marker />
                                    </MapView>
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
