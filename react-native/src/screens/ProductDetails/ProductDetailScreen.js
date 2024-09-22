import React, { useState } from 'react';
import { ScrollView, Image, StyleSheet, SafeAreaView } from 'react-native';
import { Box, HStack, VStack, Text, Center, View, Spinner } from 'native-base';
import { Colors } from '../../styles/CommonStyle';
import { useRoute } from '@react-navigation/native';
import ProductService from '../../services/ProductService';
import { useEffect } from 'react';
import NutriscoreImage from './NutriscoreImage';
import NovaCard from './NovaCard';
import TriLine from './TriLine';
import NutritionTab from './NutritionTab';
import I18n from 'i18n-js';
import { firstLetterUpper } from '../../utils/CommonUtils';

function ProductDetailScreen() {
  const regexBalise = /<\/?[^>]+(>|$)|[_]/g;
  const route = useRoute();
  const { code } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        const response = await ProductService.getProductDetails(code);
        console.log('Response : ', response.data);
        setProduct(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [code]);

  const isPresent = value => {
    return value ? value : 'Unknown';
  };

  const computeQuantity = product => {
    let quantity = parseFloat(product.quantity);

    if (isNaN(quantity)) {
      return 'Unknown';
    }
    const isDivided = quantity >= 1000;
    quantity = isDivided ? quantity / 1000 : quantity;

    const unit = product.categoryTags.includes('en:beverages')
      ? isDivided
        ? 'L'
        : 'ml'
      : isDivided
      ? 'Kg'
      : 'g';

    return `${quantity}${unit}`;
  };

  const retrieveAllergens = product => {
    const regex = /<span class="allergen">([^<]+)<\/span>/gi;
    const matches = product.allergens.match(regex);
    if (!matches) {
      return <>{I18n.t('Aled::None')}</>;
    }
    const allergens = new Set(
      matches.map(match =>
        firstLetterUpper(
          match.replace(/<span class="allergen">|<\/span>/gi, '').trim(),
        ),
      ),
    );
    return Array.from(allergens).join(', ');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Spinner />
      </View>
    );
  }

  return (
    <ScrollView bounces={false}>
      {/* Product Image */}
      <Center mt="10" mb={5}>
        <Image
          source={{ uri: product.imageFrontUrl }}
          style={{ width: 150, height: 200 }}
          alt={product.productName}
        />
        <Text bold fontSize="xl" mt="5" color={Colors.Text}>
          {product.productName}
        </Text>
        <Text color={Colors.LightText}>Expiration Date: N/A</Text>
        <HStack mt={5}>
          <Box marginTop={1}>
            <NutriscoreImage nutriscore={product.nutriscore} />
          </Box>
          <NovaCard novascore={product.novaGroup} />
        </HStack>
      </Center>

      {/* Product Information */}
      <VStack space={3} mt={10} mx={4} mb={5}>
        <Text bold fontSize="lg" color={Colors.Text}>
          {I18n.t('Aled::Product:Details:Informations')}
        </Text>
        <Text color={Colors.LightText}>
          {I18n.t('Aled::Product:Details:Quantity')} :{' '}
          {computeQuantity(product)}
        </Text>
        <Text color={Colors.LightText}>
          {I18n.t('Aled::Product:Details:Brand')} : {product.brands}
        </Text>
        <Text color={Colors.LightText}>
          Nutriscore : {product.nutriscore.toUpperCase()}
        </Text>
        <Text color={Colors.LightText}>
          {I18n.t('Aled::Product:Details:Manufacturing')} :{' '}
          {isPresent(product.manufacturing)}
        </Text>
        <Text color={Colors.LightText}>
          {I18n.t('Aled::Product:Details:Origin')} :{' '}
          {isPresent(product.ingredientsOrigins)}
        </Text>
        <Text color={Colors.Text}>
          {I18n.t('Aled::Product:Details:Ingredients')}
        </Text>
        <Text color={Colors.LightText}>
          {product.ingredientsText.replace(regexBalise, '')}
        </Text>
      </VStack>

      {/* Health Information */}
      <VStack space={3} mt={10} mx={4} mb={5}>
        <Text bold fontSize="lg" color="coolGray.800">
          {I18n.t('Aled::Product:Details:Health')}
        </Text>
        <Text color={Colors.Text}>
          {I18n.t('Aled::Product:Details:Allergens')}
        </Text>
        <Text color={Colors.LightText}>{retrieveAllergens(product)}.</Text>
        <Text color={Colors.Text}>
          {I18n.t('Aled::Product:Details:Processing')}
        </Text>
        <Text color={Colors.LightText}>Nova {product.novaGroup}</Text>

        <Text color={Colors.Text}>
          {I18n.t('Aled::Product:Details:NutrientsLevels')}
        </Text>
        <TriLine name={'Fats'} value={product.nutrientLevels.fat} />
        <TriLine
          name={'Saturated Fats'}
          value={product.nutrientLevels.saturatedFat}
        />
        <TriLine name={'Sugars'} value={product.nutrientLevels.sugars} />
        <TriLine name={'Salt'} value={product.nutrientLevels.salt} />
      </VStack>

      {/* Nutrition Facts */}
      <VStack space={3} mt={10} mx={4}>
        <SafeAreaView style={{ flex: 1 }}>
          <NutritionTab nutrients={product.nutrients} />
        </SafeAreaView>
      </VStack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProductDetailScreen;
