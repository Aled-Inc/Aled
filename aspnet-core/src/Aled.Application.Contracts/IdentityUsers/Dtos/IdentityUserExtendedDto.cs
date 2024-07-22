using Volo.Abp.Identity;

namespace Aled.IdentityUsers.Dtos;

public class IdentityUserExtendedDto: IdentityUserDto
{
    public bool TwoFactorEnabled { get; set; }
}