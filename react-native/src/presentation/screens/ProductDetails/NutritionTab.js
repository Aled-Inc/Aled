import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { nutrientUnits, vitaminUnits } from '../../../common/utils/ProductUtils';
import { firstLetterUpper, toPascalCase } from '../../../common/utils/CommonUtils';
import I18n from 'i18n-js';

const NutritionTab = ({ nutrients }) => {
  const getUnit = nutrient => {
    return nutrientUnits[nutrient] || vitaminUnits[nutrient] || 'g';
  };

  if (typeof nutrients !== 'object' || nutrients === null) {
    return (
      <View style={styles.container}>
        <Text>Les données des nutriments ne sont pas disponibles.</Text>
      </View>
    );
  }
  const filteredNutrients = Object.entries(nutrients).filter(
    ([key, value]) => value !== null && value !== 0 && nutrientUnits[key],
  );

  const filteredVitamins = Object.entries(nutrients).filter(
    ([key, value]) => value !== null && value !== 0 && !nutrientUnits[key],
  );
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {I18n.t('Aled::Product:Details:NutritionFacts')}
        </Text>
        <Text style={styles.headerText}>100g</Text>
      </View>
      {filteredNutrients.map(([key, value]) => (
        <View style={styles.row} key={key}>
          <Text style={[styles.cell, styles.keyCell]}>
            {I18n.t(`Aled::Product:Details:Nutrients:${toPascalCase(key)}`)}
          </Text>
          <Text style={[styles.cell, styles.valueCell]}>
            {value} {getUnit(key)}
          </Text>
        </View>
      ))}

      {/* Section des vitamines, affichée uniquement si non vide */}
      {filteredVitamins.length > 0 && (
        <>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              {I18n.t('Aled::Product:Details:Vitamins')}
            </Text>
          </View>

          {filteredVitamins.map(([key, value]) => (
            <View style={styles.row} key={key}>
              <Text style={[styles.cell, styles.keyCell]}>
                {firstLetterUpper(key)}
              </Text>
              <Text style={[styles.cell, styles.valueCell]}>
                {value} {getUnit(key)}
              </Text>
            </View>
          ))}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 5,
  },
  cell: {
    flex: 1,
    fontSize: 14,
    padding: 5,
  },
  keyCell: {
    textAlign: 'left',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  valueCell: {
    textAlign: 'center',
  },
});

export default NutritionTab;
