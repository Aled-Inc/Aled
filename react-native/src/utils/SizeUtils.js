import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

const scanWidth = 350;
const scanHeight = 150;

const scanX = (width - scanWidth) / 2;
const scanY = (height - scanHeight) / 5;

export const ScanBox = {
  width : scanWidth,
  height : scanHeight,
  x : scanX,
  y : scanY,
};

export const ScreenSize = {
  width: width,
  height: height
};