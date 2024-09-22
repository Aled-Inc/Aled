import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Demande de permission pour les notifications
export const requestNotificationPermissions = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    await Notifications.requestPermissionsAsync();
  }
};

// Fonction pour planifier une notification
export const scheduleNotification = async product => {
  const expirationDate = new Date(product.expirationDate);
  const today = new Date();

  const differenceInDays = Math.ceil(
    (expirationDate - today) / (1000 * 3600 * 24),
  );

  if (differenceInDays === 3) {
    const notificationDate = new Date(expirationDate);
    notificationDate.setDate(notificationDate.getDate() - 3); // Date de notification (J-3)

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Expiration de produit',
        body: `Le produit ${product.productName} expire dans 3 jours.`,
        data: { productId: product.id },
      },
      trigger: {
        date: notificationDate,
      },
    });
  }
};

// Gérer les notifications reçues
export const handleNotificationResponse = navigation => {
  Notifications.addNotificationResponseReceivedListener(response => {
    const { productId } = response.notification.request.content.data;
    navigation.navigate('ProductDetails', { id: productId });
  });
};
