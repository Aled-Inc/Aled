using System.Collections.Generic;
using System.Threading.Tasks;
using Aled.Email;
using Aled.Fakes.Managers;
using Aled.Localization;
using Aled.Security;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Localization;
using Moq;
using Volo.Abp.Emailing;
using Volo.Abp.TextTemplating;
using Volo.Abp.Users;
using Xunit;

namespace Aled.UnitTests.Email;

public class EmailServiceTest : AledApplicationTestBase<AledApplicationTestModule>
{
    private const string ApiHostUrl = "https://example.ngrok.io";
    private const string ExpectedBody = "This is a rendered template body";
    private const string ConfirmYourEmail = "Confirm your email";
    private const string DefaultEmail = "default@email.com";
    
    private readonly EmailService _emailService;
    private readonly Mock<IEmailSender> _emailSenderMock;
    private readonly Mock<ITemplateRenderer> _templateRendererMock;
    private readonly Mock<IStringLocalizer<AledResource>> _localizerMock;
    private readonly Mock<IConfiguration> _configurationMock;
    private readonly Mock<IHostEnvironment> _environmentMock;
    private readonly Mock<IConfigurationSection> _defaultEmailSectionMock;
    private readonly Mock<IConfigurationSection> _ngrokUrlSectionMock;

    private static FakeCurrentUser _fakeCurrentUser;

    public EmailServiceTest()
    {
        _emailSenderMock = new Mock<IEmailSender>();
        _templateRendererMock = new Mock<ITemplateRenderer>();
        _localizerMock = new Mock<IStringLocalizer<AledResource>>();
        _configurationMock = new Mock<IConfiguration>();
        _environmentMock = new Mock<IHostEnvironment>();
        _defaultEmailSectionMock = new Mock<IConfigurationSection>();
        _ngrokUrlSectionMock = new Mock<IConfigurationSection>();

        _fakeCurrentUser = GetRequiredService<ICurrentUser>() as FakeCurrentUser;

        _emailService = new EmailService(
            _emailSenderMock.Object,
            _templateRendererMock.Object,
            _localizerMock.Object,
            _configurationMock.Object,
            _environmentMock.Object
        );
    }

    private void SetupEmailConfiguration()
    {
        _defaultEmailSectionMock.Setup(s => s.Value).Returns(DefaultEmail);
        _ngrokUrlSectionMock.Setup(s => s.Value).Returns(ApiHostUrl);

        _configurationMock.Setup(c => c.GetSection("Email:Default"))
            .Returns(_defaultEmailSectionMock.Object);
        _configurationMock.Setup(c => c.GetSection("Ngrok:Api.Host.Url"))
            .Returns(_ngrokUrlSectionMock.Object);
    }
    
    private void SetupEnvironmentIsDevelopment(bool isDevelopment)
    {
        var envName = isDevelopment ? Environments.Development : Environments.Production;
        _environmentMock.Setup(e => e.EnvironmentName).Returns(envName);
    }

    public static IEnumerable<object[]> SendEmailFromIdentityUserData =>
        new List<object[]>
        {
            new object[] {true, DefaultEmail},
            new object[] {false, UserDto.Email},
        };
    

    [Theory]
    [MemberData(nameof(SendEmailFromIdentityUserData))]
    public async Task SendEmailConfirmationEmailAsync_WithIdentityUserDto_ShouldSendEmail(bool isDevelopment, string expectedEmail)
    {
        SetupEmailConfiguration();
        SetupEnvironmentIsDevelopment(isDevelopment);
        
        _templateRendererMock.Setup(t => t.RenderAsync(It.IsAny<string>(), It.IsAny<object>(), "fr-FR", null))
            .ReturnsAsync(ExpectedBody);

        _localizerMock.Setup(l => l["Email:ConfirmEmailTitle"])
            .Returns(new LocalizedString("Email:ConfirmEmailTitle", ConfirmYourEmail));

        await _emailService.SendEmailConfirmationEmailAsync(UserDto, IdentityUserManagerFake.EmailToken);

        _emailSenderMock.Verify(e => e.SendAsync(expectedEmail, ConfirmYourEmail, null, true, null), Times.Once);
    }
    
   
    [Fact]
    public async Task SendEmailConfirmationEmailAsync_WithCurrentUser_ShouldSendEmailInDevelopment()
    {
        SetupEmailConfiguration();
        SetupEnvironmentIsDevelopment(true);
    
        _templateRendererMock.Setup(t => t.RenderAsync(It.IsAny<string>(), It.IsAny<object>(), "fr-FR", null))
            .ReturnsAsync(ExpectedBody);
    
        _localizerMock.Setup(l => l["Email:ConfirmEmailTitle"])
            .Returns(new LocalizedString("Email:ConfirmEmailTitle", ConfirmYourEmail));
    
        await _emailService.SendEmailConfirmationEmailAsync(_fakeCurrentUser, IdentityUserManagerFake.EmailToken);
    
        _emailSenderMock.Verify(e => e.SendAsync(DefaultEmail, "Confirm your email", null, true, null),
            Times.Once);
    }
    
    [Fact]
    public async Task SendEmailConfirmationEmailAsync_WithCurrentUser_ShouldSendEmailInProduction()
    {
        SetupEmailConfiguration();
        SetupEnvironmentIsDevelopment(false);
    
        _templateRendererMock.Setup(t => t.RenderAsync(It.IsAny<string>(), It.IsAny<object>(), "fr-FR", null))
            .ReturnsAsync(ExpectedBody);
    
        _localizerMock.Setup(l => l["Email:ConfirmEmailTitle"])
            .Returns(new LocalizedString("Email:ConfirmEmailTitle", ConfirmYourEmail));
    
        await _emailService.SendEmailConfirmationEmailAsync(_fakeCurrentUser, IdentityUserManagerFake.EmailToken);
    
        _emailSenderMock.Verify(e => e.SendAsync(_fakeCurrentUser.Email!, "Confirm your email", null, true, null),
            Times.Once);
    }
}