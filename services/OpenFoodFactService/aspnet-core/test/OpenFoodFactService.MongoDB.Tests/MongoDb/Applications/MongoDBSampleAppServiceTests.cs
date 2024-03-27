using OpenFoodFactService.MongoDB;
using OpenFoodFactService.Samples;
using Xunit;

namespace OpenFoodFactService.MongoDb.Applications;

[Collection(OpenFoodFactServiceTestConsts.CollectionDefinitionName)]
public class MongoDBSampleAppServiceTests : SampleAppServiceTests<OpenFoodFactServiceMongoDbTestModule>
{

}
