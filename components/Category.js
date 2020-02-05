import React, { useState } from "react";
import {
      Dimensions,
      StyleSheet,
      Text,
      TouchableOpacity,
      View
} from "react-native";

import { Entypo, MaterialIcons } from "@expo/vector-icons";

import Colors from "../assets/Colors";

// Compo import
import SubCategory from "../components/SubCategory";

//put Last border off for last category item
let SubBottomItem = Colors.blue;

// Variables to store width and height of the user phone
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default function Category({
      category,
      CatBottomItem,
      preferences,
      updatePreference
}) {
      const [subCategoryDisplay, setSubCategoryDisplay] = useState(false);

      return (
            <View style={styles.CategoryItemContainers}>
                  <View
                        style={[
                              styles.CategoryItem,
                              { borderBottomColor: CatBottomItem }
                        ]}
                  >
                        <TouchableOpacity>
                              <MaterialIcons
                                    name={
                                          preferences[category.name] &&
                                          preferences[category.name].isChecked
                                                ? "check-box"
                                                : "check-box-outline-blank"
                                    }
                                    color={Colors.blue}
                                    size={height / 22}
                                    onPress={() => {
                                          updatePreference(
                                                category,
                                                category.name
                                          );
                                    }}
                              />
                        </TouchableOpacity>
                        <Text style={styles.CategoryTextItem}>
                              {category.name}
                        </Text>
                        <TouchableOpacity>
                              <Entypo
                                    name="dots-three-horizontal"
                                    color={Colors.orange}
                                    size={height / 22}
                                    onPress={() => {
                                          setSubCategoryDisplay(
                                                !subCategoryDisplay
                                          );
                                          console.log(subCategoryDisplay);
                                    }}
                              />
                        </TouchableOpacity>
                  </View>
                  {subCategoryDisplay &&
                        category.subCategories.map((subCategory, index) => {
                              category.subCategories.length === index + 1
                                    ? (SubBottomItem = Colors.white)
                                    : (SubBottomItem = Colors.blue);
                              return (
                                    <SubCategory
                                          key={index}
                                          category={category}
                                          categoryName={category.name}
                                          subCategoryName={subCategory.name}
                                          SubBottomItem={SubBottomItem}
                                          updatePreference={updatePreference}
                                          preferences={preferences}
                                          index={index}
                                    />
                              );
                        })}
            </View>
      );
}

const styles = StyleSheet.create({
      CategoryItemContainers: {
            backgroundColor: "white",
            width: width / 1.1
      },
      CategoryItem: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 10,
            paddingBottom: 10,
            borderBottomWidth: 1,
            marginLeft: 20,
            marginRight: 20,
            backgroundColor: "white"
      },
      CategoryTextItem: {
            flex: 1,
            color: Colors.blue,
            paddingLeft: 5,
            fontSize: 20,
            fontFamily: "roboto",
            textTransform: "capitalize"
      }
});
