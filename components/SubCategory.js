import React from "react";
import {
      Dimensions,
      StyleSheet,
      Text,
      View,
      TouchableOpacity
} from "react-native";

import Colors from "../assets/Colors";

// Icons import
import { MaterialIcons } from "@expo/vector-icons";

// Get device's screen dimension
const height = Dimensions.get("window").height;

export default function SubCategory({
      category,
      categoryName,
      subCategoryName,
      SubBottomItem,
      updatePreference,
      preferences,
      index
}) {
      return (
            <View style={styles.SubCategoryItemContainers}>
                  <View
                        style={[
                              styles.SubCategoryItem,
                              { borderBottomColor: SubBottomItem }
                        ]}
                  >
                        <TouchableOpacity>
                              <MaterialIcons
                                    name={
                                          preferences[categoryName]
                                                ? preferences[categoryName][
                                                        subCategoryName
                                                  ].isChecked
                                                      ? "check-box"
                                                      : "check-box-outline-blank"
                                                : "check-box-outline-blank"
                                    }
                                    color={Colors.blue}
                                    size={height / 28}
                                    onPress={() => {
                                          console.log(
                                                "SubCategory->updatePreference id",
                                                index,
                                                categoryName,
                                                subCategoryName
                                          );
                                          updatePreference(
                                                category,
                                                categoryName,
                                                subCategoryName
                                          );
                                    }}
                              />
                        </TouchableOpacity>
                        <Text style={styles.SubCategoryTextItem}>
                              {subCategoryName}
                        </Text>
                  </View>
            </View>
      );
}

const styles = StyleSheet.create({
      SubCategoryItemContainers: {
            width: "80%"
      },
      SubCategoryItem: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingTop: 10,
            paddingBottom: 10,
            borderBottomWidth: 1,
            marginLeft: 20,
            marginRight: 20
      },
      SubCategoryTextItem: {
            flex: 1,
            color: Colors.blue,
            paddingLeft: 5,
            fontSize: 15,
            fontFamily: "roboto",
            textTransform: "capitalize"
      }
});
