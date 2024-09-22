import i18n from 'i18n-js';
import { Avatar, Box, Text, View } from 'native-base';
import React from 'react';
import { connectToRedux } from '../../../common/utils/ReduxConnect';
import { createUserSelector } from '../../../business/store/selectors/AuthSelector';
import PropTypes from 'prop-types';
import { homeStyle } from '../../styles/HomeStyle';
import SimpleProductCarouselComponent from '../../components/Caroussels/SimpleProductCaroussel';
import { createInventorySelector } from '../../../business/store/selectors/InventorySelector';
import { Filters } from '../../../common/utils/InventoryUtils';
import ProductSearch from '../../components/Search/SearchProduct';

function HomeScreen({ user, inventory }) {
  return (
    <View style={homeStyle.homeContainer} px="3">
      <Box style={homeStyle.identityBox}>
        <View style={homeStyle.identityRowView}>
          <Avatar
            ml="3"
            style={homeStyle.identityAvatar}
            source={require('../../../../assets/avatar.png')}
          />
          <View ml="3" style={homeStyle.identityColView}>
            <Text style={homeStyle.identityText}>
              {i18n.t('::Welcome')}
              <Text style={homeStyle.identityText.username}>
                {' '}
                {user.userName}
              </Text>
            </Text>
            <Text style={homeStyle.identitySubtitle}>
              {i18n.t('Aled::Home:Subtitle')}
            </Text>
          </View>
        </View>
      </Box>
      <Box px={5}>
        <ProductSearch products={inventory.products} />
        <Text style={homeStyle.listTitle} mt={3}>
          {i18n.t('Aled::Home:TheyExpireSoon')}
        </Text>
        <SimpleProductCarouselComponent
          products={inventory.products}
          filter={Filters.ExpiredSoon}
          showFilter={false}
        />
      </Box>
    </View>
  );
}

HomeScreen.propTypes = {
  user: PropTypes.object.isRequired,
  inventory: PropTypes.object,
};

export default connectToRedux({
  component: HomeScreen,
  stateProps: state => ({
    user: createUserSelector()(state),
    inventory: createInventorySelector()(state),
  }),
});
