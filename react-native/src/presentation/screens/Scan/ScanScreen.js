import React, { useState, useEffect } from 'react';
import { Text, ActivityIndicator } from 'react-native';
import { Center, View } from 'native-base';
import { CameraView, Camera } from 'expo-camera';
import { Colors } from '../../styles/CommonStyle';
import EmptyScanIllustration from './EmptyScanIllustration';
import ScannedProductSummary from './ScannedProductSummary';
import SettingsLogo from '../../../../assets/icons/settings.svg';
import i18n from 'i18n-js';
import { useIsFocused } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { connectToRedux } from '../../../common/utils/ReduxConnect';
import InventoryActions from '../../../business/store/actions/InventoryActions';
import { createScanProductsSelector } from '../../../business/store/selectors/InventorySelector';
import { scanStyle } from '../../styles/ScanStyle';
import { ScanBox, ScreenSize } from '../../../common/utils/SizeUtils';


function ScanScreen({ scannedProducts, addProduct, clearScannedProducts }) {
  const { width, height } = ScreenSize;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState('');
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ data, bounds, boundingBox }) => {
    bounds = bounds ?? boundingBox;

    if (
      bounds.origin.x >= ScanBox.x &&
      bounds.origin.x + bounds.size.width <= ScanBox.x + ScanBox.width &&
      bounds.origin.y >= ScanBox.y &&
      bounds.origin.y + bounds.size.height <= ScanBox.y + ScanBox.height &&
      data != scanned
    ) {
      fetchProductData(data);
      setScanned(data);
    }
  };

  const fetchProductData = async barcode => {
    setLoading(true);
    try {
      await addProduct({barcode});
    } catch (error) {
      clearScannedProducts();
    } finally {
      setLoading(false);
    }
  };

  if (hasPermission !== true) {
    return (
      <Center flex={1} backgroundColor={Colors.BG}>
        <Text style={scanStyle.illustrationTitle}>
          {i18n.t('Aled::Scan:AuthorizationError:NoCamera')}
        </Text>
        <SettingsLogo width={200} height={250} />
        <Text style={scanStyle.illustrationSubTitle}>
          {i18n.t('Aled::Scan:AuthorizationError:Permission')}
        </Text>
      </Center>
    );
  }

  return isFocused ? (
    <View style={scanStyle.container}>
      <CameraView
        onBarcodeScanned={handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['ean13', 'ean8', 'upc_a', 'upc_e'],
        }}
        style={scanStyle.camera}>
        <View style={scanStyle.overlay}>
          <View style={[scanStyle.mask, { top: 0, height: ScanBox.y, width }]} />
          <View
            style={[
              scanStyle.mask,
              { top: ScanBox.y, height: ScanBox.height, width: ScanBox.x },
            ]}
          />
          <View
            style={[
              scanStyle.mask,
              {
                top: ScanBox.y,
                height: ScanBox.height,
                left: ScanBox.x + ScanBox.width,
                width: ScanBox.x,
              },
            ]}
          />
          <View
            style={[
              scanStyle.mask,
              {
                top: ScanBox.y + ScanBox.height,
                height: height - (ScanBox.y + ScanBox.height),
                width,
              },
            ]}
          />
          <View style={scanStyle.scanBox} />
        </View>
      </CameraView>
      <View style={scanStyle.productInfoCard}>
        {loading && <ActivityIndicator size="large" color={Colors.BGDarker} />}
        {scannedProducts.length > 0 ? (
          <ScannedProductSummary
            products={scannedProducts}
            onRefresh={clearScannedProducts}
          />
        ) : (
          <EmptyScanIllustration />
        )}
      </View>
    </View>
  ) : null;
}

ScanScreen.propTypes = {
  scannedProducts: PropTypes.array.isRequired,
  addProduct: PropTypes.func.isRequired,
  clearScannedProducts: PropTypes.func.isRequired
};

export default connectToRedux({
  component: ScanScreen,
  stateProps: state => ({
    scannedProducts: createScanProductsSelector()(state),
  }),
  dispatchProps: {
    addProduct: InventoryActions.addProductAsync,
    clearScannedProducts: InventoryActions.clearScannedProducts,
  },
});