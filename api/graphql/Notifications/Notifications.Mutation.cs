using FirebaseAdmin.Messaging;
using Google.Cloud.Firestore;

namespace api;

public partial class Mutation
{
    public async Task<PushNotification> SendGlobalPushNotificationAsync(
        PushNotification pushNotification)
    {
        var firekeyList = new List<string>();
        var collection = await FirebaseHelper.GetPushyPushUsersCollectionAsync();

        // A CollectionReference is a Query, so we can just fetch everything
        QuerySnapshot pushers = await collection.GetSnapshotAsync();
        foreach (DocumentSnapshot document in pushers.Documents)
        {
            // Do anything you'd normally do with a DocumentSnapshot
            FireBasePushUser pusha = document.ConvertTo<FireBasePushUser>();

            Console.WriteLine(pusha.FirebasePushUserKey);
            Console.WriteLine(pusha.Username);
            if (!string.IsNullOrWhiteSpace(pusha.FirebasePushUserKey))
            {
                firekeyList.Add(pusha.FirebasePushUserKey);
            }
            else
            {
                firekeyList.Add(document.Id);
            }
        }

        await SendPushNotifications(firekeyList, pushNotification);

        return pushNotification;
    }

    public async Task<PushNotification> SendPushNotificationAsync(
        PushNotification pushNotification,
        IEnumerable<string> firekeys)
    {
        await SendPushNotifications(firekeys, pushNotification);
        return pushNotification;
    }

    private async Task SendPushNotifications(IEnumerable<string> firekeys, PushNotification pn)
    {
        foreach (var firekey in firekeys)
        {
            var message = new Message()
            {
                Token = firekey,
                Notification = new()
                {
                    Title = pn.Title,
                    Body = pn.Body,
                },
                Data = new Dictionary<string, string>()
                {
                    { "key", firekey },
                },
            };

            string response = await FirebaseMessaging.DefaultInstance.SendAsync(message);
            // Response is a message ID string.
            Console.WriteLine("Successfully sent message: " + response);
        }
    }
}