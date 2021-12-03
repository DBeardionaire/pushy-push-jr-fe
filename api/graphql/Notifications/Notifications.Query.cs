using System.Collections.Generic;
using System.Linq;
using Google.Cloud.Firestore;

namespace api;

public partial class Query
{
    public async Task<IEnumerable<FireBasePushUser>> GetPushyPushJrsAsync(
        int? limit,
        int? skip)
    {
        List<FireBasePushUser> list = new();
        var collection = await FirebaseHelper.GetPushyPushUsersCollectionAsync();

        var query = collection
            .Offset(skip ?? 0)
            .Limit(limit ?? 10);

        // A CollectionReference is a Query, so we can just fetch everything
        QuerySnapshot pushers = await query.GetSnapshotAsync();
        foreach (DocumentSnapshot document in pushers.Documents)
        {
            // Do anything you'd normally do with a DocumentSnapshot
            FireBasePushUser pusha = document.ConvertTo<FireBasePushUser>();
            list.Add(pusha);
        }

        return list;
    }
}