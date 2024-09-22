import { StyleSheet } from "react-native";
import { Colors } from "./CommonStyle";
import { ScanBox, ScreenSize } from "../utils/SizeUtils";

export const scanStyle = StyleSheet.create({
  illustrationTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    lineHeight: 24,
    color: Colors.Text,
  },
  illustrationSubTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.Text,
    textAlign: 'center',
  },

  container: {
    flex: 1,
    backgroundColor: Colors.BGDarker,
  },
  productInfoCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: ScanBox.y * 2 + ScanBox.height,
    height: ScreenSize.height - (ScanBox.y + ScanBox.height),
    backgroundColor: 'rgba(232, 229, 232, 0.5)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  mask: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  scanBox: {
    top: ScanBox.y - 1,
    left: ScanBox.x - 1,
    width: ScanBox.width + 1,
    height: ScanBox.height + 1,
    borderColor: Colors.BG,
    borderWidth: 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
});