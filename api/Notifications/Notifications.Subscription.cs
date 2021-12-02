namespace api;

public partial class Subscription
{
    /// <summary>
    /// Subscriptions won't work in Az funcs without some kind of external state
    /// </summary>
    /// <param name="pushNotification">Push Notification</param>
    /// <returns>Push Notification</returns>
    [Subscribe]
    public PushNotification PushAdded([EventMessage] PushNotification pushNotification)
            => pushNotification;
}