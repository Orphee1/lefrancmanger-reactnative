let categoryArray = [];
let subCategoryArray = [];
Object.keys(pref).map(key => {
      if (key !== "radius" && key !== "isBioLabel" && key !== "appName") {
            if (pref[key].isChecked === true) {
                  //   console.log("Trouve category : ", key, pref[key]._id);
                  categoryArray.push(pref[key]._id);
                  Object.keys(pref[key]).map(sub => {
                        if (pref[key][sub].isChecked === true) {
                              //   console.log("Exist sub :", sub, pref[key][sub]._id);
                              subCategoryArray.push(pref[key][sub]._id);
                        }
                  });
            }
      }
});
console.log(categoryArray);
console.log(subCategoryArray);
