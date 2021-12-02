'use strict'

// To disable all workbox logging during development, you can set self.__WB_DISABLE_DEV_LOGS to true
// https://developers.google.com/web/tools/workbox/guides/configure-workbox#disable_logging
//
// self.__WB_DISABLE_DEV_LOGS = true

/**
 * ? haven't tested
 * Listen for the push event
 * Trigger notification
 */
 self.addEventListener('push', function (event) {
  const title = 'Push';
  const options = {
      body: event.data.text(),
      icon: 'icons/PushyPushJR192x192.png',
      badge: 'icons/PushyPushJR192x192.png'
  };
  event.waitUntil(self.registration.showNotification(title, options));
});