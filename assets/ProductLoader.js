import React from "react";
// import ContentLoader, { Rect } from "react-content-loader/native";
import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Loader = () => (
      <ContentLoader
            height={height}
            width={width}
            speed={2}
            primaryColor="#e5e5e5"
            secondaryColor="#ecebeb"
      >
            <Rect x="0" y="0" rx="0" ry="0" width={width} height="240" />
            <Rect x="150" y="260" rx="5" ry="5" width="120" height="25" />
            <Rect x="160" y="290" rx="5" ry="5" width="100" height="25" />
            <Rect x="30" y="330" rx="0" ry="0" width="350" height="300" />
            <Rect x="37" y="700" rx="22" ry="22" width="125" height="44" />
            <Rect x="230" y="700" rx="22" ry="22" width="125" height="44" />
      </ContentLoader>
);

export default Loader;
