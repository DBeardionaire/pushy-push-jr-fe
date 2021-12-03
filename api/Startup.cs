using System.Text;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;

[assembly: FunctionsStartup(typeof(Startup))]
public class Startup : FunctionsStartup
{
    public override void Configure(IFunctionsHostBuilder builder)
    {
        builder
            .AddGraphQLFunction()
            .AddQueryType<Query>()
            .AddMutationType<Mutation>();

        // Firebase
        var json = FirebaseHelper.GetFirebaseJsonCreds();
        var creds = GoogleCredential.FromJson(json);
        Console.Error.WriteLine("FirebaseApp creds" + creds.ToString());
        FirebaseApp.Create(new AppOptions()
        {
            Credential = creds,
        });
        Console.Error.WriteLine("FirebaseApp created");
    }
}
