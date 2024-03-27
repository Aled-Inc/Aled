using OpenFoodFactService.MongoDB;
using OpenFoodFactService.Samples;
using Xunit;

namespace OpenFoodFactService.MongoDb.Applications;

[Collection(MongoTestCollection.Name)]
public class MongoDBSampleAppService_Tests : SampleAppService_Tests<OpenFoodFactServiceMongoDbTestModule>
{

}
