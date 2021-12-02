namespace api;

public partial class Mutation
{
    public PushNotification SendPushNotification(
        string title,
        string body)
    {
        var newPush = new PushNotification(title, body);

        return newPush;
    }
}