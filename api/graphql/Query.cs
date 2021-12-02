namespace api;

public partial class Query
{
    public Person GetPerson() => new Person("Luke Skywalker");
}

public record Person(string Name);