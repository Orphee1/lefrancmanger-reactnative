import React, { useEffect, useState } from "react";
import {
      ActivityIndicator,
      AsyncStorage,
      Dimensions,
      ImageBackground,
      ScrollView,
      StyleSheet,
      Text,
      TouchableOpacity,
      View
} from "react-native";
import { Switch } from "react-native-switch";
import SwitchSelector from "react-native-switch-selector";
import Colors from "../assets/Colors";
import Axios from "axios";

// Compo import
import Category from "../components/Category";

// Get device's screen dimension
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

//import fake producers data
import category_data from "../assets/category_data";
import SubCategory from "../components/SubCategory";

//put Last border off for last category item
let CatBottomItem = Colors.blue;

//Default value
const defaultRadius = 20000;
const defaultBioLabel = false;
const defaultInitialRadius = 1; // index of array radiusOptions
const radiusOptions = [
      { label: "10", value: "10000", activeColor: "#003A58" },
      { label: "20", value: "20000", activeColor: "#003A58" },
      { label: "30", value: "30000", activeColor: "#003A58" },
      { label: "40", value: "40000", activeColor: "#003A58" },
      { label: "50", value: "50000", activeColor: "#003A58" }
];

export default function Filter() {
      const [isLoadingCategory, setIsLoadingCategory] = useState(true);
      const [isLoadingPreferences, setIsLoadingPreferences] = useState(true);
      const [categoryData, setCategoryData] = useState(category_data);
      const [isBioLabel, setIsBioLabel] = useState(defaultBioLabel);
      const [radius, setRadius] = useState(defaultRadius);
      const [preferences, setPreferences] = useState({
            appName: "LFM",
            isBioLabel: isBioLabel,
            radius: radius
      });
      console.log("At startup", preferences);
      radiusOptions.map((obj, index) => {
            if (obj.value === defaultRadius) {
                  defaultInitialRadius = index; // index of array radiusOptions
            }
      });

      //Loding data from API ######################################################
      useEffect(() => {
            const fetchData = async () => {
                  try {
                        const response = await Axios.get(
                              "https://le-franc-manger.herokuapp.com/category"
                        );
                        setCategoryData(response.data);
                        setIsLoadingCategory(false);
                  } catch (error) {
                        console.log(error.message);
                  }
            };
            fetchData();
      }, []);

      // Manage local cookies ######################################################
      useEffect(() => {
            const readPreference = async () => {
                  try {
                        const stored = await AsyncStorage.getItem(
                              "preferences"
                        );
                        const perf = JSON.parse(stored);
                        console.log("Loaded-preference", perf);
                        if (perf) {
                              setPreferences(perf);
                        }
                        setIsLoadingPreferences(false);
                        console.log(
                              "Loaded-preference",
                              perf,
                              radius,
                              isBioLabel
                        );
                  } catch (error) {
                        console.log(error.message);
                  }
            };
            readPreference();
      }, []);

      const updatePreference = async (
            objCategory,
            categoryName,
            subCategoryName
      ) => {
            console.log(
                  "Start UpdatePreference->",
                  preferences,
                  categoryName,
                  subCategoryName
            );
            let pref = { ...preferences };
            // No categoty exist, then create it and all subcategory to true
            if (!pref[categoryName] && !subCategoryName) {
                  pref[categoryName] = { isChecked: true };
                  pref[categoryName]._id = objCategory._id;
                  objCategory.subCategories.map(subCategory => {
                        pref[categoryName][subCategory.name] = {
                              isChecked: true
                        };
                        pref[categoryName][subCategory.name]._id =
                              subCategory._id;
                  });
            } else if (pref[categoryName] && !subCategoryName) {
                  // category exit and no update subcategory
                  pref[categoryName].isChecked = !pref[categoryName].isChecked;
                  if (pref[categoryName].isChecked === false) {
                        // then if category === false then set all subcategory to false
                        objCategory.subCategories.map(subCategory => {
                              pref[categoryName][
                                    subCategory.name
                              ].isChecked = false;
                        });
                  } else if (pref[categoryName].isChecked === true) {
                        // then if category === true then change subcategory only
                        objCategory.subCategories.map(subCategory => {
                              pref[categoryName][
                                    subCategory.name
                              ].isChecked = !pref[categoryName][
                                    subCategory.name
                              ].isChecked;
                        });
                  }
            } else if (!pref[categoryName] && subCategoryName) {
                  // no category exist and update subcategory
                  pref[categoryName] = { isChecked: true };
                  pref[categoryName]._id = objCategory._id;
                  objCategory.subCategories.map(subCategory => {
                        if (subCategoryName === subCategory.name) {
                              pref[categoryName][subCategory.name] = {
                                    isChecked: true
                              };
                              pref[categoryName][subCategory.name]._id =
                                    subCategory._id;
                        } else {
                              pref[categoryName][subCategory.name] = {
                                    isChecked: false
                              };
                              pref[categoryName][subCategory.name]._id =
                                    subCategory._id;
                        }
                  });
            } else if (pref[categoryName] && subCategoryName) {
                  // category exist , then change subcategory only
                  pref[categoryName][subCategoryName].isChecked = !pref[
                        categoryName
                  ][subCategoryName].isChecked;
                  if (pref[categoryName][subCategoryName].isChecked === true) {
                        // if setting one subcategory to true then force category to true
                        pref[categoryName].isChecked = true;
                  }
                  // check if all subcategory are false, then change category to false
                  if (pref[categoryName].isChecked === true) {
                        let result = false;
                        objCategory.subCategories.map(subCategory => {
                              if (
                                    pref[categoryName][subCategory.name]
                                          .isChecked === true
                              ) {
                                    result = true;
                              }
                        });
                        pref[categoryName].isChecked = result;
                  }
            }

            const recPref = JSON.stringify(pref);
            await AsyncStorage.setItem("preferences", recPref);
            setPreferences(pref);
            console.log("End UpdatePreference->", pref);
      };

      const deletePreference = async () => {
            console.log("Start Delete Preference-->", preferences);
            await AsyncStorage.removeItem("preferences");
            setRadius(defaultRadius);
            setIsBioLabel(defaultBioLabel);
            setPreferences({
                  appName: "LFM",
                  isBioLabel: isBioLabel,
                  radius: radius
            });
      };

      const updateRadius = async val => {
            console.log("Start Update radius-->", val);
            let pref = { ...preferences };
            setRadius(val);
            pref.radius = val;
            setPreferences(pref);
            const recPref = JSON.stringify(pref);
            await AsyncStorage.setItem("preferences", recPref);
      };

      const updateBioLabel = async val => {
            console.log("Start update BioLabel isBioLabel-->", val);
            let pref = { ...preferences };
            setIsBioLabel(val);
            pref.isBioLabel = val;
            setPreferences(pref);
            const recPref = JSON.stringify(pref);
            await AsyncStorage.setItem("preferences", recPref);
      };

      return (
            <>
                  {isLoadingCategory === true ||
                  isLoadingPreferences === true ? (
                        <View style={styles.activityIndicatorContainer}>
                              <ActivityIndicator
                                    size="large"
                                    color={Colors.orange}
                              />
                        </View>
                  ) : (
                        <ImageBackground
                              source={require("../assets/images/pattern_orange.png")}
                              style={styles.imageBackground}
                        >
                              <ScrollView
                                    contentContainerStyle={
                                          styles.contentContainer
                                    }
                              >
                                    <View style={styles.container}>
                                          <View style={styles.buttonContainer}>
                                                <TouchableOpacity
                                                      style={styles.button}
                                                      onPress={() => {
                                                            deletePreference();
                                                      }}
                                                >
                                                      <Text
                                                            style={
                                                                  styles.buttonText
                                                            }
                                                      >
                                                            Réinitialiser
                                                      </Text>
                                                </TouchableOpacity>
                                          </View>

                                          <View style={styles.RadiusContainers}>
                                                <Text
                                                      style={
                                                            styles.RadiusTextContainers
                                                      }
                                                >
                                                      Rayon de recherche
                                                </Text>
                                                <SwitchSelector
                                                      value={defaultRadius}
                                                      disableValueChangeOnPress={
                                                            true
                                                      }
                                                      fontSize={20}
                                                      options={radiusOptions}
                                                      initial={
                                                            defaultInitialRadius
                                                      }
                                                      onPress={value => {
                                                            updateRadius(value);
                                                      }}
                                                />
                                          </View>
                                          <View
                                                style={
                                                      styles.BioLabelContainers
                                                }
                                          >
                                                <Text
                                                      style={
                                                            styles.BioLabelText
                                                      }
                                                >
                                                      Je veux du bio
                                                </Text>
                                                <Switch
                                                      ios_backgroundColor={
                                                            Colors.grey
                                                      }
                                                      trackColor={{
                                                            true: "blue",
                                                            false: "grey"
                                                      }}
                                                      circleSize={30}
                                                      value={isBioLabel}
                                                      onValueChange={val => {
                                                            updateBioLabel(val);
                                                      }}
                                                />
                                          </View>
                                          <View
                                                style={
                                                      styles.CategoryContainers
                                                }
                                          >
                                                {categoryData.map(
                                                      (category, index) => {
                                                            categoryData.length ===
                                                            index + 1
                                                                  ? (CatBottomItem =
                                                                          Colors.white)
                                                                  : (CatBottomItem =
                                                                          Colors.blue);
                                                            return (
                                                                  <Category
                                                                        key={
                                                                              index
                                                                        }
                                                                        category={
                                                                              category
                                                                        }
                                                                        CatBottomItem={
                                                                              CatBottomItem
                                                                        }
                                                                        index={
                                                                              index
                                                                        }
                                                                        updatePreference={
                                                                              updatePreference
                                                                        }
                                                                        preferences={
                                                                              preferences
                                                                        }
                                                                  />
                                                            );
                                                      }
                                                )}
                                          </View>
                                    </View>
                              </ScrollView>
                        </ImageBackground>
                  )}
            </>
      );
}

