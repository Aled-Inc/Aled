using OpenFoodFactService.Samples;
using Xunit;

namespace OpenFoodFactService.MongoDB.Domains;

[Collection(MongoTestCollection.Name)]
public class MongoDBSampleDomain_Tests : SampleManager_Tests<OpenFoodFactServiceMongoDbTestModule>
{

}
