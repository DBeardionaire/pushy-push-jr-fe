export const getWorker = async () => await navigator.serviceWorker.ready

export const enableNotifications = () => {
  if (window.Notification) {
    Notification.requestPermission(function (status) {
      console.log('Status: ', status)
    })
    return true
  } else {
    alert("Your browser doesn't support notifications.")
    return false
  }
}

export const sendNotification = (body: string, title: string = 'Pushy Push JR') => {
  const isPushEnabled = enableNotifications()

  if (isPushEnabled) {
    var n = new Notification(title, { body, icon: 'icons/PushyPushJR192x192.png' })

    getWorker().then((registration) => {
      registration.showNotification(title, {
        body: n.body,
        icon: n.icon
      })
    })
  }
}