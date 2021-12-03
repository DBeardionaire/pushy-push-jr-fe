
using Google.Cloud.Firestore;

namespace api;

[FirestoreData]
public class FireBasePushUser
{
    [FirestoreProperty]
    public string FirebasePushUserKey { get; set; } = string.Empty;

    [FirestoreProperty]
    public string? IPAddress { get; set; }

    [FirestoreProperty]
    public string? Username { get; set; }

    [FirestoreProperty]
    public object Timestamp { get; set; } = string.Empty;
}