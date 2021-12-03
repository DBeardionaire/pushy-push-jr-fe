using System.Text;
using Google.Cloud.Firestore;

namespace api;

public static class FirebaseHelper
{
    public static string ProjectId = "pushy-push-jr";
    public const string PushyPushUsers = nameof(PushyPushUsers);

    public static async Task<CollectionReference> GetPushyPushUsersCollectionAsync(FirestoreDb? db = null)
    {
        if (db is null)
        {
            db = await GetFirestoreDb();
        }

        CollectionReference collection = db.Collection(FirebaseHelper.PushyPushUsers);

        return collection;
    }

    public static async Task<FirestoreDb> GetFirestoreDb()
    {
        var json = FirebaseHelper.GetFirebaseJsonCreds();

        var db = await new FirestoreDbBuilder()
        {
            ProjectId = FirebaseHelper.ProjectId,
            JsonCredentials = json
        }.BuildAsync();

        return db;
    }

    public static string GetFirebaseJsonCreds()
    {
        var firebaseSecret = Environment.GetEnvironmentVariable("FIREBASE_SECRET") ?? string.Empty;
        var json = FirebaseHelper.FromBase64(firebaseSecret);
        return json;
    }

    public static string FromBase64(string data)
    {
        if (string.IsNullOrEmpty(data)) return data;
        var bytes = Convert.FromBase64String(data);
        return UTF8Encoding.UTF8.GetString(bytes);
    }
}