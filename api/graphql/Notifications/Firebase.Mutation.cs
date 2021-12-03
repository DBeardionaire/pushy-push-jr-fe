using System.Collections.Generic;
using System.Linq;
using HotChocolate;
using Microsoft.AspNetCore.Http;
using FirebaseAdmin.Messaging;
using Google.Cloud.Firestore;

namespace api;

public partial class Mutation
{
    public async Task<FireBasePushUser> SetFirebaseUserKeyAsync(
        string firebaseKey,
        string? username,
        [Service] IHttpContextAccessor http)
    {
        Console.Error.WriteLine("Firebase key: " + firebaseKey);

        var ip = http.HttpContext?.Connection.RemoteIpAddress?.MapToIPv4().ToString();

        var collection = await FirebaseHelper.GetPushyPushUsersCollectionAsync();

        if (collection is null)
        {
            throw new Exception("collection empty");
        }

        var doc = collection.Document(firebaseKey);

        FireBasePushUser pusher = new()
        {
            FirebasePushUserKey = firebaseKey,
            IPAddress = ip,
            Username = username,
            Timestamp = FieldValue.ServerTimestamp
        };

        if (doc is null)
        {
            var res = await collection.Document(firebaseKey).CreateAsync(pusher);
            Console.WriteLine(res);
        }
        else
        {
            DocumentSnapshot snapshot = await doc.GetSnapshotAsync();
            var exists = snapshot.Exists;
            // Even if there's no document in the server, we still get a snapshot
            // back - but it knows the document doesn't exist.
            Console.WriteLine(exists);

            if (exists)
            {
                var existingPusher = snapshot.ConvertTo<FireBasePushUser>();
                Console.WriteLine("existingPusher: " + existingPusher.Username + " | " + existingPusher.FirebasePushUserKey);
            }

            await doc.SetAsync(pusher, SetOptions.MergeFields("Username", "IPAddress", "Timestamp"));
        }

        var message = new Message()
        {
            Notification = new()
            {
                Title = "Set FCM Key",
                Body = username ?? firebaseKey,
            },
            Data = new Dictionary<string, string>()
                {
                    { "ip", ip ?? string.Empty },
                    { "key", firebaseKey },
                },
            Token = firebaseKey,
        };

        string response = await FirebaseMessaging.DefaultInstance.SendAsync(message);

        Console.WriteLine("Successfully sent message: " + response);

        return pusher;
    }
}