const styles = StyleSheet.create({
      contentContainer: {
            width: width,
            paddingHorizontal: 20
      },
      activityIndicatorContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
      },
      imageBackground: {
            alignItems: "center",
            width: width,
            height: height
      },
      buttonContainer: {
            marginBottom: 20,
            marginTop: 20,
            alignItems: "center"
      },
      button: {
            justifyContent: "center",
            alignItems: "center",
            height: 44,
            borderRadius: 22,
            width: width / 3,
            backgroundColor: Colors.blue
      },
      buttonText: {
            fontSize: 20,
            fontFamily: "roboto",
            color: Colors.white,
            marginRight: 20,
            marginLeft: 20
      },
      CategoryContainers: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.8,
            shadowRadius: 3,
            marginBottom: 150,
            marginTop: 20
      },
      BioLabelContainers: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            padding: 20,
            marginBottom: 20,
            marginTop: 20,
            backgroundColor: "white",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 1
      },
      BioLabelText: {
            flex: 1,
            color: Colors.blue,
            paddingLeft: 5,
            fontSize: 20,
            fontFamily: "roboto"
      },
      RadiusContainers: {
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 10,
            paddingBottom: 10,
            marginTop: 20,
            marginBottom: 20,
            backgroundColor: "white",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 1
      },
      RadiusTextContainers: {
            color: Colors.blue,
            paddingBottom: height / 30,
            fontSize: 20,
            fontFamily: "roboto",
            textTransform: "capitalize"
      },
      switchEnableBorder: {
            borderColor: "#6fa6d3",
            borderWidth: 1
      },
      switchDisableBorder: {
            borderColor: "#f2f2f2",
            borderWidth: 1
      }
});
