import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { Center, View } from 'native-base';
import { CameraView, Camera } from 'expo-camera';
import { Colors } from '../../styles/CommonStyle';
import axios from 'axios';
import EmptyScanIllustration from './EmptyScanIllustration';
import ScannedProductSummary from './ScannedProductSummary';
import SettingsLogo from '../../../assets/icons/settings.svg';
import i18n from 'i18n-js';
import { useIsFocused } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const scanBoxWidth = 350;
const scanBoxHeight = 150;

const scanBoxX = (width - scanBoxWidth) / 2;
const scanBoxY = (height - scanBoxHeight) / 5;

export default function ScanScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ data, bounds }) => {
    if (
      bounds.origin.x >= scanBoxX &&
      bounds.origin.x + bounds.size.width <= scanBoxX + scanBoxWidth &&
      bounds.origin.y >= scanBoxY &&
      bounds.origin.y + bounds.size.height <= scanBoxY + scanBoxHeight &&
      data != scanned
    ) {
      fetchProductData(data);
      setScanned(data);
    }
  };

  const fetchProductData = async barcode => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`,
      );
      setProducts([response.data.product, ...products]);
    } catch (error) {
      alert(i18n.t('Aled::Scan:ErrorOnFetchProduct'));
    } finally {
      setLoading(false);
    }
  };

  if (hasPermission !== true) {
    return (
      <Center flex={1} backgroundColor={Colors.BG}>
        <Text style={styles.illustrationTitle}>
          {i18n.t('Aled::Scan:AuthorizationError:NoCamera')}
        </Text>
        <SettingsLogo width={200} height={250} />
        <Text style={styles.illustrationSubTitle}>
          {i18n.t('Aled::Scan:AuthorizationError:Permission')}
        </Text>
      </Center>
    );
  }

  return isFocused ? (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['ean13', 'ean8', 'upc_a', 'upc_e'],
        }}
        style={styles.camera}>
        <View style={styles.overlay}>
          <View style={[styles.mask, { top: 0, height: scanBoxY, width }]} />
          <View
            style={[
              styles.mask,
              { top: scanBoxY, height: scanBoxHeight, width: scanBoxX },
            ]}
          />
          <View
            style={[
              styles.mask,
              {
                top: scanBoxY,
                height: scanBoxHeight,
                left: scanBoxX + scanBoxWidth,
                width: scanBoxX,
              },
            ]}
          />
          <View
            style={[
              styles.mask,
              {
                top: scanBoxY + scanBoxHeight,
                height: height - (scanBoxY + scanBoxHeight),
                width,
              },
            ]}
          />
          <View style={styles.scanBox} />
        </View>
      </CameraView>
      <View style={styles.productInfoCard}>
        {loading && <ActivityIndicator size="large" color={Colors.BGDarker} />}
        {products.length > 0 ? (
          <ScannedProductSummary
            products={products}
            onRefresh={() => {
              setProducts([]);
            }}
          />
        ) : (
          <EmptyScanIllustration />
        )}
      </View>
    </View>
  ) : null;
}

const styles = StyleSheet.create({
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
    top: scanBoxY * 2 + scanBoxHeight,
    height: height - (scanBoxY + scanBoxHeight),
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
    top: scanBoxY - 1,
    left: scanBoxX - 1,
    width: scanBoxWidth + 1,
    height: scanBoxHeight + 1,
    borderColor: Colors.BG,
    borderWidth: 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
});
