import i18n from 'i18n-js';
import {
  Avatar,
  Box,
  Button,
  Icon,
  Popover,
  Text,
  View,
  VStack,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { connectToRedux } from '../../../common/utils/ReduxConnect';
import { createUserSelector } from '../../../business/store/selectors/AuthSelector';
import PropTypes from 'prop-types';
import { homeStyle } from '../../styles/HomeStyle';
import SimpleProductCarouselComponent from '../../components/Caroussels/SimpleProductCaroussel';
import { createInventorySelector } from '../../../business/store/selectors/InventorySelector';
import { Filters } from '../../../common/utils/InventoryUtils';
import { Ionicons } from '@expo/vector-icons';
import ProductSearch from '../../components/Search/SearchProduct';
import {
  scheduleNotification,
  cancelNotification,
  requestPermission,
} from '../../../common/utils/NotificationUtils';
import * as Notifications from 'expo-notifications';

function HomeScreen({ user, inventory }) {
  const [expiringProducts, setExpiringProducts] = useState([]);
  const [expiringSoonProducts, setExpiringSoonProducts] = useState([]);
  const [notificationsCount, setNotificationCount] = useState([]);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      notification => {
        console.log('Notification received:', notification);
      },
    );

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    const checkExpiringProducts = async () => {
      await requestPermission();

      const today = new Date();
      const expiring = expiringSoonProducts;
      const expired = expiringProducts;

      const product = inventory.products[0];
      const expiration = new Date(product.expirationDate);
      const difference = Math.ceil((expiration - today) / (1000 * 3600 * 24));

      if (difference <= 3 && difference >= 0) {
        await scheduleNotification(product, difference);
        expiring.push(product);
      } else if (difference < 0) {
        expired.push(product);
        await cancelNotification(product.id);
      }

      setExpiringSoonProducts(expiring);
      setExpiringProducts(expired);
      setNotificationCount(expiring.length + expired.length);
    };

    if (inventory.products.length > 0) {
      checkExpiringProducts();
    }
  }, [inventory.products]);

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
          {/* Popover pour les notifications */}
          <Popover
            trigger={triggerProps => {
              return (
                <Button {...triggerProps} variant="ghost" p={0} ml={5}>
                  {/* Conteneur de l'icône de la cloche et de la pastille */}
                  <View style={{ position: 'relative' }}>
                    {/* Icône de la cloche */}
                    <Ionicons
                      name="notifications-outline"
                      size={28}
                      color="black"
                    />

                    {/* Pastille rouge avec le nombre de notifications */}
                    {notificationsCount > 0 && (
                      <View
                        style={{
                          position: 'absolute',
                          right: -4,
                          bottom: -4,
                          backgroundColor: 'red',
                          borderRadius: 10,
                          width: 20,
                          height: 20,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={{ color: 'white', fontSize: 12 }}>
                          {notificationsCount}
                        </Text>
                      </View>
                    )}
                  </View>
                </Button>
              );
            }}>
            <Popover.Content accessibilityLabel="Notifications" w="56">
              <Popover.Arrow />
              <Popover.CloseButton />
              <Popover.Header style={homeStyle.notificationHeader}>
                {/* {i18n.t('Aled::Notifications:Title')} */}
                Notifications
              </Popover.Header>
              <Popover.Body>
                {expiringSoonProducts.length == 0 &&
                expiringProducts.length == 0 ? (
                  <Text style={homeStyle.noNotificationsText}>
                    No notifications
                  </Text>
                ) : (
                  <VStack space={3}>
                    {expiringProducts.map(product => (
                      <Box key={product.id} style={homeStyle.notificationCard}>
                        <Text>
                          {product.productName}{' '}
                          <Text color={'#f00'}>
                            {i18n.t('Aled::Inventory:Expired')}
                          </Text>
                        </Text>
                      </Box>
                    ))}
                    {expiringSoonProducts.map(product => (
                      <Box key={product.id} style={homeStyle.notificationCard}>
                        <Text>
                          {product.productName}{' '}
                          <Text color={'#f90'}>
                            {i18n.t('Aled::Inventory:Filters:4')}
                          </Text>
                        </Text>
                      </Box>
                    ))}
                  </VStack>
                )}
              </Popover.Body>
            </Popover.Content>
          </Popover>
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
