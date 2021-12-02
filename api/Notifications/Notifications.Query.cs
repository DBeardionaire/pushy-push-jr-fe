namespace api;

public partial class Query
{
    public IEnumerable<PushNotification> GetPushNotifications(int? limit) =>
        (new List<PushNotification>() {
            new PushNotification("Luke Skywalker", "I Am Your Father!"),
            new PushNotification("Jar Jar Binks", "Is a Sith Lord!"),
            new PushNotification("Mace Windu", "Is still alive and don't read anything into the color of his lightsaber!")
        }).Take(limit ?? 10);
}

public record PushNotification(string Title, string Body);