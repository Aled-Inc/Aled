﻿using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.Identity;

namespace Aled.Fakes.Repositories;

public class InMemoryIdentitySecurityLogRepository : InMemoryBasicRepository<IdentitySecurityLog, Guid>, IIdentitySecurityLogRepository
{
    public Task<List<IdentitySecurityLog>> GetListAsync(string sorting = null, int maxResultCount = 50, int skipCount = 0, DateTime? startTime = null,
        DateTime? endTime = null, string applicationName = null, string identity = null, string action = null,
        Guid? userId = null, string userName = null, string clientId = null, string correlationId = null,
        bool includeDetails = false, CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task<long> GetCountAsync(DateTime? startTime = null, DateTime? endTime = null, string applicationName = null,
        string identity = null, string action = null, Guid? userId = null, string userName = null, string clientId = null,
        string correlationId = null, CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task<IdentitySecurityLog> GetByUserIdAsync(Guid id, Guid userId, bool includeDetails = false,
        CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }
}