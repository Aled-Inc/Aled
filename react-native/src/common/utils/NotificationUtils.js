import * as Notifications from 'expo-notifications';

const hasPermission = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  return status === 'granted';
};

export async function requestPermission() {
  const permissionGranted = await hasPermission();

  if (!permissionGranted) {
    await Notifications.requestPermissionsAsync();
  }
}

export async function scheduleNotification(product, difference) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Expiration Approaching',
      body: `${product.productName} expires in ${difference} days.`,
      data: { productId: product.id },
    },
    trigger: { seconds: difference * 86400, repeats: false },
  });
}

export async function cancelNotification(productId) {
  const notifications = await Notifications.getAllScheduledNotificationsAsync();
  notifications.forEach(notification => {
    if (notification.content.data.productId === productId) {
      Notifications.cancelScheduledNotificationAsync(notification.identifier);
    }
  });
}
