using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;

namespace Aled.Security;

public class HostingEnvironmentFake : IHostEnvironment
{
    public string EnvironmentName { get; set; } = AledTestConsts.Development;
    public string ApplicationName { get; set; } = AledTestConsts.Aled;
    public string ContentRootPath { get; set; } = "../../../src/Aled.Domain/";
    public IFileProvider ContentRootFileProvider { get; set; }
}