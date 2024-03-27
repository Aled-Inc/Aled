using OpenFoodFactService.Samples;
using Xunit;

namespace OpenFoodFactService.MongoDB.Domains;

[Collection(OpenFoodFactServiceTestConsts.CollectionDefinitionName)]
public class MongoDBSampleDomainTests : SampleDomainTests<OpenFoodFactServiceMongoDbTestModule>
{

}
